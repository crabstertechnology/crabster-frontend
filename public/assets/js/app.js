// =======================
// AOS INIT
// =======================
AOS.init({
  duration: 900,
  once: true,
});

// =======================
// SCROLL PROGRESS BAR
// =======================
window.onscroll = function () {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;

  document.getElementById("myBar").style.width = scrolled + "%";
};
