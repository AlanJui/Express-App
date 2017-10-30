$(function () {
  $('#form').dxForm({
    colCount: 2,
    formData: employee,
    items:[
      'ID',
      {
        dataField: 'FirstName',
        editorOptions: {
          disabled: true
        }
      },
      {
        dataField: 'LastName',
        editorOptions: {
          disabled: true
        }
      },
      {
        dataField: 'Position',
        editorOptions: {
          items: positions,
          value: ''
        },
        validationRules: [
          {
            type: 'required',
            message: 'Position is required'
          }
        ]
      },
      {
        dataField: 'BirthDate',
        editorType: 'dxDateBox',
        editorOptions: {
          disabled: true
        }
      },
      {
        dataField: 'HireDate',
        editorType: 'dxDateBox',
        editorOptions: {
          value: null
        },
        validationRules: [
          {
            type: 'required',
            message: 'Hire date is required'
          }
        ]
      },
      'Address',
      {
        dataField: 'Phone',
        editorOptions: {
          mask: '+1 (X00) 000-0000',
          maskRules: {'X': /[02-9]/}
        }
      },
      {
        colspan: 1,
        dataField: 'Notes',
        editorType: 'dxTextArea',
        editorOptions: {
          height: 90
        }
      },
    ]
  });

  $('#form').dxForm('instance').validate();
});