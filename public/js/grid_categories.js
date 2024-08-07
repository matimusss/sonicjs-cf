const gridWrapperCategories = document.getElementById('grid-categories');

if (gridWrapperCategories) {
  const dataGrid = new gridjs.Grid({
    columns: [
      {
        name: 'Title',
        formatter: (title) => gridjs.html(`${title}`)
      },
      {
        name: 'Body',
        formatter: (body) => gridjs.html(`${body}`)
      },
      {
        name: 'ID',
        formatter: (id) => gridjs.html(`${id}`)
      },
      {
        name: 'Actions',
        formatter: (_, row) => {
          return gridjs.html(`
            <button class="edit-btn" data-edit-id="${row.cells[0].data}">EDITAR</button>
          `);
        }
      }
    ],
    pagination: {
      limit: 10,
      server: {
        url: (prev, page, limit) =>
          `${prev}?limit=${limit}&offset=${page * limit}`
      }
    },
    server: {
      url: `https://sonicjs-cf2.pages.dev/v1/categories`,
      data: (opts) => {
        return new Promise((resolve, reject) => {
          const xhttp = new XMLHttpRequest();
          const start = Date.now();

          xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
              if (this.status === 200) {
                const resp = JSON.parse(this.response);
                $('#executionTime').show();
                $('#executionTime span.serverTime').text(resp.executionTime);
                $('#executionTime span.source').text(resp.source);

                const end = Date.now();
                const clientExecutionTime = end - start;
                $('#executionTime span.clientTime').text(clientExecutionTime);
                resolve({
                  data: resp.data.map((record) => [
                    record.id,
                    record.title,
                    record.body,
            
                  ]),
                  total: resp.total
                });
              } else {
                reject();
              }
            }
          };
          xhttp.open('GET', opts.url, true);
          xhttp.send();
        });
      }
    }
  }).render(gridWrapperCategories);

  // Evento para manejar el botón EDITAR
  gridWrapperCategories.addEventListener('click', function (e) {
    if (e.target.closest('.edit-btn')) {
      const itemId = e.target.closest('.edit-btn').getAttribute('data-edit-id');
      // Lógica para mostrar el formulario o abrir el modal
      showEditForm(itemId);
    }
  });
}

function showEditForm(itemId) {
  // Lógica para mostrar el formulario debajo del grid o abrir un modal
  console.log('Mostrar formulario para editar el item:', itemId);
  // Aquí puedes implementar la lógica para mostrar el formulario o abrir un modal
  // Ejemplo: document.getElementById('edit-form').style.display = 'block';
  // O abrir un modal usando una librería de modales
}
