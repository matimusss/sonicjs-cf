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
              '</div>'+
              '<div id="tagsList"> AQUI: NINGUNO </div>', // Div para mostrar los tags
            row: '' +
              '<div class="row">' +
              '  {%util.eachComponent(components, function(component) { %}' +
              '    <div class="col-sm-2">' +
              '      {{ row[component.key] }}' +
              '    </div>' +
              '  {% }) %}' +
              '  <div class="col-sm-2">' +
              '    <div class="btn-group pull-right">' +
              '      <button type="button" class="btn btn-default btn-sm addTag"><i class="bi bi-plus"></i>ADD</button>' + // Botón para agregar el tag
              '      <div class="btn btn-danger btn-sm removeRow"><i class="bi bi-trash"></i></div>' +
              '    </div>' +
              '  </div>' +
              '</div>',
            footer: ''
          },
          components: [
            {
              label: 'Tag Name',
              key: 'tagName',
              type: 'textfield',
              input: true
            },
          ]
        }
      ]
    }).then(function(form) {
      // Manejo de eventos para agregar tags
      form.on('render', function() {
        const tagsList = document.getElementById('tagsList');
        const hiddenTags = document.createElement('input');
        hiddenTags.type = 'hidden';
        hiddenTags.name = 'tagsForm'; // Nombre del campo hidden
        tagsList.parentNode.insertBefore(hiddenTags, tagsList.nextSibling); // Inserta el campo hidden después de tagsList
        
        const addButtons = document.querySelectorAll('.addTag');
        
        addButtons.forEach(button => {
          button.addEventListener('click', function(event) {
        console.log("asd");
            const row = this.closest('.editgrid-row');
            const tagName = row.querySelector('[name="data[tagName]"]').value;
            
            if (tagName.trim() !== '') {
              // Agregar tagName al campo hidden
              if (hiddenTags.value !== '') {
                hiddenTags.value += ','; // Agregar coma si ya hay tags
              }
              hiddenTags.value += tagName;
              
              // Mostrar tagName en la lista "AQUI"
              const tagDiv = document.createElement('div');
              tagDiv.textContent = tagName;
              
              const deleteButton = document.createElement('button');
              deleteButton.textContent = 'X';
              deleteButton.addEventListener('click', function() {
                // Eliminar tagName del campo hidden y del DOM
                const tagToRemove = tagDiv.textContent;
                hiddenTags.value = hiddenTags.value.replace(tagToRemove + ',', '');
                tagsList.removeChild(tagDiv);
                
                // Mostrar la fila en la lista principal
                row.style.display = '';
              });
              
              tagDiv.appendChild(deleteButton);
              tagsList.appendChild(tagDiv);
              
              // Ocultar la fila en la lista principal
              row.style.display = 'none';
            }
          });
        });
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
