(function () {
    const url = window.location.href;
    const formioElement = document.getElementById('formio-products');
  
    if (formioElement) {
      Formio.createForm(formioElement, {
        components: [
          {
            type: 'textfield',
            key: 'id',
            label: 'ID',
            placeholder: 'Enter ID',
            input: true
          },
          {
            type: 'textfield',
            key: 'nombre',
            label: 'Nombre',
            placeholder: 'Enter nombre',
            input: true
          },
          {
            type: 'textfield',
            key: 'slug',
            label: 'Slug',
            placeholder: 'Enter slug',
            input: true
          },
          {
            type: 'textfield',
            key: 'sku',
            label: 'SKU',
            placeholder: 'Enter SKU',
            input: true
          },
          {
            type: 'textarea',
            key: 'descripcion_corta',
            label: 'Descripción corta',
            placeholder: 'Enter descripción corta',
            rows: 3,
            input: true
          },
          {
            type: 'textarea',
            key: 'descripcion_larga',
            label: 'Descripción larga',
            placeholder: 'Enter descripción larga',
            rows: 5,
            input: true
          },
          {
            type: 'textfield',
            key: 'imagenes',
            label: 'Imágenes',
            placeholder: 'Enter imágenes',
            input: true,
            multiple: true
          },
          {
            type: 'number',
            key: 'sale_price',
            label: 'Sale Price',
            placeholder: 'Enter sale price',
            input: true
          },
          {
            type: 'number',
            key: 'compare_price',
            label: 'Compare Price',
            placeholder: 'Enter compare price',
            input: true
          },
          {
            type: 'number',
            key: 'buying_price',
            label: 'Buying Price',
            placeholder: 'Enter buying price',
            input: true
          },
          {
            type: 'number',
            key: 'quantity',
            label: 'Quantity',
            placeholder: 'Enter quantity',
            input: true
          },
          {
            type: 'select',
            key: 'product_type',
            label: 'Product Type',
            placeholder: 'Select product type',
            input: true,
            data: {
              values: [
                { label: 'Physical', value: 'physical' },
                { label: 'Digital', value: 'digital' }
              ]
            }
          },
          {
            type: 'textarea',
            key: 'note',
            label: 'Note',
            placeholder: 'Enter note',
            rows: 3,
            input: true
          },
          {
            type: 'textfield',
            key: 'categoria',
            label: 'Categoría',
            placeholder: 'Enter categoría',
            input: true
          },
          {
            type: 'fieldset',
            key: 'atributos',
            label: 'Atributos',
            input: true,
            components: [
              {
                type: 'textfield',
                key: 'color',
                label: 'Color',
                placeholder: 'Enter color',
                input: true
              },
              {
                type: 'textfield',
                key: 'tamaño',
                label: 'Tamaño',
                placeholder: 'Enter tamaño',
                input: true
              },
              {
                type: 'textfield',
                key: 'material',
                label: 'Material',
                placeholder: 'Enter material',
                input: true
              }
            ]
          },
          {
            type: 'textfield',
            key: 'tags',
            label: 'Tags',
            placeholder: 'Enter tags',
            input: true
          },
          {
            type: 'textarea',
            key: 'info_shipping',
            label: 'Información de envío',
            placeholder: 'Enter información de envío',
            rows: 3,
            input: true
          },
          {
            type: 'textfield',
            key: 'proveedores',
            label: 'Proveedores',
            placeholder: 'Enter proveedores',
            input: true
          },
          {
            type: 'button',
            action: 'submit',
            label: 'Guardar',
            theme: 'primary'
          }
        ]
      }).then(function (form) {
        form.on('submit', function (submission) {
          console.log('Form submitted with data:', submission.data);
          // Aquí puedes añadir la lógica para enviar los datos a tu servidor
          // utilizando axios o cualquier otra biblioteca de HTTP
        });
      });
    }
  })();
  



(function () {
  const url = window.location.href;
  const loginForm = document.getElementById('formio-login');
  if (url.includes('/login') && loginForm) {
    Formio.createForm(loginForm, {
      components: [
        {
          type: 'textfield',
          key: 'email',
          label: 'Email',
          placeholder: 'Enter your email.',
          input: true
        },
        {
          type: 'password',
          key: 'password',
          label: 'Password',
          placeholder: 'Enter your password',
          input: true
        },
        {
          type: 'button',
          action: 'submit',
          label: 'Log in',
          theme: 'primary'
        }
      ]
    }).then(function (form) {
      form.on('submit', function (data) {
        axios
          .post(`/v1/auth/login`, data?.data)
          .then((response) => {
            document.getElementById('login-errors').innerHTML = '';
            console.log(response.data);
            console.log(response.status);
            console.log(response.statusText);
            console.log(response.headers);
            console.log(response.config);
            location.href = '/admin';
          })
          .catch((error) => {
            document.getElementById('login-errors').innerHTML =
              error.response.data;
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.statusText);
            console.log(error.response.headers);
            console.log(error.response.config);
          });
      });
    });
  } else if (url.includes('auth/users/setup')) {
    const setupForm = document.getElementById('formio-setup');
    if (setupForm) {
      Formio.createForm(setupForm, {
        components: [
          {
            type: 'textfield',
            key: 'firstName',
            label: 'First Name',
            placeholder: 'First Name',
            input: true
          },
          {
            type: 'textfield',
            key: 'lastName',
            label: 'Last Name',
            placeholder: 'Last Name',
            input: true
          },
          {
            type: 'textfield',
            key: 'email',
            label: 'Email',
            placeholder: 'Enter your email.',
            input: true
          },
          {
            type: 'password',
            key: 'password',
            label: 'Password',
            placeholder: 'Enter your password',
            input: true
          },
          {
            type: 'password',
            key: 'confirmPassword',
            label: 'Confirm Password',
            placeholder: 'Enter your password again',
            input: true
          },
          {
            type: 'button',
            action: 'submit',
            label: 'Submit'
          }
        ]
      }).then(function (form) {
        form.on('submit', function (data) {
          document.getElementById('setup-errors').innerHTML = '';
          if (data?.data?.password !== data?.data?.confirmPassword) {
            document.getElementById('setup-errors').innerHTML =
              'Password and Confirm Password do not match';
            return;
          }
          axios
            .post(`/v1/auth/users/setup`, data)
            .then((response) => {
              console.log(response.data);
              console.log(response.status);
              console.log(response.statusText);
              console.log(response.headers);
              console.log(response.config);
              location.href = '/admin/login';
            })
            .catch((error) => {
              document.getElementById('setup-errors').innerHTML =
                error.response.data;
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.statusText);
              console.log(error.response.headers);
              console.log(error.response.config);
            });
        });
      });
    }
  }
})();
