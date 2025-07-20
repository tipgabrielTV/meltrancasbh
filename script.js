document.addEventListener('DOMContentLoaded', () => {
    // --- Menu Hamburguer ---
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    if (burger && nav && navLinks) {
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

    // --- Galeria de Fotos (Lightbox) ---
    const galleryItems = document.querySelectorAll('.gallery-full-grid .gallery-item img');
    const lightbox = document.createElement('div');
    lightbox.classList.add('lightbox');
    document.body.appendChild(lightbox);

    if (galleryItems.length > 0) {
        let currentImageIndex;

        function openLightbox(index) {
            currentImageIndex = index;
            lightbox.innerHTML = `
                <span class="close-btn">&times;</span>
                <span class="prev-btn">&#10094;</span>
                <img src="${galleryItems[currentImageIndex].src}" alt="Trabalho">
                <span class="next-btn">&#10095;</span>
            `;
            lightbox.style.display = 'flex'; // Exibe o lightbox como flex para centralizar
        }

        function closeLightbox() {
            lightbox.style.display = 'none';
        }

        function showNextImage() {
            currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
            lightbox.querySelector('img').src = galleryItems[currentImageIndex].src;
        }

        function showPrevImage() {
            currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
            lightbox.querySelector('img').src = galleryItems[currentImageIndex].src;
        }

        galleryItems.forEach((img, index) => {
            img.addEventListener('click', () => {
                openLightbox(index);
            });
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target.classList.contains('close-btn')) {
                closeLightbox();
            } else if (e.target.classList.contains('next-btn')) {
                showNextImage();
            } else if (e.target.classList.contains('prev-btn')) {
                showPrevImage();
            } else if (e.target === lightbox) { // Fecha clicando fora da imagem
                 closeLightbox();
            }
        });

        // Navegação por teclado
        document.addEventListener('keydown', (e) => {
            if (lightbox.style.display === 'flex') {
                if (e.key === 'ArrowRight') {
                    showNextImage();
                } else if (e.key === 'ArrowLeft') {
                    showPrevImage();
                } else if (e.key === 'Escape') {
                    closeLightbox();
                }
            }
        });
    }

    // --- Formulário de Contato (Exemplo de Validação Básica) ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Evita o envio padrão do formulário

            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const assunto = document.getElementById('assunto').value.trim();
            const mensagem = document.getElementById('mensagem').value.trim();

            if (nome === '' || email === '' || assunto === '' || mensagem === '') {
                alert('Por favor, preencha todos os campos do formulário.');
                return false;
            }

            // Validação de email básica
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor, insira um endereço de e-mail válido.');
                return false;
            }

            // Se tudo estiver OK, você pode enviar o formulário
            // Por exemplo, usando Fetch API para enviar para um backend
            alert('Formulário enviado com sucesso! Entraremos em contato em breve.');
            contactForm.reset(); // Limpa o formulário
            console.log('Dados do formulário:', { nome, email, assunto, mensagem });

            // Aqui você integraria com um serviço de backend (PHP, Node.js, etc.)
            // fetch('seu_backend_url', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ nome, email, assunto, mensagem }),
            // })
            // .then(response => response.json())
            // .then(data => {
            //     console.log('Sucesso:', data);
            //     alert('Mensagem enviada com sucesso!');
            //     contactForm.reset();
            // })
            // .catch((error) => {
            //     console.error('Erro:', error);
            //     alert('Ocorreu um erro ao enviar a mensagem. Tente novamente.');
            // });
        });
    }

    // --- Simulação de Carrossel de Depoimentos (se for implementar automática) ---
    // Isso é apenas um placeholder. Para um carrossel de verdade com botões/auto-play
    // você precisaria de mais lógica. Por enquanto, é apenas rolagem CSS.
});
