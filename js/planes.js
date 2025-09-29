// js/planes.js

document.addEventListener('DOMContentLoaded', () => {

    // --- BASE DE DATOS DE PLANES ---
    const planes = [
        { id: 1, name: 'Plan Inicial', image: 'p1.jpeg' }, { id: 2, name: 'Plan Detox', image: 'p2.jpeg' },
        { id: 3, name: 'Plan Fitness', image: 'p3.jpeg' }, { id: 4, name: 'Plan Veggie', image: 'p4.jpeg' },
        { id: 5, name: 'Plan Familiar', image: 'p5.jpeg' }, { id: 6, name: 'Plan Aumento', image: 'p6.jpeg' },
        { id: 7, name: 'Plan Descenso', image: 'p7.jpeg' }, { id: 8, name: 'Plan Mantenimiento', image: 'p8.jpeg' },
    ];
    const wspBaseUrl = "https://wa.me/5491112345678?text=Hola%20Nutrive%2C%20quisiera%20consultar%20por%20el%20plan%20de%20la%20imagen";

    // --- FUNCIÓN PARA POBLAR LOS CONTENEDORES ---
    const populatePlans = () => {
        const simpleCarousel = document.querySelector('.simpleCarousel .swiper-wrapper');
        const doubleCarousel = document.querySelector('.doubleCarousel .swiper-wrapper');
        const galleryTop = document.querySelector('.galleryTop .swiper-wrapper');
        const galleryThumbs = document.querySelector('.galleryThumbs .swiper-wrapper');
        const planGrid = document.querySelector('.plan-grid');
        const stackedCarousel = document.querySelector('.stackedCarousel .swiper-wrapper');

        planes.forEach(plan => {
            const imagePath = `./img/planes/${plan.image}`;
            const wspLink = `${wspBaseUrl}%20${plan.id}.`;

            // 1. Carrusel Simple (con modal)
            if (simpleCarousel) simpleCarousel.innerHTML += `<div class="swiper-slide"><div class="plan-card" data-bs-toggle="modal" data-bs-target="#planModal" data-image-src="${imagePath}" data-wsp-link="${wspLink}"><img src="${imagePath}" alt="${plan.name}" class="img-fluid"></div></div>`;
            
            // 2. Carrusel Doble (con WSP directo)
            if (doubleCarousel) doubleCarousel.innerHTML += `<div class="swiper-slide"><div class="plan-card"><img src="${imagePath}" alt="${plan.name}"><div class="overlay"><a href="${wspLink}" target="_blank" class="btn-wsp">${plan.name}</a></div></div></div>`;
            
            // 3. Galería con Miniaturas
            if (galleryTop) galleryTop.innerHTML += `<div class="swiper-slide"><img src="${imagePath}" alt="${plan.name}" /></div>`;
            if (galleryThumbs) galleryThumbs.innerHTML += `<div class="swiper-slide"><img src="${imagePath}" alt="${plan.name}" /></div>`;
            
            // 4. Grid Interactivo
            if (planGrid) planGrid.innerHTML += `<div class="col-lg-3 col-md-4 col-sm-6"><a href="#" class="plan-grid-item" data-bs-toggle="modal" data-bs-target="#planModal" data-image-src="${imagePath}" data-wsp-link="${wspLink}"><img src="${imagePath}" alt="${plan.name}"></a></div>`;
            
            // 5. Tarjetas Superpuestas (con modal)
            if (stackedCarousel) stackedCarousel.innerHTML += `<div class="swiper-slide" style="background-image:url(${imagePath})" data-bs-toggle="modal" data-bs-target="#planModal" data-image-src="${imagePath}" data-wsp-link="${wspLink}"></div>`;
        });
    };

    // --- FUNCIÓN PARA INICIALIZAR LIBRERÍAS Y EVENTOS ---
    const initializeScripts = () => {
        // 1. Carrusel Simple
        new Swiper('.simpleCarousel', { loop: true, grabCursor: true, slidesPerView: 1, spaceBetween: 20, pagination: { el: '.swiper-pagination', clickable: true }, navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }, breakpoints: { 768: { slidesPerView: 2 }, 1200: { slidesPerView: 3 } } });
        
        // 2. Carrusel Doble
        new Swiper('.doubleCarousel', { loop: true, grabCursor: true, slidesPerView: 1.2, spaceBetween: 15, centeredSlides: true, pagination: { el: '.swiper-pagination', clickable: true }, breakpoints: { 768: { slidesPerView: 2, spaceBetween: 30, centeredSlides: false } } });

        // 3. Galería con Miniaturas
        const galleryThumbsSwiper = new Swiper('.galleryThumbs', { spaceBetween: 10, slidesPerView: 4, freeMode: true, watchSlidesProgress: true });
        new Swiper('.galleryTop', { loop: true, spaceBetween: 10, navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }, thumbs: { swiper: galleryThumbsSwiper } });
        
        // 5. Tarjetas Superpuestas (Coverflow)
        new Swiper('.stackedCarousel', { loop: true, effect: 'coverflow', grabCursor: true, centeredSlides: true, slidesPerView: 'auto', coverflowEffect: { rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: true } });
        
        // Lógica del modal (funciona para todos los formatos que lo usan)
        const planModal = document.getElementById('planModal');
        if (planModal) {
            planModal.addEventListener('show.bs.modal', (event) => {
                const trigger = event.relatedTarget;
                const imageSrc = trigger.getAttribute('data-image-src');
                const wspLink = trigger.getAttribute('data-wsp-link');
                planModal.querySelector('#modalPlanImage').src = imageSrc;
                planModal.querySelector('#modalWspButton').href = wspLink;
            });
        }
    };
    
    // --- EJECUCIÓN ---
    populatePlans();
    initializeScripts();
});