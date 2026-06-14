function openPayment() {
  const cart = cashierCart;

  if (cart.length === 0) return;
  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);
  document.getElementById("payment-total").textContent =
    "Rp " + total.toLocaleString();
  document.getElementById("tendered").value = total;

  const defaultPayBtn = document.getElementById("pay-cash");
  selectPayment(defaultPayBtn, "Cash");

  document.getElementById("payment-modal").classList.remove("hidden");
  lucide.createIcons();
}

function openCustomerCheckout() {
  if (customerCart.length === 0) {
    alert("Keranjang Anda kosong.");
    return;
  }

  const total = customerCart.reduce((s, c) => s + c.price * c.qty, 0);
  document.getElementById("payment-total").textContent =
    "Rp " + total.toLocaleString();
  document.getElementById("tendered").value = total;

  const defaultPayBtn = document.getElementById("pay-cash");
  if (defaultPayBtn) {
    selectPayment(defaultPayBtn, "Cash");
  }

  document.getElementById("payment-modal").classList.remove("hidden");
  lucide.createIcons();
}

function closePayment() {
  document.getElementById("payment-modal").classList.add("hidden");
}

function selectPayment(btn, method) {
  currentPaymentMethod = method;

  document.querySelectorAll(".payment-method").forEach((b) => {
    b.classList.remove("border-crimson", "bg-red-50");

    b.classList.add("border-gray-200");
  });

  btn.classList.remove("border-gray-200");

  btn.classList.add("border-crimson", "bg-red-50");
}

function confirmPayment() {
  const cart = getActiveCart();

  if (cart.length === 0) {
    alert("Keranjang kosong.");
    return;
  }

  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const tendered = parseInt(document.getElementById("tendered").value) || 0;

  if (tendered < total) {
    alert("Uang pembayaran kurang dari total tagihan!");
    return;
  }

  const change = tendered - total;
  const trxId = "TRX-" + Math.floor(100000 + Math.random() * 900000);
  const now = new Date();
  const dateStr =
    now.toLocaleDateString("id-ID") +
    " " +
    now.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  const storeName = document.getElementById("sidebar-store-name").textContent;

  document.getElementById("receipt-store-name").textContent = storeName;
  document.getElementById("receipt-id").textContent = "#" + trxId;
  document.getElementById("receipt-date").textContent = dateStr;
  document.getElementById("receipt-method").textContent = currentPaymentMethod;
  document.getElementById("receipt-total").textContent =
    "Rp " + total.toLocaleString();
  document.getElementById("receipt-tendered").textContent =
    "Rp " + tendered.toLocaleString();
  document.getElementById("receipt-change").textContent =
    "Rp " + change.toLocaleString();

  const receiptItemsContainer = document.getElementById("receipt-items");
  receiptItemsContainer.innerHTML = cart
    .map(
      (item) => `
                                  <div class="flex justify-between text-xs pt-2">
                                    <div>
                                      <p class="font-medium text-gray-800">${item.name}</p>
                                      ${item.chosenVariant ? `<p class="text-[10px] text-gray-400 font-mono">${item.chosenVariant}</p>` : ""}
                                      <p class="text-gray-400 text-[10px]">${item.qty} x Rp ${item.price.toLocaleString()}</p>
                                    </div>
                                    <span class="font-mono text-gray-700 align-bottom self-end">Rp ${(item.price * item.qty).toLocaleString()}</span>
                                  </div>
                                `,
    )
    .join("");

  reports.push({
    id: trxId,
    time: dateStr,
    method: currentPaymentMethod,
    total: total,
  });

  console.log("REPORT MASUK:", reports);

  cart.forEach((item) => {
    const product = products.find((p) => p.id === item.id);

    if (product) {
      product.stock = Math.max(0, product.stock - item.qty);
    }
  });

  saveProducts();
  renderStock();

  saveReports();

  if (typeof renderReports === "function") {
    renderReports();
  }

  renderReports();
  // renderFooterStats();

  closePayment();
  document.getElementById("receipt-modal").classList.remove("hidden");

  if (currentRole === "customer") {
    submitCustomerOrder();
    customerCart = [];
    renderCustomerCart();
  } else {
    cashierCart = [];
    renderCart();
  }

  saveCart();
}

function closeReceipt() {
  document.getElementById("receipt-modal").classList.add("hidden");
}
