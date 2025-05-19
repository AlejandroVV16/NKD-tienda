// ==============================================
// VARIABLES GLOBALES
// ==============================================

// Carrito de compras
let carrito = [];

// Elemento DOM para el contador del carrito
let cartCounter = null;

// ==============================================
// FUNCIONES DE UTILIDAD
// ==============================================

/**
 * Formatea un número como precio en pesos colombianos
 * @param {number} precio - El precio a formatear
 * @return {string} Precio formateado
 */
function formatearPrecio(precio) {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    }).format(precio);
}

/**
 * Guarda el carrito en el almacenamiento local
 */
function guardarCarritoLocal() {
    localStorage.setItem('carritoMotosPereira', JSON.stringify(carrito));
}

/**
 * Carga el carrito desde el almacenamiento local
 */
function cargarCarritoLocal() {
    const carritoGuardado = localStorage.getItem('carritoMotosPereira');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        actualizarContadorCarrito();
    }
}

/**
 * Actualiza el contador visual del carrito
 */
function actualizarContadorCarrito() {
    if (cartCounter) {
        // Si el elemento existe, actualizar su contenido
        const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
        cartCounter.textContent = totalItems;
    }
}

// ==============================================
// FUNCIONES DE PRODUCTOS Y CARRITO
// ==============================================

/**
 * Agrega un producto al carrito
 * @param {number} id - ID del producto
 * @param {string} nombre - Nombre del producto
 * @param {number} precio - Precio del producto
 * @param {number} cantidad - Cantidad a añadir (por defecto 1)
 */
function agregarAlCarrito(id, nombre, precio, cantidad = 1) {
    // Buscar si el producto ya está en el carrito
    const index = carrito.findIndex(item => item.id === id);
    
    if (index !== -1) {
        // Si ya existe, incrementar la cantidad
        carrito[index].cantidad += cantidad;
    } else {
        // Si no existe, añadir nuevo producto
        carrito.push({
            id: id,
            nombre: nombre,
            precio: precio,
            cantidad: cantidad
        });
    }
    
    // Guardar en localStorage y actualizar interfaz
    guardarCarritoLocal();
    actualizarContadorCarrito();
    
    // Mostrar notificación
    mostrarNotificacion(`¡${nombre} agregado al carrito!`);
}

/**
 * Muestra una notificación temporal
 * @param {string} mensaje - Texto de la notificación
 * @param {string} tipo - Tipo de notificación ('success', 'error', etc.)
 */
function mostrarNotificacion(mensaje, tipo = 'success') {
    // Crear elemento de notificación
    const notificacion = document.createElement('div');
    notificacion.className = `notificacion ${tipo}`;
    notificacion.textContent = mensaje;
    
    // Añadir al DOM
    document.body.appendChild(notificacion);
    
    // Mostrar con animación
    setTimeout(() => {
        notificacion.classList.add('visible');
    }, 10);
    
    // Ocultar después de 3 segundos
    setTimeout(() => {
        notificacion.classList.remove('visible');
        // Eliminar del DOM después de la animación
        setTimeout(() => {
            document.body.removeChild(notificacion);
        }, 300);
    }, 3000);
}

// ==============================================
// FUNCIONES DE MANEJO DE EVENTOS
// ==============================================

/**
 * Configura los eventos para los botones "Agregar al carrito"
 */
function configurarBotonesCarrito() {
    // Seleccionar todos los botones de agregar al carrito
    const botonesAgregar = document.querySelectorAll('.add-to-cart');
    
    // Añadir event listener a cada botón
    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', function() {
            // Obtener datos del producto desde los atributos data
            const id = parseInt(this.dataset.id);
            const nombre = this.dataset.name;
            const precio = parseInt(this.dataset.price);
            
            // Agregar al carrito
            agregarAlCarrito(id, nombre, precio);
        });
    });
}

/**
 * Configura los eventos para el formulario de búsqueda
 */
function configurarBusqueda() {
    const formularioBusqueda = document.querySelector('.search-bar form');
    
    if (formularioBusqueda) {
        formularioBusqueda.addEventListener('submit', function(event) {
            const inputBusqueda = this.querySelector('input[name="query"]');
            
            // Si la búsqueda está vacía, prevenir el envío
            if (!inputBusqueda.value.trim()) {
                event.preventDefault();
                mostrarNotificacion('Ingresa un término de búsqueda', 'error');
            }
        });
    }
}

/**
 * Inicializa el carrusel de imágenes si existe
 */
function inicializarCarrusel() {
    // Esta función se implementaría si añadimos un carrusel
    // Por ahora es solo un placeholder para futuras funcionalidades
    console.log('Carrusel inicializado - pendiente implementar');
}

// ==============================================
// FUNCIONES DE INICIALIZACIÓN
// ==============================================

/**
 * Función principal de inicialización cuando el DOM está listo
 */
function inicializar() {
    console.log('DOM cargado - Inicializando tienda');
    
    // Crear contador de carrito si no existe
    if (!cartCounter) {
        const userMenu = document.querySelector('.user-account');
        if (userMenu) {
            cartCounter = document.createElement('span');
            cartCounter.className = 'cart-counter';
            userMenu.appendChild(cartCounter);
        }
    }
    
    // Cargar carrito del almacenamiento local
    cargarCarritoLocal();
    
    // Configurar eventos
    configurarBotonesCarrito();
    configurarBusqueda();
    inicializarCarrusel();
    
    // Inicializar otros componentes si existen
    // ...
    
    console.log('Tienda inicializada correctamente');
}

// Inicializar cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', inicializar);

// ==============================================
// CSS para las notificaciones (se añadirá dinámicamente)
// ==============================================

// Crear estilos para las notificaciones
const estilosNotificacion = document.createElement('style');
estilosNotificacion.textContent = `
    .notificacion {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #4CAF50;
        color: white;
        padding: 12px 20px;
        border-radius: 4px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        transform: translateY(100px);
        opacity: 0;
        transition: transform 0.3s ease, opacity 0.3s ease;
        z-index: 1000;
    }
    
    .notificacion.visible {
        transform: translateY(0);
        opacity: 1;
    }
    
    .notificacion.error {
        background-color: #f44336;
    }
    
    .cart-counter {
        position: absolute;
        top: -8px;
        right: -8px;
        background-color: #e61b1b;
        color: white;
        border-radius: 50%;
        width: 18px;
        height: 18px;
        font-size: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

// Añadir los estilos al documento
document.head.appendChild(estilosNotificacion);