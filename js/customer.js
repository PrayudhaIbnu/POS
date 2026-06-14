function showCustomerForm() {
  document.getElementById("customer-entry")?.classList.remove("hidden");
}

function hideCustomerForm() {
  document.getElementById("customer-entry")?.classList.add("hidden");
}

function startCustomerOrder() {
  const name = document.getElementById("customer-name").value.trim();
  const contact = document.getElementById("customer-table").value.trim();

  if (!name || !contact) {
    alert("Silakan isi nama dan meja/nomor HP.");
    return;
  }

  customerName = name;
  customerContact = contact;
  currentRole = "customer";

  const nameDisplay = document.getElementById("customer-name-display");

  const contactDisplay = document.getElementById("customer-contact-display");

  const greeting = document.getElementById("customer-greeting");

  if (nameDisplay) nameDisplay.textContent = customerName;

  if (contactDisplay) contactDisplay.textContent = customerContact;

  if (greeting) greeting.textContent = `Selamat datang, ${customerName}`;

  renderCustomerProducts();
  renderCustomerCart();
  navigateTo("customer-menu");
}

function renderCustomerProducts() {
  const grid = document.getElementById("customer-product-grid");
  if (!grid) return;

  grid.innerHTML = products
    .map(
      (p) => `
<div class="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition flex flex-col justify-between">
  <div>
    <div class="relative h-32 bg-gray-200 flex items-center justify-center">
      <img
        src="${p.images || "https://via.placeholder.com/150"}"
        alt="${p.name}"
        class="object-cover h-full w-full ${p.stock <= 0 ? "opacity-60" : ""}"
      />

      ${
        p.stock <= 0
          ? `
          <span class="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
            Stok Habis
          </span>
        `
          : ""
      }
    </div>

    <div class="p-3 pb-0">
      <p class="font-semibold text-gray-800 text-sm truncate">
        ${p.name}
      </p>

      <p class="text-gray-400 text-[10px] line-clamp-2 mt-0.5 min-h-[30px]">
        ${p.details || "Tidak ada rincian deskripsi item."}
      </p>

      <p class="mt-1 text-xs ${
        p.stock <= 0
          ? "text-red-500 font-semibold"
          : p.stock <= 10
            ? "text-yellow-500 font-semibold"
            : "text-green-600"
      }">
        Stok: ${p.stock ?? 0}
      </p>
    </div>
  </div>

  <div class="p-3 pt-1">
    <p class="text-crimson font-bold text-sm">
      Rp ${p.price.toLocaleString()}
    </p>

    <button
      ${p.stock <= 0 ? "disabled" : `onclick="openDetailModal(${p.id})"`}
      class="mt-2 w-full ${
        p.stock <= 0
          ? "bg-gray-300 cursor-not-allowed text-gray-500"
          : "bg-pos-green hover:bg-pos-green-hover text-white"
      } text-sm font-medium py-2 rounded-lg flex items-center justify-center gap-1 transition"
    >
      <i data-lucide="${
        p.stock <= 0 ? "package-x" : "eye"
      }" style="width:14px;height:14px;"></i>

      ${p.stock <= 0 ? "Stok Habis" : "Lihat"}
    </button>
  </div>
</div>
                            `,
    )
    .join("");

  lucide.createIcons();
}

function submitCustomerOrder() {
  if (customerCart.length === 0) return;

  customerOrders.push({
    id: Date.now(),
    customer: customerName,
    table: customerContact,
    items: [...customerCart],
    status: "Menunggu Diproses",
  });
}

function enterCustomerMenu() {
  const displayNameEl = document.getElementById("customer-display-name");
  if (displayNameEl) {
    displayNameEl.textContent = customerName || "Customer";
  }
  renderCustomerProducts();
  renderCustomerCart();
  navigateTo("customer-menu");
}

function loginCashier() {
  const username = document.getElementById("cashier-username").value;
  const password = document.getElementById("cashier-password").value;

  if (username === "admin" && password === "123456") {
    currentRole = "cashier";
    navigateTo("dashboard");
    return;
  }

  alert("Username atau password salah");
}
