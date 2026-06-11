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
                              <div
                                class="bg-white rounded-xl overflow-hidden shadow">

                                <img
                                  src="${p.images || "https://via.placeholder.com/300"}"
                                  class="w-full h-40 object-cover">

                                <div class="p-3">

                                  <h3 class="font-semibold">
                                    ${p.name}
                                  </h3>

                                  <p class="text-sm text-gray-500">
                                    ${p.details || "Tidak ada rincian deskripsi item."}
                                  </p>

                                  <div class="mt-2">

                                    <div
                                      class="text-crimson font-bold">

                                      Rp ${p.price.toLocaleString()}

                                    </div>

                                    <button
                                      onclick="openDetailModal(${p.id})"
                                      class="mt-2 w-full bg-pos-green text-white py-2 rounded">

                                      Tambah

                                    </button>

                                  </div>

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
