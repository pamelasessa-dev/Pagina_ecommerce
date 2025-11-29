document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // 1. Al cargar: Revisa el tema guardado y ajusta la página Y el interruptor.
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.checked = true; // Sincroniza el interruptor
    }

    // 2. Al cambiar: Escucha el evento 'change' en el checkbox.
    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            // Si está marcado, activa el modo oscuro
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            // Si no está marcado, activa el modo claro
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    });
});