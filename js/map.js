document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('map')) {
        // Coordenadas de Madrid
        const map = L.map('map').setView([40.416775, -3.703790], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        const raciones = getRaciones();

        raciones.forEach(racion => {
            if (!racion.recogido) {
                const marker = L.marker([racion.ubicacion.lat, racion.ubicacion.lng]).addTo(map);
                marker.bindPopup(`<b>${racion.nombre}</b><br>${racion.descripcion}<br><button class="btn-reservar" data-id="${racion.id}">Reservar</button>`);
            }
        });

        // Event listener para los botones de reservar
        map.on('popupopen', function() {
            document.querySelector('.btn-reservar').addEventListener('click', function(e) {
                const racionId = parseInt(e.target.getAttribute('data-id'));
                // Simulación de reserva
                updateRacion(racionId, { recogido: true });
                alert('¡Ración reservada! Gracias por tu solidaridad.');
                // Recargar el mapa para que desaparezca el marcador
                location.reload();
            });
        });
    }
});
