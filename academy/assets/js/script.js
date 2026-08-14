console.log("Academy ishga tushdi 🚀");

// =============================
// MOBILE MENU
// =============================

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (menuBtn && mobileMenu) {

    menuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
    });

    // Menyudagi link bosilganda menyuni yopish
    const mobileLinks = mobileMenu.querySelectorAll("a");

    mobileLinks.forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.add("hidden");
        });
    });

}