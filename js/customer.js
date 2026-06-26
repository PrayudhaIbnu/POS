// === CATEGORY FILTER UNTUK CUSTOMER ===
function setCustomerCategoryFilter(category) {
  selectedCategory = category;
  
  // Update tampilan tombol - ikuti pola products.js
  document.querySelectorAll(".cat-filter-btn").forEach((btn) => {
    if (btn.textContent.trim() === category || 
        (category === "All" && btn.textContent.trim() === "Semua") ||
        (category === "Food" && btn.textContent.trim().includes("Makanan")) ||
        (category === "Beverage" && btn.textContent.trim().includes("Minuman")) ||
        (category === "Snack" && btn.textContent.trim().includes("Snack"))) {
      btn.className = "cat-filter-btn whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium bg-crimson text-white shadow-sm transition";
    } else {
      btn.className = "cat-filter-btn whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 transition";
    }
  });
  
  filterCustomerProducts();
}

function filterCustomerProducts() {
  const searchInput = document.getElementById("customer-search");
  const query = searchInput ? searchInput.value.toLowerCase().trim() : "";
  
  const filtered = products.filter((p) => {
    const matchKeyword = !query || p.name.toLowerCase().includes(query) || 
                         (p.details && p.details.toLowerCase().includes(query));
    const matchCategory = selectedCategory === "All" || p.cat === selectedCategory;
    return matchKeyword && matchCategory;
  });

  const grid = document.getElementById("customer-product-grid");
  if (!grid) return;
  
  // Update filter info
  const filterInfo = document.getElementById("customer-filter-info");
  const productCount = document.getElementById("customer-product-count");
  
  if (filterInfo && productCount) {
    const isFiltering = selectedCategory !== "All" || query;
    filterInfo.classList.toggle("hidden", !isFiltering);
    productCount.textContent = filtered.length;
  }
  
  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full bg-white rounded-xl border p-12 text-center">
        <i data-lucide="search-x" class="mx-auto text-gray-300 mb-3" style="width:48px;height:48px"></i>
        <p class="text-gray-500 font-medium">Produk tidak ditemukan</p>
        <p class="text-sm text-gray-400 mt-1">
          ${query ? `Tidak ada produk yang cocok dengan "${query}"` : "Tidak ada produk di kategori ini"}
        </p>
        <button
          onclick="resetCustomerFilters()"
          class="mt-4 px-4 py-2 bg-crimson text-white rounded-lg text-sm font-medium hover:bg-crimson-dark transition">
          Reset Filter
        </button>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  grid.innerHTML = filtered
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
            
            ${
              p.cat
                ? `
                <span class="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-gray-700 text-[10px] font-semibold px-2 py-1 rounded-full">
                  ${getCategoryLabel(p.cat)}
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

function resetCustomerFilters() {
  selectedCategory = "All";
  const searchInput = document.getElementById("customer-search");
  if (searchInput) searchInput.value = "";
  setCustomerCategoryFilter("All");
}

// Helper untuk label kategori
function getCategoryLabel(cat) {
  const labels = {
    "Food": "Makanan",
    "Beverage": "Minuman",
    "Snack": "Snack"
  };
  return labels[cat] || cat;
}

// === FUNGSI LAINNYA TETAP SAMA ===
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
  
  saveCustomerSession();
  
  const nameDisplay = document.getElementById("customer-name-display");
  const tableDisplay = document.getElementById("customer-table-display");
  if (nameDisplay) nameDisplay.textContent = customerName;
  if (tableDisplay) tableDisplay.textContent = customerContact;
  
  renderCustomerProducts();
  renderCustomerCart();
  navigateTo("customer-menu");
}

function updateCustomerDisplay() {
  const displayName = document.getElementById("customer-name-display");
  const displayTable = document.getElementById("customer-table-display");
  
  if (displayName) {
    displayName.textContent = customerName || "Customer";
  }
  if (displayTable) {
    displayTable.textContent = customerContact || "-";
  }
}

function renderCustomerProducts() {
  filterCustomerProducts();
}

function renderCustomerStatus() {
  // Update customer info
  const nameEl = document.getElementById('status-customer-name');
  const tableEl = document.getElementById('status-customer-table');
  
  if (nameEl) nameEl.textContent = customerName || 'Customer';
  if (tableEl) tableEl.textContent = customerContact || '-';
  
  // Get customer's orders
  const myOrders = customerOrders.filter(order => 
    order.customer === customerName && order.table === customerContact
  );
  
  // Separate active and completed
  const activeOrders = myOrders.filter(o => 
    o.status === 'Menunggu Diproses' || o.status === 'Sedang Diproses'
  ).sort((a, b) => b.id - a.id);
  
  const completedOrders = myOrders.filter(o => 
    o.status === 'Selesai' || o.status === 'Dibatalkan'
  ).sort((a, b) => b.id - a.id);
  
  // Update active orders count
  const countEl = document.getElementById('active-order-count');
  if (countEl) countEl.textContent = `${activeOrders.length} pesanan`;
  
  // Show/hide sections
  const activeSection = document.getElementById('active-order-section');
  const completedSection = document.getElementById('completed-order-section');
  const emptyState = document.getElementById('status-empty-state');
  
  if (myOrders.length === 0) {
    activeSection?.classList.add('hidden');
    completedSection?.classList.add('hidden');
    emptyState?.classList.remove('hidden');
  } else {
    emptyState?.classList.add('hidden');
    
    if (activeOrders.length > 0) {
      activeSection?.classList.remove('hidden');
      renderActiveOrders(activeOrders);
    } else {
      activeSection?.classList.add('hidden');
    }
    
    if (completedOrders.length > 0) {
      completedSection?.classList.remove('hidden');
      renderCompletedOrders(completedOrders);
    } else {
      completedSection?.classList.add('hidden');
    }
  }
  
  lucide.createIcons();
}

function renderActiveOrders(orders) {
  const container = document.getElementById('active-orders-list');
  if (!container) return;
  
  container.innerHTML = orders.map(order => {
    const total = order.items.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const orderTime = new Date(order.id).toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit'
    });
    
    // Progress steps
    const steps = [
      { label: 'Diterima', status: 'Menunggu Diproses', icon: 'clipboard-check' },
      { label: 'Diproses', status: 'Sedang Diproses', icon: 'chef-hat' },
      { label: 'Selesai', status: 'Selesai', icon: 'check-circle' }
    ];
    
    const currentIndex = steps.findIndex(s => s.status === order.status);
    const progressPercent = ((currentIndex + 1) / steps.length) * 100;
    
    return `
      <div class="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <!-- Header -->
        <div class="p-4 border-b bg-gradient-to-r from-gray-50 to-white">
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center gap-2">
              <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusBadge(order.status)}">
                <i data-lucide="${getStatusIcon(order.status)}" style="width:12px;height:12px"></i>
                ${order.status}
              </span>
            </div>
            <span class="text-xs text-gray-500 font-mono">#${order.id}</span>
          </div>
          <p class="text-xs text-gray-500">
            <i data-lucide="clock" class="inline" style="width:12px;height:12px"></i>
            ${orderTime}
          </p>
        </div>
        
        <!-- Progress Bar -->
        <div class="p-5">
          <div class="relative mb-6">
            <!-- Progress line background -->
            <div class="absolute top-4 left-0 right-0 h-1 bg-gray-200 rounded-full"></div>
            <!-- Progress line active -->
            <div 
              class="absolute top-4 left-0 h-1 bg-gradient-to-r from-crimson to-crimson-dark rounded-full transition-all duration-500"
              style="width: ${progressPercent}%"></div>
            
            <!-- Steps -->
            <div class="relative flex justify-between">
              ${steps.map((step, index) => {
                const isCompleted = index <= currentIndex;
                const isCurrent = index === currentIndex;
                
                return `
                  <div class="flex flex-col items-center" style="width: ${100/steps.length}%">
                    <div class="w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      isCompleted 
                        ? 'bg-crimson text-white shadow-md' 
                        : 'bg-gray-200 text-gray-400'
                    } ${isCurrent ? 'ring-4 ring-crimson/20' : ''}">
                      <i data-lucide="${step.icon}" style="width:14px;height:14px"></i>
                    </div>
                    <p class="text-xs mt-2 font-medium ${
                      isCompleted ? 'text-crimson' : 'text-gray-400'
                    }">${step.label}</p>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
          
          <!-- Info Message -->
          <div class="${
            order.status === 'Menunggu Diproses' 
              ? 'bg-orange-50 border-orange-200 text-orange-700' 
              : 'bg-blue-50 border-blue-200 text-blue-700'
          } border rounded-xl p-3 flex items-start gap-2 mb-4">
            <i data-lucide="${order.status === 'Menunggu Diproses' ? 'clock' : 'chef-hat'}" 
               class="flex-shrink-0 mt-0.5" style="width:16px;height:16px"></i>
            <div>
              <p class="font-semibold text-sm">
                ${order.status === 'Menunggu Diproses' ? 'Pesanan sedang menunggu konfirmasi' : 'Pesanan sedang disiapkan'}
              </p>
              <p class="text-xs mt-0.5 opacity-80">
                ${order.status === 'Menunggu Diproses' 
                  ? 'Mohon tunggu, kasir akan segera memproses pesananmu' 
                  : 'Tim dapur sedang menyiapkan pesananmu dengan sepenuh hati'}
              </p>
            </div>
          </div>
          
          <!-- Items List -->
          <div class="space-y-2">
            <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Detail Pesanan</p>
            ${order.items.map(item => `
              <div class="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                <div class="flex-1">
                  <p class="text-sm font-medium text-gray-800">${item.qty}x ${item.name}</p>
                  ${item.chosenVariant ? `<p class="text-xs text-gray-500">${item.chosenVariant}</p>` : ''}
                </div>
                <p class="text-sm font-semibold text-gray-700">Rp ${(item.price * item.qty).toLocaleString()}</p>
              </div>
            `).join('')}
          </div>
          
          <!-- Total -->
          <div class="mt-4 pt-3 border-t flex justify-between items-center">
            <span class="text-sm text-gray-600 font-medium">Total</span>
            <span class="text-lg font-bold text-crimson">Rp ${total.toLocaleString()}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function renderCompletedOrders(orders) {
  const container = document.getElementById('completed-orders-list');
  if (!container) return;
  
  container.innerHTML = orders.slice(0, 5).map(order => {
    const total = order.items.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const orderTime = new Date(order.id).toLocaleString('id-ID', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
    
    return `
      <div class="bg-white rounded-xl border p-4 flex items-center gap-3">
        <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <i data-lucide="check-circle" class="text-green-600" style="width:20px;height:20px"></i>
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2">
            <p class="font-semibold text-sm text-gray-800">${order.items.length} item</p>
            <span class="text-xs text-gray-400">•</span>
            <p class="text-xs text-gray-500">${orderTime}</p>
          </div>
          <p class="text-xs text-gray-500 truncate mt-0.5">
            ${order.items.map(i => `${i.qty}x ${i.name}`).join(', ')}
          </p>
        </div>
        <div class="text-right flex-shrink-0">
          <p class="font-bold text-sm text-gray-800">Rp ${total.toLocaleString()}</p>
          <span class="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-green-100 text-green-700 mt-1">
            ${order.status}
          </span>
        </div>
      </div>
    `;
  }).join('');
}

// Helper functions (jika belum ada di orders.js)
function getStatusBadge(status) {
  const badges = {
    "Menunggu Diproses": "bg-orange-100 text-orange-700 border border-orange-200",
    "Sedang Diproses": "bg-blue-100 text-blue-700 border border-blue-200",
    "Selesai": "bg-green-100 text-green-700 border border-green-200",
    "Dibatalkan": "bg-red-100 text-red-700 border border-red-200"
  };
  return badges[status] || "bg-gray-100 text-gray-700 border border-gray-200";
}

function getStatusIcon(status) {
  const icons = {
    "Menunggu Diproses": "clock",
    "Sedang Diproses": "chef-hat",
    "Selesai": "check-circle",
    "Dibatalkan": "x-circle"
  };
  return icons[status] || "circle";
}

function submitCustomerOrder() {
  if (customerCart.length === 0) return;
  
  const newOrder = {
    id: Date.now(),
    customer: customerName,
    table: customerContact,
    items: [...customerCart],
    status: "Menunggu Diproses",
    createdAt: new Date().toISOString(),
  };
  
  customerOrders.push(newOrder);
  saveOrders();
  
  if (typeof broadcastUpdate === "function") {
    broadcastUpdate("orders_updated");
  }
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
    customerName = "";
    customerContact = "";
    saveCustomerSession();
    navigateTo("dashboard");
    return;
  }
  alert("Username atau password salah");
}