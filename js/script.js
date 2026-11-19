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


document.addEventListener("DOMContentLoaded", function () {
    const featuredSection = document.querySelector(".product-section:not(.all-products)");
    if (featuredSection) {
        const featuredCount = featuredSection.querySelectorAll(".product-card").length;
        const countDisplay = featuredSection.querySelector('[data-count="featured"]');
        if (countDisplay) {
            countDisplay.textContent =
                `${featuredCount} ${featuredCount === 1 ? "product" : "products"}`;
        }
    }

    const allProductsSection = document.querySelector(".all-products");
    if (allProductsSection) {
        const allCount = allProductsSection.querySelectorAll(".product-card").length;
        const countDisplay = allProductsSection.querySelector('[data-count="all"]');
        if (countDisplay) {
            countDisplay.textContent =
                `${allCount} ${allCount === 1 ? "product" : "products"}`;
        }
    }

});


document.addEventListener("DOMContentLoaded", function () {
    const sizeButtons = document.querySelectorAll(".size-buttons button");
    const selectedSize = document.getElementById("selected-size");

    const sizeNames = {
        XS: "Extra Small",
        S: "Small",
        M: "Medium",
        L: "Large",
        XL: "Extra Large"
    };

    sizeButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            sizeButtons.forEach(function (btn) {
                btn.classList.remove("active");
                btn.setAttribute("aria-pressed", "false");
            });
            button.classList.add("active");
            button.setAttribute("aria-pressed", "true");
            selectedSize.textContent =
                sizeNames[button.dataset.size];
        });
    });

    const quantityDisplay = document.getElementById("quantity");
    const decreaseButton = document.getElementById("decrease-quantity");
    const increaseButton = document.getElementById("increase-quantity");
  
    let quantity = 1;

    decreaseButton.addEventListener("click", function () {
        if (quantity > 1) {
            quantity--;
            quantityDisplay.textContent = quantity;
        }
    });
  
    increaseButton.addEventListener("click", function () {
        quantity++;
        quantityDisplay.textContent = quantity;
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const productGalleries = document.querySelectorAll(".product-gallery");

    productGalleries.forEach(function (gallery) {
        const mainImage = gallery.querySelector(".main-product-image");
        const thumbnailGallery = gallery.querySelector(".thumbnail-images");
        const previousButton = gallery.querySelector(".arrow-left");
        const nextButton = gallery.querySelector(".arrow-right");

        if (!mainImage || !thumbnailGallery || !previousButton || !nextButton) {
            return;
        }

        const productImages = [
            {
                src: mainImage.getAttribute("src"),
                alt: mainImage.alt
            },
            ...Array.from(thumbnailGallery.querySelectorAll("img")).map(function (image) {
                return {
                    src: image.getAttribute("src"),
                    alt: image.alt
                };
            })
        ];

        let currentImage = 0;
        let direction = "right";

        function showImage(index, newDirection) {
            currentImage =
                (index + productImages.length) % productImages.length;

            if (newDirection) {
                direction = newDirection;
            }

            mainImage.src = productImages[currentImage].src;
            mainImage.alt = productImages[currentImage].alt;

            updateThumbnails();
        }

        function updateThumbnails() {
            thumbnailGallery.innerHTML = "";

            let thumbnailOrder = [];

            if (direction === "right") {
                for (let i = 1; i < productImages.length; i++) {
                    thumbnailOrder.push(
                        (currentImage + i) % productImages.length
                    );
                }
            } else {
                // Arrange thumbnails in leftward navigation order
                for (let i = 1; i < productImages.length; i++) {
                    thumbnailOrder.push(
                        (currentImage - i + productImages.length) %
                        productImages.length
                    );
                }
            }

            thumbnailOrder.forEach(function (index) {
                const image = productImages[index];
                const thumbnail = document.createElement("img");

                thumbnail.src = image.src;
                thumbnail.alt = image.alt;
                thumbnail.loading = "lazy";

                thumbnail.addEventListener("click", function () {
                    showImage(index);
                });

                thumbnailGallery.appendChild(thumbnail);
            });
        }

        nextButton.addEventListener("click", function () {
            showImage(currentImage + 1, "right");
        });

        previousButton.addEventListener("click", function () {
            showImage(currentImage - 1, "left");
        });

        if (productImages.length > 0) {
            showImage(0, "right");
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const wishlistButton = document.querySelector(".wishlist-button");

    if (wishlistButton) {
        wishlistButton.addEventListener("click", function () {
            const isAdded = wishlistButton.classList.toggle("active");
            if (isAdded) {
                wishlistButton.textContent = "Added to Wishlist";
                wishlistButton.setAttribute("aria-pressed", "true");
            } else {
                wishlistButton.textContent = "Add to Wishlist";
                wishlistButton.setAttribute("aria-pressed", "false");
            }
        });
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const orderButton = document.querySelector("#order-now");

    if (!orderButton) return;
    orderButton.addEventListener("click", function () {
        const productName = document.querySelector(".product-title")?.textContent.trim();
        const selectedSize = document.querySelector("#selected-size")?.textContent.trim();
        const quantity = document.querySelector("#quantity")?.textContent.trim();

        if (!productName || !selectedSize || !quantity) {
            alert("Please select a product size and quantity.");
            return;
        }

        const recipient = "orders@examplewebsite142.com";
        const subject = "TAGPO | New Order Request";
        const body = `
        HELLO TAGPO TEAM!
        
        I would like to place an order with the following details:
        
        ================================
                   ORDER DETAILS
        ================================
        
        Product:  ${productName}
        Size:     ${selectedSize}
        Quantity: ${quantity}
        
        ================================
                CUSTOMER INFORMATION
        ================================
        
        Please use the sender's email address
        to contact me regarding this order.
        
        ================================
        
        Thank you!
        
        Best regards,
        (Insert your name)
        Tagpo Customer
        `.trim();

        const mailtoLink =
            `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        window.location.href = mailtoLink;
    });
});
