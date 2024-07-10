const url = window.location.href;
const authMode = url.includes('/auth/');
const gridWrapperProducts = document.getElementById('grid-products');
if (gridWrapperProducts) {
    new gridjs.Grid({
        columns: ["Name", "Email", "Phone Number"],
        data: [
          ["John", "john@example.com", "(353) 01 222 3333"],
          ["Mark", "mark@gmail.com", "(01) 22 888 4444"],
          ["Eoin", "eoin@gmail.com", "0097 22 654 00033"],
          ["Sarah", "sarahcdd@gmail.com", "+322 876 1233"],
          ["Afshin", "afshin@mail.com", "(353) 22 87 8356"]
        ]
      }).render(document.getElementById("grid-products"));


  function deleteItem(itemId) {
    const basePath = `${window.location.protocol}//${window.location.host}`;
    const urlSegments = window.location.pathname.split('/');
    const tableName = urlSegments[urlSegments.length - 1];
    const endpoint = authMode
      ? `/v1/auth/${tableName}/${itemId}`
      : `${basePath}/v1/${tableName}/${itemId}`;

    const xhttp = new XMLHttpRequest();
    xhttp.open('DELETE', endpoint, true);
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 204) {
        window.location.reload();
      } else if (this.readyState === 4) {
        console.error('Error deleting the item:', this.responseText);
      }
    };
    xhttp.send();
  }

  gridWrapper.addEventListener('click', function (e) {
    if (e.target.closest('.delete-btn')) {
      const itemId = e.target
        .closest('.delete-btn')
        .getAttribute('data-delete-id');
      const userResponse = window.confirm(
        'Do you really want to delete this item?'
      );
      if (userResponse) deleteItem(itemId);
    }
  });
}

// $(document).on(".timeSince", function () {
//   // $(this).html('<b>yaay!</b>');
//   console.log("new time since");
// });

function getTable() {
  return $('#grid').data('route');
}
