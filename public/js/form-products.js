
(function () {  
Formio.createForm(document.getElementById('formio-attributes'), {
  components: [
    {
      label: 'Atributos',
      key: 'attributes_form',
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
          label: 'Atributo',
          key: 'attribute',
          type: 'select',
          input: true,
          data: {
            values: [
              {
                value: 'color',
                label: 'Color'
              },
              {
                value: 'peso',
                label: 'peso'
              },
              {
                value: 'material',
                label: 'Material'
              }
            ]
          },
          dataSrc: 'values',
          template: '<span>{{ item.label }}</span>'
        },
        {
          label: 'Valores',
          key: 'value',
          type: 'select',
          input: true,
          conditional: {
            show: true,
            conjunction: "all",
            conditions: [
              {
                component: 'attribute',
                operator: 'isEqual',
                value: 'peso'
              }
            ]
          },
          data: {
            values: [
              {
                value: '15kg',
                label: '15kg'
              },
              {
                value: '10kg',
                label: '10kg'
              },
              {
                value: '11kg',
                label: '11kg'
              }
            ]
          },
          dataSrc: 'values',
          template: '<span>{{ item.label }}</span>'
        },
        {
          label: 'Valores2',
          key: 'value2',
          type: 'select',
          input: true,
          conditional: {
            show: true,
            conjunction: "all",
            conditions: [
              {
                component: 'attribute',
                operator: 'isEqual',
                value: 'color'
              }
            ]
          },
          data: {
            values: [
              {
                value: 'Rojo',
                label: 'Rojo'
              },
              {
                value: 'Negro',
                label: 'Negro'
              },
              {
                value: 'Azul',
                label: 'Azul'
              }
            ]
          },
          dataSrc: 'values',
          template: '<span>{{ item.label }}</span>'
        },
        {
          label: 'Valores3',
          key: 'value3',
          type: 'select',
          input: true,
          conditional: {
            show: true,
            conjunction: "all",
            conditions: [
              {
                component: 'attribute',
                operator: 'isEqual',
                value: 'material'
              }
            ]
          },
          data: {
            values: [
              {
                value: 'Polyester',
                label: 'Polyester'
              },
              {
                value: 'Madera',
                label: 'Madera'
              },
              {
                value: 'Algodon',
                label: 'Algodon'
              }
            ]
          },
          dataSrc: 'values',
          template: '<span>{{ item.label }}</span>'
        },


      ]
    }
  ]
}).then(function(form) {
// Provide a default submission.
form.submission = {
  data: {
    attributes_form: [
      {
        attribute: 'Peso',
        value: '15kg',
      },
      {
        attribute: 'Color',
        value: 'Rojo',
      },
    ]
  }
};
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
















  (function () {  
Formio.createForm(document.getElementById('formio-variants'), {
  components: [
    {
      label: 'Variantes',
      key: 'variants_form',
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
          type: 'textfield',
          key: 'variantName',
          label: 'Nombre de la variante',
          placeholder: 'Nombre de la variante',
          input: true,
        },
        {  label: 'Caracteristicas',
          key: 'variantAttributes',
          type: 'select',
          input: true,
          data: {
            values: [
              {
                value: 'color rojo',
                label: 'Color rojo'
              },
              {
                value: 'peso 15 kg',
                label: 'peso 15 kg'
              },
              {
                value: 'material madera',
                label: 'Material madera'
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
    attributes_form: [
      {
        variantAttributes: 'Color rojo, tamaño grande',
        variantName: 'Rojo y grande',
      },
      {
        variantAttributes: 'Color azul, tamaño pequeño',
        variantName: 'Azul pequeño',
      },
    ]
  }
};
});
})();
