// frontend/js/map.js
document.addEventListener("DOMContentLoaded", () => {
    const mapEl = document.getElementById("map");
    if (!mapEl) return;
  
    // ─── Inicializar mapa en Madrid ────────────────────────────────
    const map = L.map("map").setView([40.416775, -3.703790], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);
  
    // ─── Cargar raciones desde la API ───────────────────────────────
    fetch("/api/dishes/")
      .then((res) => {
        if (!res.ok) throw new Error("Status " + res.status);
        return res.json();
      })
      .then((dishes) => {
        dishes
          .filter((d) => !d.is_taken)
          .forEach((d) => {
            const marker = L.marker([d.lat, d.lng]).addTo(map);
            marker.bindPopup(
              `<b>${d.name}</b><br>${d.description}<br>` +
                `<button class="btn-reservar" data-id="${d.id}">Reservar</button>`
            );
          });
      })
      .catch((err) => {
        console.error("Error fetching dishes:", err);
        alert("Error al cargar raciones.");
      });
  
    // ─── Handler para el botón de reserva ───────────────────────────
    map.on("popupopen", (e) => {
      const btn = e.popup._contentNode.querySelector(".btn-reservar");
      if (!btn) return;
  
      btn.addEventListener("click", async () => {
        const token = localStorage.getItem("ci_access");
        if (!token) {
          alert("Debes iniciar sesión para reservar");
          return (window.location.href = "login.html");
        }
  
        const id = btn.dataset.id;
        try {
          const res = await fetch(`/api/dishes/${id}/reserve/`, {
            method: "POST",
            headers: { Authorization: "Bearer " + token },
          });
          if (res.ok) {
            alert("¡Ración reservada!");
            location.reload();
          } else {
            const errJson = await res.json();
            console.error("Reserva fallida:", errJson);
            alert(
              "No se pudo reservar:\n" +
                (errJson.detail || JSON.stringify(errJson))
            );
          }
        } catch (networkError) {
          console.error("Error de red al reservar:", networkError);
          alert("Error de red al intentar reservar.");
        }
      });
    });
  });
  