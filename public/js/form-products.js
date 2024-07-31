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

  return data;
}

// Llamar a la función para obtener los datos
fetchConfigData();


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
    placeholder: '+ATRIBUTOS0',
                        input: true,
                        conditional: {
                          show: true,
                          conjunction: 'all',
                          conditions: [
                            {
                              component: 'variantAttribute',
                              operator: 'isEqual',
                              value: attr.attribute_id // Establecer el atributo asociado a estos valores
                            }
                          ]
                        },
                        data: {
                          values: attributeValues[attr.attribute_id] || [] // Asegurarse de que haya valores
                        },
                        dataSrc: 'values',
                        template: '<span>{{ item.label }}</span>',
                        defaultValue: (productData.product_attributes.find(pAttr => pAttr.attribute_id === attr.attribute_id) || {}).attribute_value_id || [] // Establecer valor predeterminado
                      }));
                    
                      // Crear el formulario usando Formio
                      const formDefinition = {
                        components: [
                          {
                            label: 'Atributos de la variante',
                            key: 'variantAttribute',
                            type: 'select',
                            input: true,
                            tableView: true,
                            data: {
                              values: attributeNames // Por cada atributo, una opción
                            },
                            multiple: true,
                            dataSrc: 'values',
                            template: '<span>{{ item.label }}</span>',
                            defaultValue: productData.product_attributes.map(attr => attr.attribute_id) // Valores iniciales
                          },
                          ...attributeComponents // Añadir dinámicamente los componentes de valores
                        ]
                      };
                    
                      // Crear el formulario
                      Formio.createForm(document.getElementById('formio-attributes'), formDefinition)
                        .then(form => {
                          // Aquí, si es necesario, puedes ajustar los valores después de que el formulario haya sido creado
                          attributesForm = form;

                        });
                    }
                    






























































                    function createTagsForm(configData, productData) {
                      console.log(productData);
                      console.log(configData);
                      
                      // Generar los objetos de tags (TAGS)
                      const tags = configData.tags;
                    
                      // Crear los nombres de tags para el select, pero con los valores como IDs
                      const tagNames = tags.map(tag => ({
                        value: tag.id,
                        label: tag.tag_name,
                      }));

                      // Crear el formulario usando Formio
                      Formio.createForm(document.getElementById('formio-tags'), {
      components: [
  {
    label: 'Tags',
    key: 'tags',
    placeholder: 'eLEGI LOS TAGS',
    type: 'select',
    input: true,
    multiple: true,
    data: {
      values: tagNames
    },
    dataSrc: 'values',
    template: '<span>{{ item.label }}</span>',
    defaultValue: productData.tags.map(attr => attr.tag_id), // Valores iniciales
    customClass: "choto"
  }
]

                      }).then(form => {
                      // Aquí, si es necesario, puedes ajustar los valores después de que el formulario haya sido creado
                     tagsForm = form;
                    });
                }
                

                    





























                function createVariantsForm(configData, productData) {
                  const variants = productData.variant_details;
                
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
                          component: 'variantAttribute',
                          operator: 'isEqual',
                          value: attr.attribute_id // Establecer el atributo asociado a estos valores
                        }
                      ]
                    },
                    data: {
                      values: attributeValues[attr.attribute_id] || [] // Asegurarse de que haya valores
                    },
                    dataSrc: 'values',
                    template: '<span>{{ item.label }}</span>'
                  }));
                
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
                            '  {% if (!component.hasOwnProperty("tableView") || component.tableView) { %}' +
                            '    <div class="col-sm-2">' +
                            '      <strong>{{ component.label }}</strong>' +
                            '    </div>' +
                            '  {% } %}' +
                            '  {% }) %}' +
                            '</div>',
                          row: '' +
                            '<div class="row">' +
                            '  {% util.eachComponent(components, function(component) { %}' +
                            '  {% if (!component.hasOwnProperty("tableView") || component.tableView) { %}' +
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
                            key: 'variant_title',
                            label: 'Titulo',
                            input: true,
                            disabled: true
                          },
                          {
                            type: 'textfield',
                            key: 'variant_title',
                            label: 'nombre de la variante',
                            placeholder: 'titulo de la variante',
                            input: true,
                            tableView: true
                          },
                          {
                            type: 'textfield',
                            key: 'variant_sale_price',
                            label: 'Precio de venta',
                            placeholder: 'Precio de venta',
                            input: true,
                            tableView: true
                          },
                          {
                            type: 'textfield',
                            key: 'variant_compare_price',
                            label: 'Precio de comparación',
                            placeholder: 'Precio de comparación',
                            input: true,
                            tableView: true
                          },
                          {
                            type: 'textfield',
                            key: 'variant_buying_price',
                            label: 'Precio de compra',
                            placeholder: 'Precio de compra',
                            input: true,
                            tableView: true
                          },
                          {
                            type: 'textfield',
                            key: 'variant_quantity',
                            label: 'Cantidad',
                            placeholder: 'Cantidad',
                            input: true,
                            tableView: true
                          },
                          {
                            type: 'textfield',
                            key: 'variant_active',
                            label: 'Activo',
                            placeholder: 'Activo',
                            input: true,
                            tableView: true
                          },
                          {
                            label: 'Atributos de la variante',
                            key: 'variantAttribute',
                            type: 'select',
                            input: true,
                            tableView: true,
                            data: {
                              values: attributeNames // Por cada atributo, una opción
                            },
                            multiple: true,
                            dataSrc: 'values',
                            template: '<span>{{ item.label }}</span>'
                          },
                          ...attributeComponents // Añadir dinámicamente los componentes de valores
                        ]
                      }
                    ]
                  }).then(function (form) {
                    // Guardar la instancia del formulario para referencia posterior
                    variantsForm = form;
                
                    // Suponiendo que 'form' es tu instancia del formulario
                    const variantDetails = productData.variant_details.map(variant => {
                      let variantObj = {
                        variant_option: variant.variant_option,
                        variant_title: variant.variant_title,
                        variant_sale_price: variant.variant_sale_price,
                        variant_compare_price: variant.variant_compare_price,
                        variant_buying_price: variant.variant_buying_price,
                        variant_quantity: variant.variant_quantity,
                        variant_active: variant.variant_active,
                      };
                
                      // Agregar los atributos de la variante
                      variant.variant_attributes.forEach(attr => {
                        variantObj[`attribute_${attr.variant_attribute_name_id}`] = attr.variant_attribute_value_id;
                      });
                
                      return variantObj;
                    });
                
                    console.log(variantDetails);
                
                    // Llenar el formulario con los valores de las variantes
                    variantDetails.forEach((variant, index) => {
                      Object.keys(variant).forEach(key => {
                        form.components.forEach(component => {
                          if (component.key === `${key}_${index}`) {
                            component.setValue(variant[key]);
                          }
                        });
                      });
                    });
                
                    form.submission = {
                      data: {
                        variants_form: variantDetails
                      }
                    };
                
                    form.on('editGridSaveRow', (event) => {
                      const { component, row } = event;
                      // Aquí puedes ejecutar cualquier acción cuando se guarda una fila en el EditGrid
                      console.log('Componente EditGrid:', component);
                      console.log('Fila guardada:', row);
                    });
                  });
                }
                
























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
