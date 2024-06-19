/*Search Bar*/
document.addEventListener('DOMContentLoaded', () => {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        dropdown.querySelector('.dropbutton').addEventListener('click', function() {
            dropdowns.forEach(dd => {
                if (dd !== dropdown) {
                    dd.classList.remove('show');
                }
            });
            dropdown.classList.toggle('show');
        });
    });

    window.addEventListener('click', function(event) {
        if (!event.target.matches('.dropbutton')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('show');
            });
        }
    });
});

/*Buttons Choice*/
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.buttonchoice');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
});

/*Burger*/
document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('menu-burger');
    const sideMenu = document.getElementById('side-menu');

    menuButton.addEventListener('click', () => {
        menuButton.classList.toggle('change');
        sideMenu.classList.toggle('open');
    });
});

/*Filtres Mobile*/
document.addEventListener('DOMContentLoaded', () => {
    const filterBtn = document.getElementById('filter-btn');
    const filters = document.getElementById('filters');

    filterBtn.addEventListener('click', () => {
        filters.style.display = filters.style.display === 'none' || filters.style.display === '' ? 'block' : 'none';
    });
});

/*Carousel*/
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;
    let startX, isDragging = false, currentTranslate = 0, prevTranslate = 0, animationID;

    function updateCarousel() {
        const width = carousel.clientWidth;
        carousel.style.transform = `translateX(-${currentIndex * width}px)`;
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            currentIndex = parseInt(e.target.getAttribute('data-index'));
            updateCarousel();
        });
    });

    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }

    function startDragging(event) {
        isDragging = true;
        startX = getPositionX(event);
        prevTranslate = currentTranslate;
        carousel.style.cursor = 'grabbing';
        animationID = requestAnimationFrame(animation);
    }

    function stopDragging() {
        if (!isDragging) return;
        cancelAnimationFrame(animationID);
        isDragging = false;
        carousel.style.cursor = 'grab';

        const movedBy = currentTranslate - prevTranslate;
        if (movedBy < -100 && currentIndex < dots.length - 1) currentIndex += 1;
        if (movedBy > 100 && currentIndex > 0) currentIndex -= 1;

        updateCarousel();
    }

    function dragging(event) {
        if (isDragging) {
            const currentPosition = getPositionX(event);
            currentTranslate = prevTranslate + currentPosition - startX;
            carousel.style.transform = `translateX(${currentTranslate}px)`;
        }
    }

    function animation() {
        if (isDragging) requestAnimationFrame(animation);
    }

    carousel.addEventListener('mousedown', startDragging);
    carousel.addEventListener('touchstart', startDragging);
    carousel.addEventListener('mouseup', stopDragging);
    carousel.addEventListener('touchend', stopDragging);
    carousel.addEventListener('mouseleave', stopDragging);
    carousel.addEventListener('mousemove', dragging);
    carousel.addEventListener('touchmove', dragging);

    window.addEventListener('resize', updateCarousel);
    updateCarousel();
});