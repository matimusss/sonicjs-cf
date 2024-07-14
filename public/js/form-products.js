



















  (function () {

    Formio.createForm(document.getElementById('formio-attributes'), {

    components: [{
      type: 'editgrid',
      label: 'Cars',
      key: 'cars',
      defaultOpen: true,
      removeRow: 'Cancel',
      components: [
        {
          type: 'select',
          label: 'Make',
          key: 'make',
          placeholder: 'Select your make',
          dataSrc: 'values',
          validate: {
            required: true
          },
          data: {
            values: [
              {
                label: 'Chevy',
                value: 'chevrolet'
              },
              {
                value: 'honda',
                label: 'Honda'
              },
              {
                label: 'Ford',
                value: 'ford'
              },
              {
                label: 'Toyota',
                value: 'toyota'
              }
            ]
          }
        },
        {
          type: 'select',
          label: 'Model',
          key: 'model',
          placeholder: 'Select your model',
          data: {
            values: [
              {
                label: 'Casdasdashevy',
                value: 'dasdasdasdasdhevrolet'
              },
              {
                value: 'hasdasdonda',
                label: 'asdasdasdasdHonda'
              },
              {
                label: 'Fasdasdasord',
                value: 'fdasdasdasdord'
              },
              {
                label: 'Toyota',
                value: 'toyota'
              }
            ]
          },
          valueProperty: 'Model_Name',
          template: '<span>{{ item.Model_Name }}</span>',
          refreshOn: 'cars.make',
          clearOnRefresh: true,
          selectValues: 'Results',
          validate: {
            required: true
          }
        }
      ]
    }]
  });
})();















  (function () {
 

    Formio.createForm(document.getElementById('formio-tags'), {
      components: [
          {
            label: 'Tags',
            key: 'tags',
            type: 'editgrid',
            input: true,
            templates: {
              header: '' +
                '<div class="row">' +
                '  {% util.eachComponent(components, function(component) { %} ' +
                '    <div class="col-sm-2">' +
                '      <strong>{{ component.label }}</strong>' +
                '    </div>' +
                '  {% }) %}' +
                '</div>',
              row: '' +
                '<div class="row">' +
                '  {%util.eachComponent(components, function(component) { %}' +
                '    <div class="col-sm-2">' +
                '      {{ row[component.key] }}' +
                '    </div>' +
                '  {% }) %}' +
                '  <div class="col-sm-2">' +
                '    <div class="btn-group pull-right">' +
                '      <div class="btn btn-default btn-sm editRow"><i class="bi bi-edit"></i></div>' +
                '      <div class="btn btn-danger btn-sm removeRow"><i class="bi bi-trash"></i></div>' +
                '    </div>' +
                '  </div>' +
                '</div>',
              footer: ''
            },
            components: [
          
              {
                label: 'Nombre de Tag',
                key: 'tagName',
                type: 'select',
                input: true,
                data: {
                  values: [
                    {value: 'Remeras', label: 'Remeras'},
                    {value: 'Batas', label: 'Batas'},
                    {value: 'Ojotas', label: 'Ojotas'},
                    {value: 'Buzos', label: 'Buzos'}
                  ]
                },
                dataSrc: "values",
                template: '<span>{{ item.label }}</span>'
              }
            ]
          }
        ]
    })
    .then(function(form) {
      // Provide a default submission.
      form.submission = {
        data: {
          tags: [
            {
              tagName: 'Corbatas'
            },
            {
              tagName: 'Guantes'
            }
          ]
        }
      };
    });

  })
  
  ();






