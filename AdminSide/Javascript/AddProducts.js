const btnAdd = document.getElementById("btnAdd");
const addURL = "http://localhost:3000/AddProductos";

const productName = document.getElementById("productName");
const productDescription = document.getElementById("productDescription");
const productPrice = document.getElementById("productPrice");
const productStock = document.getElementById("productStock");

addEventListener("DOMContentLoaded", async function () {});

btnAdd.addEventListener("click", async function () {

  try {
    const retrievedToken = getAccessTokenFromCookie();
    if (productName.value.trim() == "") {
      alert("Ingrese un nombre de producto valido");
    } else if (productDescription.value.trim() == "") {
      alert("Ingrese una descripcion valida");
    } else if (productPrice.value.trim() == "" || isNaN(productPrice.value)) {
      alert("Ingrese un precio de producto valido");
    } else if (productStock.value.trim() == "" || isNaN(productStock.value)) {
      alert("Ingrese un inventario de producto valido");
    } else {
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
        
      });
      alert("Producto agregado!")
      productName.value = "";
      productDescription.value = "";
      productPrice.value = "";
      productStock.value = "";
    }
  } catch (error) {
    console.error(error)
  }
 
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
