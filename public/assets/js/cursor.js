// =======================
// CUSTOM CURSOR
// =======================
const cursor = document.querySelector(".cursor");
const cursorDot = document.querySelector(".cursor-dot");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";

  cursorDot.style.left = e.clientX + "px";
  cursorDot.style.top = e.clientY + "px";
});

// Grow cursor on hover
document.querySelectorAll("a, button").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursor.style.transform = "scale(2)";
    cursor.style.borderColor = "var(--primary)";
  });

  el.addEventListener("mouseleave", () => {
    cursor.style.transform = "scale(1)";
    cursor.style.borderColor = "var(--accent)";
  });
});
