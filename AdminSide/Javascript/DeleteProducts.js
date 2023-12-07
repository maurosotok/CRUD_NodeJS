
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
      console.log(data);
      showingDataOnTable(data);
      process(retrievedToken);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

async function process(retrievedTokenPermite) {
  for (let i = 0; i < rows.length; i++) {
    rows[i].addEventListener("click", async function () {
      const cells = this.getElementsByTagName("td");
      selectedID = cells[0].innerHTML
      btnDelete.addEventListener("click", async () => {
        const res = await fetch(deleteURL, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${retrievedTokenPermite}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            parcel: {
              ID: cells[0].innerHTML,
            },
          }),
        })
          .then((response) => response.json())
          .then(function (data) {
            console.log(data, "sucess");
            
            showingDataOnTable(data[0]);
          });
      });
    });
  }
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
