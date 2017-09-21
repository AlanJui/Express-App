$(function() {

  // var API_BASE = 'http://114.198.172.94:9100/api';
  var API_BASE = 'http://192.168.66.11:5000/api';
  var API_URI = 'orders';
  var API_URL = `${API_BASE}/${API_URI}`;

  var LOOKUP_CUSTOMER = `${API_BASE}/customers-lookup`;
  var LOOKUP_EMPLOYEE = `${API_BASE}/employees-lookup`;
  var LOOKUP_SHIPPER  = `${API_BASE}/shippers-lookup`;

  //========================================================

  // alert('Hello /form/entry!');
  var form = $("#form").dxForm({
    formData: companies[0],
    readOnly: false,
    showColonAfterLabel: true,
    labelLocation: "top",
    minColWidth: 300,
    colCount: 2
  }).dxForm("instance");

  $("#select-company").dxSelectBox({
    displayExpr: "Name",
    dataSource: companies,
    value: companies[0],
    onValueChanged: function(data) {
      form.option("formData", data.value);
    }
  });

  $("#label-location").dxSelectBox({
    items: ["left", "top"],
    value: "top",
    onValueChanged: function(data) {
      form.option("labelLocation", data.value);
    }
  });

  $("#columns-count").dxSelectBox({
    items: ["auto", 1, 2, 3],
    value: 2,
    onValueChanged: function(data) {
      form.option("colCount", data.value);
    }
  });

  $("#min-column-width").dxSelectBox({
    items: [150, 200, 300],
    value: 300,
    onValueChanged: function(data) {
      form.option("minColWidth", data.value);
    }
  });

  $("#width").dxNumberBox({
    value: undefined,
    max: 550,
    onValueChanged: function(data) {
      form.option("width", data.value);
    }
  });

  $("#read-only").dxCheckBox({
    text: "readOnly",
    value: false,
    onValueChanged: function(data) {
      form.option("readOnly", data.value);
    }
  });

  $("#show-colon").dxCheckBox({
    text: "showColonAfterLabel",
    value: true,
    onValueChanged: function(data) {
      form.option("showColonAfterLabel", data.value);
    }
  });

});
