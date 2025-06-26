document.addEventListener('DOMContentLoaded', () => {
    const USER_LOGGED_IN_KEY = 'comedor_invisible_user_logged_in';

    const loginLink = document.getElementById('login-link');
    const userLink = document.getElementById('user-link');
    const publicarLink = document.getElementById('publicar-link');
    const logoutLink = document.getElementById('logout-link');

    // Simulación de estado de login
    function checkLoginStatus() {
        const isLoggedIn = localStorage.getItem(USER_LOGGED_IN_KEY) === 'true';

        if (isLoggedIn) {
            loginLink.classList.add('hidden');
            userLink.classList.remove('hidden');
            publicarLink.classList.remove('hidden');
            logoutLink.classList.remove('hidden');
        } else {
            loginLink.classList.remove('hidden');
            userLink.classList.add('hidden');
            publicarLink.classList.add('hidden');
            logoutLink.classList.add('hidden');
        }
    }

    // Simulación de login
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Aquí no hay validación real, solo simulación
            localStorage.setItem(USER_LOGGED_IN_KEY, 'true');
            alert('¡Has iniciado sesión!');
            window.location.href = 'usuario.html';
        });
    }

    // Simulación de registro
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Simula el registro y el login automático
            localStorage.setItem(USER_LOGGED_IN_KEY, 'true');
            alert('¡Te has registrado con éxito!');
            window.location.href = 'usuario.html';
        });
    }

    // Logout
    if (logoutLink) {
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem(USER_LOGGED_IN_KEY);
            alert('Has cerrado sesión.');
            window.location.href = 'index.html';
        });
    }

    // Comprobar estado en cada carga de página
    checkLoginStatus();
});
