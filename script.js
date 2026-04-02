// Initialize Animate On Scroll (AOS)
AOS.init({
    once: true,
    offset: 50,
    duration: 600,
    easing: 'ease-out-cubic',
});

// Donation Tabs Logic
function switchTab(type) {
    const btnMonthly = document.getElementById('tab-monthly');
    const btnOnce = document.getElementById('tab-once');
    const prices = document.querySelectorAll('.tier-price');
    const periods = document.querySelectorAll('.tier-period');

    const activeClasses = ['bg-safeGreen', 'text-bgYellow'];
    const inactiveClasses = ['text-safeGreen', 'bg-transparent', 'hover:bg-fadedRed'];

    if (type === 'monthly') {
        btnMonthly.classList.add(...activeClasses);
        btnMonthly.classList.remove(...inactiveClasses);
        btnOnce.classList.remove(...activeClasses);
        btnOnce.classList.add(...inactiveClasses);

        prices.forEach(price => {
            price.childNodes[0].nodeValue = price.getAttribute('data-monthly');
        });
        periods.forEach(period => {
            period.style.display = 'inline';
        });
    } else {
        btnOnce.classList.add(...activeClasses);
        btnOnce.classList.remove(...inactiveClasses);
        btnMonthly.classList.remove(...activeClasses);
        btnMonthly.classList.add(...inactiveClasses);

        prices.forEach(price => {
            price.childNodes[0].nodeValue = price.getAttribute('data-once');
        });
        periods.forEach(period => {
            period.style.display = 'none';
        });
    }
}

// Add to Cart Simulation
let toastTimeout;
function addToCart(event) {
    event.stopPropagation();
    event.preventDefault();

    const toast = document.getElementById('cart-toast');
    
    // reset animation
    toast.classList.remove('translate-y-40', 'opacity-0');
    clearTimeout(toastTimeout);

    // hide after 3 seconds
    toastTimeout = setTimeout(() => {
        toast.classList.add('translate-y-40', 'opacity-0');
    }, 3000);
}

// Load 12 more merch items
document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById('merch-grid');
    
    // UI Loading state

    // Specific typical merch items mapped out
    const typicalMerch = [
        { name: "Classic Logo Hoodie", desc: "Heavyweight Boxy Fit", price: 120, img: "https://i.pinimg.com/1200x/d0/21/06/d02106563a06c931b808a7bd801dd99a.jpg" },
        { name: "Protest Utility Beanie", desc: "100% Cotton Rib knit", price: 35, img: "https://i.pinimg.com/736x/ad/9c/80/ad9c804ff247daba9807806b9c3f585b.jpg" },
        { name: "Press Badge Lanyard", desc: "Woven Nylon with Metal Clip", price: 20, img: "https://i.pinimg.com/1200x/7f/bc/80/7fbc8030a6bca3e34d66cb221f1f0d0f.jpg" },
        { name: "Sinatle Zine Vol. 1", desc: "Printed Investigations Archive", price: 45, img: "https://i.pinimg.com/736x/bf/04/c7/bf04c7b6c93f2309ed27a418ee4e943d.jpg" },
        { name: "Enamel Pin Set", desc: "TV, Camera, and Logo", price: 25, img: "https://i.pinimg.com/736x/28/86/a6/2886a6aba70f23d3369eda7c494c7912.jpg" }, 
        { name: "Oversized 'Truth' Jacket", desc: "Vintage Wash Denim", price: 180, img: "https://i.pinimg.com/1200x/de/56/4f/de564fdb94a54a16ed5ecdcf64e8387d.jpg" },
        { name: "Nylon Reporter Bag", desc: "Water-resistant, multiple zips", price: 90, img: "https://i.pinimg.com/1200x/12/1e/45/121e45d691ca716e22d476411eeb526d.jpg" },
        { name: "Bumper Sticker Pack", desc: "6-pack Die Cut Vinyl", price: 15, img: "https://i.pinimg.com/736x/51/e5/cc/51e5cc62488000c4839e2ac660273285.jpg" },
        { name: "Tape Dispenser", desc: "Industrial Grade, Custom Red", price: 40, img: "https://i.pinimg.com/736x/0f/b4/6f/0fb46f1ba8f98cefbe2e8187864f26d2.jpg" },
        { name: "Journalist Notebook", desc: "A5 Dotted, Hardcover", price: 30, img: "https://i.pinimg.com/736x/ac/03/3b/ac033b9442ec641459d87c3c168d4b6f.jpg" },
        { name: "Signal Jammer Poster", desc: "A2 Risograph Print", price: 50, img: "/img/6-1.png" }, 
        { name: "Dad Cap", desc: "Embroidered Front & Back", price: 45, img: "https://i.pinimg.com/1200x/ab/2a/f8/ab2af89df20e461f58eb30c0d92ff137.jpg" }
    ];

    
        let newItemsHTML = '';
        
        typicalMerch.forEach((item) => {
            newItemsHTML += `
                <div class="border-[6px] border-textDark bg-bgOffWhite flex flex-col group p-4">
                    <div class="aspect-[4/5] border-[4px] border-textDark relative overflow-hidden bg-textDark flex items-center justify-center mb-6">
                        <img src="${item.img}" alt="${item.name}" class="object-cover w-full h-full opacity-90 group-hover:opacity-100 transition-all duration-500 z-10 p-2 transform group-hover:scale-105">
                        <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-50 z-20 pointer-events-none"></div>
                        <button class="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-accentGreen text-bgOffWhite px-6 py-3 font-sans font-bold uppercase tracking-widest border-[3px] border-bgOffWhite z-30 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap" onclick="addToCart(event)">Add to Cart</button>
                    </div>
                    <div class="p-6">
                        <h3 class="font-display text-4xl uppercase tracking-wider leading-none">${item.name}</h3>
                        <p class="font-body text-sm font-medium mt-2 text-textDark uppercase">${item.desc}</p>
                        <div class="font-display text-4xl mt-4 text-accentGreen">₾${item.price}</div>
                    </div>
                </div>
            `;
        });

        grid.insertAdjacentHTML('beforeend', newItemsHTML);AOS.refresh(); });



