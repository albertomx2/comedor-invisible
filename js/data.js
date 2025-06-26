const RACIONES_KEY = 'comedor_invisible_raciones';

// Datos iniciales simulados
let racionesIniciales = [
    {
        id: 1,
        nombre: 'Lentejas de la abuela',
        descripcion: 'Un plato contundente de lentejas caseras con chorizo y verduras. ¡Para entrar en calor!',
        ubicacion: { lat: 40.416775, lng: -3.703790 }, // Madrid Centro
        recogido: false
    },
    {
        id: 2,
        nombre: 'Paella de marisco',
        descripcion: 'Auténtica paella valenciana con marisco fresco. Ración generosa para una persona.',
        ubicacion: { lat: 40.42054, lng: -3.70579 }, // Malasaña
        recogido: false
    },
    {
        id: 3,
        nombre: 'Bizcocho de yogur',
        descripcion: 'Bizcocho esponjoso y casero, ideal para el desayuno o la merienda. Quedan 3 porciones.',
        ubicacion: { lat: 40.4125, lng: -3.6919 }, // Barrio de las Letras
        recogido: true
    }
];

// Función para obtener las raciones desde localStorage o usar las iniciales
function getRaciones() {
    const racionesGuardadas = localStorage.getItem(RACIONES_KEY);
    if (racionesGuardadas) {
        return JSON.parse(racionesGuardadas);
    }
    // Si no hay nada en localStorage, guardamos los datos iniciales
    localStorage.setItem(RACIONES_KEY, JSON.stringify(racionesIniciales));
    return racionesIniciales;
}

// Función para añadir una nueva ración
function addRacion(racion) {
    const raciones = getRaciones();
    raciones.push(racion);
    localStorage.setItem(RACIONES_KEY, JSON.stringify(raciones));
}

// Función para actualizar el estado de una ración (ej. marcar como recogida)
function updateRacion(id, updates) {
    let raciones = getRaciones();
    raciones = raciones.map(racion => {
        if (racion.id === id) {
            return { ...racion, ...updates };
        }
        return racion;
    });
    localStorage.setItem(RACIONES_KEY, JSON.stringify(raciones));
}
