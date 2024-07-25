let tagsForm;         // Declara la variable para almacenar la instancia del formulario
let attributesForm;   // Declara la variable para almacenar la instancia del formulario
let variantsForm;     // Declara la variable para almacenar la instancia del formulario
let productsForm;     // Declara la variable para almacenar la instancia del formulario



async function fetchProductData() {
  const response = await fetch('https://sonicjs-cf2.pages.dev/v1/getProduct/ec2f94ae-7642-4ea2-8eec-422bb6913ae5');
  const productData = await response.json();
  return productData;
}

async function fetchConfigData() {
  const response = await fetch('https://sonicjs-cf2.pages.dev/v1/getConfig');
  const productData = await response.json();
  const data = productData[0].data[0];

//ESTO HABRIA QUE HACERLO EN EL ENDPOINT DE HONO (/API.JSX?)
  // Extraer los atributos y valores de atributos
  const attributes = data.attributes;
  const attributeValues = data.attribute_values;

  // Crear un objeto para agrupar los atributos con sus valores
  const groupedAttributes = attributes.map(attribute => {
    return {
      attribute_name: attribute.attribute_name,
      values: attributeValues
        .filter(value => value.attribute_id === attribute.id)
        .map(value => value.attribute_value)
    };
  });

  // Eliminar los attributes y attribute_values del objeto principal
  delete data.attributes;
  delete data.attribute_values;

  // Añadir el nuevo arreglo de atributos agrupados al objeto principal
  data.attributes = groupedAttributes;
//END DE ESTO HABRIA QUE ETC...


  console.log(data);

  return data;
}




             async function main() {
            const productData = await fetchProductData();
              const configData = await fetchConfigData();
                        createTagsForm(configData, productData);
                    createVariantsForm(configData, productData);
                    createProductsForm(configData, productData);
                  createAttributesForm(configData, productData);   
          createAttributesCreationForm(configData, productData);
    createAttributesValuesCreationForm(configData, productData);
                                  }
//     Llama a la función main al cargar la página      //
//                          V                           //
                          main();




                          function createAttributesCreationForm(configData, productData) {
                            Formio.createForm(document.getElementById('formio-create-attributes'), {
                              components: [
                                {
                                  type: 'textfield',
                                  key: 'name',
                                  label: 'Name',
                                  placeholder: 'Nombre del nuevo atributo',
                                  input: true
                                },
                                {
                                  type: 'select',
                                  key: 'values',
                                  label: 'Values',
                                  placeholder: 'Selecciona los valores posibles',
                                  multiple: true,
                                  data: {
                                    values: configData.values || [] // Asegúrate de proporcionar una lista de valores predeterminados si es necesario
                                  },
                                  input: true
                                },
                                {
                                  type: 'textfield',
                                  key: 'newValue',
                                  label: 'Add New Value',
                                  placeholder: 'Escribe un nuevo valor',
                                  input: true
                                },
                                {
                                  type: 'button',
                                  label: 'Add Value',
                                  key: 'addValue',
                                  input: true,
                                  theme: 'primary',
                                  action: 'custom',
                                  custom: `
                                    const formio = this; // Referencia al formulario
                                    const newValue = formio.getComponent('newValue').getValue();
                                    if (newValue) {
                                      const valuesComponent = formio.getComponent('values');
                                      const existingValues = valuesComponent.getValue() || [];
                                      if (!existingValues.includes(newValue)) {
                                        existingValues.push(newValue);
                                        valuesComponent.setValue(existingValues);
                                        formio.getComponent('newValue').setValue(''); // Limpia el campo de texto
                                      } else {
                                        alert('Este valor ya está en la lista.');
                                      }
                                    }
                                  `
                                },
                                {
                                  type: 'button',
                                  label: 'Submit',
                                  key: 'submit',
                                  input: true,
                                  theme: 'primary',
                                  action: 'submit'
                                }
                              ]
                            });
                          };
                          


                    function createAttributesValuesCreationForm(configData, productData) { 
                      Formio.createForm(document.getElementById('formio-create-attributes-values'), {
                        components: [
                          {
                            type: 'textfield',
                            key: 'name',
                            label: 'Name',
                            placeholder: 'Nombre del nuevo Value - atributo',
                            input: true
                          },
//poner un multiple select y un add a ese select, de modo que se puedan agregar muchas values a este att (al que se refiere ahora) 
                          {
                            type: 'button',
                            label: 'Submit',
                            key: 'submit',
                            input: true,
                            theme: 'primary',
                            action: 'submit'
                          }
                        ]
                      });
                    };












