// js/script.js (Versión Completa y Corregida)

document.addEventListener('DOMContentLoaded', () => {

    // =========================================================================
    // FUNCIÓN 1: GENERADOR DINÁMICO DEL CATÁLOGO DE MENÚ
    // =========================================================================
    const generateProductCards = () => {
        const menuConfig = {
            bebida: { count: 2, price: '$750' },
            sopas:   { count: 4, price: '$980' },
            tartas:  { count: 6, price: '$1,200' },
            varios:  { count: 17, price: '$1,500' }
        };
        const productGrid = document.getElementById('product-grid');

        if (!productGrid) return; // Si no hay grilla, no hace nada.

        productGrid.innerHTML = '';
        for (const category in menuConfig) {
            const data = menuConfig[category];
            for (let i = 1; i <= data.count; i++) {
                const card = document.createElement('div');
                card.className = 'col-lg-4 col-md-6 product-card';
                card.setAttribute('data-category', category);
                const imagePath = `img/menues/comida/${category}/${i}.png`;
                card.innerHTML = `
                    <div class="card-inner">
                        <img src="${imagePath}" alt="${category} saludable ${i}">
                        <div class="product-overlay"><span class="product-price">${data.price}</span></div>
                    </div>`;
                productGrid.appendChild(card);
            }
        }
    };

    // =========================================================================
    // FUNCIÓN 2: LÓGICA DE FILTROS PARA EL CATÁLOGO
    // =========================================================================
    const setupMenuFilters = () => {
        const filterButtons = document.querySelectorAll('#filter-buttons .filter-btn');
        const productCards = document.querySelectorAll('#product-grid .product-card');

        if (filterButtons.length === 0 || productCards.length === 0) return;

        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const filter = e.currentTarget.getAttribute('data-filter');
                filterButtons.forEach(btn => btn.classList.remove('active'));
                e.currentTarget.classList.add('active');
                productCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.classList.remove('hide');
                    } else {
                        card.classList.add('hide');
                    }
                });
            });
        });
    };

   
    // =========================================================================
    // FUNCIÓN 4: LÓGICA PARA INTERACTIVIDAD (FLIP CARDS Y ANIMACIONES)
    // =========================================================================
    const setupInteractivity = () => {
        // --- Lógica para Flip Cards en móvil ---
        const flipCards = document.querySelectorAll('.flip-card');
        flipCards.forEach(card => {
            card.addEventListener('click', function() {
                if (window.innerWidth < 992) {
                    this.classList.toggle('is-flipped');
                }
            });
        });

        // --- Lógica para animaciones al hacer scroll ---
        const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
        if (elementsToAnimate.length > 0) {
            const scrollObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const delay = entry.target.dataset.delay || 0;
                        setTimeout(() => {
                            entry.target.classList.add('is-visible');
                        }, delay);
                        observer.unobserve(entry.target);
                    }
                });
            }, { rootMargin: '0px 0px -100px 0px' });
            elementsToAnimate.forEach(el => scrollObserver.observe(el));
        }
    };
     // =========================================================================
    // FUNCIÓN PARA LA LÓGICA DEL MODAL DE PLANES
    // =========================================================================
    const setupPlanModal = () => {
        const planModal = document.getElementById('planModal');
        if (planModal) {
            planModal.addEventListener('show.bs.modal', (event) => {
                // Botón o link que activó el modal
                const triggerElement = event.relatedTarget;

                // Extraer la información desde los atributos data-*
                const imageSrc = triggerElement.getAttribute('data-image-src');
                const wspLink = triggerElement.getAttribute('data-wsp-link');

                // Encontrar los elementos dentro del modal para actualizarlos
                const modalImage = planModal.querySelector('#modalPlanImage');
                const modalWspButton = planModal.querySelector('#modalWspButton');

                // Actualizar el contenido del modal
                modalImage.src = imageSrc;
                modalWspButton.href = wspLink;
            });
        }
    };


    // =========================================================================
    // EJECUCIÓN DE TODAS LAS FUNCIONES AL CARGAR LA PÁGINA
    // =========================================================================
    generateProductCards();
    setupMenuFilters();
    setupInteractivity();
     setupPlanModal();

}); // <-- FIN DEL ÚNICO 'DOMContentLoaded'