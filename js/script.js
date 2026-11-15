document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.querySelector("#contactForm");
  const formFeedback = document.querySelector("#formFeedback");

  if (contactForm && formFeedback) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const nameInput = document.querySelector("#contactName");
      const emailInput = document.querySelector("#contactEmail");
      const purposeInput = document.querySelector("#contactPurpose");

      const visitorName = nameInput.value.trim();
      const visitorEmail = emailInput.value.trim();
      const visitorMessage = purposeInput.value.trim();

      if (!visitorName || !visitorEmail || !visitorMessage) {
        formFeedback.className = "alert alert-danger mt-3 mb-0";
        formFeedback.textContent = "Please complete all required fields before submitting.";
        return;
      }

      formFeedback.className = "alert alert-success mt-3 mb-0";
      formFeedback.textContent = `Salamat, ${visitorName}! Your message has been received. We will send a reply to ${visitorEmail} shortly.`;

      contactForm.reset();
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const searchBtn = document.querySelector(".search-pill-btn");
  const header = document.querySelector("header");
  if (!searchBtn || !header) return;

  const siteIndex = [
    { title: "Home", keywords: "home main landing tagpo traditional filipino clothing", url: "index.html" },
    { title: "About Tagpo", keywords: "about mission team heritage culture", url: "about.html" },
    { title: "Shop - Don't Be Late", keywords: "shop product shirt garment 3d view size guide", url: "product-dont-be-late.html" },
    { title: "Contact Us & Support", keywords: "contact email phone socials message form", url: "contact.html" },
    { title: "Shipping & Return FAQs", keywords: "faq shipping delivery metro manila return exchange size guide", url: "contact.html" },
    { title: "Privacy Policy & Terms", keywords: "privacy policy terms conditions cookies data security", url: "privacy-policy.html" }
  ];

  const drawer = document.createElement("div");
  drawer.className = "tagpo-search-drawer";
  drawer.innerHTML = `
    <div class="container">
      <div class="d-flex align-items-center gap-2">
        <input type="search" class="form-control tagpo-search-input" placeholder="Search Tagpo pages, garments, FAQs..." aria-label="Search site">
        <button type="button" class="btn-close" aria-label="Close search"></button>
      </div>
      <ul class="tagpo-search-results"></ul>
    </div>
  `;
  header.appendChild(drawer);

  const input = drawer.querySelector(".tagpo-search-input");
  const closeBtn = drawer.querySelector(".btn-close");
  const resultsList = drawer.querySelector(".tagpo-search-results");

  function renderResults(query) {
    const q = query.trim().toLowerCase();
    resultsList.innerHTML = "";
    if (!q) return;

    const matches = siteIndex.filter(
      (item) => item.title.toLowerCase().includes(q) || item.keywords.includes(q)
    );

    if (matches.length === 0) {
      resultsList.innerHTML = `<li class="text-muted small py-1">No matching pages found for "${query}".</li>`;
      return;
    }

    matches.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="${item.url}">${item.title}</a>`;
      resultsList.appendChild(li);
    });
  }

  searchBtn.addEventListener("click", function () {
    const isOpen = drawer.classList.toggle("is-open");
    if (isOpen) {
      input.focus();
      renderResults(input.value);
    }
  });

  closeBtn.addEventListener("click", function () {
    drawer.classList.remove("is-open");
  });

  input.addEventListener("input", function () {
    renderResults(input.value);
  });

  input.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      drawer.classList.remove("is-open");
    } else if (e.key === "Enter") {
      const firstLink = resultsList.querySelector("a");
      if (firstLink) window.location.href = firstLink.getAttribute("href");
    }
  });
});