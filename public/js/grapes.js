setTimeout(async function() {
 


  console.log(routes);

  console.log(id);

const dir = "https://sonicjs-cf2.pages.dev/v1/"+routes+"/"+id;
console.log(dir);
console.log(auth);
  const response = await fetch("https://sonicjs-cf2.pages.dev/v1/"+routes+"/"+id);
    const homeRes = await response.json();
    console.log(homeRes);
    console.log(homeRes.data.html_code);






    


    async function postData(code) {
      const data = {
        data: {
          html_code: code
        }
      };

      const bodyData = JSON.stringify(data);
      const storedBearerToken = localStorage.getItem("auth_session");

      // Verificar si el token está presente
      if (storedBearerToken) {
        //sacarle comillas al bearer...
        const tokenWithoutQuotes = storedBearerToken.replace(/"/g, '').replace(/'/g, '');
   const token = `Bearer ${tokenWithoutQuotes}`;
        console.log( token);
        // Configurar las opciones de la solicitud Fetch
        const fetchOptions = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token // Agregar el token al encabezado de autorización
          },
          body: bodyData
        };
    
        // Realizar la solicitud Fetch
        fetch(dir, fetchOptions)
          .then(response => {
            // Manejar la respuesta de la solicitud
          })
          .catch(error => {
            // Manejar errores de la solicitud
          });
      } else {
        console.log("No bearer token found in localStorage");
      } };

   


    


    
    













  const escapeName = (name) =>
    `${name}`.trim().replace(/([^a-z0-9\w-:/]+)/gi, "-");
  
  window.editor = grapesjs.init({
    height: "80vh",
    container: "#gjs",
    showOffsets: true,
    //fromElement: true,
    components: homeRes.data.html_code,
    noticeOnUnload: false,
    storageManager: false,
    selectorManager: { escapeName },
    plugins: [
      "grapesjs-ga",
      "grapesjs-component-twitch",
      "grapesjs-plugin-forms",
      "grapesjs-tailwind"

    ],
    pluginsOpts: {
      "grapesjs-ga": {
        /* Test here your options  */
      },
      "grapesjs-component-twitch": {
        /* Test here your options  */
      }
    }
  });
  
  editor.Panels.addButton("options", {
    id: "update-theme",
    className: "fa fa-adjust",
    command: "open-update-theme",
    attributes: {
      title: "Update Theme",
      "data-tooltip-pos": "bottom"
    }
  });



  var pn = editor.Panels;
  var modal = editor.Modal;
  var cmdm = editor.Commands;



  cmdm.add('open-info3', function() {
    var codigo = resultados[3].codigo;
    editor.addComponents(codigo);
    });
    pn.addButton('options', {  
      id: 'open-info3',
      className: 'fa fa-floppy-o', 
      command: function() { editor.runCommand('open-info3') },
      attributes: {
        'title': 'Add component',
        'data-tooltip-pos': 'bottom',
      },
    });   
    



  cmdm.add('open-info4', function() {
    var codigo = resultados[102].codigo;
    editor.addComponents(codigo);
    });
    pn.addButton('options', {  
      id: 'open-info4',
      className: 'fa fa-floppy-o', 
      command: function() { editor.runCommand('open-info3') },
      attributes: {
        'title': 'Add component4',
        'data-tooltip-pos': 'bottom',
      },
    });   





    cmdm.add('open-info5', function() {
      var codigo = resultados[33].codigo;
      editor.addComponents(codigo);
      });
      pn.addButton('options', {  
        id: 'open-info5',
        className: 'fa fa-floppy-o', 
        command: function() { editor.runCommand('open-info5') },
        attributes: {
          'title': 'Add component',
          'data-tooltip-pos': 'bottom',
        },
      });   







      cmdm.add('open-info6', function() {
        var randomIndex = Math.floor(Math.random() * 251); // Genera un número aleatorio entre 0 y 250
        var codigo = resultados[randomIndex].codigo;
        editor.addComponents(codigo);
      });
      
      pn.addButton('options', {  
        id: 'open-info6',
        className: 'fa fa-floppy-o', 
        command: function() { editor.runCommand('open-info6') },
        attributes: {
          'title': 'Add component RANDOM',
          'data-tooltip-pos': 'bottom',
        },
      });
      



      cmdm.add('open-info7', function() {
      console.log("coidigo");
      });
      
      pn.addButton('options', {  
        id: 'open-info7',
        className: 'fa fa-floppy-o', 
        command: function() { editor.runCommand('open-info7') },
        attributes: {
          'title': 'GUARDAR',
          'data-tooltip-pos': 'bottom',
        },
      });
      




      cmdm.add('open-info8', function() {
        var code_new = editor.getHtml();
        postData(code_new)
        .then(response => {
          console.log('Respuesta:', response);
        })
        .catch(error => {
          // Manejar el error aquí si es necesario
        });
        });
        
        pn.addButton('options', {  
          id: 'open-info8',
          className: 'fa fa-floppy-o', 
          command: function() { editor.runCommand('open-info8') },
          attributes: {
            'title': 'FETCH POST',
            'data-tooltip-pos': 'bottom',
          },
        });
        
  


  
}, 1000);
//}
