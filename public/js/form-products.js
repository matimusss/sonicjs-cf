let tagsForm;         // Declara la variable para almacenar la instancia del formulario
let attributesForm;   // Declara la variable para almacenar la instancia del formulario
let variantsForm;     // Declara la variable para almacenar la instancia del formulario
let productsForm;     // Declara la variable para almacenar la instancia del formulario

//FETCHS 
async function fetchProductData() {
  const response = await fetch('https://sonicjs-cf2.pages.dev/v1/getProduct/ec2f94ae-7642-4ea2-8eec-422bb6913ae5');
  const productData = await response.json();
  return productData;
}
async function fetchConfigData() {
  const response = await fetch('https://sonicjs-cf2.pages.dev/v1/getConfig');
  const productData = await response.json();
  const data = productData[0].data[0];

  // Extraer los atributos y valores de atributos
  const attributes = data.attributes;
  const attributeValues = data.attribute_values;

  // Crear un objeto para agrupar los atributos con sus valores
  const groupedAttributes = attributes.map(attribute => {
    return {
      attribute_id: attribute.id,  // Incluir el ID del atributo
      attribute_name: attribute.attribute_name,
      values: attributeValues
        .filter(value => value.attribute_id === attribute.id)
        .map(value => ({
          value_id: value.id,  // Incluir el ID del valor del atributo
          attribute_value: value.attribute_value
        }))
    };
  });

  // Eliminar los attributes y attribute_values del objeto principal
  delete data.attributes;
  delete data.attribute_values;

  // Añadir el nuevo arreglo de atributos agrupados al objeto principal
  data.attributes = groupedAttributes;

  console.log(data);
  return data;
}

// Llamar a la función para obtener los datos
fetchConfigData().then(data => console.log(data));


// EJECUCION DE LAS FUNCIONES DE FORM.IO //
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








                          function createAttributesCreationForm(configData) {
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
                                    values: configData.values || [] // Proporcionar valores predeterminados si es necesario
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
                                  action: 'event',
                                  event: 'addValue'
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
                            }).then(function(form) {
                              // Configurar el evento personalizado para el botón 'Add Value'
                              form.on('addValue', function() {
                                const newValue = form.getComponent('newValue').getValue();
                                if (newValue) {
                                  const valuesComponent = form.getComponent('values');
                                  const existingValues = valuesComponent.getValue() || [];
                                  if (!existingValues.includes(newValue)) {
                                    existingValues.push(newValue);
                                    valuesComponent.setValue(existingValues);
                                    form.getComponent('newValue').setValue(''); // Limpiar el campo de texto
                                  } else {
                                    alert('Este valor ya está en la lista.');
                                  }
                                }
                              });
                            }).catch(function(err) {
                              console.error(err);
                            });
                          }
                          
             







                    function createAttributesValuesCreationForm(configData, productData) { 

                      //este es para agregar nuevos VALORES DE ATRIBUTOS ;
                      //por tanto deberia recibir el atributo al que se refiere
                      // o los modals pueden ser un editgrid de su type. 


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
                      // Obtener los atributos del objeto configData
                      const attributes = configData.attributes;
                    
                      // Generar los nombres de atributos para el select principal
                      const attributeNames = attributes.map(attr => ({
                        value: attr.attribute_id,
                        label: attr.attribute_name
                      }));
                    
                      // Generar los valores para cada atributo
                      const attributeValues = attributes.reduce((acc, attr) => {
                        acc[attr.attribute_id] = attr.values.map(value => ({
                          value: value.value_id,
                          label: value.attribute_value
                        }));
                        return acc;
                      }, {});
                    
                      // Crear componentes dinámicamente para cada atributo
                      const attributeComponents = attributes.map(attr => ({
                        label: 'Valores',
                        key: `value_${attr.attribute_id}`,
                        type: 'select',
                        input: true,
                        conditional: {
                          show: true,
                          conjunction: 'all',
                          conditions: [
                            {
                              component: 'attribute',
                              operator: 'isEqual',
                              value: attr.attribute_id // Establecer el atributo asociado a estos valores
                            }
                          ]
                        },
                        data: {
                          values: attributeValues[attr.attribute_id]
                        },
                        dataSrc: 'values',
                        template: '<span>{{ item.label }}</span>'
                      }));
                    
                      // Crear el formulario usando Formio
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
                                '  {% util.eachComponent(components, function(component) { %}' +
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
                            attribute: attr.attribute_id // Cambiar attribute_name a attribute_id
                          };
                          attributeObj[`value_${attr.attribute_id}`] = attr.attribute_value_id;
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
// Generar los objetos de tags (TAGS)
//(1) iteramos sobre el objeto y listo, no requiere mas pasos 
const tags = configData.tags;

