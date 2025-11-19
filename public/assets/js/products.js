const video = document.getElementById("projectVideo");
const videoError = document.getElementById("videoError");

video.addEventListener("loadedmetadata", () => {
  console.log("Video loaded");
});

video.addEventListener("error", () => {
  console.error("Video failed");
  videoError.style.display = "block";
});

video.addEventListener("loadeddata", () => {
  video.play().catch(err => console.log("Autoplay blocked:", err));
});