function createAttributesForm(configData, productData) { 
  const attributes = configData.attributes;

  // Generar los objetos de atributos
  const attributeNames = attributes.map(attr => ({
    value: attr.attribute_name,
    label: attr.attribute_name
  }));

  // Generar los valores para cada atributo
  const attributeValues = attributes.reduce((acc, attr) => {
    acc[attr.attribute_name] = attr.values.map(value => ({
      value: value,
      label: value
    }));
    return acc;
  }, {});

  console.log(attributes);

  // Crear componentes dinámicamente para cada atributo
  const attributeComponents = attributes.map(attr => ({
    label: 'Valores',
    key: `value_${attr.attribute_name}`,
    type: 'select',
    input: true,
    conditional: {
      show: true,
      conjunction: 'all',
      conditions: [
        {
          component: 'attribute',
          operator: 'isEqual',
          value: attr.attribute_name // Establecer el atributo asociado a estos valores
        }
      ]
    },
    data: {
      values: attributeValues[attr.attribute_name]
    },
    dataSrc: 'values',
    template: '<span>{{ item.label }}</span>'
  }));

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
          footer: '  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">  Open Form.io Modal  </button>'
        },
        components: [
          {
            label: 'Atributo',
            key: 'attribute',
            type: 'select',
            input: true,
            data: {
              values: attributeNames
            },
            dataSrc: 'values',
            template: '<span>{{ item.label }}</span>'
          },
          ...attributeComponents // Añadir dinámicamente los componentes de valores
        ]
      }
    ]




  })
  
  
  
  
  .then(function(form) {
    attributesForm = form;
  
    // Llenar el formulario con los atributos del producto
    const productAttributes = productData.product_attributes.map(attr => {
      let attributeObj = {
        attribute: attr.attribute_name
      };
      attributeObj[`value_${attr.attribute_name}`] = attr.attribute_value;
      return attributeObj;
    });
  
    console.log(productData);
  
    // Llenar el formulario con los valores de los atributos
    productAttributes.forEach(attr => {
      const attributeKey = `value_${attr.attribute}`;
      form.components.forEach(component => {
        if (component.key === attributeKey) {
          component.setValue(attr[attributeKey]);
        }
      });
    });
  
    form.submission = {
      data: {
        attributes_form: productAttributes
      }
    };
  });
  
} 
  
  
  
  
  
  






















function createTagsForm(configData, productData) {

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
                  values: [ // map sobre TODOS los tag_name y tag_id que NO esten aplicados al producto (tags- product_tags)
                    //{value: 'tag.id', label: 'tag.name'},
                    {value: 'Remeras', label: 'Remeras'},
                    {value: 'Batas', label: 'Batas'},
                    {value: 'Ojotas', label: 'Ojotas'},
                    {value: 'Buzos', label: 'Buzos'}
                  ]
                },
                dataSrc: "values",
                template: '<span>{{ item.label }}</span>'
              }

//agregar componente oculto o bloqueado para ID,

            ]
          }
        ]
    })
    .then(function(form) {
      tagsForm = form;
      // simulamos los envios "anteriores" osea, los tags que ya tiene agregados el producto, hacemos como que los enviamos ,quedan disponibles para editar y borrar.
      form.submission = {
        data: {
          tags: [
            {
              //{tagId: 'tag.id', tagName: 'tag.name'},
              tagName: 'Corbatas'
            },
            {
              tagName: 'Guantes'
            }
          ]
        }
      };
    });
  };













  
  
  
  
  
  
  
  
  
  
  const formularioJson = generarFormularioJson();
  
  function generarFormularioJson() {
    const formularioJson = 
  {
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
        
//FALTAN EL RESTO DE LOS COMPONENTES, PRECIOS , ETC.

        {
          type: 'textfield',
          key: 'variantName',
          label: 'Nombre de la variante',
          placeholder: 'Nombre de la variante',
          input: true,
          tableView: true,
        },


        {             //especial atencion a este componente hidden que junta los valores para mostrarlos en una sola columna.
          // SINO ES UN KIULOMBO
          label: 'Valores juntados',
          key: 'a',
          type: 'hidden',
          input: true,
          tableView: true,
        },

// POPULAR CON CADA ATTRIBUTE_NAME DE LA VARIANTE:

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
        
        // POR CADA ATTRIBUTE NAME_ MOSTRAMOS SUS ATTRIBUTE VALUES
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
                value: 'peso'               //MODIFICAR, = ATTRIBUTE_NAME
              }
            ]
          },
          tableView:  false,   //NO SACAR EL TABLEVIEW FALSE, LA ONDA ES QUE NO SE VEA ESTO, Y SE VEA EL CAMPO OCUTLO "a"
          data: {
            values: [                //POPULAR CON LOS/EL ATTRIBUTE_VALUES ASOCIADOS.
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







        //RELLENO 

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
//RELLENO





      ]
    }
  ]
} ;
return formularioJson;
}



