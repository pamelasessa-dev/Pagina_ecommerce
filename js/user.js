
 document.addEventListener("DOMContentLoaded", () => {

  if (!sessionStorage.getItem("loggedIn")) {
    location.replace("login.html");
    return;
  }
});

  // Mostrar nombre de usuario en la equina derecha del nav
  const nombre = sessionStorage.getItem("usuario");
  const contenedor = document.getElementById("nombreDeUsuario");
  if (nombre && contenedor) {
    contenedor.textContent = nombre;
  }

