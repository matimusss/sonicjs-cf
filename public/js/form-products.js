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
              label: "Favorite Things",
              key: "tagName",
              placeholder: "These are a few of your favorite things...",
              data: {
                values: [
                  {
                    tagName: "raindropsOnRoses",
                    label: "Raindrops on roses"
                  },
                  {
                    tagName: "whiskersOnKittens",
                    label: "Whiskers on Kittens"
                  },
                  {
                    tagName: "brightCopperKettles",
                    label: "Bright Copper Kettles"
                  },
                  {
                    tagName: "warmWoolenMittens",
                    label: "Warm Woolen Mittens"
                  }
                ]
              },
              dataSrc: "values",
              template: "<span>{{ item.label }}</span>",
              multiple: true,
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
