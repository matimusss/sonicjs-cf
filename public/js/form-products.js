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
              '      <div class="btn btn-danger btn-sm removeRow"><i class="bi bi-trash"></i></div>' +
              '    </div>' +
              '  </div>' +
              '</div>',
            footer: ''
          },
          components: [
            {
              type: "select",
              label: "Select JSON",
              key: "tagName",
              placeholder: "Select one",
              data: {
                json: `[
                  {"value":"a","label":"A"},
                  {"value":"b","label":"B"},
                  {"value":"c","label":"C"},
                  {"value":"d","label":"D"}
                ]`
              },
              dataSrc: "json",
              template: "<span>{{ item.label }}</span>",
              input: true
            }
          ]








        }
      ]
    }).then(function(form) {
      // Manejo de eventos para agregar tags
      form.on('render', function() {
     
      });
      
      // Proporcionar una presentación predeterminada
      form.submission = {
        data: {
          children: [
            {
              tagName: 'Remeras',
            },
            {
              tagName: 'Vestidos',
            }
          ]
        }
      };
    });
  })();
}, 1000);
