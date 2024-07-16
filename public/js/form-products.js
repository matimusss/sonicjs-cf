
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
  type: "form",
  display: "form",
  components: [
    {
      rowDraft: false,
      label: 'Variantes',
      key: 'variants_form',
      type: 'editgrid',
      input: true,
      tableView: false,
      displayAsTable: false,
      templates: {
        header: '' +
          '<div class="row">' +
          '  {% util.eachComponent(components, function(component) { %}' +
          '  {% if (!component.hasOwnProperty("tableView") || component.tableView) { %}'+
          '    <div class="col-sm-2">' +
          '      <strong>{{ component.label }}</strong>' +
          '    </div>' +
          '  {% } %}'+
          '  {% }) %}' +
          '</div>',
        row: '' +
          '<div class="row">' +
          '  {% util.eachComponent(components, function(component) { %}' +
          '  {% if (!component.hasOwnProperty("tableView") || component.tableView) { %}'+
          '    <div class="col-sm-2">' +
          '      {{ row[component.key] }}' +
          '    </div>' +
          '  {% } %}' +
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
          tableView: true,
        },
        {
          label: 'Valores juntados',
          key: 'a',
          type: 'hidden',
          input: true,
          tableView: true,
        },

        {
          label: 'Atributos de la variante',
          key: 'variantAttribute',
          type: 'select',
          input: true,
          tableView: true,
          data: {
            values: [
              { 
                value: 'color',
                label: 'color'
              },
              {
                value: 'peso',
                label: 'peso'
              },
              {
                value: 'material',
                label: 'material'
              }
            ]
          },
          multiple: true,
          dataSrc: 'values',
          template: '<span>{{ item.label }}</span>'
        },
        {
          label: 'Valores',
          key: 'variantAttributeValueWeigh',
          type: 'select',
          input: true,
          conditional: {
            show: true,
            conjunction: "all",
            conditions: [
              {
                component: 'variantAttribute',
                operator: 'isEqual',
                value: 'peso'
              }
            ]
          },
          tableView:  false,
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
          label: 'Valores color',
          key: 'variantAttributeValueColor',
          type: 'select',
          input: true,
          tableView:  false,
          conditional: {
            show: true,
            conjunction: "all",
            conditions: [
              {
                component: 'variantAttribute',
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
          label: 'Valores Material',
          key: 'variantAttributeValueMaterial',
          type: 'select',
          input: true,
          conditional: {
            show: true,
            conjunction: "all",
            conditions: [
              {
                component: 'variantAttribute',
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
          template: '<span>{{ item.label }}</span>',
          tableView:  false,
        },
      
      

      ]
    }
  ]
}).then(function(form) {
var materialVar = "";
var weightVar = "";
var colorVar = "";




// Suponiendo que 'form' es tu instancia del formulario
form.on('editGridSaveRow', (event) => {
  const { component, row } = event;
  
  // Aquí puedes ejecutar cualquier acción cuando se guarda una fila en el EditGrid
  console.log('Componente EditGrid:', component);
  console.log('Fila guardada:', row);
  
  // Por ejemplo, puedes acceder a un campo específico en la fila guardada
  //if (row.hasOwnProperty('campoEspecifico')) {
  //    console.log('Valor del campo específico:', row.campoEspecifico);
 // }
  
  // Puedes hacer otras acciones aquí, como actualizar otro componente
  // form.getComponent('otroComponente').setValue('Nuevo valor basado en la fila guardada');
});

});
})();













(async function() {
  // Fetch the product data
  const response = await fetch('https://sonicjs-cf2.pages.dev/v1/products/ec2f94ae-7642-4ea2-8eec-422bb6913ae5');
  const productData = await response.json();

  const data = productData.data;

  // Create the form
  Formio.createForm(document.getElementById('formio-product'), {
    components: [
      {
        type: 'textfield',
        key: 'id',
        label: 'ID',
        input: true,
        defaultValue: data.id,
        disabled: true
      },
      {
        type: 'textfield',
        key: 'slug',
        label: 'Slug',
        input: true,
        defaultValue: data.slug
      },
      {
        type: 'textfield',
        key: 'product_name',
        label: 'Product Name',
        input: true,
        defaultValue: data.product_name
      },
      {
        type: 'textfield',
        key: 'sku',
        label: 'SKU',
        input: true,
        defaultValue: data.sku
      },
      {
        type: 'number',
        key: 'sale_price',
        label: 'Sale Price',
        input: true,
        defaultValue: data.sale_price
      },
      {
        type: 'number',
        key: 'compare_price',
        label: 'Compare Price',
        input: true,
        defaultValue: data.compare_price
      },
      {
        type: 'number',
        key: 'buying_price',
        label: 'Buying Price',
        input: true,
        defaultValue: data.buying_price
      },
      {
        type: 'number',
        key: 'quantity',
        label: 'Quantity',
        input: true,
        defaultValue: data.quantity
      },
      {
        type: 'textfield',
        key: 'short_description',
        label: 'Short Description',
        input: true,
        defaultValue: data.short_description
      },
      {
        type: 'textarea',
        key: 'product_description',
        label: 'Product Description',
        input: true,
        defaultValue: data.product_description
      },
      {
        type: 'textfield',
        key: 'product_type',
        label: 'Product Type',
        input: true,
        defaultValue: data.product_type
      },
      {
        type: 'textfield',
        key: 'published',
        label: 'Published',
        input: true,
        defaultValue: data.published
      },
      {
        type: 'textfield',
        key: 'disable_out_of_stock',
        label: 'Disable Out Of Stock',
        input: true,
        defaultValue: data.disable_out_of_stock
      },
      {
        type: 'textfield',
        key: 'note',
        label: 'Note',
        input: true,
        defaultValue: data.note
      },
      {
        type: 'textfield',
        key: 'created_by',
        label: 'Created By',
        input: true,
        defaultValue: data.created_by
      },
      {
        type: 'textfield',
        key: 'updated_by',
        label: 'Updated By',
        input: true,
        defaultValue: data.updated_by
      },
      {
        type: 'textfield',
        key: 'createdOn',
        label: 'Created On',
        input: true,
        defaultValue: new Date(data.createdOn).toLocaleString(),
        disabled: true
      },
      {
        type: 'textfield',
        key: 'updatedOn',
        label: 'Updated On',
        input: true,
        defaultValue: new Date(data.updatedOn).toLocaleString(),
        disabled: true
      }
    ]
  }).then(function(form) {
  // Configurar el evento change para escuchar cambios en 'product_name'
    form.getComponent('product_name').on('change', function(value) {
      // Aquí puedes ejecutar cualquier acción cuando cambie 'product_name'
      console.log('El valor de product_name ha cambiado:', value);
      
      // Actualizar el valor de otro componente, por ejemplo 'slug'
      form.getComponent('slug').setValue(value + '-slug'); // Ejemplo de cómo actualizar 'slug'
    });


    // Set initial submission data
    form.submission = {
      data: {
        id: data.id,
        slug: data.slug,
        product_name: data.product_name,
        sku: data.sku,
        sale_price: data.sale_price,
        compare_price: data.compare_price,
        buying_price: data.buying_price,
        quantity: data.quantity,
        short_description: data.short_description,
        product_description: data.product_description,
        product_type: data.product_type,
        published: data.published,
        disable_out_of_stock: data.disable_out_of_stock,
        note: data.note,
        created_by: data.created_by,
        updated_by: data.updated_by,
        createdOn: new Date(data.createdOn).toLocaleString(),
        updatedOn: new Date(data.updatedOn).toLocaleString()
      }
    };
  });

})();


