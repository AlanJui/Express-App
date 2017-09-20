$(function() {

  var API_BASE = 'http://localhost:5000/api';
  var API_URI = 'orders';
  var API_URL = `${API_BASE}/${API_URI}`;

  var LOOKUP_CUSTOMER = `${API_BASE}/customers-lookup`;
  var LOOKUP_EMPLOYEE = `${API_BASE}/employees-lookup`;
  var LOOKUP_SHIPPER  = `${API_BASE}/shippers-lookup`;
  var GET_ORDER_DETAILS = `${API_BASE}/OrderDetails`;

  //========================================================

  var myStore = new DevExpress.data.CustomStore({

    byKey: function(key) {
      return $.getJSON(`${API_URL}/${key.id}`);
    },

    load: function(loadOptions) {
      return $.getJSON(API_URL);
    },

    insert: function(values) {
      return $.post(API_URL, values);
    },

    update: function(key, values) {

      return $.ajax({
        url: `${API_URL}/${key.id}`,
        method: 'PATCH',
        data: values
      });

      // return $.ajax({
      //   url: `${API_URL}/${key.id}`,
      //   method: "PUT",
      //   data: values
      // });
    },

    remove: function(key) {
      return $.ajax({
        url: `${API_URL}/${key.id}`,
        method: 'DELETE',
      });
    },

    totalCount: function(loadOptions) {
      'use strict';
      return 0;
    }

  });

  $(function () {
    $("#gridContainer").dxDataGrid({
      dataSource: myStore,
      remoteOperations: true,
      paging: {
        pageSize: 10
      },
      editing: {
        allowUpdating: true,
        allowDeleting: true,
        allowAdding: true
      },
      columns: [
        {
          dataField: 'id',
          caption: 'Order ID'
        },

        {
          dataField: 'customerId',
          caption: 'Customer',
          lookup: {
            valueExpr: 'value',
            displayExpr: 'text',
            dataSource: DevExpress.data.AspNet.createStore({
              key: 'value',
              loadUrl: LOOKUP_CUSTOMER
            })
          }
        },

        {
          dataField: 'orderDate',
          dataType: 'date',
          headerFilter: {
            groupInterval: 'quarter'
          }
        },

        {
          dataField: 'requiredDate',
          dataType: 'date'
        },

        {
          dataField: 'shipVia',
          lookup: {
            valueExpr: 'value',
            displayExpr: 'text',
            dataSource: DevExpress.data.AspNet.createStore({
              key: 'value',
              loadUrl: LOOKUP_SHIPPER
            })
          }
        },

        'shipCountry',
        'shipCity',

        {
          dataField: 'employeeId',
          lookup: {
            valueExpr: 'value',
            displayExpr: 'text',
            dataSource: DevExpress.data.AspNet.createStore({
              key: 'value',
              loadUrl: LOOKUP_EMPLOYEE
            })
          }
        }

      ],

      remoteOperations: {
        sorting: true,
        paging: true
      },
      paging: {
        pageSize: 12
      },
      pager: {
        showPageSizeSelector: true,
        allowedPageSizes: [8, 12, 20]
      },

      groupPanel: { visible: true },
      filterRow: { visible: true },
      headerFilter: { visible: true },
      editing: {
        allowUpdating: true,
        allowAdding: true,
        allowDeleting: true
      },
      remoteOperations: true,
      grouping: {
        autoExpandAll: false
      },
      summary: {
        totalItems: [
          { column: "freight", summaryType: "sum" }
        ],
        groupItems: [
          { column: "freight", summaryType: "sum" },
          { summaryType: "count" }
        ]
      },

      masterDetail: {
        enabled: true,
        template: function(container, options) {
          $("<div>")
            .dxDataGrid({
              dataSource: DevExpress.data.AspNet.createStore({
                loadUrl: GET_ORDER_DETAILS,
                loadParams: { id: options.data.id }
              })
            })
            .appendTo(container);
        }
      }
    });
  });

});
