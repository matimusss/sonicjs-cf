window.onload = function() {
  setTimeout(function() {

    alert("se cargo");
    // Espera 1 segundo antes de ejecutar el código
    const formioFields = document.querySelectorAll(' input[name="[data]slug"]');
    formioFields.forEach(function(field) {
      alert("se detecto un slug");
    });
  }, 1000); // Espera 1 segundo antes de ejecutar el código
};