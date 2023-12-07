const getUrl = "http://localhost:3000/getT";
const getProductsURL = "http://localhost:3000/getProductos";

addEventListener("DOMContentLoaded", () => {
  fetch(getUrl)
    .then((response) => response.json())
    .then((data) => {
      const receivedVariable = data.accessToken;
      console.log(receivedVariable);
      const res = fetch(getProductsURL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${receivedVariable}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          let placeholder = document.querySelector("#data-output");
          let out = "";
          for (let product of data) {
            out += `
            <tr>
               <td>${product.ProductoID} </td>
               <td>${product.ProductName} </td>   
               <td>${product.Descripcion} </td>
               <td>$${product.Price} </td>
               <td>${product.Stock} </td>
               
           </tr>`;
          }
          placeholder.innerHTML = out;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    })
    .catch((error) => console.error("Error:", error));
});
