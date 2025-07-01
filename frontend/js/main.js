// js/main.js
document.addEventListener("DOMContentLoaded", () => {
  // ─── CONSTANTES ──────────────────────────────────────────────────────────
  const TOKEN_KEY    = "ci_access";
  const REFRESH_KEY  = "ci_refresh";
  const USER_KEY     = "ci_user";
  const API_BASE     = "/api/auth/";
  const API_DISHES   = "/api/dishes/";

  // ─── HELPERS DE TOKEN ────────────────────────────────────────────────────
  const getAccess   = () => localStorage.getItem(TOKEN_KEY);
  const isLoggedIn  = () => !!getAccess();

  function saveTokens(access, refresh) {
    localStorage.setItem(TOKEN_KEY, access);
    localStorage.setItem(REFRESH_KEY, refresh);
  }
  function clearTokens() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(USER_KEY);
  }

  // ─── PETICIONES GENERALES ────────────────────────────────────────────────
  async function apiPost(endpoint, payload) {
    const res = await fetch(API_BASE + endpoint, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(payload),
    });
    if (!res.ok) throw await res.json();
    return res.json();
  }

  // ─── MENU DINÁMICO ───────────────────────────────────────────────────────
  const loginLink    = document.getElementById("login-link");
  const userLink     = document.getElementById("user-link");
  const publicarLink = document.getElementById("publicar-link");
  const logoutLink   = document.getElementById("logout-link");

  function refreshNav() {
    if (isLoggedIn()) {
      loginLink?.classList.add("hidden");
      userLink?.classList.remove("hidden");
      publicarLink?.classList.remove("hidden");
      logoutLink?.classList.remove("hidden");
    } else {
      loginLink?.classList.remove("hidden");
      userLink?.classList.add("hidden");
      publicarLink?.classList.add("hidden");
      logoutLink?.classList.add("hidden");
    }
  }
  refreshNav();

  // ─── LOGOUT ──────────────────────────────────────────────────────────────
  logoutLink?.addEventListener("click", (e) => {
    e.preventDefault();
    clearTokens();
    refreshNav();
    alert("Has cerrado sesión");
    location.href = "index.html";
  });

  // ─── REGISTRO ────────────────────────────────────────────────────────────
  const registerForm = document.getElementById("register-form");
  registerForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      await apiPost("register/", {
        username: registerForm.username.value,
        email:    registerForm.email.value,
        password: registerForm.password.value,
      });
      alert("¡Registro completado! Inicia sesión.");
      location.href = "login.html";
    } catch (err) {
      console.error("Registro fallido:", err);
      alert("Error de registro:\n" + JSON.stringify(err));
    }
  });

  // ─── LOGIN ───────────────────────────────────────────────────────────────
  const loginForm = document.getElementById("login-form");
  loginForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      const data = await apiPost("login/", {
        username: loginForm.username.value,
        password: loginForm.password.value,
      });
      saveTokens(data.access, data.refresh);
      localStorage.setItem(USER_KEY, loginForm.username.value);
      refreshNav();
      alert("¡Has iniciado sesión!");
      location.href = "usuario.html";
    } catch (err) {
      console.error("Login fallido:", err);
      alert("Credenciales incorrectas");
    }
  });

  // ─── PUBLICAR RACIÓN ─────────────────────────
const publishForm = document.getElementById("publish-form");
publishForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("ci_access");
  if (!token) {
    alert("Debes iniciar sesión para publicar");
    return window.location.href = "login.html";
  }

  const payload = {
    name       : publishForm["dish-name"].value,
    description: publishForm.description.value,
    lat        : parseFloat(publishForm.lat.value),
    lng        : parseFloat(publishForm.lng.value),
  };

  const res = await fetch("/api/dishes/", {
    method : "POST",
    headers: {
      "Content-Type" : "application/json",
      "Authorization": "Bearer " + token,
    },
    body: JSON.stringify(payload),
  });

  if (res.ok) {
    alert("¡Ración publicada!");
    window.location.href = "mapa.html";
  } else {
    const err = await res.json();
    alert("Error al publicar:\n" + JSON.stringify(err));
  }
});

});
