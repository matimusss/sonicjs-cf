let tagsForm;         // Declara la variable para almacenar la instancia del formulario
let attributesForm;   // Declara la variable para almacenar la instancia del formulario
let variantsForm;     // Declara la variable para almacenar la instancia del formulario
let productsForm;     // Declara la variable para almacenar la instancia del formulario
let couponsForm;
let categoriesForm;
let suppliersForm;



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
                  submitActions(productData);   

                    createSuppliersForm(configData, productData);
                   createCategoriesForm(configData, productData);
                      createCouponsForm(configData, productData);
                  
          createAttributesCreationForm(configData, productData);
    createAttributesValuesCreationForm(configData, productData);
                          
  
                                    }





                                  
//     Llama a la función main al cargar la página      //
//                          V                           //
                          main();







                          function createSuppliersForm(configData, productData) {
                            console.log(productData);
                            console.log(configData);
                            
                            // Generar los objetos de suppliers
                            const suppliers = configData.suppliers;
                          
                            // Crear los nombres de suppliers para el select, pero con los valores como IDs
                            const supplierNames = suppliers.map(supplier => ({
                              value: supplier.id,
                              label: supplier.supplier_name,
                            }));
                          
                            // Crear el formulario usando Formio
                            Formio.createForm(document.getElementById('formio-suppliers'), {
                              components: [
                                {
                                  label: 'Suppliers',
                                  key: 'suppliers',
                                  placeholder: 'Elige los suppliers',
                                  type: 'select',
                                  input: true,
                                  multiple: true,
                                  data: {
                                    values: supplierNames
                                  },
                                  dataSrc: 'values',
                                  template: '<span>{{ item.label }}</span>',
                                  defaultValue: productData.suppliers.map(supplier => supplier.supplier_id), // Valores iniciales
                                  customClass: "choto"
                                }
                              ]
                            }).then(form => {
                              // Aquí, si es necesario, puedes ajustar los valores después de que el formulario haya sido creado
                              suppliersForm = form;
                            });
                          }
                          













                          function createCategoriesForm(configData, productData) {
                            console.log(productData);
                            console.log(configData);
                            
                            // Generar los objetos de categories
                            const categories = configData.categories;
                          
                            // Crear los nombres de categories para el select, pero con los valores como IDs
                            const categoryNames = categories.map(category => ({
                              value: category.id,
                              label: category.category_name,
                            }));
                          
                            // Crear el formulario usando Formio
                            Formio.createForm(document.getElementById('formio-categories'), {
                              components: [
                                {
                                  label: 'Categories',
                                  key: 'categories',
                                  placeholder: 'Elige las categories',
                                  type: 'select',
                                  input: true,
                                  multiple: true,
                                  data: {
                                    values: categoryNames
                                  },
                                  dataSrc: 'values',
                                  template: '<span>{{ item.label }}</span>',
                                  defaultValue: productData.categories.map(category => category.cat_id), // Valores iniciales
                                  customClass: "choto"
                                }
                              ]
                            }).then(form => {
                              // Aquí, si es necesario, puedes ajustar los valores después de que el formulario haya sido creado
                              categoriesForm = form;
                            });










                          }
                          











                          function createCouponsForm(configData, productData) {
                            console.log(productData);
                            console.log(configData);
                            
                            // Generar los objetos de coupons
                            const coupons = configData.coupons;
                          
                            // Crear los objetos para los campos del formulario
                            const couponComponents = coupons.map(coupon => ({
                              label: `Coupon: ${coupon.code}`,
                              key: `coupon_${coupon.id}`,
                              type: 'container',
                              input: false,
                              components: [
                                {
                                  label: 'Code',
                                  key: `coupon_code_${coupon.id}`,
                                  type: 'textfield',
                                  input: true,
                                  defaultValue: coupon.code,
                                  placeholder: 'Coupon Code',
                                  disabled: true  // Disabled if you don't want users to change it
                                },
                                {
                                  label: 'Discount Value',
                                  key: `discount_value_${coupon.id}`,
                                  type: 'number',
                                  input: true,
                                  defaultValue: coupon.discount_value,
                                  placeholder: 'Discount Value'
                                },
                                {
                                  label: 'Discount Type',
                                  key: `discount_type_${coupon.id}`,
                                  type: 'textfield',
                                  input: true,
                                  defaultValue: coupon.discount_type,
                                  placeholder: 'Discount Type'
                                }
                              ]
                            }));
                          
                            // Crear el formulario usando Formio
                            Formio.createForm(document.getElementById('formio-coupons'), {
                              components: [
                                {
                                  label: 'Coupons',
                                  key: 'coupons',
                                  type: 'container',
                                  input: false,
                                  components: couponComponents
                                }
                              ]
                            }).then(form => {
                              // Aquí, si es necesario, puedes ajustar los valores después de que el formulario haya sido creado
                              couponsForm = form;
                            });
                          }
                          






















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
                            key: 'productAttributes',
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
                              {
                                type: 'hidden',
                                key: 'p_attribute_id',
                                label: 'p_attribute_id',
                                input: true,
                                defaultValue: "NEW",
                                tableView: false
                              },
                              {
                                type: 'hidden',
                                key: 'p_attribute_value_id',
                                label: 'p_attribute_value_id',
                                input: true,
                                defaultValue: "NEW",
                                tableView: false
                              },

                              //COMPONENTE DE ID PARA CADA FILA
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
                            attribute: attr.attribute_id, // Cambiar attribute_name a attribute_id
                            p_attribute_id: attr.p_attribute_id,
                            p_attribute_value_id: attr.p_attribute_value_id
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
                           productAttributes: productAttributes
                          }
                        };
                      });
                    }
                    













                    function createAttributesFormBKPPP(configData, productData) {
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
                              component: 'productAttributes',
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






            //por cada atributo, un campo hidden con su id



// que desaparece si el atributo es borrado!






                    
                      // Crear el formulario usando Formio
                      const formDefinition = {
                        components: [
                          {
                            label: 'Atributos de la variante',
                            key: 'productAttributes',
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
                
































                function createVariantsForm
                (configData, productData) {
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
                    key: `attribute_${attr.attribute_id}`,
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
                          footer:  '  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">  Open Form.io Modal  </button>'
                        },
                        components: [
                          {
                            type: 'hidden',
                            key: 'variant_option_id',
                            label: 'variant_option_id',
                            input: true,
                            defaultValue: "NEW",
                            tableView: false
                          },
                          {
                            type: 'hidden',
                            key: 'variant_id',
                            label: 'variant_id',
                            input: true,
                            defaultValue: "NEW",
                            tableView: false
                          },
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
                        variant_id: variant.variant_id,
                        variant_option_id: variant.variant_option_id,
                        variant_option: variant.variant_option,
                        variantAttribute: variant.variant_attributes.map(attr => attr.variant_attribute_name_id), // Cambiar aquí
                        variant_title: variant.variant_title,
                        variant_sale_price: variant.variant_sale_price,
                        variant_compare_price: variant.variant_compare_price,
                        variant_buying_price: variant.variant_buying_price,
                        variant_quantity: variant.variant_quantity,
                        variant_active: variant.variant_active
                      };
                
                      // Agregar los atributos de la variante
                      variant.variant_attributes.forEach(attr => {
                        variantObj[`attribute_${attr.variant_attribute_name_id}`] = attr.variant_attribute_value_id;
                      });

                                // Agregar los atributos de la variante
                                variant.variant_attributes.forEach(attr => {
                                  variantObj[`p_attribute_${attr.variant_attribute_name_id}`] = attr.p_variant_attribute_id;
                                });
          
                        // Agregar los atributos de la variante
                        variant.variant_attributes.forEach(attr => {
                          variantObj[`p_attribute_value_${attr.variant_attribute_name_id}`] = attr.p_variant_attribute_value_id;
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

 



// Tu función con setTimeout
 function submitActions(productData) {
  const globalSubmitButton = document.getElementById('globalSubmit');

  globalSubmitButton.addEventListener('click', () => {
    // Enviar todos los formularios
    Promise.all([
      productsForm.submit(),
      attributesForm.submit(),
      variantsForm.submit(),
      tagsForm.submit(),
      suppliersForm.submit(),
      couponsForm.submit(),
      categoriesForm.submit(),
    ]).then((results) => {
      const results1 = results.reduce((acc, result) => Object.assign(acc, result.data), {});
      const obj3 = results1;

      function transformProductData(data) {
        // Aquí puedes usar la variable productData global
        const productAttributes = data.productAttributes.map(attrId => {
          return {
            attribute_id: attrId.attribute,
            attribute_value_id: attrId[`value_${attrId.attribute}`],
            p_attribute_id: attrId.p_attribute_id,  // COMPLETAR 
            p_attribute_value_id: attrId.p_attribute_value_id , // COMPLETAR

          };
        });

        const variantDetails = data.variants_form.map(variant => {
          const variantAttributes = variant.variantAttribute.map(attrId => {
            return {
              variant_attribute_name_id: attrId,
              variant_attribute_value_id: variant[`attribute_${attrId}`],
              p_variant_attribute_value_id: variant[`p_attribute_value_${attrId}`],
              p_variant_attribute_id: variant[`p_attribute_${attrId}`],
            };
          });

          return {
            variant_id: variant.variant_id,
            variant_option: variant.variant_option,
            variant_title: variant.variant_title,
            variant_option_id: variant.variant_option_id,
            variant_image_id: '',
            variant_sale_price: variant.variant_sale_price,
            variant_compare_price: variant.variant_compare_price,
            variant_buying_price: variant.variant_buying_price,
            variant_quantity: variant.variant_quantity,
            variant_active: variant.variant_active,
            variant_attributes: variantAttributes
          };
        });

        const coupons = Object.keys(data.coupons).map(key => {
          const coupon = data.coupons[key];
          return {
            coupon_code: coupon[`coupon_code_${key}`],
            discount_value: coupon[`discount_value_${key}`],
            discount_type: coupon[`discount_type_${key}`]
          };
        });

        return {
          product_id: data.id,
          slug: data.slug,
          product_name: data.product_name,
          sku: data.sku,
          sale_price: data.sale_price,
          compare_price: data.compare_price,
          buying_price: data.buying_price,
          quantity: data.quantity,
          short_description: data.short_description,
          product_description: data.product_description.replace(/<[^>]*>/g, ''),
          product_type: data.product_type,
          published: data.published,
          disable_out_of_stock: data.disable_out_of_stock,

          created_by: data.created_by,
          updated_by: data.updated_by,
          createdOn: data.createdOn,
          updatedOn: data.updatedOn,
          product_attributes: productAttributes,
          variant_details: variantDetails,
          tags: data.tags.map(tagId => ({
            tag_id: tagId,
            tag_name: '',
            tag_icon: ''
          })),
          categories: data.categories.map(catId => ({
            cat_id: catId,
            cat_name: ''
          })),
          coupons: coupons,
          suppliers: data.suppliers.map(supplierId => ({
            supplier_id: supplierId,
            supplier_name: ''
          })),
          product_images: []
        };
      }

      const obj1 = transformProductData(obj3);
      console.log(obj1);






      function doesValueExistDeep(obj, path, valueToCheck) {
      
          const part = _.get(obj, path);
          if (!part) return null;
        
          function deepSearch(value) {
              if (_.isEqual(value, valueToCheck)) {
                  return true; // Si se encuentra el valor, se devuelve true
              }
              if (_.isObjectLike(value) || _.isArray(value)) {
                  return _.find(value, deepSearch); // Busca recursivamente dentro de objetos y arrays
              }
              return false;
          }
        
          // Si se encuentra la coincidencia, devuelve el objeto que la contiene
          return _.find(part, deepSearch);
        }
        






const valueExistsInVariants = doesValueExistDeep(obj1, 'variant_details' , '6e914a16-deae-4dce-bb2c-41f1b84aacb6'); //foreach de cada ID a chekear existencia
console.log(valueExistsInVariants);






function doesValueExistDeep(obj, key, value) {
  // Recorre profundamente el objeto buscando coincidencias de valor
  if (Array.isArray(obj[key])) {
      const found = obj[key].find(item => item.variant_id === value);
      return found || false;
  }
  return false;
}








//hacer lsitas de ids de tags etc y comparar aca, tendriamos las nuevas y las viejas
function compareLists(list1, list2) {
  // Elementos que están en list1 pero no en list2
  const onlyInList1 = list1.filter(item => !list2.includes(item));

  // Elementos que están en list2 pero no en list1
  const onlyInList2 = list2.filter(item => !list1.includes(item));

  return {
    onlyInList1,  // Elementos únicos de list1
    onlyInList2   // Elementos únicos de list2
  };
}









// Función para comparar los objetos campo por campo
const compareObjectsFieldByField = (obj1, obj2) => {
  const differences = {};

  const compareFields = (key, value1, value2) => {
      if (_.isObject(value1) && _.isObject(value2)) {
          // Comparar recursivamente si ambos son objetos
          const nestedDiffs = compareObjectsFieldByField(value1, value2);
          if (Object.keys(nestedDiffs).length > 0) {
              differences[key] = nestedDiffs;
          }
      } else if (value1 !== value2) {
          // Si los valores no son iguales, guardamos la diferencia
          differences[key] = { obj1: value1, obj2: value2 };
      }
  };

  // Comparar los campos de obj1 que estén en obj2
  for (let key in obj1) {
      if (obj2.hasOwnProperty(key)) {
          compareFields(key, obj1[key], obj2[key]);
      }
  }

  return differences;
};








// Función para comparar los "product_attributes"
const compareProductAttributes = (attributes1, attributes2) => {
  const differences = [];

  attributes1.forEach((attr1) => {
      // Buscar si el atributo existe en la otra lista de atributos
      const matchingAttr2 = attributes2.find(
          (attr2) => attr2.p_attribute_id === attr1.p_attribute_id
      );

      if (matchingAttr2) {
          // Comparar campo por campo los atributos encontrados
          const attrDifferences = compareObjectsFieldByField(attr1, matchingAttr2);
          if (Object.keys(attrDifferences).length > 0) {
              differences.push({
                  attribute: attr1.attribute_name,
                  differences: attrDifferences
              });
          }
      } else {
          // Si el atributo no existe en la segunda lista, lo consideramos una diferencia
          differences.push({ missingInSecond: attr1 });
      }
  });

  // También revisamos si hay atributos en la segunda lista que no estén en la primera
  attributes2.forEach((attr2) => {
      const matchingAttr1 = attributes1.find(
          (attr1) => attr1.p_attribute_id === attr2.p_attribute_id
      );
      if (!matchingAttr1) {
          differences.push({ missingInFirst: attr2 });
      }
  });

  return differences;
};



console.log(compareProductAttributes(productData.product_attributes, obj1.product_attributes));










// Comparar atributos dentro de "variant_attributes"
const compareVariantAttributes = (attributes1, attributes2) => {
  const differences = [];

  attributes1.forEach((attr1) => {
      const matchingAttr2 = attributes2.find(
          (attr2) => attr2.p_variant_attribute_id === attr1.p_variant_attribute_id
      );

      if (matchingAttr2) {
          // Comparar campo por campo los atributos encontrados
          const attrDifferences = compareObjectsFieldByField(attr1, matchingAttr2);
          if (Object.keys(attrDifferences).length > 0) {
              differences.push(attrDifferences);
          }
      } else {
          // Si el atributo no existe en obj2, lo consideramos una diferencia
          differences.push({ missingInObj2: attr1 });
      }
  });

  return differences;
};










// Comparar variantes incluyendo "variant_attributes"
const compareVariants = (variantObj, variantInObj2) => {
  const differences = compareObjectsFieldByField(variantObj, variantInObj2);

  // Comparar "variant_attributes"
  if (variantObj.variant_attributes && variantInObj2.variant_attributes) {
      const attributeDifferences = compareVariantAttributes(
          variantObj.variant_attributes,
          variantInObj2.variant_attributes
      );
      if (attributeDifferences.length > 0) {
          differences['variant_attributes'] = attributeDifferences;
      }
  }

  return differences;
};




// Función principal de búsqueda y comparación
const checkAndCompareVariants = (obj1, obj2) => {
  obj1.variant_details.forEach((variantObj) => {
      const variantId = variantObj.variant_id;
      const variantInObj2 = doesValueExistDeep(obj2, 'variant_details', variantId);

      if (variantInObj2) {
          // Comparar la variante completa (incluyendo "variant_attributes")
          const differences = compareVariants(variantObj, variantInObj2);
          if (Object.keys(differences).length > 0) {
              console.log(`Diferencias encontradas para variant_id ${variantId}:`, differences);
          } else {
              console.log(`No hay diferencias para variant_id ${variantId}`);
          }
      } else {
          console.log(`No se encontró la variante con ID ${variantId} en obj2`);
      }
  });
};


// Ejecutar la comparación
checkAndCompareVariants(productData, obj1);










    }).catch((error) => {
      console.error('Error al enviar uno o más formularios', error);
    });
  });}
