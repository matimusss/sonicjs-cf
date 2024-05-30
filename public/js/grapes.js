let homeRes; // Variable para almacenar los datos
fetch(`https://sonicjs-cf2.pages.dev/v1/assets?filters[name][$eq]=home`)
  .then(response => response.json()) // Parse la respuesta JSON
  .then(data => {
    // Almacena los datos en la variable homeRes
    homeRes = data;
    const paginaCargada = homeRes.data[0].html_code;
    // Aquí puedes trabajar con los datos obtenidos
    console.log(homeRes); // Por ejemplo, imprime los datos en la consola
  })
  .catch(error => console.error('Error fetching data:', error));

setTimeout(function() {
 

  const escapeName = (name) =>
    `${name}`.trim().replace(/([^a-z0-9\w-:/]+)/gi, "-");
  






  window.editor = grapesjs.init({
    height: "80vh",
    container: "#gjs",
    showOffsets: true,
    //fromElement: true,
    components: paginaCargada,
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
      








  
}, 3000);
//}
