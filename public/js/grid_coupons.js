const gridWrapperCoupons = document.getElementById('grid-coupons');

if (gridWrapperCoupons) {
  const dataGrid = new gridjs.Grid({
    columns: [

      record.,
      record.,
      record.,
      record.,
      record.,
      record.,
      record.,
      record.,
      record.
      {
        name: 'ID',
        formatter: (id) => gridjs.html(`${id}`)
      },
      {
        name: 'Codigo',
        formatter: (code) => gridjs.html(`${code}`)
      },
      {
        name: 'Valor de descuento',
        formatter: (discount_value) => gridjs.html(`${discount_value}`)
      },

      {
        name: 'Tipo de descuento',
        formatter: (discount_type) => gridjs.html(`${discount_type}`)
      },
      {
        name: 'Cantidad de veces usado',
        formatter: (times_used) => gridjs.html(`${times_used}`)
      },
      {
        name: 'Maxima cantidad de veces para usar',
        formatter: (max_usage) => gridjs.html(`${max_usage}`)
      },
      {
        name: 'Limite de ordenes',
        formatter: (order_amount_limit) => gridjs.html(`${order_amount_limit}`)
      },
      {
        name: 'Fecha de inicio',
        formatter: (coupon_start_date) => gridjs.html(`${coupon_start_date}`)
      },
      {
        name: 'Fecha de final',
        formatter: (coupon_end_date) => gridjs.html(`${coupon_end_date}`)
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
      url: `https://sonicjs-cf2.pages.dev/v1/coupons`,
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
                    record.code,
                    record.discount_value,
                    record.discount_type,
                    record.times_used,
                    record.max_usage,
                    record.order_amount_limit,
                    record.coupon_start_date,
                    record.coupon_end_date
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
  }).render(gridWrapperCoupons);

  // Evento para manejar el botón EDITAR
  gridWrapperCoupons.addEventListener('click', function (e) {
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
