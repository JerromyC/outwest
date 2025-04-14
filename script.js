// banner animation -------------------------------------------------
const element = document.querySelector("nav div p");
let toggleText = true;

gsap.to(element, {
    x: "-250%", // Move text completely to the left
    duration: 20, // Speed for one full scroll (in seconds)
    ease: "linear", // Smooth linear movement
    repeat: -1, // Infinite loop
    onRepeat: () => {
        // Alternate text content
        toggleText = !toggleText;
        element.textContent = toggleText
            ? "🌟 10% off your first service 🌟"
            : "🌟 10% off for first responders, teachers, and veterans 🌟";
        
        // Reset position after each loop
        gsap.set(element, { x: "100%" });
    },
});

// // navbar animiation ------------------------------------------------
// const hamburger = document.getElementById('hamburger');
// const navbar = document.getElementById('navbar');
// const defaultSvg = `
// <svg width="250" height="195" viewBox="0 0 250 195" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <rect width="250" height="30" rx="15" fill="#017143"/>
//     <rect y="84" width="250" height="30" rx="15" fill="#017143"/>
//     <rect y="165" width="250" height="30" rx="15" fill="#017143"/>
// </svg>`;

// const openSvg = `
// <svg width="198" height="201" viewBox="0 0 198 201" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <rect x="0.000488281" y="176.777" width="250" height="30" rx="15" transform="rotate(-45 0.000488281 176.777)" fill="#017143"/>
//     <rect x="0.00537109" y="179.782" width="250" height="30" rx="15" transform="rotate(-45 0.00537109 179.782)" fill="#017143"/>
//     <rect x="21.2134" width="250" height="30" rx="15" transform="rotate(45 21.2134 0)" fill="#017143"/>
// </svg>`;
// let menuOpen = false;

// // GSAP timeline for animations
// const toggleMenuAnimation = gsap.timeline({ paused: true, reversed: true });
// toggleMenuAnimation
//     .to(navbar, { ease: "power2.inOut" }); // Fade in the navbar
//     // No need to animate 'display' directly, just control visibility with autoAlpha

// hamburger.addEventListener('click', () => {
//     menuOpen = !menuOpen;

//     if (menuOpen) {
//         // Change to the open state SVG and play the animation
//         hamburger.innerHTML = openSvg;

//         // Make sure the navbar is displayed before playing the animation
//         gsap.set(navbar, { display: "block" });
//         toggleMenuAnimation.play();
//     } else {
//         // Change to the default hamburger SVG and reverse the animation
//         hamburger.innerHTML = defaultSvg;

//         // Reverse the animation
//         toggleMenuAnimation.reverse().eventCallback("onReverseComplete", () => {
//             // Hide navbar after animation completes (once opacity is 0)
//             gsap.set(navbar, { opacity: 0,  display: "none" });
//         });
//     }
// });


const hamburger = document.getElementById('hamburger');
const navbar = document.getElementById('navbar');
let menuOpen = false;

// GSAP Timeline for the menu animation
const menuAnimation = gsap.timeline({ paused: true })
    .to(navbar, { display: 'flex', opacity: 1, duration: 0.3, ease: "power2.out" })
    .reverse(); // Start reversed for closed state

// GSAP Timeline for the SVG hamburger animation
const svgAnimation = gsap.timeline({ paused: true })
    .to(".top", { y: 84, rotate: 45, duration: 0.3, transformOrigin: "center", ease: "power2.inOut" })
    .to(".bottom", { y: -84, rotate: -45, duration: 0.3, transformOrigin: "center", ease: "power2.inOut" }, "<")
    .to(".middle", { opacity: 0, duration: 0.3, ease: "power2.inOut" }, "<");

// Event Listener
hamburger.addEventListener('click', () => {
    menuOpen = !menuOpen;

    if (menuOpen) {
        menuAnimation.play(); // Open menu
        svgAnimation.play();  // Animate to "X"
    } else {
        menuAnimation.reverse(); // Close menu
        svgAnimation.reverse();  // Animate back to hamburger
    }
});