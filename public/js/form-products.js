
  (function () {
    const url2 = window.location.href;
    const formioElement2 = document.getElementById('formio-attributes');    


    Formio.createForm(document.getElementById('formio-attributes'), {
      components: [
          {
            label: 'Children',
            key: 'attributes',
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
                label: 'Nombre de atributo',
                key: 'attributeName',
                type: 'select',
                input: true,
                data: {
                  values: [
                    {value: 'Peso', label: 'Peso'},
                    {value: 'Color', label: 'Color'},
                    {value: 'Material', label: 'Material'},
                    {value: 'Motivo', label: 'Motivo'}
                  ]
                },
                
                dataSrc: "values",
                template: '<span>{{ item.label }}</span>'
              }
,
              {
                label: 'Valor de atributo',
                key: 'attributeValue',
                type: 'select',
                input: true,
                data: {
                  values: [
                    {value: '15kg', label: '15kg'},
                    {value: '12kg', label: '12kg'},
                    {value: '11kg', label: '11kg'},
                    {value: '10kg', label: '10kg'}
                  ]
                },
                
                dataSrc: "values",
                template: '<span>{{ item.label }}</span>'
              }




            ]
          }
        ]
    }).then(function(form) {
      // Provide a default submission.
      form.submission = {
        data: {
          tags: [
            {
              attributeName: 'Color',
                 attributeValue: 'Rojo'
            },
            {
              attributeName: 'Material',
                 attributeValue: 'Polyester'
            }
          ]
        }
      };
    });
  })();












  (function () {
    const url = window.location.href;
    const formioElement = document.getElementById('formio-tags');    


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
    }).then(function(form) {
      // Provide a default submission.
      form.submission = {
        data: {
          attributes: [
            {
              attributeName: 'Corbatas'
            },
            {
              attributeName: 'Guantes'
            }
          ]
        }
      };
    });
  })();






