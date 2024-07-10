const url = window.location.href;
const authMode = url.includes('/auth/');
const gridWrapper = document.getElementById('grid-products');
if (gridWrapper) {
  const dataGrid = new gridjs.Grid({
    data: [
        { name: 'John', email: 'john@example.com', phoneNumber: '(353) 01 222 3333' },
        { name: 'Mark', email: 'mark@gmail.com', phoneNumber: '(01) 22 888 4444' },
      ]
    });
}