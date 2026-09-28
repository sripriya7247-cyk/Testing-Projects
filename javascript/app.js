/**
 * ShopEase - E-Commerce Website JavaScript
 * Beginner-friendly, modular vanilla JavaScript application.
 */

// ==========================================================================
// 1. Sample Product Catalog Data
// ==========================================================================
const PRODUCTS = [
  {
    id: 1,
    name: "Classic Crewneck Cotton T-Shirt",
    category: "tshirts",
    categoryLabel: "T-Shirts",
    price: 24.99,
    originalPrice: 34.99,
    rating: 4.8,
    reviewsCount: 142,
    badge: "Popular",
    badgeType: "badge-popular",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    name: "Urban Runner Breathable Sneakers",
    category: "shoes",
    categoryLabel: "Shoes",
    price: 79.99,
    originalPrice: 109.99,
    rating: 4.9,
    reviewsCount: 310,
    badge: "Sale",
    badgeType: "badge-sale",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    name: "Elegant Leather Everyday Handbag",
    category: "handbags",
    categoryLabel: "Handbags",
    price: 64.99,
    originalPrice: 89.99,
    rating: 4.8,
    reviewsCount: 185,
    badge: "Popular",
    badgeType: "badge-popular",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    name: "Chrono Elite Sport Stainless Watch",
    category: "watches",
    categoryLabel: "Watches",
    price: 129.99,
    originalPrice: 189.99,
    rating: 4.9,
    reviewsCount: 240,
    badge: "Sale",
    badgeType: "badge-sale",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    name: "SonicPro Wireless Over-Ear Headphones",
    category: "headphones",
    categoryLabel: "Headphones",
    price: 149.99,
    originalPrice: 199.99,
    rating: 4.9,
    reviewsCount: 420,
    badge: "Popular",
    badgeType: "badge-popular",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 6,
    name: "Minimalist Oversized Graphic Tee",
    category: "tshirts",
    categoryLabel: "T-Shirts",
    price: 29.99,
    originalPrice: 39.99,
    rating: 4.6,
    reviewsCount: 98,
    badge: "New",
    badgeType: "badge-new",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 7,
    name: "Classic Handcrafted Leather Oxfords",
    category: "shoes",
    categoryLabel: "Shoes",
    price: 119.99,
    originalPrice: 149.99,
    rating: 4.7,
    reviewsCount: 75,
    badge: null,
    image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 8,
    name: "Compact Modern Crossbody Bag",
    category: "handbags",
    categoryLabel: "Handbags",
    price: 45.99,
    originalPrice: 59.99,
    rating: 4.5,
    reviewsCount: 92,
    badge: null,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 9,
    name: "Minimalist Rose Gold Wristwatch",
    category: "watches",
    categoryLabel: "Watches",
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.7,
    reviewsCount: 130,
    badge: "New",
    badgeType: "badge-new",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 10,
    name: "AeroBeats Wireless Sport Earbuds",
    category: "headphones",
    categoryLabel: "Headphones",
    price: 49.99,
    originalPrice: 69.99,
    rating: 4.6,
    reviewsCount: 215,
    badge: "Sale",
    badgeType: "badge-sale",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80"
  }
];

// ==========================================================================
// 2. Application State Management
// ==========================================================================
let cart = [];
let activeCategory = "all";
let searchQuery = "";

// Initialize Cart from localStorage if available
function loadCartFromStorage() {
  try {
    const saved = localStorage.getItem("shopease_cart");
    if (saved) {
      cart = JSON.parse(saved);
    }
  } catch (e) {
    console.warn("Storage access restricted, using in-memory cart.", e);
    cart = [];
  }
}

function saveCartToStorage() {
  try {
    localStorage.setItem("shopease_cart", JSON.stringify(cart));
  } catch (e) {
    console.warn("Failed to persist cart.", e);
  }
}

// ==========================================================================
// 3. DOM Elements Cache
// ==========================================================================
const productsGrid = document.getElementById("products-grid");
const productsCounter = document.getElementById("products-counter");
const noProductsMsg = document.getElementById("no-products-msg");
const resetFilterBtn = document.getElementById("reset-filter-btn");

const searchInput = document.getElementById("search-input");
const clearSearchBtn = document.getElementById("clear-search-btn");

