window.onload = function() {
  setTimeout(function() {

    alert("se cargo");
    // Espera 1 segundo antes de ejecutar el código

    const formioFields = document.querySelectorAll('[id*="slug"]');
    formioFields.forEach(function(field) {
      field.style.backgroundColor = 'yellow';
      alert("se detecto un slug");
    });
  }, 1600); // Espera 1 segundo antes de ejecutar el código


};