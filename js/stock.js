let activeStockProduct = null;
let stockAction = "add"; // add | reduce

function renderStock() {
  const container = document.getElementById("stock-product-list");

  if (!container) return;

  container.innerHTML = "";

  updateStockSummary();

  products.forEach((product) => {
    let status = "Tersedia";

    let badge = "bg-green-100 text-green-700";

    if (product.stock <= 10) {
      status = "Stok Menipis";

      badge = "bg-yellow-100 text-yellow-700";
    }

    if (product.stock <= 0) {
      status = "Habis";

      badge = "bg-red-100 text-red-700";
    }

    container.innerHTML += `


<div class="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition p-5">

  <!-- Header -->
  <div class="flex items-start justify-between gap-3">
    <div>
      <h3 class="font-bold text-gray-800 text-lg leading-tight">
        ${product.name}
      </h3>

      <span class="inline-flex mt-2 px-2.5 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
        ${product.cat}
      </span>
    </div>

    <span class="text-xs font-semibold px-3 py-1 rounded-full ${badge}">
      ${status}
    </span>
  </div>

  <!-- Stock Info -->
  <div class="mt-6">
    <p class="text-sm text-gray-500">
      Stok Tersedia
    </p>

    <div class="flex items-end gap-2 mt-1">
      <h2 class="text-4xl font-bold text-gray-800">
        ${product.stock ?? 0}
      </h2>

      <span class="text-sm text-gray-400 mb-1">
        pcs
      </span>
    </div>
  </div>

  <!-- Action Buttons -->
  <div class="grid grid-cols-2 gap-3 mt-6">

    <button
      onclick="openStockModal(${product.id}, 'add')"
      class="flex items-center justify-center gap-2 bg-pos-green hover:bg-pos-green-hover text-white font-medium py-2.5 rounded-xl transition"
    >
      <i data-lucide="plus" class="w-4 h-4"></i>
      Tambah
    </button>

    <button
      onclick="openStockModal(${product.id}, 'reduce')"
      class="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-medium py-2.5 rounded-xl transition"
    >
      <i data-lucide="minus" class="w-4 h-4"></i>
      Kurangi
    </button>

  </div>

</div>


`;
  });

  lucide.createIcons();
}

function searchStock() {
  const keyword = document.getElementById("stock-search").value.toLowerCase();

  const cards = document.querySelectorAll("#stock-product-list > div");

  cards.forEach((card) => {
    const title = card.querySelector("h3").textContent.toLowerCase();

    card.style.display = title.includes(keyword) ? "block" : "none";
  });
}

function closeStockModal() {
  document.getElementById("stock-modal-box").classList.add("hidden");

  activeStockProduct = null;
}

function openStockModal(id, action) {
  const product = products.find((p) => p.id === id);

  if (!product) return;

  activeStockProduct = product;
  stockAction = action;

  document.getElementById("stock-product-name").textContent =
    `${product.name} (Stok saat ini: ${product.stock})`;

  document.getElementById("stock-add-amount").value = "";

  document.getElementById("stock-modal-box").classList.remove("hidden");
}

function closeStockModal() {
  document.getElementById("stock-modal-box").classList.add("hidden");

  activeStockProduct = null;
}

function addStock(id) {
  const product = products.find((item) => item.id === id);

  if (!product) return;

  const amount = prompt(`Tambah stok untuk ${product.name}`);

  if (amount === null) return;

  const qty = parseInt(amount);

  if (isNaN(qty)) {
    alert("Masukkan angka yang valid");
    return;
  }

  product.stock = (product.stock || 0) + qty;

  renderStock();
}

function reduceStock(id) {
  const product = products.find((item) => item.id === id);

  const amount = prompt(`Kurangi stok ${product.name}`);

  if (!amount) return;

  product.stock -= Number(amount);

  if (product.stock < 0) {
    product.stock = 0;
  }

  renderStock();
}

function updateStockSummary() {
  document.getElementById("total-menu-stock").textContent = products.length;

  document.getElementById("low-stock-total").textContent = products.filter(
    (product) => product.stock > 0 && product.stock <= 10,
  ).length;

  document.getElementById("empty-stock-total").textContent = products.filter(
    (product) => product.stock <= 0,
  ).length;
}

function saveStock() {
  if (!activeStockProduct) return;

  const amount = Number(document.getElementById("stock-add-amount").value);

  if (!amount || amount <= 0) {
    alert("Masukkan jumlah yang valid");
    return;
  }

  if (stockAction === "add") {
    activeStockProduct.stock += amount;
  }

  if (stockAction === "reduce") {
    if (activeStockProduct.stock < amount) {
      alert("Stok tidak mencukupi");
      return;
    }

    activeStockProduct.stock -= amount;
  }

  // jika punya localStorage
  if (typeof saveProducts === "function") {
    saveProducts();
  }

  closeStockModal();
  renderStock();
}
