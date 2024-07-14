setTimeout(async function() {
  (function () {
    const url = window.location.href;
    const formioElement = document.getElementById('formio-products');    
    Formio.createForm(formioElement, {
      components: [
        {
          label: 'TAGS',
          key: 'children',
          type: 'editgrid',
          input: true,
          templates: {
            header: '' +
              '<div class="row">' +
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
              '      <div class="btn btn-danger btn-sm removeRow"><i class="bi bi-trash"></i></div>' +
              '    </div>' +
              '  </div>' +
              '</div>',
            footer: ''
          },
          components: [
            {
              type: "select",
              label: "Aplicar, Agregar o Eliminar Tags (etiquetas de producto)",
              key: "tagName",
              placeholder: "Select one",

              data: {
                json: `[
                  {"value":"a","label":"Remeras"},
                  {"value":"b","label":"Camperas"},
                  {"value":"c","label":"Buzos"},
                  {"value":"d","label":"Calzones"}
                ]`
              },
              dataSrc: "json",
              template: "<span>{{ item.label }}</span>",
              input: true
            },
            {
              type: "textfield",
              key: "tagId",
              input: true,
              hidden: true,
              persistent: true
            }
          ]
        }
      ]
    }).then(function(form) {
      // Manejo de eventos para agregar tags
      form.on('render', function() {
        // Aquí puedes agregar lógica adicional si es necesario
      });
      
      // Proporcionar una presentación predeterminada
      form.submission = {
        data: {
          children: [
            {
              tagName: 'a', // Asegúrate de que estos valores coincidan con los datos del select
              tagId: '1'
            },
            {
              tagName: 'b', // Asegúrate de que estos valores coincidan con los datos del select
              tagId: '2'
            }
          ]
        }
      };
    });
  })();
}, 1000);
