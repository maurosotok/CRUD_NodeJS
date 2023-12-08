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
      })
      if (res.ok) {
        const data = await res.json();
        const accessToken = data.accessToken;
        document.cookie = `access_token=${accessToken}; path=/;`;
        console.log(accessToken)
        window.location.href = "ViewProducts.html";
      } else {
        // Handle other status codes (e.g., 400 for wrong credentials)
        alert("Usuario o contraseña incorrecta, pruebe de nuevo");
      }
    }
  } catch (error) {
    console.log(error);
    if (res.status === 400) {
      alert("Usuario o contraseña incorrecta, pruebe de nuevo");
    }
  }
});
