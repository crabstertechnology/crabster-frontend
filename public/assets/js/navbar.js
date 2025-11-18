// =======================
// MOBILE MENU TOGGLE
// =======================
const menuBtn = document.getElementById("menu-btn");
const closeMenu = document.getElementById("close-menu");
const mobileNav = document.getElementById("mobile-nav");

if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    mobileNav.classList.add("active");
  });
}

if (closeMenu) {
  closeMenu.addEventListener("click", () => {
    mobileNav.classList.remove("active");
  });
}

// Close menu when clicking a link
document.querySelectorAll(".mobile-nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("active");
  });
});

// =======================
// STICKY HEADER ON SCROLL
// =======================
const header = document.getElementById("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    header.style.background = "rgba(255,255,255,0.9)";
    header.style.backdropFilter = "blur(12px)";
    header.style.boxShadow = "0 3px 18px rgba(0,0,0,0.1)";
  } else {
    header.style.background = "transparent";
    header.style.boxShadow = "none";
  }
});
