const getUrl = "http://localhost:3000/getT";
const getProductsURL = "http://localhost:3000/getProductos";

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
      let placeholder = document.querySelector("#data-output");
      let out = "";
      for (let product of data) {
        out += `
          <tr>
             <td>${product.ProductoID} </td>
             <td>${product.ProductName} </td>   
             <td>${product.Descripcion} </td>
             <td>$ ${product.Price} </td>
             <td>${product.Stock} </td>
             
         </tr>`;
      }
      placeholder.innerHTML = out;
    })
    .catch((error) => {
      console.error("Error:", error);
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
