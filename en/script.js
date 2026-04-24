// Merch Carousel Navigation
document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.getElementById("merch-carousel");
    const leftBtn = document.getElementById("scroll-left");
    const rightBtn = document.getElementById("scroll-right");

    if (carousel && leftBtn && rightBtn) {
        const scrollAmount = 350 + 48; // card width + gap (approx)

        leftBtn.addEventListener("click", () => {
            carousel.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        });

        rightBtn.addEventListener("click", () => {
            carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });

        // Update button states on scroll
        const updateButtons = () => {
            if (carousel.scrollLeft <= 0) {
                leftBtn.disabled = true;
                leftBtn.classList.add("opacity-30", "pointer-events-none");
            } else {
                leftBtn.disabled = false;
                leftBtn.classList.remove("opacity-30", "pointer-events-none");
            }

            if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 1) {
                rightBtn.disabled = true;
                rightBtn.classList.add("opacity-30", "pointer-events-none");
            } else {
                rightBtn.disabled = false;
                rightBtn.classList.remove("opacity-30", "pointer-events-none");
            }
        };

        carousel.addEventListener("scroll", updateButtons);
        // Initial state
        updateButtons();
    }
});