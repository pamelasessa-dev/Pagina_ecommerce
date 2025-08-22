document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-container");

  form.addEventListener("submit", function(event) {
    event.preventDefault();

    const usuario = document.getElementById("usuario").value.trim();
    const contrasena = document.getElementById("password").value.trim();

    let isValid = true;

    if (usuario === "") {
      document.getElementById("usuarioError").textContent = "Ingresa tu usuario";
      isValid = false;
    } else {
      document.getElementById("usuarioError").textContent = "";
    }

    if (contrasena === "") {
      document.getElementById("contrasenaError").textContent = "Ingresa tu contraseña";
      isValid = false;
    } else {
      document.getElementById("contrasenaError").textContent = "";
    }

    if (isValid) {
      sessionStorage.setItem("loggedIn", "true");
      sessionStorage.setItem("usuario", usuario);
      location.replace("index.html"); 
    }
  });
});