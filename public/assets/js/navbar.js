// =======================
// WAIT FOR HEADER TO LOAD
// =======================
function initNavbar() {
    const header = document.getElementById("header");
    const menuBtn = document.getElementById("menu-btn");
    const closeMenu = document.getElementById("close-menu");
    const mobileNav = document.getElementById("mobile-nav");

    // If header not loaded yet (component fetch delay), wait and retry
    if (!header) {
        requestAnimationFrame(initNavbar);
        return;
    }

    // =======================
    // HEADER STICKY EFFECT
    // =======================
    window.addEventListener("scroll", () => {
        if (window.scrollY > 20) {
            header.classList.add("header-active");
        } else {
            header.classList.remove("header-active");
        }
    });

    // =======================
    // MOBILE MENU OPEN
    // =======================
    if (menuBtn) {
        menuBtn.addEventListener("click", () => {
            mobileNav.classList.add("active");
        });
    }

    // =======================
    // MOBILE MENU CLOSE
    // =======================
    if (closeMenu) {
        closeMenu.addEventListener("click", () => {
            mobileNav.classList.remove("active");
        });
    }

    // =======================
    // CLOSE MENU WHEN LINK CLICKED
    // =======================
    document.querySelectorAll(".mobile-nav-link").forEach((link) => {
        link.addEventListener("click", () => {
            mobileNav.classList.remove("active");
        });
    });
}

// Start navbar logic after DOM is ready
document.addEventListener("DOMContentLoaded", initNavbar);
