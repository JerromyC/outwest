const track = document.querySelector('.carousel-track');
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');
let index = 0;

next.addEventListener('click', () => {
    const totalSlides = track.children.length;
    if (index < totalSlides - 1) {
        index++;
        track.style.transform = `translateX(-${index * 100}%)`;
    }
});

prev.addEventListener('click', () => {
    if (index > 0) {
        index--;
        track.style.transform = `translateX(-${index * 100}%)`;
    }
});

