let cart = [];

// Display Products
function displayProducts(items) {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  items.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" width="120" height="120"/>
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
      <button onclick="openModal(${product.id})">View Details</button>
    `;
    productList.appendChild(card);
  });
}

// Filter Products
function filterProducts(category) {
  if (category === "all") {
    displayProducts(products);
  } else {
    const filtered = products.filter(p => p.category === category);
    displayProducts(filtered);
  }
}

// Active Button Highlight
function setActiveFilter(button, category) {
  document.querySelectorAll(".filter-buttons button").forEach(btn => btn.classList.remove("active"));
  button.classList.add("active");
  filterProducts(category);
}

// Add to Cart
function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  updateCart();
}

// Remove from Cart
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

// Update Cart
function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
  ${item.name} - ₹${item.price}
  <button class="remove-btn" onclick="removeFromCart(${index})">❌ Remove</button>
`;

    cartItems.appendChild(li);
    total += item.price;
  });

  cartTotal.textContent = total;
}

// Modal
function openModal(id) {
  const product = products.find(p => p.id === id);
  document.getElementById("modal-title").textContent = product.name;
  document.getElementById("modal-price").textContent = `Price: ₹${product.price}`;
  document.getElementById("modal-description").textContent = product.description;

  // ✅ Show product image
  const modalImage = document.getElementById("modal-image");
  modalImage.src = product.image;
  modalImage.alt = product.name;

  document.getElementById("productModal").style.display = "flex";
}

function closeProductModal() {
  document.getElementById("productModal").style.display = "none";
}

// Close logic
const modal = document.getElementById("productModal");
const closeModalBtn = document.getElementById("closeModal");

closeModalBtn.addEventListener("click", closeProductModal);

// Close when clicking outside
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeProductModal();
  }
});

// Close when pressing ESC
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeProductModal();
  }
});

// Init
displayProducts(products);
