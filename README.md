# Comedor Invisible

 <!-- Opcional: Añade una captura de pantalla -->

**Comedor Invisible** es una aplicación web conceptual que simula una plataforma social para compartir comida cocinada sobrante de forma solidaria entre personas cercanas. El objetivo es reducir el desperdicio de alimentos y fortalecer los lazos comunitarios a través de la tecnología.

Este proyecto es una **simulación frontend completa**, construida sin necesidad de un backend real, bases de datos o dependencias complejas. Es una demostración de cómo se puede prototipar una idea de aplicación web funcional y visualmente atractiva utilizando únicamente tecnologías web estándar.

## 🎯 Características Principales

- **Visualización en Mapa**: Las raciones disponibles se muestran en un mapa interactivo (usando Leaflet.js) con marcadores que indican la ubicación.
- **Publicación de Raciones**: Los usuarios "logueados" pueden publicar nuevas raciones a través de un formulario simple.
- **Simulación de Sesión**: El estado de inicio de sesión se gestiona con `localStorage` para mostrar u ocultar contenido dinámicamente (como los enlaces de "Publicar" y "Mi Perfil").
- **Persistencia de Datos Simulada**: Los datos de las raciones se guardan en `localStorage`, por lo que persisten entre sesiones en el mismo navegador.
- **Diseño Moderno y Responsive**: La interfaz está diseñada con una estética "dark mode", minimalista y se adapta a dispositivos móviles.

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Para la estructura semántica del contenido.
- **CSS3**: Para el diseño visual, incluyendo Flexbox y un enfoque mobile-first.
- **JavaScript (Vanilla)**: Para toda la lógica de la aplicación, manipulación del DOM y gestión de eventos.
- **Leaflet.js**: Una biblioteca de mapas interactivos de código abierto.
- **Google Fonts**: Para una tipografía moderna y limpia (Poppins).

## 🚀 Cómo Ejecutar el Proyecto

Al ser un proyecto basado únicamente en ficheros estáticos, no requiere instalación de dependencias.

1.  **Clona el repositorio (o descarga el ZIP):**
    ```bash
    git clone https://github.com/albertomx2/comedor-invisible.git
    ```

2.  **Navega a la carpeta del proyecto:**
    ```bash
    cd comedor-invisible
    ```

3.  **Inicia un servidor web local:**
    La forma más sencilla es usar la extensión **Live Server** en Visual Studio Code. Alternativamente, puedes usar el módulo `http.server` de Python:
    ```bash
    python -m http.server
    ```
    O si tienes Node.js:
    ```bash
    npx serve
    ```

4.  **Abre tu navegador** y visita `http://localhost:8000` (o el puerto que indique tu servidor).

¡Y listo! Ya puedes explorar y probar la aplicación.
