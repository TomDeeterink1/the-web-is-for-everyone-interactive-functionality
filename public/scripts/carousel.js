const articles = document.querySelectorAll('.card');
const container = document.querySelector('.carousel');
const nextButton = document.querySelectorAll('.next');
const previousButton = document.querySelectorAll('.previous');

nextButton.forEach(button => button.addEventListener('click', () => scrollCarousel(-1)));
previousButton.forEach(button => button.addEventListener('click', () => scrollCarousel(1)));

function scrollCarousel(direction) {
    const articleWidth = container.clientWidth;
    const scrollAmount = direction * articleWidth;
    const currentScrollPosition = container.scrollLeft;

    let targetScrollPosition;
    if (direction === 1) {
        targetScrollPosition = currentScrollPosition + articleWidth;
    } else {
        targetScrollPosition = currentScrollPosition - articleWidth;
    }

    container.scrollTo({
        left: targetScrollPosition,
        behavior: 'smooth',
    });
}