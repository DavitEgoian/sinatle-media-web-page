// Merch Carousel Navigation
document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.getElementById("merch-carousel");
    const leftBtn = document.getElementById("scroll-left");
    const rightBtn = document.getElementById("scroll-right");

    if (carousel && leftBtn && rightBtn) {
        // Calculate amount dynamically based on first card
        const getScrollAmount = () => {
            const firstCard = carousel.querySelector('.snap-center');
            return firstCard ? firstCard.clientWidth + 48 : 398;
        };

        leftBtn.addEventListener("click", () => {
            carousel.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
        });

        rightBtn.addEventListener("click", () => {
            carousel.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
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