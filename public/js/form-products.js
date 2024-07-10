setTimeout(async function() {
 
(function () {
    const url = window.location.href;
    const formioElement = document.getElementById('formio-products');
    
    

      Formio.createForm(formioElement, {
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
        form.on('submit', function (submission) {
          console.log('Form submitted with data:', submission.data);
          // Aquí puedes añadir la lógica para enviar los datos a tu servidor
          // utilizando axios o cualquier otra biblioteca de HTTP
        });
      });
  
  })();
  


}, 1000);
//}
