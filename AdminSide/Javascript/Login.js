
const loginbutton = document.getElementById("LoginButton");
const username = document.getElementById("username");
const password = document.getElementById("password");

const PostURL = "http://localhost:3000/auth";

loginbutton.addEventListener("click", async () => {
  try {
    if (username.value == "" || password.value == "") {
      alert("Llene todos los campos");
    } else {
      const res = await fetch(PostURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          parcel: { Usuario: username.value, Clave: password.value },
        }),
      });

      if (res.ok) {
        window.location.href = "Index.html";
      }
      if (res.status === 400) {
        alert("Usuario o contraseña incorrecta, pruebe de nuevo");
      }
    }
  } catch (error) {
    console.log(error);
  }
});