function createVariantsForm(configData, productData) {
Formio.createForm(document.getElementById('formio-variants'),formularioJson )
.then(function(form) {
//variante para identificar la instancia del formulario, nos referimos a ella en el submit global y etceteras.
  variantsForm = form;
// Suponiendo que 'form' es tu instancia del formulario





form.on('editGridSaveRow', (event) => {
  const { component, row } = event;  
  // Aquí puedes ejecutar cualquier acción cuando se guarda una fila en el EditGrid
  console.log('Componente EditGrid:', component);
  console.log('Fila guardada:', row);
  // Por ejemplo, puedes acceder a un campo específico en la fila guardada
  //if (row.hasOwnProperty('campoEspecifico')) {
  //    console.log('Valor del campo específico:', row.campoEspecifico);
  //}
  const gridComponent = form.getComponent('variants_form');
  if (gridComponent) {
    const rowIndex = gridComponent.editRows.findIndex(r => r.data === row);
    if (rowIndex !== -1) {
      gridComponent.editRows[rowIndex].data.a = "choto";   //ACA MODIFICAMOS EL VALOR DEL CAMPO OCULTO QUE JUNTA LOS OTROS CAMPOS Q ESTAN EN NO DISPLAY..
      gridComponent.redraw(); // Asegúrate de redibujar el componente para reflejar los cambios
    }
  }
});
});
};













function createProductsForm(configData, productData) {


const data = productData;

  // Create the form
  Formio.createForm(document.getElementById('formio-product'), {
    components: [
      {
        type: 'textfield',
        key: 'id',
        label: 'ID',
        input: true,
        defaultValue: data.product_id,      
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
    productsForm = form;
  // Configurar el evento change para escuchar cambios en 'product_name'
    form.getComponent('product_name').on('change', function(value) {
      // Aquí puedes ejecutar cualquier acción cuando cambie 'product_name'
      console.log('El valor de product_name ha cambiado:', value);
      
      // Actualizar el valor de otro componente, por ejemplo 'slug'
      form.getComponent('slug').setValue(value + '-slug'); // Ejemplo de cómo actualizar 'slug'
    });



//SI YA TIENE INTIAL VALUE, NO HACE FALTA SUBMISION?
    // Set initial submission data
    //form.submission = {
    //  data: {
     //   id: data.id,
      //  slug: data.slug,
      //  product_name: data.product_name,
      //  sku: data.sku,
      //  sale_price: data.sale_price,
       // compare_price: data.compare_price,
       // buying_price: data.buying_price,
        ///quantity: data.quantity,
      //  short_description: data.short_description,
      //  product_description: data.product_description,
       // product_type: data.product_type,
        //published: data.published,
        //disable_out_of_stock: data.disable_out_of_stock,
        //note: data.note,
        //created_by: data.created_by,
        //updated_by: data.updated_by,
       // createdOn: new Date(data.createdOn).toLocaleString(),
      //  updatedOn: new Date(data.updatedOn).toLocaleString()
    //  }
  //  };


  });

};









setTimeout(() => {
  const globalSubmitButton = document.getElementById('globalSubmit');

  globalSubmitButton.addEventListener('click', () => {
      // Enviar todos los formularios
      Promise.all([
          productsForm.submit(),
          variantsForm.submit(),
          tagsForm.submit(),
          attributesForm.submit()
      ]).then((results) => {
          console.log('Todos los formularios se enviaron correctamente', results);
      }).catch((error) => {
          console.error('Error al enviar uno o más formularios', error);
      });
  });
}, 1000);
