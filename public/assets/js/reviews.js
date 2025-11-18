// =======================
// BACKEND API URL
// =======================
const API_URL = "https://crabster-backend.onrender.com/api/reviews";

// =======================
// STAR RATING
// =======================
let selectedRating = 0;
const stars = document.querySelectorAll("#stars i");

stars.forEach((star, i) => {
  star.addEventListener("click", () => {
    selectedRating = i + 1;
    updateStars();
  });
});

function updateStars() {
  stars.forEach((star, i) => {
    if (i < selectedRating) {
      star.classList.add("text-yellow-400");
      star.classList.remove("text-gray-300");
    } else {
      star.classList.add("text-gray-300");
      star.classList.remove("text-yellow-400");
    }
  });
}

// =======================
// SUBMIT REVIEW (POST)
// =======================
async function submitReview() {
  const name = document.getElementById("username").value.trim();
  const service = document.getElementById("service").value;
  const comment = document.getElementById("comment").value.trim();

  if (!name || !service || !comment || selectedRating === 0) {
    alert("Please fill all fields and select a rating.");
    return;
  }

  const payload = {
    name,
    service,
    rating: selectedRating,
    message: comment,
  };

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (data.success) {
      alert("Review submitted successfully!");
      clearForm();
      fetchReviews();
    } else {
      alert("Error: " + data.error);
    }

  } catch (error) {
    alert("Server error: " + error.message);
  }
}

// Reset form
function clearForm() {
  document.getElementById("username").value = "";
  document.getElementById("service").value = "";
  document.getElementById("comment").value = "";
  selectedRating = 0;
  updateStars();
}

// =======================
// FETCH REVIEWS (GET)
// =======================
let reviewsData = [];
let visibleReviews = 4;

async function fetchReviews() {
  try {
    const res = await fetch(API_URL);
    reviewsData = await res.json();
    renderReviews();
  } catch (error) {
    console.error("Failed to fetch reviews", error);
  }
}

// Render reviews
function renderReviews() {
  const container = document.getElementById("reviewsSection");
  container.innerHTML = "";

  const displayed = reviewsData.slice(0, visibleReviews);

  displayed.forEach((review) => {
    container.innerHTML += `
      <div class="review-card">
        <h4 class="font-bold text-orange-700">${review.name}</h4>
        <p class="text-sm text-gray-500">${review.service}</p>
        <div class="flex mt-2 text-yellow-400">
          ${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}
        </div>
        <p class="mt-3 text-gray-700">"${review.message}"</p>
        <p class="text-xs text-gray-400 mt-2">${review.timestamp ? new Date(review.timestamp._seconds * 1000).toLocaleString() : ""}</p>
      </div>
    `;
  });

  document.getElementById("loadMoreBtn").classList.toggle("hidden", reviewsData.length <= visibleReviews);
  document.getElementById("hideBtn").classList.toggle("hidden", visibleReviews <= 4);
}

function loadMore() {
  visibleReviews += 4;
  renderReviews();
}

function hideReviews() {
  visibleReviews = 4;
  renderReviews();
}

// Initial load
fetchReviews();
