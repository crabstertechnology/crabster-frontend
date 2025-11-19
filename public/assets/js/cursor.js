// =======================
// ADVANCED CUSTOM CURSOR
// =======================

const cursor = document.querySelector(".cursor");
const cursorDot = document.querySelector(".cursor-dot");

// Smooth movement position
document.addEventListener("mousemove", (e) => {
  const x = e.pageX;
  const y = e.pageY;

  cursor.style.transform = `translate(${x}px, ${y}px)`;
  cursorDot.style.transform = `translate(${x}px, ${y}px)`;
});

// Click expand animation
document.addEventListener("click", () => {
  cursor.classList.add("expand");
  setTimeout(() => cursor.classList.remove("expand"), 300);
});

// Hover animations
document.querySelectorAll("a, button").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursor.classList.add("scale-150");
    cursorDot.classList.add("scale-0");
  });

  el.addEventListener("mouseleave", () => {
    cursor.classList.remove("scale-150");
    cursorDot.classList.remove("scale-0");
  });
});
