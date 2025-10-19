document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const profilePic = document.getElementById('profile-pic');
    const changePhotoBtn = document.getElementById('change-photo-btn');
    const fileInput = document.getElementById('photo-upload');
    const saveBtn = document.querySelector('.save-btn');
    const inputs = document.querySelectorAll('.form-group input'); // Los 4 campos
    const modifyButtons = document.querySelectorAll('.modify-btn');

    // Cargar datos guardados al iniciar
    loadProfileData();

    // Evento para abrir el selector de archivos
    changePhotoBtn.addEventListener('click', () => {
        fileInput.click();
    });

    // Manejar la selección de archivo
    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
            const reader = new FileReader();
            reader.onload = function(event) {
                profilePic.src = event.target.result; // Previsualización inmediata
            };
            reader.readAsDataURL(file);
        } else if (file) {
            alert('Por favor, selecciona una imagen en formato JPG o PNG.');
        }
    });

    // Activar/desactivar edición en campos
    modifyButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const input = inputs[index]; // El input correspondiente
            if (input.readOnly) {
                input.readOnly = false;
                input.focus();
                button.textContent = 'Cancelar';
            } else {
                input.readOnly = true;
                button.textContent = 'Modificar';
            }
        });
    });

    // Guardar todos los datos en localStorage
    saveBtn.addEventListener('click', () => {
        // Crear objeto con los datos actuales
        const data = {
            firstName: inputs[0].value.trim(),
            lastName: inputs[1].value.trim(),
            email: inputs[2].value.trim(),
            phone: inputs[3].value.trim(),
            photo: profilePic.src
        };

        // Guardar en localStorage
        localStorage.setItem('userProfile', JSON.stringify(data));
        alert('¡Perfil guardado correctamente!');

        // Volver todos los campos a solo lectura y botones a "Modificar"
        inputs.forEach(input => input.readOnly = true);
        modifyButtons.forEach(btn => btn.textContent = 'Modificar');
    });

    // Función para cargar los datos desde localStorage
    function loadProfileData() {
        const saved = localStorage.getItem('userProfile');
        if (saved) {
            const data = JSON.parse(saved);
            if (data.firstName) inputs[0].value = data.firstName;
            if (data.lastName) inputs[1].value = data.lastName;
            if (data.email) inputs[2].value = data.email;
            if (data.phone) inputs[3].value = data.phone;
            if (data.photo) profilePic.src = data.photo;
        }
    }
});