const categoryFilterBtns = document.querySelectorAll(".filter-btn");
const categoryLinks = document.querySelectorAll(".category-link");

// Cart Drawer Elements
const cartBtn = document.getElementById("cart-btn");
const cartDrawer = document.getElementById("cart-drawer");
const cartOverlay = document.getElementById("cart-overlay");
const cartCloseBtn = document.getElementById("cart-close-btn");
const cartBody = document.getElementById("cart-body");
const cartCountBadge = document.getElementById("cart-count");
const cartDrawerCount = document.getElementById("cart-drawer-count");
const cartSubtotalEl = document.getElementById("cart-subtotal");
const cartTotalEl = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Navigation & Modals
const mobileToggleBtn = document.getElementById("mobile-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

const checkoutModal = document.getElementById("checkout-modal");
const modalCloseBtn = document.getElementById("modal-close-btn");
const modalOrderTotal = document.getElementById("modal-order-total");

const contactForm = document.getElementById("contact-form");
const newsletterForm = document.getElementById("newsletter-form");
const toastContainer = document.getElementById("toast-container");

// ==========================================================================
// 4. Helper Functions
// ==========================================================================

/**
 * Generate 5-star rating HTML
 */
function generateStarRating(rating) {
  let starsHtml = "";
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      starsHtml += '<i class="fa-solid fa-star"></i>';
    } else if (i === fullStars + 1 && hasHalfStar) {
      starsHtml += '<i class="fa-solid fa-star-half-stroke"></i>';
    } else {
      starsHtml += '<i class="fa-regular fa-star"></i>';
    }
  }
  return starsHtml;
}

/**
 * Calculate discount percentage
 */
function getDiscountPercent(current, original) {
  if (!original || original <= current) return null;
  const percent = Math.round(((original - current) / original) * 100);
  return `${percent}% OFF`;
}

/**
 * Format currency
 */
function formatCurrency(amount) {
  return `$${amount.toFixed(2)}`;
}

/**
 * Show a floating Toast Notification
 */
function showToast(message, icon = "fa-circle-check") {
  if (!toastContainer) return;

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("toast-exit");
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 2500);
}

// ==========================================================================
// 5. Product Catalog Rendering & Filtering
// ==========================================================================

