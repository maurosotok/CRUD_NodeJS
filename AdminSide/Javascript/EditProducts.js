const getUrl = "http://localhost:3000/getT";
const getProductsURL = "http://localhost:3000/getProductos";
const updateURL = "http://localhost:3000/updateProducts";
const tabla = document.getElementById("tableVista");
const rows = tabla.getElementsByTagName("tr");
const productName = document.getElementById("productName");
const productDescription = document.getElementById("productDescription");
const productPrice = document.getElementById("productPrice");
const productStock = document.getElementById("productStock");
const btnUpdate = document.getElementById("btnUpdate");

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
      process(retrievedToken);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
async function process(retrievedTokenPermite) {
  try {
    for (let i = 0; i < rows.length; i++) {
      rows[i].addEventListener("click", async function () {
        const cells = this.getElementsByTagName("td");
        productName.value = cells[1].innerHTML;
        productDescription.value = cells[2].innerHTML;
        productPrice.value = cells[3].innerHTML;
        productStock.value = cells[4].innerHTML;

        btnUpdate.addEventListener("click", async () => {
          if (productName.value.trim() == "") {
            alert("Ingrese un nombre de producto valido");
            productName.value = cells[1].innerHTML;
          } else if (productDescription.value.trim() == "") {
            alert("Ingrese una descripcion valida");
            productDescription.value = cells[2].innerHTML;
          } else if (
            productPrice.value.trim() == "" ||
            isNaN(productPrice.value)
          ) {
            alert("Ingrese un precio de producto valido");
            productPrice.value = cells[3].innerHTML;
          } else if (
            productStock.value.trim() == "" ||
            isNaN(productStock.value)
          ) {
            alert("Ingrese un inventario de producto valido");
            productStock.value = cells[4].innerHTML;
          } else {
            const res = await fetch(updateURL, {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${retrievedTokenPermite}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                parcel: {
                  ID: cells[0].innerHTML,
                  Nombre: productName.value.trim(),
                  Descripcion: productDescription.value.trim(),
                  Precio: productPrice.value.trim(),
                  Inventario: productStock.value.trim(),
                },
              }),
            })
              .then((response) => response.json())
              .then(function (data) {
                productName.value = "";
                productDescription.value = "";
                productPrice.value = "";
                productStock.value = "";
                alert("Cambio realizado!");
                //showingDataOnTable(data[0]);
                location.reload();
              });
          }
        });
      });
    }
  } catch (error) {}
}

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
