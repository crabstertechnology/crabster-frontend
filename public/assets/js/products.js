document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("projectVideo");
  const videoError = document.getElementById("videoError");

  // If video element is missing, stop the script
  if (!video) {
    console.warn("projectVideo element not found in DOM");
    return;
  }

  // If error element missing, fallback to console
  if (!videoError) {
    console.warn("videoError element not found in DOM");
  }

  video.addEventListener("loadedmetadata", () => {
    console.log("Video loaded");
  });

  video.addEventListener("error", () => {
    console.error("Video failed");

    if (videoError) {
      videoError.style.display = "block";
    }
  });

  video.addEventListener("loadeddata", () => {
    video.play().catch(err => {
      console.log("Autoplay blocked:", err);
    });
  });
});
