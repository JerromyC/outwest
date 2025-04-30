// const track = document.querySelector('.carousel-track');
// const next = document.querySelector('.next');
// const prev = document.querySelector('.prev');
// let index = 0;

// next.addEventListener('click', () => {
//     const totalSlides = track.children.length;
//     if (index < totalSlides - 1) {
//         index++;
//         track.style.transform = `translateX(-${index * 100}%)`;
//     }
// });

// prev.addEventListener('click', () => {
//     if (index > 0) {
//         index--;
//         track.style.transform = `translateX(-${index * 100}%)`;
//     }
// });









// document.addEventListener("DOMContentLoaded", function () {
//     const track = document.querySelector('.carousel-track');
//     const next = document.querySelector('.next');
//     const prev = document.querySelector('.prev');
//     const images = document.querySelectorAll('.carousel-image');
//     const isDesktop = window.innerWidth >= 768;

//     // Calculate image width including margin for desktop
//     const imageWidth = images[0].offsetWidth + 64; // 32px left + right margin

//     let index = isDesktop ? 1 : 0; // Start at 2nd image on desktop
//     track.style.transform = `translateX(-${index * imageWidth}px)`;

//     next.addEventListener('click', () => {
//         if (index < images.length - 1) {
//             index++;
//             track.style.transform = `translateX(-${index * imageWidth}px)`;
//         }
//     });

//     prev.addEventListener('click', () => {
//         if (index > 0) {
//             index--;
//             track.style.transform = `translateX(-${index * imageWidth}px)`;
//         }
//     });

//     window.addEventListener('resize', () => location.reload()); // Resets position on resize
// });






// document.addEventListener("DOMContentLoaded", function () {
//     const track = document.querySelector('.carousel-track');
//     const next = document.querySelector('.next');
//     const prev = document.querySelector('.prev');
//     const images = document.querySelectorAll('.carousel-image');
//     const isDesktop = window.innerWidth >= 768;

//     function getSlideWidth() {
//         return document.querySelector('.carousel-image').getBoundingClientRect().width;
//     }

//     // Clone first and last slides
//     const firstClone = images[0].cloneNode(true);
//     const lastClone = images[images.length - 1].cloneNode(true);
//     firstClone.classList.add('clone');
//     lastClone.classList.add('clone');
//     track.appendChild(firstClone);
//     track.insertBefore(lastClone, images[0]);

//     const updatedImages = document.querySelectorAll('.carousel-image'); // Refresh list
//     let index = isDesktop ? 2 : 1; // Real first image is now at index 1
//     let transitioning = false;

//     // Initial position
//     track.style.transform = `translateX(-${index * getSlideWidth()}px)`;

//     next.addEventListener('click', () => {
//         if (transitioning) return;
//         transitioning = true;
//         index++;
//         track.style.transition = 'transform 0.3s ease-in-out';
//         track.style.transform = `translateX(-${index * getSlideWidth()}px)`;
//     });

//     prev.addEventListener('click', () => {
//         if (transitioning) return;
//         transitioning = true;
//         index--;
//         track.style.transition = 'transform 0.3s ease-in-out';
//         track.style.transform = `translateX(-${index * getSlideWidth()}px)`;
//     });

//     track.addEventListener('transitionend', () => {
//         if (updatedImages[index].classList.contains('clone')) {
//             track.style.transition = 'none';
//             index = updatedImages[index].src.includes(firstClone.src) ? 1 : updatedImages.length - 2;
//             track.style.transform = `translateX(-${index * getSlideWidth()}px)`;
//         }
//         transitioning = false;
//     });

//     let resizeTimeout;
//     window.addEventListener('resize', () => {
//         clearTimeout(resizeTimeout);
//         resizeTimeout = setTimeout(() => {
//             track.style.transition = 'none';
//             track.style.transform = `translateX(-${index * getSlideWidth()}px)`;
//         }, 300);
//     });

// });






document.addEventListener("DOMContentLoaded", function () {
    const track = document.querySelector('.carousel-track');
    const next = document.querySelector('.next');
    const prev = document.querySelector('.prev');
    const images = document.querySelectorAll('.carousel-image');
    let isDesktop = window.innerWidth >= 768; // Initial check for desktop
    let index = isDesktop ? 1 : 0; // Start with second image on desktop, first image on mobile
    let transitioning = false;

    function getSlideWidth() {
        return document.querySelector('.carousel-image').getBoundingClientRect().width;
    }

    // Clone slides only if NOT desktop (i.e., mobile)
    let firstClone, lastClone;
    if (!isDesktop) {
        firstClone = images[0].cloneNode(true);
        lastClone = images[images.length - 1].cloneNode(true);
        firstClone.classList.add('clone');
        lastClone.classList.add('clone');
        track.appendChild(firstClone);
        track.insertBefore(lastClone, images[0]);
    }

    const updatedImages = document.querySelectorAll('.carousel-image');
    
    // Initial position
    track.style.transform = `translateX(-${index * getSlideWidth()}px)`;

    next.addEventListener('click', () => {
        if (transitioning) return;
        if (index >= updatedImages.length - (isDesktop ? 1 : 0)) return; // prevent overflow
        transitioning = true;
        index++;
        track.style.transition = 'transform 0.3s ease-in-out';
        track.style.transform = `translateX(-${index * getSlideWidth()}px)`;
    });

    prev.addEventListener('click', () => {
        if (transitioning) return;
        if (index <= 0) return; // prevent underflow
        transitioning = true;
        index--;
        track.style.transition = 'transform 0.3s ease-in-out';
        track.style.transform = `translateX(-${index * getSlideWidth()}px)`;
    });

    track.addEventListener('transitionend', () => {
        if (!isDesktop && updatedImages[index].classList.contains('clone')) {
            track.style.transition = 'none';
            index = updatedImages[index].src.includes(updatedImages[0].src)
                ? updatedImages.length - 2
                : 1;
            track.style.transform = `translateX(-${index * getSlideWidth()}px)`;
        }
        transitioning = false;
    });

    // Handle resizing dynamically without page reload
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const newIsDesktop = window.innerWidth >= 768;
            if (newIsDesktop !== isDesktop) {
                // Adjust for change between mobile and desktop
                isDesktop = newIsDesktop;
                if (!isDesktop) {
                    // On mobile, ensure the clones are still in place and reset position
                    firstClone = images[0].cloneNode(true);
                    lastClone = images[images.length - 1].cloneNode(true);
                    firstClone.classList.add('clone');
                    lastClone.classList.add('clone');
                    track.appendChild(firstClone);
                    track.insertBefore(lastClone, images[0]);
                } else {
                    // On desktop, remove clones and reset
                    track.style.transition = 'none';
                    track.style.transform = `translateX(-${index * getSlideWidth()}px)`; // Start from the second image on desktop
                }
            }
        }, 300);
    });
});

