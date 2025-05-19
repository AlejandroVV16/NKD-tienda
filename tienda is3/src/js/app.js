// ==============================================
// SISTEMA DE NAVEGACIÓN SPA (Single Page Application)
// ==============================================

// Objeto para gestionar las rutas y vistas de la aplicación
const spaRouter = {
    // Rutas disponibles en la aplicación
    routes: {
        '/': 'inicio',
        '/accesorios': 'accesorios',
        '/ofertas': 'ofertas',
        '/productos-nuevos': 'productos-nuevos',
        '/quienes-somos': 'quienes-somos',
        '/revision': 'revision',
        '/contactanos': 'contacto'
    },
    
    // Contenedor principal donde se cargarán las vistas
    contentContainer: null,
    
    // Inicializa el router
    init: function() {
        // Obtener el contenedor principal
        this.contentContainer = document.getElementById('main-content');
        
        if (!this.contentContainer) {
            // Si no existe, crear el contenedor y añadirlo al body
            this.contentContainer = document.createElement('main');
            this.contentContainer.id = 'main-content';
            
            // Insertar después del header
            const header = document.querySelector('header');
            if (header) {
                header.after(this.contentContainer);
            } else {
                document.body.appendChild(this.contentContainer);
            }
        }
        
        // Interceptar clicks en los enlaces de navegación
        document.addEventListener('click', (e) => {
            // Verificar si el click fue en un enlace de navegación
            const navLink = e.target.closest('nav.main-nav a');
            if (navLink) {
                e.preventDefault();
                const url = navLink.getAttribute('href');
                
                // Cambiar la URL sin recargar la página
                window.history.pushState({}, '', url);
                
                // Cargar la vista correspondiente
                this.loadView(url);
            }
        });
        
        // Manejar eventos de navegación del navegador (adelante/atrás)
        window.addEventListener('popstate', () => {
            this.loadView(window.location.pathname);
        });
        
        // Cargar la vista inicial basada en la URL actual
        this.loadView(window.location.pathname);
    },
    
    // Carga la vista correspondiente a la URL
    loadView: function(url) {
        // Convertir ruta de archivo .html a ruta de app
        url = url.replace('.html', '');
        
        // Si la URL no empieza con /, añadirlo
        if (!url.startsWith('/')) {
            url = '/' + url;
        }
        
        // Obtener el ID de la vista
        const viewId = this.routes[url] || 'inicio';
        
        // Cargar la vista
        this.loadViewContent(viewId);
        
        // Actualizar clase activa en la navegación
        this.updateActiveNav(url);
    },
    
    // Actualiza la clase activa en la navegación
    updateActiveNav: function(url) {
        // Remover clase activa de todos los enlaces
        document.querySelectorAll('nav.main-nav a').forEach(link => {
            link.classList.remove('active');
        });
        
        // Añadir clase activa al enlace correspondiente
        const activeLink = document.querySelector(`nav.main-nav a[href="${url}"]`) || 
                            document.querySelector(`nav.main-nav a[href="${url}.html"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    },
    
    // Carga el contenido de la vista
    loadViewContent: function(viewId) {
        // Según el ID de la vista, cargar el contenido correspondiente
        switch(viewId) {
            case 'accesorios':
                this.renderAccesoriosView();
                break;
            case 'ofertas':
                this.renderOfertasView();
                break;
            case 'productos-nuevos':
                this.renderProductosNuevosView();
                break;
            case 'inicio':
            default:
                this.renderHomeView();
                break;
        }
        
        // Scroll hacia arriba después de cambiar de vista
        window.scrollTo(0, 0);
    },
    
    // Renderiza la vista de inicio
    renderHomeView: function() {
        // Rescatar elementos del DOM existentes
        const heroBanner = document.querySelector('.hero-banner');
        const categoriesSection = document.querySelector('.categories-section');
        const modelsSection = document.querySelector('.models-section');
        const offersSection = document.querySelector('.offers-section');
        
        // Limpiar el contenedor
        this.contentContainer.innerHTML = '';
        
        // Comprobar si existen los elementos y añadirlos al contenedor
        if (heroBanner) this.contentContainer.appendChild(heroBanner.cloneNode(true));
        if (categoriesSection) this.contentContainer.appendChild(categoriesSection.cloneNode(true));
        if (modelsSection) this.contentContainer.appendChild(modelsSection.cloneNode(true));
        if (offersSection) this.contentContainer.appendChild(offersSection.cloneNode(true));
        
        // Si no existen, recrearlos (aquí iría el código para recrear el HTML de la página de inicio)
        if (!heroBanner) {
            // Aquí se crearía el HTML para la página de inicio
            // Por ahora, mostrar un mensaje de carga
            this.contentContainer.innerHTML = '<p>Cargando página de inicio...</p>';
        }
        
        // Reinicializar eventos
        configurarBotonesCarrito();
    },
    
    // Renderiza la vista de accesorios
    renderAccesoriosView: function() {
        // Contenido HTML para la vista de accesorios
        const accesoriosHTML = `
            <section class="page-header">
                <div class="container">
                    <h1>Accesorios</h1>
                </div>
            </section>
            
            <section class="accessories-container">
                <div class="filter-sidebar">
                    <h2>Filtrar por</h2>
                    
                    <div class="filter-section">
                        <h3>Categoría</h3>
                        <label class="filter-checkbox">
                            <input type="checkbox" name="category" value="manillares"> Manillares
                        </label>
                        <label class="filter-checkbox">
                            <input type="checkbox" name="category" value="cascos"> Cascos
                        </label>
                        <label class="filter-checkbox">
                            <input type="checkbox" name="category" value="otros"> Otros
                        </label>
                    </div>
                    
                    <div class="filter-section">
                        <h3>Disponibilidad</h3>
                        <label class="filter-checkbox">
                            <input type="checkbox" name="availability" value="en-existencia"> En existencia
                        </label>
                        <label class="filter-checkbox">
                            <input type="checkbox" name="availability" value="agotado"> Agotado
                        </label>
                    </div>
                    
                    <div class="filter-section">
                        <h3>Precio</h3>
                        <div class="price-slider">
                            <input type="range" min="0" max="8000" value="8000" class="slider" id="priceRange">
                            <div class="price-range-labels">
                                <span>$0</span>
                                <span>$8000</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="products-container">
                    <div class="products-grid">
                        <!-- Producto: Manillar de motocicleta -->
                        <div class="product-card">
                            <div class="product-image">
                                <img src="../assets/images/manillar.jpg" alt="Manillar de motocicleta">
                            </div>
                            <div class="product-info">
                                <h3>Manillar de motocicleta</h3>
                                <p class="price">$1,200</p>
                                <button class="add-to-cart" data-id="101" data-name="Manillar de motocicleta" data-price="1200">Agregar al carrito</button>
                            </div>
                        </div>
                        
                        <!-- Producto: Casco LS2 Flame -->
                        <div class="product-card">
                            <div class="product-image">
                                <img src="../assets/images/casco_ls2.jpg" alt="Casco LS2 Flame">
                            </div>
                            <div class="product-info">
                                <h3>Casco LS2 Flame</h3>
                                <p class="price">$3,600</p>
                                <button class="add-to-cart" data-id="102" data-name="Casco LS2 Flame" data-price="3600">Agregar al carrito</button>
                            </div>
                        </div>
                        
                        <!-- Producto: Espejo retrovisor -->
                        <div class="product-card">
                            <div class="product-image">
                                <img src="../assets/images/espejo.jpg" alt="Espejo retrovisor">
                            </div>
                            <div class="product-info">
                                <h3>Espejo retrovisor</h3>
                                <p class="price">$500</p>
                                <button class="add-to-cart" data-id="103" data-name="Espejo retrovisor" data-price="500">Agregar al carrito</button>
                            </div>
                        </div>
                        
                        <!-- Producto: Casco bicolor -->
                        <div class="product-card">
                            <div class="product-image">
                                <img src="../assets/images/casco_bicolor.jpg" alt="Casco bicolor">
                            </div>
                            <div class="product-info">
                                <h3>Casco bicolor</h3>
                                <p class="price">$2,100</p>
                                <button class="add-to-cart" data-id="104" data-name="Casco bicolor" data-price="2100">Agregar al carrito</button>
                            </div>
                        </div>
                        
                        <!-- Producto: Guantes de gamuza -->
                        <div class="product-card">
                            <div class="product-image">
                                <img src="../assets/images/guantes.jpg" alt="Guantes de gamuza">
                            </div>
                            <div class="product-info">
                                <h3>Guantes de gamuza</h3>
                                <p class="price">$900</p>
                                <button class="add-to-cart" data-id="105" data-name="Guantes de gamuza" data-price="900">Agregar al carrito</button>
                            </div>
                        </div>
                        
                        <!-- Producto: Bolsa sobredepósito -->
                        <div class="product-card">
                            <div class="product-image">
                                <img src="../assets/images/bolsa.jpg" alt="Bolsa sobredepósito">
                            </div>
                            <div class="product-info">
                                <h3>Bolsa sobredepósito</h3>
                                <p class="price">$1,500</p>
                                <button class="add-to-cart" data-id="106" data-name="Bolsa sobredepósito" data-price="1500">Agregar al carrito</button>
                            </div>
                        </div>
                        
                        <!-- Producto: Llavero de cuero -->
                        <div class="product-card">
                            <div class="product-image">
                                <img src="../assets/images/llavero.jpg" alt="Llavero de cuero">
                            </div>
                            <div class="product-info">
                                <h3>Llavero de cuero</h3>
                                <p class="price">$300</p>
                                <button class="add-to-cart" data-id="107" data-name="Llavero de cuero" data-price="300">Agregar al carrito</button>
                            </div>
                        </div>
                        
                        <!-- Producto: Casco retro -->
                        <div class="product-card">
                            <div class="product-image">
                                <img src="../assets/images/casco_retro.jpg" alt="Casco retro">
                            </div>
                            <div class="product-info">
                                <h3>Casco retro</h3>
                                <p class="price">$2,100</p>
                                <button class="add-to-cart" data-id="108" data-name="Casco retro" data-price="2100">Agregar al carrito</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
        
        // Establecer el contenido
        this.contentContainer.innerHTML = accesoriosHTML;
        
        // Inicializar eventos de los filtros y botones
        this.initAccesoriosEvents();
        
        // Reconfigurar botones del carrito
        configurarBotonesCarrito();
    },
    
    // Inicializa eventos específicos para la vista de accesorios
    initAccesoriosEvents: function() {
        // Eventos para el slider de precio
        const priceRange = document.getElementById('priceRange');
        if (priceRange) {
            priceRange.addEventListener('input', function() {
                // Actualizar el valor máximo mostrado
                const maxPrice = formatearPrecio(this.value);
                document.querySelector('.price-range-labels').innerHTML = `
                    <span>$0</span>
                    <span>${maxPrice}</span>
                `;
                
                // Aquí iría la lógica para filtrar los productos por precio
                // ...
            });
        }
        
        // Eventos para los checkboxes de filtro
        const filterCheckboxes = document.querySelectorAll('.filter-checkbox input');
        filterCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                // Aquí iría la lógica para filtrar los productos según las selecciones
                // ...
            });
        });
    },
    
    // Renderiza la vista de ofertas (ejemplo simplificado)
    renderOfertasView: function() {
        this.contentContainer.innerHTML = `
            <section class="page-header">
                <div class="container">
                    <h1>Ofertas</h1>
                </div>
            </section>
            
            <section class="offers-section">
                <p>Contenido de ofertas en desarrollo...</p>
            </section>
        `;
    },
    
    // Renderiza la vista de productos nuevos (ejemplo simplificado)
    renderProductosNuevosView: function() {
        this.contentContainer.innerHTML = `
            <section class="page-header">
                <div class="container">
                    <h1>Productos Nuevos</h1>
                </div>
            </section>
            
            <section class="new-products-section">
                <p>Contenido de productos nuevos en desarrollo...</p>
            </section>
        `;
    }
};

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar la tienda (código existente)
    inicializar();
    
    // Inicializar el router SPA
    spaRouter.init();
});