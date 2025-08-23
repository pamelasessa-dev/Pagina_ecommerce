document.getElementById('loginForm').addEventListener('submit', function(event) {
event.preventDefault(); // Evita el envío por defecto
            
const usuario = document.getElementById('usuario').value.trim();
const contrasena = document.getElementById('contrasena').value.trim();
            let valid = true;

 // Validaciones
        if (usuario && contrasena) {
sessionStorage.setItem('loggedIn', 'si');

        // Redirección si es válido
        localStorage.setItem('usuario', usuario);
        localStorage.setItem('contraseña', contrasena);
       
       // Redireccion a index.html
        window.location.href = 'index.html';
} else {
    alert('Por favor, complete ambos campos.')
}
    }
    
);

// Boton
const regBtn = document.getElementById("regBtn");
if (regBtn) {
    regBtn.addEventListener("click", function() {
                window.location.href = 'index.html'; 
    });
}
=======
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
