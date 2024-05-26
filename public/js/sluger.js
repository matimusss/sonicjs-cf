window.onload = function() {
  setTimeout(function() {


    alert("se cargo");
    // Espera 1 segundo antes de ejecutar el código

    const slug = document.querySelectorAll('[id*="slug"]');
    const  nameOrTitle = document.querySelectorAll('[id*="name"], [id*="title"]');



    slug.forEach(function(field) {
      field.style.backgroundColor = 'yellow'; 
      const titulo = nameOrTitle[0].getAttribute(id);
      alert("se cargo" + titulo  + ".");
   
});



  }, 1600); // Espera 1 segundo antes de ejecutar el código


};