const tagNames = tags.map(tags => ({
  value: tags.tag_name,
  label: tags.tag_name,
}));

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
                  values: tagNames
                  // map sobre TODOS los tag_name y tag_id que NO esten aplicados al producto (tags- product_tags)
                  //{value: 'tag.id', label: 'tag.name'}    
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
      // Llenar el formulario con los atributos del producto
      const productTags = productData.tags.map(tag => {
        let tagObj = {
          tagName: tag.tag_name
        };
        console.log(productData);        
        return tagObj;
      });

      form.submission = {
        data: {
          tags: productTags
        }
      };
    });
  };






























  
  
  
  
  
  
  
  
  
  




function createVariantsForm(configData, productData) {


const attributes  = productData;

  //seleccionar los atributos aplicados al  producto en el form de atributes
  //mostrar los names para que se elija uno sobre el que se aplica la variante.

  
  // mas adelante, tenemos que tener un select por cada atributo elegido, con los values de ese select.


Formio.createForm(document.getElementById('formio-variants'),   {
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
        
//Componentes "SIMPLES"
        {
          type: 'textfield',
          key: 'variant_option',
          label: 'Nombre de la variante',
          placeholder: 'Nombre de la variante',
          input: true,
          tableView: true,
        },
        {
          type: 'textfield',
          key: 'variant_title',
          label: 'titulo de la variante',
          placeholder: 'titulo de la variante',
          input: true,
          tableView: true,
        },
        {
          type: 'textfield',
          key: 'variant_sale_price',
          label: 'Nombre de la variante',
          placeholder: 'Nombre de la variante',
          input: true,
          tableView: true,
        },
        {
          type: 'textfield',
          key: 'variant_compare_price',
          label: 'Nombre de la variante',
          placeholder: 'Nombre de la variante',
          input: true,
          tableView: true,
        },

        {
          type: 'textfield',
          key: 'variant_buying_price',
          label: 'Nombre de la variante',
          placeholder: 'Nombre de la variante',
          input: true,
          tableView: true,
        },
        {
          type: 'textfield',
          key: 'variant_quantity',
          label: 'Nombre de la variante',
          placeholder: 'Nombre de la variante',
          input: true,
          tableView: true,
        },
        {
          type: 'textfield',
          key: 'variant_active',
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

// POPULAR CON CADA ATTRIBUTo DEL PRODUCTO (desde el FORM)
{
          label: 'Atributos de la variante',
          key: 'variantAttribute',
          type: 'select',
          input: true,
          tableView: true,
          data: {
            values: [ // = atributos ya aplicados al producto
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







// POR CADA ATTRIBUTE que tiene el producto,  MOSTRAMOS SUS ATTRIBUTE VALUES, tomarlo del form
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
      ]


    }
  ]
}  )
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
        label: 'Product Description',
        wysiwyg: {
          theme: 'snow',
          modules: {
            toolbar: ['bold', 'italic', 'underline', 'strike']
          }
        },
        key: 'product_description',
        input: true,
        inputType: 'text',
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
  })
  
  
  
  
  
  .then(function(form) {
    productsForm = form;
  // Configurar el evento change para escuchar cambios en 'product_name'
    form.getComponent('product_name').on('change', function(value) {
      // Aquí puedes ejecutar cualquier acción cuando cambie 'product_name'
      console.log('El valor de product_name ha cambiado:', value);
      
      // Actualizar el valor de otro componente, por ejemplo 'slug'
    //  form.getComponent('slug').setValue(value + '-slug'); // Ejemplo de cómo actualizar 'slug'
    });


  });

};

 
function getEditGridValues() {
  if (!attributesForm) {
    console.error("El formulario aún no se ha creado.");
    return [];
  }

//HABRIA QUE AGREGARLE QUE SI SE CREAN DE 0 NUEVOS ATRIBUTOS, Y VALUES SEAN AGREGADOS A UNA VAR GLOBAL Y AGREGADOS ACA A LOS DEL EDITGRID?


  // Obtener los datos del componente editgrid
  const editGridComponent = attributesForm.getComponent('attributes_form');
  if (editGridComponent) {
    return editGridComponent.dataValue;
  } else {
    console.error("No se encontró el componente editgrid.");
    return [];
  }
}







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
