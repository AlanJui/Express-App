$(function() {

  // var API_BASE = 'http://114.198.172.94:9100/api';
  var API_BASE = 'http://192.168.66.11:5000/api';
  var API_URI = 'orders';
  var API_URL = `${API_BASE}/${API_URI}`;

  var LOOKUP_CUSTOMER = `${API_BASE}/customers-lookup`;
  var LOOKUP_EMPLOYEE = `${API_BASE}/employees-lookup`;
  var LOOKUP_SHIPPER  = `${API_BASE}/shippers-lookup`;

  //========================================================

  var myStore = new DevExpress.data.CustomStore({

    byKey: function(key) {
      return $.getJSON(`${API_URL}/${key.orderId}`);
    },

    load: function(loadOptions) {
      return $.getJSON(API_URL);
    },

    insert: function(values) {
      return $.post(API_URL, values);
    },

    update: function(key, values) {

      return $.ajax({
        url: `${API_URL}/${key.orderId}`,
        method: 'PATCH',
        data: values
      });

      // return $.ajax({
      //   url: `${API_URL}/${key.orderId}`,
      //   method: "PUT",
      //   data: values
      // });
    },

    remove: function(key) {
      return $.ajax({
        url: `${API_URL}/${key.orderId}`,
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
      columns: [
        {
          dataField: 'orderId',
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
      masterDetail: {
        enabled: true,
        template: function(container, options) {
          const url = `${API_BASE}/OrderDetails/${options.data.orderId}`;
          $("<div>")
            .dxDataGrid({
              dataSource: DevExpress.data.AspNet.createStore({
                loadUrl: url,
                loadParams: { }
              })
            })
            .appendTo(container);
        }
      },

      editing: {
        allowUpdating: true,
        allowDeleting: true,
        allowAdding: true
      },
      // remoteOperations: true,
      remoteOperations: {
        sorting: true,
        paging: true
      },
      paging: {
        pageSize: 10
      },
      pager: {
        showPageSizeSelector: true,
        allowedPageSizes: [8, 12, 20]
      },
      groupPanel: { visible: true },
      filterRow: { visible: true },
      headerFilter: { visible: true },
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
      }
    });
  });

});
