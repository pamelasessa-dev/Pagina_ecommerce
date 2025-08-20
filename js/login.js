document.getElementById('loginForm').addEventListener('submit', function(event) {
event.preventDefault(); // Evita el envío por defecto
            
const usuario = document.getElementById('usuario').value();
const contrasena = document.getElementById('contrasena').value();
            let isValid = true;

// Validación de usuario
            if (usuario === '') {
document.getElementById('usuarioError').textContent = 'Ingresa tu usuario';
                isValid = false;
            } else {
document.getElementById('usuarioError').textContent = '';
            }

// Validación de contraseña
            if (contrasena === '') {
document.getElementById('contrasenaError').textContent = 'Ingresa tu contraseña';
                isValid = false;
            } else {
document.getElementById('contrasenaError').textContent = '';
            }

// Redirección si es válido
            if (isValid) {
window.location.href = 'products.html';
            }
        });