
  (function () {
    const url = window.location.href;
    const formioElement = document.getElementById('formio-products');    


    Formio.createForm(document.getElementById('formio-products'), {
      components: [
          {
            label: 'Children',
            key: 'children',
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
                label: 'Gender',
                key: 'gender',
                type: 'select',
                input: true,
                data: {
                  values: [
                    {
                      value: 'male',
                      label: 'Male'
                    },
                    {
                      value: 'female',
                      label: 'Female'
                    },
                    {
                      value: 'other',
                      label: 'Other'
                    }
                  ]
                },
                dataSrc: 'values',
                template: '<span>{{ item.label }}</span>'
              }
            ]
          }
        ]
    }).then(function(form) {
      // Provide a default submission.
      form.submission = {
        data: {
          children: [
            {
       
              gender: 'male'
    
            },
            {
        
              gender: 'female'
        
            }
          ]
        }
      };
    });
  })();

