// my-profile.js
// Guarda y muestra una imagen de perfil persistente usando localStorage

document.addEventListener("DOMContentLoaded", function() {
  const imageInput = document.getElementById("imageInput");
  const profileImage = document.getElementById("profileImage");

  // Cargar imagen guardada en localStorage al iniciar
  const savedImage = localStorage.getItem("profileImage");
  if (savedImage) {
    profileImage.src = savedImage;
  }

  // Cuando el usuario selecciona una nueva imagen
  imageInput.addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const base64Image = e.target.result;

        // Mostrar la imagen
        profileImage.src = base64Image;

        // Guardarla en localStorage
        localStorage.setItem("profileImage", base64Image);
      };
      reader.readAsDataURL(file);
    }
  });
});
