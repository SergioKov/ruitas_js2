// Definimos nuestras rutas con diferentes estructuras y variables dinámicas
const routes = [
    {//es objeto con index 0 de array 'routes'
        path: /^\/$/, // Ruta principal '/'
        handler: () => {
            document.getElementById('app').innerHTML = '<h1>Bienvenido a la página principal</h1>';
        }
    },
    {//es objeto con index 1 de array 'routes'
        path: /^\/about$/, // Ruta estática para "/about"
        handler: () => {
            document.getElementById('app').innerHTML = '<h1>Sobre Nosotros</h1><p>Esta es la página de información sobre nosotros.</p>';
        }
    },
    {
        path: /^\/home$/, // Ruta estática para "/home"
        handler: (params) => {
            const [userId] = params;
            console.log('params: ', params);
            console.log('Home: ', Home);
            Home(params);
            //document.getElementById('app').innerHTML = Home;
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
    console.log('=== function route() ===');
    const route = routes.find(r => r.path.test(url)); // Encuentra la primera ruta que coincida con la URL actual
    console.log('route: ', route);
    if(route) {
        const match = url.match(route.path); // Extrae los parámetros de la URL
        console.log('match: ', match);
        let match_sliced = match.slice(1);//'match_sliced' son 'params' para la funcion handler()
        console.log('match_sliced: ', match_sliced);
        let params = match_sliced;
        console.log('params: ', params);
        route.handler(params); // Llama al manejador de la ruta con los parámetros extraídos 'params'
    }else{
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
    console.log('1. load. path: ', window.location.pathname);
    route(window.location.pathname);
});

/*
window.addEventListener('load', function() {
    console.log('2. load. path: ', window.location.pathname);
    route(window.location.pathname);

});
*/
