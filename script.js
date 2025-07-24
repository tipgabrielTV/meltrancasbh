// Script para o menu hambúrguer
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });
}

// Script para o Lightbox da Galeria
const galleryLightbox = () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('imageLightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let currentIndex = 0;
    let images = [];

    // Coleta todas as URLs das imagens da galeria
    galleryItems.forEach((item, index) => {
        images.push(item.querySelector('img').src);
        item.dataset.index = index; // Armazena o índice original no elemento HTML
    });

    galleryItems.forEach(item => {
        item.addEventListener('click', (e) => {
            currentIndex = parseInt(item.dataset.index); // Pega o índice do item clicado
            lightboxImage.src = images[currentIndex];
            lightbox.classList.add('active'); // Adiciona a classe 'active' para exibir com transição
        });
    });

    closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('active'); // Remove a classe 'active' para esconder com transição
    });

    // Fechar lightbox ao clicar fora da imagem
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
        lightboxImage.src = images[currentIndex];
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
        lightboxImage.src = images[currentIndex];
    });

    // Teclas de navegação (opcional)
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'ArrowLeft') {
                prevBtn.click();
            } else if (e.key === 'ArrowRight') {
                nextBtn.click();
            } else if (e.key === 'Escape') {
                closeBtn.click();
            }
        }
    });
};


// Inicializa os scripts quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    navSlide();
    galleryLightbox();
});
