// =======================
// PRODUCT SLIDER
// =======================
let currentSlide = 0;
const totalSlides = 3;

const slider = document.getElementById("projectsSlider");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const slideDots = document.querySelectorAll(".slide-dot");

function updateSlider() {
  slider.style.transform = `translateX(-${currentSlide * 100}%)`;

  slideDots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentSlide);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateSlider();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateSlider();
}

if (nextBtn) nextBtn.onclick = nextSlide;
if (prevBtn) prevBtn.onclick = prevSlide;

slideDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentSlide = index;
    updateSlider();
  });
});

// Auto-play
setInterval(nextSlide, 20000);

// =======================
// PROJECT VIDEO CONTROLS
// =======================
const video = document.getElementById("projectVideo");
const toggleBtn = document.getElementById("toggleBtn");
const playIcon = document.getElementById("playIcon");

if (toggleBtn && video) {
  toggleBtn.addEventListener("click", () => {
    if (video.paused) {
      video.play();
      playIcon.textContent = "⏸";
    } else {
      video.pause();
      playIcon.textContent = "▶";
    }
  });
}
