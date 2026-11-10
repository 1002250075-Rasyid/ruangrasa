// Interaksi katalog, keranjang, navigasi seluler, dan formulir berlangganan.
const cart = new Map();
const rupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

const cartCount = document.querySelector(".cart-count");
const cartDialog = document.querySelector("#cart-dialog");
const cartItems = document.querySelector("#cart-items");
const cartEmpty = document.querySelector("#cart-empty");
const cartTotal = document.querySelector("#cart-total");
const toast = document.querySelector("#toast");
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2500);
}

function updateCart() {
  const quantity = [...cart.values()].reduce((sum, item) => sum + item.quantity, 0);
  const total = [...cart.values()].reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartCount.textContent = quantity;
  cartItems.replaceChildren();
  cartEmpty.hidden = quantity > 0;

  for (const item of cart.values()) {
    const row = document.createElement("li");
    const name = document.createElement("span");
    const label = document.createElement("span");
    const amount = document.createElement("span");
    name.className = "cart-item-name";
    label.className = "cart-item-qty";
    name.textContent = item.name;
    label.textContent = `${item.quantity} × ${rupiah.format(item.price)}`;
    name.append(label);
    amount.textContent = rupiah.format(item.price * item.quantity);
    row.append(name, amount);
    cartItems.append(row);
  }

  cartTotal.textContent = rupiah.format(total);
}

document.querySelectorAll(".add-button").forEach((button) => {
  button.addEventListener("click", () => {
    const { product, price } = button.dataset;
    const existing = cart.get(product);
    cart.set(product, {
      name: product,
      price: Number(price),
      quantity: existing ? existing.quantity + 1 : 1,
    });
    updateCart();
    showToast(`${product} ditambahkan ke keranjang`);
  });
});

document.querySelector(".cart-button").addEventListener("click", () => cartDialog.showModal());
document.querySelector(".dialog-close").addEventListener("click", () => cartDialog.close());
cartDialog.addEventListener("click", (event) => {
  if (event.target === cartDialog) cartDialog.close();
});
document.querySelector("#checkout-button").addEventListener("click", () => {
  if (cart.size === 0) {
    showToast("Keranjangmu masih kosong");
    return;
  }
  showToast("Pesanan demo siap diproses. Terima kasih!");
  cart.clear();
  updateCart();
  cartDialog.close();
});

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector("#main-nav");
menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  mainNav.classList.toggle("is-open", !isOpen);
});
mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    mainNav.classList.remove("is-open");
  });
});

let activeFilter = "semua";
const searchInput = document.querySelector("#product-search");
const productCards = [...document.querySelectorAll(".product-card")];
const emptyState = document.querySelector("#empty-state");

function filterProducts() {
  const query = searchInput.value.trim().toLocaleLowerCase("id-ID");
  let visibleCount = 0;
  productCards.forEach((card) => {
    const matchesFilter = activeFilter === "semua" || card.dataset.roast === activeFilter;
    const matchesSearch = card.dataset.name.includes(query) || card.textContent.toLocaleLowerCase("id-ID").includes(query);
    const isVisible = matchesFilter && matchesSearch;
    card.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  });
  emptyState.hidden = visibleCount > 0;
}

document.querySelectorAll(".filter-chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    activeFilter = chip.dataset.filter;
    document.querySelectorAll(".filter-chip").forEach((item) => {
      const isActive = item === chip;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });
    filterProducts();
  });
});
searchInput.addEventListener("input", filterProducts);

document.querySelector("#newsletter-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const email = document.querySelector("#email");
  const message = document.querySelector("#newsletter-message");
  if (!email.validity.valid || email.value.trim() === "") {
    message.textContent = "Masukkan alamat email yang valid dulu, ya.";
    message.classList.add("is-error");
    email.focus();
    return;
  }
  message.textContent = "Terima kasih! Kamu masuk daftar cerita RuangRasa.";
  message.classList.remove("is-error");
  event.currentTarget.reset();
});

updateCart();
