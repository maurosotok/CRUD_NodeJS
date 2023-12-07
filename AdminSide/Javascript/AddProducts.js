const btnAdd = document.getElementById("btnAdd");
const addURL = "http://localhost:3000/AddProductos";

const productName = document.getElementById("productName");
const productDescription = document.getElementById("productDescription");
const productPrice = document.getElementById("productPrice");
const productStock = document.getElementById("productStock");

addEventListener("DOMContentLoaded", async function () {});


btnAdd.addEventListener("click", async function () {
  const retrievedToken = getAccessTokenFromCookie();

  const res = await fetch(addURL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${retrievedToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parcel: {
        Nombre: productName.value.trim(),
        Descripcion: productDescription.value.trim(),
        Precio: productPrice.value.trim(),
        Inventario: productStock.value.trim(),
      },
    }),
  })
    .then((res) => res.json())
    .then(function (data) {
      console.log(data);
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
