$(function(){

  var API_URL = 'http://192.168.66.11:5000/api';
  var LOOKUP_CUSTOMER = `${API_URL}/customers-lookup`;
  var LOOKUP_EMPLOYEE = `${API_URL}/employees-lookup`;
  var LOOKUP_SHIPPER  = `${API_URL}/shippers-lookup`;

  $("#gridContainer").dxDataGrid({

    dataSource: DevExpress.data.AspNet.createStore({
      key: 'orderId',
      loadUrl:   `${API_URL}/list-order`,
      updateUrl: `${API_URL}/update-order`,
      insertUrl: `${API_URL}/insert-order`,
      deleteUrl: `${API_URL}/delete-order`,

      onBeforeSend: function (operation, ajaxSettings) {
        // operation - any of "load", "update", "insert", "delete"
        // ajaxSettings - http://api.jquery.com/jquery.ajax/
      }
    }),

    columns: [
      'orderId',

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
              loadUrl: `${API_URL}/order-details`,
              loadParams: { orderId: options.data.orderId }
            })
          })
          .appendTo(container);
      }
    }
  });

});
