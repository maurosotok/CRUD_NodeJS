const getProductsURL = "http://localhost:3000/getProductos";
const deleteURL = "http://localhost:3000/deleteProduct";
const tabla = document.getElementById("tableVista");
const rows = tabla.getElementsByTagName("tr");
const btnDelete = document.getElementById("btnDelete");

addEventListener("DOMContentLoaded", () => {
  const retrievedToken = getAccessTokenFromCookie();
  const res = fetch(getProductsURL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${retrievedToken}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      showingDataOnTable(data);
      process();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

var selectedRowIndex = -1; // Initialize to an invalid index
var selectedRow = -1;
const clickedDeleteProduct = document.getElementById("tableVista");
async function process() {
  for (let i = 0; i < rows.length; i++) {
    rows[i].addEventListener("click", async function () {
      const cells = this.getElementsByTagName("td");
      selectedRow = cells[0].innerHTML;
      console.log(selectedRow);
      if (selectedRowIndex !== -1) {
        const prevCells = rows[selectedRowIndex].getElementsByTagName("td");
        for (let j = 0; j < prevCells.length; j++) {
          prevCells[j].classList.remove("list-group-item", "active");
        }
      }
      selectedRowIndex = i;
      cells[0].classList.add("list-group-item", "active");
    });
  }
}

btnDelete.addEventListener("click", async () => {
  const retrievedToken = getAccessTokenFromCookie();
  const res = await fetch(deleteURL, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${retrievedToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parcel: {
        ID: selectedRow,
      },
    }),
  })
    .then((response) => response.json())
    .then(function (data) {
      alert("Producto eliminado!");
      location.reload();
      //showingDataOnTable(data[0]);
    });
});

const getAccessTokenFromCookie = () => {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith("access_token=")) {
      return cookie.substring("access_token=".length, cookie.length);
    }
  }
  return null;
};

async function showingDataOnTable(dataVer) {
  let placeholder = document.querySelector("#data-output");
  let out = "";
  for (let product of dataVer) {
    out += `
          <tr>
             <td>${product.ProductoID} </td>
             <td>${product.ProductName} </td>   
             <td>${product.Descripcion} </td>
             <td>${product.Price} </td>
             <td>${product.Stock} </td>
             
         </tr>`;
  }
  placeholder.innerHTML = out;
}
