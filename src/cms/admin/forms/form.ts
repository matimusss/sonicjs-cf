export function loadForm(id) {
 console.log("HACER COSAS?");
  return `
    <html>
  <head>
    <link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css'>
    <link rel='stylesheet' href='https://cdn.form.io/formiojs/formio.full.min.css'>
    <script src='https://cdn.form.io/formiojs/formio.full.min.js'></script>

    <script type='text/javascript'>
    window.onload = function() {
      Formio.builder(document.getElementById('builder'), {}, {});
      setTimeout(() => {
        // Buscar todos los campos INPUT dentro de la div "formio"
        const formFields = document.querySelectorAll('#builder input');
        // Iterar sobre los campos y buscar si alguno tiene como "name" "[data]slug"
        formFields.forEach((field) => {
          if (field.getAttribute('name') === '[data]slug') {
            // Cambiar el texto inicial a "SLUG" y mostrar una alerta
            field.value = 'SLUG';
            alert('Se cambió el texto inicial del campo [data]slug a "SLUG"');
          }
        });
      }, 1000); // Esperar 1 segundo (ajustar según sea necesario)
    };
  </script>





  </head>
    <body>
      <div id='builder'></div>
  </body>
</html>
    `;
}

export async function getForm() {
  return [
    {
      type: 'textfield',
      key: 'firstName',
      label: 'ABC First Name',
      placeholder: 'Enter your first name.',
      input: true,
      tooltip: 'Enter your <strong>First Name</strong>',
      description: 'Enter your <strong>First Name</strong>'
    },
    {
      type: 'textfield',
      key: 'lastName',
      label: 'Last Name',
      placeholder: 'Enter your last name',
      input: true,
      tooltip: 'Enter your <strong>Last Name</strong>',
      description: 'Enter your <strong>Last Name</strong>'
    },
    {
      type: 'select',
      label: 'Favorite Things',
      key: 'favoriteThings',
      placeholder: 'These are a few of your favorite things...',
      data: {
        values: [
          {
            value: 'raindropsOnRoses',
            label: 'Raindrops on roses'
          },
          {
            value: 'whiskersOnKittens',
            label: 'Whiskers on Kittens'
          },
          {
            value: 'brightCopperKettles',
            label: 'Bright Copper Kettles'
          },
          {
            value: 'warmWoolenMittens',
            label: 'Warm Woolen Mittens'
          }
        ]
      },
      dataSrc: 'values',
      template: '<span>{{ item.label }}</span>',
      multiple: true,
      input: true
    },
    {
      type: 'button',
      action: 'submit',
      label: 'Submit',
      theme: 'primary'
    }
  ];
}