function filterAndRenderProducts() {
  const filtered = PRODUCTS.filter((product) => {
    // Filter by Category
    const matchesCategory =
      activeCategory === "all" || product.category === activeCategory;

    // Filter by Search Query
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      query === "" ||
      product.name.toLowerCase().includes(query) ||
      product.categoryLabel.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  // Update counter text
  if (filtered.length === PRODUCTS.length) {
    productsCounter.textContent = `Showing all ${PRODUCTS.length} products`;
  } else {
    productsCounter.textContent = `Showing ${filtered.length} of ${PRODUCTS.length} products`;
  }

  // Handle empty state
  if (filtered.length === 0) {
    productsGrid.innerHTML = "";
    noProductsMsg.classList.remove("hidden");
    return;
  }

  noProductsMsg.classList.add("hidden");

  // Render product cards
  productsGrid.innerHTML = filtered
    .map((product) => {
      const discountTag = getDiscountPercent(product.price, product.originalPrice);
      const badgeHtml = product.badge
        ? `<span class="product-badge ${product.badgeType || "badge-popular"}">${product.badge}</span>`
        : "";

      return `
        <article class="product-card" data-id="${product.id}">
          <div class="product-image-container">
            ${badgeHtml}
            <img 
              src="${product.image}" 
              alt="${product.name}" 
              class="product-image"
              loading="lazy"
            >
          </div>
          <div class="product-info">
            <span class="product-category">${product.categoryLabel}</span>
            <h3 class="product-title">${product.name}</h3>

            <div class="product-rating" aria-label="Rated ${product.rating} out of 5">
              <div class="rating-stars">${generateStarRating(product.rating)}</div>
              <span class="rating-number">${product.rating}</span>
              <span class="rating-count">(${product.reviewsCount})</span>
            </div>

            <div class="product-price-row">
              <span class="current-price">${formatCurrency(product.price)}</span>
              ${
                product.originalPrice
                  ? `<span class="original-price">${formatCurrency(product.originalPrice)}</span>`
                  : ""
              }
              ${
                discountTag
                  ? `<span class="discount-percent">${discountTag}</span>`
                  : ""
              }
            </div>

            <button 
              class="add-to-cart-btn" 
              onclick="handleAddToCart(${product.id}, this)"
              aria-label="Add ${product.name} to cart"
            >
              <i class="fa-solid fa-cart-plus"></i> Add to Cart
            </button>
          </div>
        </article>
      `;
    })
    .join("");
}

// Global category filter function for inline onclick & category links
window.filterByCategory = function (category) {
  activeCategory = category;

  // Update active pill button
  categoryFilterBtns.forEach((btn) => {
    if (btn.dataset.category === category) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  filterAndRenderProducts();

  // Smooth scroll to products section
  const productsSection = document.getElementById("products");
  if (productsSection) {
    productsSection.scrollIntoView({ behavior: "smooth" });
  }
};

// ==========================================================================
// 6. Cart Drawer & State Operations
// ==========================================================================

// Add Product to Cart
window.handleAddToCart = function (productId, buttonEl) {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return;

  const existingIndex = cart.findIndex((item) => item.id === productId);

  if (existingIndex > -1) {
    cart[existingIndex].quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }

  saveCartToStorage();
  updateCartUI();

  // Temporary feedback on button
  if (buttonEl) {
    const originalContent = buttonEl.innerHTML;
    buttonEl.classList.add("added");
    buttonEl.innerHTML = `<i class="fa-solid fa-check"></i> Added!`;
    setTimeout(() => {
      buttonEl.classList.remove("added");
      buttonEl.innerHTML = originalContent;
    }, 1200);
  }

  // Toast notification
  showToast(`Added "${product.name}" to cart!`, "fa-cart-shopping");
};

// Update item quantity in cart
window.updateCartQuantity = function (productId, delta) {
  const itemIndex = cart.findIndex((item) => item.id === productId);
  if (itemIndex === -1) return;

  cart[itemIndex].quantity += delta;

  if (cart[itemIndex].quantity <= 0) {
    const removedName = cart[itemIndex].name;
    cart.splice(itemIndex, 1);
    showToast(`Removed "${removedName}" from cart`, "fa-trash-can");
  }

  saveCartToStorage();
  updateCartUI();
};

// Remove single item from cart
window.removeFromCart = function (productId) {
  const itemIndex = cart.findIndex((item) => item.id === productId);
  if (itemIndex === -1) return;

  const removedName = cart[itemIndex].name;
  cart.splice(itemIndex, 1);

  saveCartToStorage();
  updateCartUI();
  showToast(`Removed "${removedName}" from cart`, "fa-trash-can");
};

// Clear entire cart
function handleClearCart() {
  if (cart.length === 0) return;
  cart = [];
  saveCartToStorage();
  updateCartUI();
  showToast("Your cart has been cleared", "fa-trash-can");
}

// Update Cart Display & Totals
function updateCartUI() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Badge count
  cartCountBadge.textContent = totalItems;
  cartDrawerCount.textContent = totalItems;

  // Bump animation on cart badge
  cartCountBadge.classList.remove("bump");
  void cartCountBadge.offsetWidth; // Trigger reflow
  cartCountBadge.classList.add("bump");

  // Summary amounts
  cartSubtotalEl.textContent = formatCurrency(subtotal);
  cartTotalEl.textContent = formatCurrency(subtotal);

  // Render Cart Body Items
  if (cart.length === 0) {
    cartBody.innerHTML = `
      <div class="cart-empty-state">
        <div class="cart-empty-icon"><i class="fa-solid fa-basket-shopping"></i></div>
        <h4>Your Cart is Empty</h4>
        <p>Looks like you haven't added any items yet.</p>
        <button class="btn btn-primary" onclick="closeCartDrawer()">
          Start Shopping
        </button>
      </div>
    `;
    checkoutBtn.disabled = true;
    checkoutBtn.style.opacity = "0.5";
    checkoutBtn.style.cursor = "not-allowed";
  } else {
    checkoutBtn.disabled = false;
    checkoutBtn.style.opacity = "1";
    checkoutBtn.style.cursor = "pointer";

    cartBody.innerHTML = cart
      .map(
        (item) => `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}" class="cart-item-img">
          <div class="cart-item-info">
            <h4 class="cart-item-title">${item.name}</h4>
            <div class="cart-item-price">${formatCurrency(item.price)}</div>
            <div class="cart-qty-controls">
              <button class="qty-btn" onclick="updateCartQuantity(${item.id}, -1)" aria-label="Decrease quantity">
                <i class="fa-solid fa-minus"></i>
              </button>
              <span class="qty-value">${item.quantity}</span>
              <button class="qty-btn" onclick="updateCartQuantity(${item.id}, 1)" aria-label="Increase quantity">
                <i class="fa-solid fa-plus"></i>
              </button>
            </div>
          </div>
          <button class="cart-item-remove" onclick="removeFromCart(${item.id})" aria-label="Remove ${item.name} from cart">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      `
      )
      .join("");
  }
}

// Open & Close Drawer
function openCartDrawer() {
  cartDrawer.classList.add("open");
  cartOverlay.classList.add("active");
  document.body.style.overflow = "hidden"; // Prevent page scroll behind drawer
}

function closeCartDrawer() {
  cartDrawer.classList.remove("open");
  cartOverlay.classList.remove("active");
  document.body.style.overflow = "";
}

// ==========================================================================
// 7. Event Listeners & Interactions
// ==========================================================================

// Cart Drawer triggers
cartBtn.addEventListener("click", openCartDrawer);
cartCloseBtn.addEventListener("click", closeCartDrawer);
cartOverlay.addEventListener("click", closeCartDrawer);
clearCartBtn.addEventListener("click", handleClearCart);

// Checkout Demo Trigger
checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) return;
  const currentTotal = cartTotalEl.textContent;
  modalOrderTotal.textContent = currentTotal;
  closeCartDrawer();
  checkoutModal.classList.add("active");

  // Empty cart upon checkout demo
  cart = [];
  saveCartToStorage();
  updateCartUI();
});

