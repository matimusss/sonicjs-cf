const gridWrapperProducts = document.getElementById('grid-products');

if (gridWrapperProducts) {
  const dataGrid = new gridjs.Grid({
    columns: [
      {
        name: 'id',
        formatter: (id) => gridjs.html(`${id}`)
      },
      {
        name: 'product_name',
        formatter: (product_name) => gridjs.html(`${product_name}`)
      },
      {
        name: 'slug',
        formatter: (slug) => gridjs.html(`${slug}`)
      },
      {
        name: 'sale_price',
        formatter: (sale_price) => gridjs.html(`${sale_price}`)
      },
      {
        name: 'compare_price',
        formatter: (compare_price) => gridjs.html(`${compare_price}`)
      },
      {
        name: 'buying_price',
        formatter: (buying_price) => gridjs.html(`${buying_price}`)
      },
      {
        name: 'quantity',
        formatter: (quantity) => gridjs.html(`${quantity}`)
      },
      {
        name: 'product_type',
        formatter: (product_type) => gridjs.html(`${product_type}`)
      },
      {
        name: 'category_title',
        formatter: (category_title) => gridjs.html(`${category_title}`)
      },
      {
        name: 'tag_ids',
        formatter: (tag_ids) => gridjs.html(`${tag_ids}`)
      },
      {
        name: 'attribute_values',
        formatter: (attribute_values) => gridjs.html(`${attribute_values}`)
      },
      {
        name: 'colors',
        formatter: (colors) => gridjs.html(`${colors}`)
      },
      {
        name: 'coupon_codes',
        formatter: (coupon_codes) => gridjs.html(`${coupon_codes}`)
      },
      {
        name: 'images',
        formatter: (images) => gridjs.html(`${images}`)
      },
      {
        name: 'thumbnails',
        formatter: (thumbnails) => gridjs.html(`${thumbnails}`)
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
      url: `https://sonicjs-cf2.pages.dev/v1/product-min-details`,
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
                  data: resp.map((record) => [ //LA UNICA QUE NO LLEVA RESP.DATA.MAP PORKE ES UNA VIEW Y NO UNA TABLA , LAS RESO DE SONICEN JSON TAN TODAS ADENTRO DE UN .DATA
                    record.id, 
                    record.product_name,
                     record.slug,
                      record.sale_price,
                       record.compare_price, 
                       record.buying_price, 
                       record.quantity, 
                       record.product_type, 
                       record.category_title,
                        record.tag_ids,
                         record.attribute_values,
                          record.colors, 
                          record.coupon_codes,
                           record.images,
                            record.thumbnails
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
  }).render(gridWrapperProducts);

  // Evento para manejar el botón EDITAR
  gridWrapperProducts.addEventListener('click', function (e) {
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
