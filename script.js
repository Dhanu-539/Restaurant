// 🥗 MENU ITEMS
const DISHES = [
  { id: 1, name: 'Idly', cat: 'veg', price: 40, img: 'https://t3.ftcdn.net/jpg/03/62/02/26/360_F_362022640_fZ6UM0JycJlFDdBiR1pYlNddKfdGvYwR.jpg' },
  { id: 2, name: 'Dosa', cat: 'veg', price: 60, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx-glTW9VpM8O7nW1los6X5F9VkIOaj07rgw&s' },
  { id: 3, name: 'Poori', cat: 'veg', price: 70, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDD_nEtGApV8uhw-I7kugZrMWz5VFO1U1ebQ&s' },
  { id: 4, name: 'Upma', cat: 'veg', price: 50, img: 'https://thumbs.dreamstime.com/b/upma-uppumavu-uppittu-dish-indian-subcontinent-most-common-south-maharashtrian-sri-lankan-tamil-breakfast-119700026.jpg' },
  { id: 5, name: 'Pongal', cat: 'veg', price: 55, img: 'https://www.sharmispassions.com/wp-content/uploads/2012/02/VenPongal6.jpg' },
  { id: 6, name: 'Vada', cat: 'veg', price: 45, img: 'https://www.awesomecuisine.com/wp-content/uploads/2014/12/medhu-vadai.jpg' },
  { id: 7, name: 'Ghee Dosa', cat: 'veg', price: 80, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtV8DrRy8Bz1_BWquHH_pXyPU3OIRK-3LWMQ&s' },
  { id: 8, name: 'Onion Dosa', cat: 'veg', price: 85, img: 'https://i0.wp.com/www.chitrasfoodbook.com/wp-content/uploads/2018/02/onion-uthappam.jpg?ssl=1' },
  { id: 9, name: 'Karam Dosa', cat: 'veg', price: 90, img: 'https://farm6.static.flickr.com/5095/5566873325_afbb95e4fd_z.jpg' },
  { id: 10, name: 'Juices', cat: 'dessert', price: 60, img: 'https://media.istockphoto.com/id/821583034/photo/various-fruits-juices.jpg?s=612x612&w=0&k=20&c=oHI_Qv-Ci2vRjiJFYcFY40F-nPGJCRvw6fTHhM-TyUg=' },
  { id: 11, name: 'Water Bottle', cat: 'dessert', price: 20, img: 'https://t3.ftcdn.net/jpg/07/86/76/06/360_F_786760607_IwcScz3k7Efj42i1S7mnewhWQXrhAa0o.jpg' }
];

// 🛒 Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// 🍽️ Render Menu Items
function renderMenu(filter = 'all') {
  const menu = document.getElementById("menu-grid");
  if (!menu) return;

  menu.innerHTML = "";

  const filtered = filter === 'all' ? DISHES : DISHES.filter(d => d.cat === filter);

  filtered.forEach(dish => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${dish.img}" alt="${dish.name}">
      <h3>${dish.name}</h3>
      <p>₹${dish.price}</p>
      <button class="btn" onclick="addToCart(${dish.id})">Add to Cart</button>
    `;
    menu.appendChild(card);
  });
}

// 🧮 Add to Cart
function addToCart(id) {
  const dish = DISHES.find(d => d.id === id);
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...dish, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(`${dish.name} added to cart!`);
}

// 🧾 Update Cart Count
function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll("#cart-count").forEach(el => {
    el.textContent = `(${count})`;
  });
}

// 💳 Checkout
function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  alert("✅ Order placed successfully! Thank you for ordering from Raghavendra Bites!");
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  displayCart();
}

// 🧺 Display Cart Page
function displayCart() {
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  if (!container) return;

  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty!</p>";
    totalEl.textContent = "₹0";
    return;
  }

  cart.forEach((item, i) => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <div style="display:flex;align-items:center;gap:15px;">
          <img src="${item.img}" width="80" height="80" style="border-radius:8px;object-fit:cover">
          <div>
            <h4>${item.name}</h4>
            <p>₹${item.price} × ${item.quantity}</p>
          </div>
        </div>
        <div>
          <button class="btn" onclick="changeQty(${i}, 1)">+</button>
          <button class="btn" onclick="changeQty(${i}, -1)">-</button>
          <button class="btn" style="background:#f44336" onclick="removeItem(${i})">Remove</button>
        </div>
      </div>
    `;
    container.appendChild(div);
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  totalEl.textContent = `₹${total}`;
}

// ➕➖ Change Quantity
function changeQty(index, delta) {
  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
  updateCartCount();
}

// ❌ Remove Item
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
  updateCartCount();
}

// 🔍 Filter Menu Function
function filterMenu(category) {
  renderMenu(category);

  document.querySelectorAll(".filter-buttons button").forEach(btn => btn.classList.remove("active"));
  const activeBtn = Array.from(document.querySelectorAll(".filter-buttons button"))
    .find(b => b.textContent.toLowerCase().includes(category));
  if (activeBtn) activeBtn.classList.add("active");
}

// 📬 Contact Form Handler
window.addEventListener("DOMContentLoaded", () => {
  renderMenu(); // default all
  displayCart();
  updateCartCount();

  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      alert("Message sent! We’ll get back to you soon!");
      form.reset();
    });
  }
});