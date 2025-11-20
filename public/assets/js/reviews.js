// assets/js/reviews.js
// Safe, component-aware reviews initializer

// =======================
// CONFIG
// =======================
const API_URL = "https://crabster-backend.onrender.com/api/reviews";

// Internal state
let selectedRating = 0;
let reviewsData = [];
let visibleReviews = 4;

// AOS - if AOS is already loaded on the page this will be a no-op
function ensureAOS() {
  if (window.AOS && typeof AOS.init === "function") {
    AOS.init({ duration: 800, once: true, offset: 100 });
  }
}

// =======================
// DOM HELPERS
// =======================
function qs(selector) { return document.querySelector(selector); }
function qsa(selector) { return Array.from(document.querySelectorAll(selector)); }

// =======================
// STAR RATING SETUP
// =======================
function setupStars() {
  const starsContainer = qs("#stars");
  if (!starsContainer) return;

  const stars = starsContainer.querySelectorAll("i");
  function highlightStars(rating) {
    stars.forEach((s, i) => {
      s.classList.toggle("active", i < rating);
    });
  }

  stars.forEach((star, i) => {
    star.addEventListener("click", () => {
      selectedRating = i + 1;
      highlightStars(selectedRating);
    });
    star.addEventListener("mouseenter", () => highlightStars(i + 1));
  });

  starsContainer.addEventListener("mouseleave", () => {
    highlightStars(selectedRating);
  });
}

// =======================
// FORM ACTIONS
// =======================

async function submitReview() {
  const nameEl = qs("#username");
  const serviceEl = qs("#service");
  const commentEl = qs("#comment");

  const name = nameEl ? nameEl.value.trim() : "";
  const service = serviceEl ? serviceEl.value : "";
  const comment = commentEl ? commentEl.value.trim() : "";

  if (!name || !service || !comment || selectedRating === 0) {
    alert("Please fill all fields and select a rating.");
    return;
  }

  const payload = { name, service, rating: selectedRating, message: comment };

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
      await fetchReviews();
    } else {
      alert("Error: " + (data.error || "Unknown error"));
    }
  } catch (err) {
    alert("Server error: " + err.message);
    console.error(err);
  }
}

function clearForm() {
  const nameEl = qs("#username");
  const serviceEl = qs("#service");
  const commentEl = qs("#comment");
  if (nameEl) nameEl.value = "";
  if (serviceEl) serviceEl.value = "";
  if (commentEl) commentEl.value = "";
  selectedRating = 0;
  const starsContainer = qs("#stars");
  if (starsContainer) {
    starsContainer.querySelectorAll("i").forEach(s => s.classList.remove("active"));
  }
}

// =======================
// FETCH + RENDER REVIEWS
// =======================
async function fetchReviews() {
  const container = qs("#reviewsSection");
  if (!container) return;

  try {
    const res = await fetch(API_URL);
    reviewsData = await res.json();
    renderReviews();
  } catch (err) {
    console.error("Failed to fetch reviews", err);
    container.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1;">
        <i class="fas fa-exclamation-circle"></i>
        <p>Failed to load reviews. Please try again later.</p>
      </div>
    `;
    qs("#loadMoreBtn")?.classList.add("hidden");
    qs("#hideBtn")?.classList.add("hidden");
  }
}

function renderReviews() {
  const container = qs("#reviewsSection");
  if (!container) return;

  container.innerHTML = "";

  if (!Array.isArray(reviewsData) || reviewsData.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1;">
        <i class="fas fa-comments"></i>
        <p>No reviews yet. Be the first to share your experience!</p>
      </div>
    `;
    qs("#loadMoreBtn")?.classList.add("hidden");
    qs("#hideBtn")?.classList.add("hidden");
    return;
  }

  const displayed = reviewsData.slice(0, visibleReviews);
  displayed.forEach((review) => {
    const timestamp = review.timestamp
      ? (review.timestamp._seconds ? new Date(review.timestamp._seconds * 1000).toLocaleString() : new Date(review.timestamp).toLocaleString())
      : "";
    const starsHtml = '<i class="fas fa-star"></i>'.repeat(review.rating || 0);
    container.insertAdjacentHTML('beforeend', `
      <div class="review-card" data-aos="fade-up">
        <div class="review-header">
          <span class="reviewer-name">${escapeHtml(review.name)}</span>
          <div class="review-rating">${starsHtml}</div>
        </div>
        <span class="review-service">${escapeHtml(review.service)}</span>
        <p class="review-comment">"${escapeHtml(review.message)}"</p>
        ${timestamp ? `<p class="review-timestamp">${escapeHtml(timestamp)}</p>` : ''}
      </div>
    `);
  });

  qs("#loadMoreBtn")?.classList.toggle("hidden", reviewsData.length <= visibleReviews);
  qs("#hideBtn")?.classList.toggle("hidden", visibleReviews <= 4);

  if (window.AOS && typeof AOS.refresh === "function") AOS.refresh();
}

// simple escape to avoid injection when rendering
function escapeHtml(text = "") {
  return String(text).replace(/[&<>"']/g, (m) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}

function loadMore() {
  visibleReviews += 4;
  renderReviews();
}
function hideReviews() {
  visibleReviews = 4;
  renderReviews();
  qs("#feedback")?.scrollIntoView({ behavior: "smooth" });
}

// =======================
// initReviews() - call this AFTER the reviews component is in the DOM
// =======================
function initReviews() {
  ensureAOS();
  setupStars();

  // wire submit button safely
  const submitBtn = qs(".submit-btn");
  if (submitBtn) {
    submitBtn.addEventListener("click", (e) => {
      e.preventDefault();
      submitReview();
    });
  }

  // wire load/hide buttons (in case markup exists)
  const loadBtn = qs("#loadMoreBtn");
  if (loadBtn) loadBtn.addEventListener("click", loadMore);

  const hideBtn = qs("#hideBtn");
  if (hideBtn) hideBtn.addEventListener("click", hideReviews);

  // finally fetch reviews
  fetchReviews();
}

// expose globally so index.html can call it after component load
window.initReviews = initReviews;
window.loadMore = loadMore;
window.hideReviews = hideReviews;
window.submitReview = submitReview;
