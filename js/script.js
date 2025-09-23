// js/script.js

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. CONFIGURACIÓN DEL MENÚ ---
    // Aquí le decimos a JS cuántos productos hay en cada categoría.
    // ¡Esta es la única parte que necesitas actualizar en el futuro!
    const menuConfig = {
        bebida: { count: 2, price: '$750' },
        sopas:   { count: 4, price: '$980' },
        tartas:  { count: 6, price: '$1,200' },
        varios:  { count: 17, price: '$1,500' }
    };

    const productGrid = document.getElementById('product-grid');
    
    // --- 2. FUNCIÓN PARA GENERAR TODAS LAS TARJETAS DE PRODUCTO ---
    const generateProductCards = () => {
        // Limpiamos la grilla por si acaso
        productGrid.innerHTML = ''; 

        // Iteramos sobre cada categoría en nuestra configuración
        for (const category in menuConfig) {
            const categoryData = menuConfig[category];
            
            // Creamos un bucle para cada producto dentro de la categoría
            for (let i = 1; i <= categoryData.count; i++) {
                // Creamos el elemento HTML para la tarjeta
                const card = document.createElement('div');
                card.className = 'col-lg-4 col-md-6 product-card';
                card.setAttribute('data-category', category);

                // Definimos la ruta de la imagen
                // NOTA: Tu ruta era 'img/menues/comida', la ajusté aquí.
                const imagePath = `img/menues/comida/${category}/${i}.png`;

                // Usamos plantillas literales (``) para construir el HTML interno fácilmente
                card.innerHTML = `
                    <div class="card-inner">
                        <img src="${imagePath}" alt="${category} saludable ${i}">
                        <div class="product-overlay">
                            <span class="product-price">${categoryData.price}</span>
                        </div>
                    </div>
                `;

                // Añadimos la tarjeta completa a la grilla
                productGrid.appendChild(card);
            }
        }
    };

    // --- 3. LÓGICA DE LOS FILTROS (ahora funciona con los elementos creados) ---
    const setupFilters = () => {
        const filterButtons = document.querySelectorAll('#filter-buttons .filter-btn');
        const productCards = document.querySelectorAll('#product-grid .product-card');

        const handleFilterClick = (e) => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');

            const filterCategory = e.target.getAttribute('data-filter');

            productCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (filterCategory === 'all' || cardCategory === filterCategory) {
                    card.classList.remove('hide');
                } else {
                    card.classList.add('hide');
                }
            });
        };

        filterButtons.forEach(button => {
            button.addEventListener('click', handleFilterClick);
        });
    };

    // --- 4. INICIALIZACIÓN ---
    generateProductCards(); // Primero, creamos los productos
    setupFilters();         // Luego, activamos los filtros para que los encuentren

// js/script.js (Añadir al final)

// --- Inicialización del Carrusel de Planes ---
// js/script.js (Reemplazar el código de Swiper)

// --- Inicialización del Carrusel de Planes (VERSIÓN MEJORADA) ---
const planSwiper = new Swiper('.planSwiper', {
    loop: true,
    grabCursor: true,

    // --- Configuración para MÓVILES (la más importante) ---
    slidesPerView: 1.2, // Muestra 1 tarjeta completa y un poco de la siguiente
    spaceBetween: 15,   // Espacio reducido para móviles
    centeredSlides: true, // La tarjeta activa siempre está en el centro

    // --- Configuración para pantallas más grandes (Breakpoints) ---
    breakpoints: {
        // cuando la pantalla es >= 576px (móviles grandes)
        576: {
            slidesPerView: 2,
            spaceBetween: 20,
            centeredSlides: false, // Ya no es necesario centrar
        },
        // cuando la pantalla es >= 768px (tablets)
        768: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
        // cuando la pantalla es >= 992px (escritorio)
        992: {
            slidesPerView: 4,
            spaceBetween: 30,
        },
    },

    // Módulos de navegación (flechas)
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

});