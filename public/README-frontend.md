📘 CRABSTER-FRONTEND
Modern Modular Website Frontend (HTML • TailwindCSS • JS Components)

This project contains the complete frontend for Crabster Technology’s official website, built using a modular component-based HTML structure with TailwindCSS, custom animations, and dynamic JS loaders.

🚀 Project Overview

The frontend is designed to be:

Modular → Each section (Hero, Services, Products, Founder, Reviews, Contact, Footer) is stored as a separate component.

Lightweight → No frameworks, just pure HTML + Tailwind + JS.

Scalable → Easily add or modify components without touching the main layout.

SEO Optimized → Includes sitemap, robots, meta tags.

Interactive → Custom animations, slider, custom cursor, AOS scroll animations, and more.

📁 Final Project Structure
CRABSTER-FRONTEND/
│
├── public/
│   ├── assets/
│   │   ├── css/
│   │   │   ├── animations.css
│   │   │   ├── components.css
│   │   │   └── main.css
│   │   ├── images/
│   │   │   ├── 1.jpg
│   │   │   ├── 2.jpg
│   │   │   ├── logo.png
│   │   │   ├── p.jpg
│   │   │   └── sasi.jpg
│   │   ├── js/
│   │   │   ├── app.js
│   │   │   ├── cursor.js
│   │   │   ├── navbar.js
│   │   │   ├── reviews.js
│   │   │   └── slider.js
│   │   └── videos/
│   │       └── *.mp4
│   │
│   ├── components/
│   │   ├── contact.html
│   │   ├── footer.html
│   │   ├── founders.html
│   │   ├── header.html
│   │   ├── hero.html
│   │   ├── newsection.html
│   │   ├── products.html
│   │   ├── reviews.html
│   │   └── services.html
│   │
│   ├── index.html
│   ├── new.html
│   ├── robots.txt
│   ├── sitemap.xml
│   └── readme
│
└── .gitignore

⚙️ How the Website Works
✔ Component Loader System

index.html automatically loads each section via:

loadComponent("header-container", "header.html");
loadComponent("hero-container", "hero.html");
loadComponent("services-container", "services.html");
...


Components are stored in /public/components.

This keeps index.html clean, lightweight, and maintainable.

🧩 Assets
CSS

All custom styles under:

public/assets/css/

JS

All interactive scripts under:

public/assets/js/


Includes:

navbar.js → Mobile nav + sticky header

slider.js → Product slider

cursor.js → Custom cursor

reviews.js → Backend API review system

app.js → Scroll progress bar + AOS init

Images

Stored in:

public/assets/images/

Videos

Stored in:

public/assets/videos/

🌐 SEO Files Included
File	Purpose
robots.txt	Search engine crawling rules
sitemap.xml	Site indexing
meta tags in index.html	OG + SEO ready
🛠 How to Run the Frontend
Option 1 — Open locally

Just open:

public/index.html


in any browser.

Option 2 — Start a lightweight local server

If using VS Code:

Install → Live Server extension
Right click index.html → Open with Live Server

Option 3 — Using Node
npm install -g serve
serve public

🔌 Backend Connection

Reviews module connects to:

https://crabster-backend.onrender.com/api/reviews


Functions:

submitReview() → POST new review

fetchReviews() → GET all reviews

Modify backend URL inside:

public/assets/js/reviews.js

📝 Editing or Adding Components

To add a new section:

Create a file inside:

public/components/yourSection.html


Add a container in index.html:

<div id="yourSection-container"></div>


Load with JS:

loadComponent("yourSection-container", "yourSection.html");

👨‍💻 Developer Notes

TailwindCSS CDN is used (no build process needed)

AOS is used for scroll animations

Pure JS → no framework used

Code is fully modular & production ready

📞 Support / Contact

Crabster Technology
📍 Coimbatore, India
📧 crabstertechnology@gmail.com

🌐 https://crabstertech.in