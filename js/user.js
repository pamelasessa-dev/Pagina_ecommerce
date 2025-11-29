
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

document.addEventListener("DOMContentLoaded", () => {
    const loggedIn = sessionStorage.getItem("loggedIn");

    if (loggedIn !== "true") {
      alert("Debes iniciar sesión para acceder.");
      window.location.replace("login.html"); 
    }
  });

// Mostrar imagen de perfil en el navbar si existe
function mostrarImagenPerfil() {
    const imagenPerfilGuardada = localStorage.getItem("profileImage");
    const contenedorImagenPerfil = document.getElementById("imagenPerfilNav");
    
    if (imagenPerfilGuardada && contenedorImagenPerfil) {
        contenedorImagenPerfil.src = imagenPerfilGuardada;
        contenedorImagenPerfil.style.display = "inline-block";
    }
}

// Llamar a la función cuando se cargue la página
document.addEventListener("DOMContentLoaded", mostrarImagenPerfil);

  // Cerrar sesión al hacer clic en el botón "Cerrar sesión"
document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      sessionStorage.clear();
      localStorage.removeItem("profileImage"); // opcional, para limpiar la imagen guardada
      window.location.replace("login.html");
    });
  }
});
