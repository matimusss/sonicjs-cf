window.onload = function() {
  setTimeout(function() {
    // Espera 1 segundo antes de ejecutar el código
    const formioFields = document.querySelectorAll(' input[name="[data]slug"]');
    formioFields.forEach(function(field) {
      // Ejecutar acciones X para cada campo [data]slug encontrado
      // Por ejemplo, cambiar el valor del campo o realizar alguna acción específica
      // Aquí puedes agregar tu lógica personalizada
      field.value = 'SLUG';
      console.log('Valor del campo [data]slug cambiado a "SLUG"');
      alert("HAY UN CAMPO SLUG");
    });
  }, 1000); // Espera 1 segundo antes de ejecutar el código
};