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