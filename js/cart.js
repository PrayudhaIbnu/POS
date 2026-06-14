function getActiveCart() {
  return currentRole === "customer" ? customerCart : cashierCart;
}

function renderCart() {
  const cart = cashierCart;
  const list = document.getElementById("order-list");
  const badge = document.getElementById("mobile-cart-badge");
  const subtotalEl = document.getElementById("subtotal");
  const totalEl = document.getElementById("total");

  if (list) {
    if (cart.length === 0) {
      list.innerHTML = `<p id="empty-cart" class="text-center text-gray-400 mt-10">
                No items yet
              </p>`;
    } else {
      list.innerHTML = cart
        .map(
          (item, index) => `
                <div class="flex items-center justify-between rounded-xl border border-gray-200 p-3">
                  <div>
                    <p class="font-semibold text-gray-800">${item.name}</p>
                    ${
                      item.chosenVariant
                        ? `<p class="text-xs text-gray-500">${item.chosenVariant}</p>`
                        : ""
                    }
                    <p class="text-sm text-gray-600 mt-1">Rp ${item.price.toLocaleString()} x ${item.qty}</p>
                  </div>
                  <div class="flex items-center gap-2">
                    <button onclick="updateQtyInCart(${index}, -1)" class="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200">-</button>
                    <span class="font-semibold">${item.qty}</span>
                    <button onclick="updateQtyInCart(${index}, 1)" class="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200">+</button>
                  </div>
                </div>
              `,
        )
        .join("");
    }
  }

  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);

  if (subtotalEl) {
    subtotalEl.textContent = "Rp " + total.toLocaleString();
  }
  if (totalEl) {
    totalEl.textContent = "Rp " + total.toLocaleString();
  }

  const desktopBadge = document.getElementById("desktop-cart-badge");

  if (desktopBadge) {
    const totalQty = cashierCart.reduce((sum, item) => sum + item.qty, 0);

    desktopBadge.textContent = totalQty;
  }

  if (badge) {
    if (cart.length > 0) {
      badge.textContent = cart.length;
      badge.classList.remove("hidden");
    } else {
      badge.classList.add("hidden");
    }
  }

  saveCart();
}

function renderCustomerCart() {
  const list = document.getElementById("customer-cart-list");

  if (!list) return;

  if (customerCart.length === 0) {
    list.innerHTML = `
      <div class="text-center text-gray-400 py-6">
        Belum ada pesanan
      </div>
    `;
  } else {
    list.innerHTML = customerCart
      .map(
        (item, index) => `
        <div class="flex items-center justify-between bg-white rounded-lg p-3 shadow-sm mb-2">

          <div class="flex-1">
            <p class="font-medium text-gray-800">
              ${item.name}
            </p>

            ${
              item.chosenVariant
                ? `
                <p class="text-xs text-crimson mt-1">
                  ${item.chosenVariant}
                </p>
              `
                : ""
            }

            <p class="text-xs text-gray-500 mt-1">
              Rp ${item.price.toLocaleString()}
            </p>
          </div>

          <div class="flex items-center gap-2">

            <button
              onclick="updateQtyInCart(${index}, -1)"
              class="w-7 h-7 rounded bg-gray-200 hover:bg-gray-300">
              -
            </button>

            <span class="font-semibold w-5 text-center">
              ${item.qty}
            </span>

            <button
              onclick="updateQtyInCart(${index}, 1)"
              class="w-7 h-7 rounded bg-gray-200 hover:bg-gray-300">
              +
            </button>

          </div>

        </div>
      `,
      )
      .join("");
  }

  const total = customerCart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  );

  const checkoutTotalEl = document.getElementById("customer-checkout-total");
  const customerTotalEl = document.getElementById("customer-total");

  if (checkoutTotalEl) {
    checkoutTotalEl.textContent = "Rp " + total.toLocaleString();
  }

  if (customerTotalEl) {
    customerTotalEl.textContent = "Rp " + total.toLocaleString();
  }

  const customerMenuTotalEl = document.getElementById("customer-cart-total");
  if (customerMenuTotalEl) {
    customerMenuTotalEl.textContent = "Rp " + total.toLocaleString();
  }

  saveCart();
}

function updateQtyInCart(index, delta) {
  const cart = getActiveCart();

  if (cart[index]) {
    cart[index].qty += delta;

    if (cart[index].qty <= 0) {
      cart.splice(index, 1);
    }
  }

  if (currentRole === "customer") {
    renderCustomerCart();
  } else {
    renderCart();
  }
}

function confirmAddToCart() {
  if (!activeProductForModal) return;

  const cart = getActiveCart();
  const selectedOptions = [];

  document
    .querySelectorAll("#modal-variants-container .select-group")
    .forEach((group) => {
      const activeOptBtn = group.querySelector(".border-crimson");
      if (activeOptBtn) {
        selectedOptions.push(activeOptBtn.textContent.trim());
      }
    });

  const variantString = selectedOptions.join(" | ");

  const existing = cart.find(
    (c) =>
      c.id === activeProductForModal.id && c.chosenVariant === variantString,
  );

  if (existing) {
    existing.qty++;
  } else {
    cart.push({
      ...activeProductForModal,
      chosenVariant: variantString,
      qty: 1,
    });
  }

  saveCart();

  if (currentRole === "customer") {
    renderCustomerCart();
  } else {
    renderCart();
  }

  closeDetailModal();
}

function toggleMobileCart() {
  const sidebar = document.getElementById("checkout-sidebar");
  const overlay = document.getElementById("cart-overlay");

  sidebar.classList.toggle("translate-x-full");
  overlay.classList.toggle("hidden");
}
