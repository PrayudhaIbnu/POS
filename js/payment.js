function openPayment() {
  const cart = cashierCart;
  if (cart.length === 0) return;

  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);
  document.getElementById("payment-total").textContent =
    "Rp " + total.toLocaleString();
  document.getElementById("tendered").value = total;

  // Reset ke Cash sebagai default
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

  // Reset ke Cash sebagai default
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

  // Reset semua button payment
  document.querySelectorAll(".payment-method").forEach((b) => {
    b.classList.remove("border-crimson", "bg-red-50");
    b.classList.add("border-gray-200");

    // Reset icon color
    const icon = b.querySelector("i");
    const text = b.querySelector("span");
    if (icon) {
      icon.classList.remove("text-crimson");
      icon.classList.add("text-gray-500");
    }
    if (text) {
      text.classList.remove("text-crimson");
      text.classList.add("text-gray-600");
    }
  });

  // Set active button
  btn.classList.remove("border-gray-200");
  btn.classList.add("border-crimson", "bg-red-50");

  const activeIcon = btn.querySelector("i");
  const activeText = btn.querySelector("span");
  if (activeIcon) {
    activeIcon.classList.remove("text-gray-500");
    activeIcon.classList.add("text-crimson");
  }
  if (activeText) {
    activeText.classList.remove("text-gray-600");
    activeText.classList.add("text-crimson");
  }

  // Toggle section berdasarkan metode
  const qrisSection = document.getElementById("qris-section");
  const cashSection = document.getElementById("cash-section");
  const confirmBtnText = document.getElementById("confirm-btn-text");

  if (method === "QRIS") {
    // Tampilkan QRIS, sembunyikan Cash
    qrisSection.classList.remove("hidden");
    cashSection.classList.add("hidden");
    confirmBtnText.textContent = "Konfirmasi Pembayaran";
    generateQRIS();
  } else {
    // Tampilkan Cash, sembunyikan QRIS
    qrisSection.classList.add("hidden");
    cashSection.classList.remove("hidden");
    confirmBtnText.textContent = "Konfirmasi Pembayaran";
  }

  lucide.createIcons();
}

// Generate QR Code untuk QRIS
function generateQRIS() {
  const totalText = document.getElementById("payment-total").textContent;
  const total = parseInt(totalText.replace(/\D/g, "")) || 0;

  // Generate transaction ID
  const trxId = "TRX-" + Math.floor(100000 + Math.random() * 900000);

  // Data QR (format sederhana untuk demo)
  const qrData = {
    merchant: "Seblak Mama Ica",
    trxId: trxId,
    total: total,
    timestamp: Date.now(),
    type: "QRIS",
  };

  // Encode data ke URL
  const qrString = encodeURIComponent(JSON.stringify(qrData));
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=224x224&data=${qrString}&margin=10`;

  // Update display
  const qrisImage = document.getElementById("qris-image");
  const qrisTotal = document.getElementById("qris-total");
  const qrisTrxId = document.getElementById("qris-trx-id");

  if (qrisImage) qrisImage.src = qrUrl;
  if (qrisTotal) qrisTotal.textContent = "Rp " + total.toLocaleString();
  if (qrisTrxId) qrisTrxId.textContent = trxId;
}

function calculateChange() {
  const totalText = document.getElementById("payment-total").textContent;
  const total = parseInt(totalText.replace(/\D/g, "")) || 0;
  const tendered = parseInt(document.getElementById("tendered").value) || 0;
  const change = tendered - total;

  const changeDisplay = document.getElementById("change-display");
  const changeAmount = document.getElementById("change-amount");

  if (tendered > 0 && change >= 0) {
    changeDisplay.classList.remove("hidden");
    changeAmount.textContent = "Rp " + change.toLocaleString();
  } else {
    changeDisplay.classList.add("hidden");
  }
}

function setQuickAmount(amount) {
  document.getElementById("tendered").value = amount;
  calculateChange();
}

function setExactAmount() {
  const totalText = document.getElementById("payment-total").textContent;
  const total = parseInt(totalText.replace(/\D/g, "")) || 0;
  document.getElementById("tendered").value = total;
  calculateChange();
}

function confirmPayment() {
  const cart = getActiveCart();

  if (cart.length === 0) {
    alert("Keranjang kosong.");
    return;
  }

  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const tenderedInput = document.getElementById("tendered");
  const tendered =
    currentPaymentMethod === "QRIS"
      ? total
      : parseInt(tenderedInput?.value) || 0;

  if (currentPaymentMethod === "Cash" && tendered < total) {
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
  const storeName =
    document.getElementById("sidebar-store-name")?.textContent ||
    "Seblak Mama Ica";

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

  cart.forEach((item) => {
    const product = products.find((p) => p.id === item.id);
    if (product) {
      product.stock = Math.max(0, product.stock - item.qty);
    }
  });

  saveProducts();
  renderStock();
  saveReports();
  if (typeof renderReports === "function") renderReports();

  closePayment();
  document.getElementById("receipt-modal").classList.remove("hidden");

  if (currentRole === "customer") {
    submitCustomerOrder();

    // Update status meja menjadi terisi
    if (customerContact) {
      const table = tables.find((t) => t.code === customerContact);
      if (table) {
        table.occupied = true;
        saveTablesData();
        if (typeof renderTables === "function") renderTables();
      }
    }

    customerCart = [];
    renderCustomerCart();
  } else {
    cashierCart = [];
    renderCart();
  }

  saveProducts();
  broadcastUpdate("products_updated"); 

  saveReports();
  broadcastUpdate("reports_updated");

  saveCart();
  broadcastUpdate("cart_updated"); 
}

function closeReceipt() {
  document.getElementById("receipt-modal").classList.add("hidden");
}
