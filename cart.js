let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartContainer = document.getElementById("cart-container");
const totalPriceEl = document.getElementById("total-price");

function displayCart() {
  cartContainer.innerHTML = "";
  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty!</p>";
    totalPriceEl.textContent = "₹0";
    return;
  }

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <div>
        <h4>${item.name}</h4>
        <p>₹${item.price} × ${item.quantity}</p>
      </div>
      <div class="actions">
        <button onclick="changeQuantity(${index}, 1)">+</button>
        <button onclick="changeQuantity(${index}, -1)">-</button>
        <button onclick="removeItem(${index})">Remove</button>
      </div>
    `;
    cartContainer.appendChild(div);
  });

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  totalPriceEl.textContent = `₹${total}`;
}

function changeQuantity(index, delta) {
  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
  updateCartCount();
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
  updateCartCount();
}

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cart-count").textContent = `(${count})`;
}

displayCart();
updateCartCount();