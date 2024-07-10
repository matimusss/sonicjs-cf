const url2 = window.location.href;
const authMode = url2.includes('/auth/');
const gridWrapper2 = document.getElementById('grid-products');


if (gridWrapper2) {
    console.log("MOUNTEDDDDDD");
  const dataGrid = new gridjs.Grid({
    data: [
        { name: 'John', email: 'john@example.com', phoneNumber: '(353) 01 222 3333' },
        { name: 'Mark', email: 'mark@gmail.com', phoneNumber: '(01) 22 888 4444' },
      ]
    });
}