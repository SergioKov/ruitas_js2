// Definimos nuestras rutas con diferentes estructuras y variables dinámicas
const routes = [
    {
        path: /^\/$/, // Ruta principal '/'
        handler: () => {
            document.getElementById('app').innerHTML = '<h1>Bienvenido a la página principal</h1>';
        }
    },
    {
        path: /^\/about$/, // Ruta estática para "/about"
        handler: () => {
            document.getElementById('app').innerHTML = '<h1>Sobre Nosotros</h1><p>Esta es la página de información sobre nosotros.</p>';
        }
    },
    {
        path: /^\/user\/([^/]+)$/, // Ruta dinámica para "/user/:id"
        handler: (params) => {
            const [userId] = params;
            document.getElementById('app').innerHTML = `<h1>Perfil del Usuario ${userId}</h1><p>Información del usuario con ID ${userId}</p>`;
        }
    },
    {
        path: /^\/user\/([^/]+)\/post\/([^/]+)$/, // Ruta para "/user/:id/post/:postId"
        handler: (params) => {
            const [userId, postId] = params;
            document.getElementById('app').innerHTML = `<h1>Post ${postId} del Usuario ${userId}</h1>`;
        }
    },
    {
        path: /^\/category\/([^/]+)$/, // Ruta dinámica para "/category/:categoryName"
        handler: (params) => {
            const [categoryName] = params;
            document.getElementById('app').innerHTML = `<h1>Categoría: ${categoryName}</h1><p>Explorando la categoría ${categoryName}.</p>`;
        }
    },
    {
        path: /^\/404$/, // Ruta para 404
        handler: () => {
            document.getElementById('app').innerHTML = '<h1>404: Página no encontrada</h1>';
        }
    }
];

// Función para navegar a una ruta específica sin recargar la página
function navigate(url) {
    window.history.pushState({}, '', url); // Cambia la URL en el historial del navegador
    route(url); // Procesa la nueva ruta
}

// Función que procesa la URL actual y busca la ruta correspondiente
function route(url) {
    const route = routes.find(r => r.path.test(url)); // Encuentra la primera ruta que coincida con la URL actual
    if (route) {
        const match = url.match(route.path); // Extrae los parámetros de la URL
        route.handler(match.slice(1)); // Llama al manejador de la ruta con los parámetros extraídos
    } else {
        navigate('/404'); // Si no se encuentra la ruta, redirige a 404
    }
}

// Detecta cuando el usuario usa los botones de navegación (atrás/adelante)
window.onpopstate = () => {
    route(window.location.pathname); // Procesa la ruta actual cuando cambia el historial del navegador
};

// Añade listeners a los enlaces para evitar la recarga de la página
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a.route').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Evita que el navegador cargue la página
            navigate(e.target.getAttribute('href')); // Navega a la ruta seleccionada
        });
    });

    // Llama a route() para procesar la URL actual cuando la página carga por primera vez
    route(window.location.pathname);
});
