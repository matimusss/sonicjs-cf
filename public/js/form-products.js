















(function () {
  Formio.createForm(document.getElementById('formio-attributes'), {
    components: [{
      type: 'editgrid',
      label: 'Attributes',
      key: 'attributes',
      defaultOpen: true,
      removeRow: 'Cancel',
      components: [
        {
          type: 'select',
          label: 'Attribute Type',
          key: 'attributeType',
          placeholder: 'Select Attribute Type',
          dataSrc: 'values',
          validate: {
            required: true
          },
          data: {
            values: [
              {
                label: 'Peso',
                value: 'peso'
              },
              {
                value: 'color',
                label: 'Color'
              }
            ]
          }
        },
        {
          type: 'select',
          label: 'Attribute Value',
          key: 'attributeValue',
          placeholder: 'Select Attribute Value',
          dataSrc: 'values',
          data: {
            values: []
          },
          template: '<span>{{ item.label }}</span>',
          refreshOn: 'attributeType',
          clearOnRefresh: true,
          validate: {
            required: true
          },
          logic: [
            {
              name: 'Show Weight Options',
              trigger: {
                type: 'simple',
                simple: {
                  show: true,
                  when: 'attributeType',
                  eq: 'peso'
                }
              },
              actions: [
                {
                  name: 'Set Weight Options',
                  type: 'value',
                  value: `data.values = [
                    {label: '1 KG', value: '1kg'},
                    {label: '5 KG', value: '5kg'},
                    {label: '10 KG', value: '10kg'}
                  ];`
                }
              ]
            },
            {
              name: 'Show Color Options',
              trigger: {
                type: 'simple',
                simple: {
                  show: true,
                  when: 'attributeType',
                  eq: 'color'
                }
              },
              actions: [
                {
                  name: 'Set Color Options',
                  type: 'value',
                  value: `data.values = [
                    {label: 'Rojo', value: 'rojo'},
                    {label: 'Azul', value: 'azul'},
                    {label: 'Verde', value: 'verde'}
                  ];`
                }
              ]
            }
          ]
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






