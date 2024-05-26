window.onload = function() {
  setTimeout(function() {
  var Slugify = require('slugifyjs').fromLocale('en');

    alert("se cargo");
    // Espera 1 segundo antes de ejecutar el código

    const slug = document.querySelectorAll('[id*="slug"]');
    const  nameOrTitle = document.querySelectorAll('[id*="name"], [id*="title"]');



    slug.forEach(function(field) {
      field.style.backgroundColor = 'yellow'; 
      const titulo = nameOrTitle.name;
      alert("se cargo" + titulo  + ".");
   
});



  }, 1600); // Espera 1 segundo antes de ejecutar el código


};