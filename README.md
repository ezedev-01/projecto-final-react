# Desafío: Clon de WhatsApp Web (React App)

## Descripción del Desafío
El objetivo principal de este proyecto es desarrollar una aplicación web interactiva que simule la experiencia de uso de WhatsApp Web. La aplicación permite visualizar una lista de contactos, filtrar búsquedas de contactos en tiempo real mediante parámetros de URL, seleccionar chats activos, enviar mensajes mediante un formulario controlado y navegar hacia un perfil de configuración/información del usuario.

## Librerías Utilizadas
* **React**: Librería principal para el desarrollo de la interfaz basada en componentes.
* **React Router DOM (`react-router-dom`)**: Manejo de rutas principales de la aplicación (`/`, `/profile`) y control de los parámetros de búsqueda (`useSearchParams`).
* **Bootstrap Icons**: Librería de iconografía para representar los controles visuales.

## Dificultades Presentadas
* **Sincronización del Búsqueda mediante `useSearchParams`**: Asegurar que la barra de búsqueda actualice el estado de los contactos mostrados en tiempo real sin perder la experiencia de fluidez en la entrada de texto.
* **Manejo del Layout Responsivo (320px - 2000px)**: Adaptar la vista dividida de WhatsApp (Sidebar + Chat) para que en dispositivos móviles (< 768px) funcione como una navegación secuencial (mostrar lista O mostrar chat activo) y en escritorio (≥ 768px) se mantenga como panel dual.
* **Mantenimiento de Contraste Accessible**: Ajustar los colores por defecto del tema de WhatsApp Web para garantizar un nivel suficiente de contraste entre fondos y textos (evitando gris claro sobre fondo blanco o verde claro sin suficiente oscuridad de texto).