modalCloseBtn.addEventListener("click", () => {
  checkoutModal.classList.remove("active");
});

checkoutModal.addEventListener("click", (e) => {
  if (e.target === checkoutModal) {
    checkoutModal.classList.remove("active");
  }
});

// Category Filter Tabs
categoryFilterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    categoryFilterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    activeCategory = btn.dataset.category;
    filterAndRenderProducts();
  });
});

// Reset Filter Button on empty state
resetFilterBtn.addEventListener("click", () => {
  searchInput.value = "";
  clearSearchBtn.classList.remove("show");
  searchQuery = "";
  window.filterByCategory("all");
});

// Live Search Input with instant filtering
searchInput.addEventListener("input", (e) => {
  searchQuery = e.target.value;
  if (searchQuery.trim().length > 0) {
    clearSearchBtn.classList.add("show");
  } else {
    clearSearchBtn.classList.remove("show");
  }
  filterAndRenderProducts();
});

// Clear Search button
clearSearchBtn.addEventListener("click", () => {
  searchInput.value = "";
  searchQuery = "";
  clearSearchBtn.classList.remove("show");
  filterAndRenderProducts();
  searchInput.focus();
});

// Mobile Navigation Toggle
mobileToggleBtn.addEventListener("click", () => {
  navMenu.classList.toggle("open");
  const icon = mobileToggleBtn.querySelector("i");
  if (navMenu.classList.contains("open")) {
    icon.className = "fa-solid fa-xmark";
  } else {
    icon.className = "fa-solid fa-bars";
  }
});

// Close mobile nav when clicking navigation link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
    navMenu.classList.remove("open");
    const icon = mobileToggleBtn.querySelector("i");
    if (icon) icon.className = "fa-solid fa-bars";
  });
});

// Category links in footer
categoryLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const category = link.dataset.category;
    window.filterByCategory(category);
  });
});

// Contact Form Submission (Demo)
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("contact-name").value;
  showToast(`Thank you, ${name}! Your message has been sent.`, "fa-paper-plane");
  contactForm.reset();
});

// Newsletter Form Submission (Demo)
newsletterForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const emailInput = document.getElementById("newsletter-email");
  showToast("You're on the list! Welcome to ShopEase VIP.", "fa-envelope-open-text");
  emailInput.value = "";
});

// Close overlays on Esc key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeCartDrawer();
    checkoutModal.classList.remove("active");
  }
});

// ==========================================================================
// 8. Initialization
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  loadCartFromStorage();
  filterAndRenderProducts();
  updateCartUI();
});
