document.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  if (window.scrollY > 333) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const fullscreenMenu = document.querySelector('.fullscreen-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        fullscreenMenu.classList.toggle('active');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 1080) {
            if (currentScrollY > lastScrollY) {
                // Scrolling down
                header.classList.remove('visible');
                header.classList.add('hidden');
            } else {
                // Scrolling up
                header.classList.remove('hidden');
                header.classList.add('visible');
            }
        } else {
            // Reset to default when above 666px
            header.classList.remove('hidden', 'visible');
        }

        lastScrollY = currentScrollY;
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab');
    const carousels = document.querySelectorAll('.carousel');
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');
    const dots = document.querySelectorAll('.dot');
    const dropdown = document.getElementById('mobile-tabs');

    let currentTab = 'transport';
    let currentSlide = 0;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentTab = tab.dataset.tab;

            carousels.forEach(carousel => {
                carousel.style.display = carousel.id === currentTab ? 'flex' : 'none';
            });

            currentSlide = 0;
            updateCarousel();
        });
    });

    dropdown.addEventListener('change', () => {
        currentTab = dropdown.value;

        carousels.forEach(carousel => {
            carousel.style.display = carousel.id === currentTab ? 'flex' : 'none';
        });

        currentSlide = 0;
        updateCarousel();
    });

    function updateCarousel() {
        const activeCarousel = document.querySelector(`#${currentTab}`);
        const totalSlides = activeCarousel.children.length;

        // Calculate the width of a single card
        const cardWidth = activeCarousel.children[0].offsetWidth + 16; // Add gap
        activeCarousel.style.transform = `translateX(-${currentSlide * cardWidth}px)`;

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });

        prevButton.disabled = currentSlide === 0;
        nextButton.disabled = currentSlide >= totalSlides - Math.floor(activeCarousel.offsetWidth / cardWidth);
    }

    prevButton.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
            updateCarousel();
        }
    });

    nextButton.addEventListener('click', () => {
        const activeCarousel = document.querySelector(`#${currentTab}`);
        const cardWidth = activeCarousel.children[0].offsetWidth + 16; // Add gap
        const maxSlides = Math.floor(activeCarousel.offsetWidth / cardWidth);

        if (currentSlide < activeCarousel.children.length - maxSlides) {
            currentSlide++;
            updateCarousel();
        }
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateCarousel();
        });
    });

    // Initialize
    carousels.forEach(carousel => {
        carousel.style.display = carousel.id === currentTab ? 'flex' : 'none';
    });
    updateCarousel();
});
