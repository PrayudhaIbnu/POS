let dashboardClockInterval = null;

// === JAM & TANGGAL REAL-TIME ===
function updateDashboardClock() {
  const now = new Date();
  
  // Format jam: HH:MM:SS
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const timeStr = `${hours}:${minutes}:${seconds}`;
  
  // Format tanggal: Hari, DD Bulan YYYY
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  
  const dayName = days[now.getDay()];
  const date = now.getDate();
  const month = months[now.getMonth()];
  const year = now.getFullYear();
  const dateStr = `${dayName}, ${date} ${month} ${year}`;
  
  // Greeting berdasarkan jam
  const hour = now.getHours();
  let greeting = 'Selamat Malam';
  if (hour >= 4 && hour < 11) greeting = 'Selamat Pagi';
  else if (hour >= 11 && hour < 15) greeting = 'Selamat Siang';
  else if (hour >= 15 && hour < 18) greeting = 'Selamat Sore';
  
  // Update DOM
  const timeEl = document.getElementById('dashboard-time');
  const dateEl = document.getElementById('dashboard-date');
  const greetingEl = document.getElementById('dashboard-greeting');
  
  if (timeEl) timeEl.textContent = timeStr;
  if (dateEl) dateEl.textContent = dateStr;
  if (greetingEl) greetingEl.textContent = `${greeting}`;
}

function startDashboardClock() {
  updateDashboardClock(); // Panggil langsung
  if (dashboardClockInterval) clearInterval(dashboardClockInterval);
  dashboardClockInterval = setInterval(updateDashboardClock, 1000);
}

function stopDashboardClock() {
  if (dashboardClockInterval) {
    clearInterval(dashboardClockInterval);
    dashboardClockInterval = null;
  }
}

// === HELPER: Cek apakah timestamp hari ini ===
function isToday(timestamp) {
  if (!timestamp) return false;
  const date = new Date(timestamp);
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

function isTodayFromTimeString(timeStr) {
  // timeStr format: "DD/MM/YYYY HH.MM" atau "26/6/2026 00.13"
  if (!timeStr) return false;
  const parts = timeStr.split(' ');
  if (parts.length < 2) return false;
  
  const dateParts = parts[0].split('/');
  if (dateParts.length !== 3) return false;
  
  const day = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]) - 1; // 0-indexed
  const year = parseInt(dateParts[2]);
  
  const today = new Date();
  return (
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear()
  );
}

// === RENDER DASHBOARD ===
function renderDashboard() {
  // 1. Pendapatan & Transaksi Hari Ini
  const todayReports = reports.filter(r => isTodayFromTimeString(r.time));
  const todayRevenue = todayReports.reduce((sum, r) => sum + (r.total || 0), 0);
  const todayTransactionCount = todayReports.length;
  const avgTransaction = todayTransactionCount > 0 
    ? Math.round(todayRevenue / todayTransactionCount) 
    : 0;
  
  document.getElementById('stat-revenue').textContent = 'Rp ' + todayRevenue.toLocaleString();
  document.getElementById('stat-revenue-count').textContent = `${todayTransactionCount} transaksi`;
  document.getElementById('stat-transactions').textContent = todayTransactionCount;
  document.getElementById('stat-avg-transaction').textContent = `Rata-rata Rp ${avgTransaction.toLocaleString()}`;
  
  // 2. Pesanan Menunggu
  const pendingOrders = customerOrders.filter(o => o.status === 'Menunggu Diproses');
  document.getElementById('stat-pending-orders').textContent = pendingOrders.length;
  
  const ordersBadge = document.getElementById('stat-orders-badge');
  if (pendingOrders.length > 0) {
    ordersBadge.textContent = pendingOrders.length;
    ordersBadge.classList.remove('hidden');
  } else {
    ordersBadge.classList.add('hidden');
  }
  
  // 3. Stok Menipis
  const lowStockProducts = products.filter(p => p.stock <= 10 && p.stock > 0);
  const outOfStock = products.filter(p => p.stock <= 0);
  const totalLowStock = lowStockProducts.length + outOfStock.length;
  
  document.getElementById('stat-low-stock').textContent = totalLowStock;
  const stockBadge = document.getElementById('stat-stock-badge');
  if (totalLowStock > 0) {
    stockBadge.textContent = totalLowStock;
    stockBadge.classList.remove('hidden');
  } else {
    stockBadge.classList.add('hidden');
  }
  
  // 4. Pesanan Aktif (Menunggu + Diproses)
  renderActiveOrders();
  
  // 5. Transaksi Terakhir (5 terbaru hari ini)
  renderLatestTransactions();
  
  // 6. Produk Terlaris
  renderTopProducts();
  
  lucide.createIcons();
}

function renderActiveOrders() {
  const container = document.getElementById('dashboard-active-orders');
  if (!container) return;
  
  const activeOrders = customerOrders
    .filter(o => o.status === 'Menunggu Diproses' || o.status === 'Sedang Diproses')
    .sort((a, b) => b.id - a.id)
    .slice(0, 5);
  
  if (activeOrders.length === 0) {
    container.innerHTML = `
      <div class="text-center py-8">
        <i data-lucide="check-circle" class="mx-auto text-green-400 mb-2" style="width:40px;height:40px"></i>
        <p class="text-gray-500 font-medium">Tidak ada pesanan aktif</p>
        <p class="text-xs text-gray-400 mt-1">Semua pesanan sudah diproses</p>
      </div>
    `;
    lucide.createIcons();
    return;
  }
  
  container.innerHTML = activeOrders.map(order => {
    const total = order.items.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const time = new Date(order.id).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    const statusColor = order.status === 'Menunggu Diproses' ? 'orange' : 'blue';
    const statusIcon = order.status === 'Menunggu Diproses' ? 'clock' : 'chef-hat';
    
    return `
      <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
        <div class="w-10 h-10 bg-${statusColor}-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <i data-lucide="${statusIcon}" class="text-${statusColor}-600" style="width:18px;height:18px"></i>
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2">
            <p class="font-semibold text-gray-800 text-sm truncate">${order.customer}</p>
            <span class="text-xs text-gray-400">•</span>
            <p class="text-xs text-gray-500">${order.table}</p>
          </div>
          <p class="text-xs text-gray-400 mt-0.5">
            ${order.items.length} item • ${time}
          </p>
        </div>
        <div class="text-right flex-shrink-0">
          <p class="font-bold text-sm text-crimson">Rp ${total.toLocaleString()}</p>
          <span class="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-${statusColor}-100 text-${statusColor}-700">
            ${order.status}
          </span>
        </div>
      </div>
    `;
  }).join('');
}

function renderLatestTransactions() {
  const container = document.getElementById('dashboard-latest-transactions');
  if (!container) return;
  
  const todayReports = reports
    .filter(r => isTodayFromTimeString(r.time))
    .sort((a, b) => b.id.localeCompare(a.id))
    .slice(0, 5);
  
  if (todayReports.length === 0) {
    container.innerHTML = `
      <div class="text-center py-8">
        <i data-lucide="inbox" class="mx-auto text-gray-300 mb-2" style="width:40px;height:40px"></i>
        <p class="text-gray-500 font-medium">Belum ada transaksi</p>
        <p class="text-xs text-gray-400 mt-1">Transaksi hari ini akan muncul di sini</p>
      </div>
    `;
    lucide.createIcons();
    return;
  }
  
  container.innerHTML = todayReports.map(trx => {
    const timeOnly = trx.time.split(' ')[1] || trx.time;
    const methodColor = trx.method === 'Cash' ? 'orange' : trx.method === 'QRIS' ? 'purple' : 'blue';
    
    return `
      <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
        <div class="w-10 h-10 bg-${methodColor}-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <i data-lucide="${trx.method === 'Cash' ? 'banknote' : 'qr-code'}" class="text-${methodColor}-600" style="width:18px;height:18px"></i>
        </div>
        <div class="flex-1 min-w-0">
          <p class="font-mono text-xs text-gray-500 truncate">#${trx.id}</p>
          <p class="text-xs text-gray-400">${timeOnly}</p>
        </div>
        <p class="font-bold text-sm text-gray-800">Rp ${trx.total.toLocaleString()}</p>
      </div>
    `;
  }).join('');
}

function renderTopProducts() {
  const container = document.getElementById('dashboard-top-products');
  if (!container) return;
  
  // Hitung penjualan per produk hari ini dari reports
  // Karena reports hanya simpan total, kita pakai data dari orders hari ini
  const todayOrders = customerOrders.filter(o => isToday(o.createdAt || o.id));
  
  const productSales = {};
  todayOrders.forEach(order => {
    order.items.forEach(item => {
      if (!productSales[item.id]) {
        productSales[item.id] = {
          id: item.id,
          name: item.name,
          qty: 0,
          revenue: 0,
          image: item.image || item.images
        };
      }
      productSales[item.id].qty += item.qty;
      productSales[item.id].revenue += item.price * item.qty;
    });
  });
  
  const topProducts = Object.values(productSales)
    .sort((a, b) => b.qty - a.qty)
    .slice(0, 4);
  
  if (topProducts.length === 0) {
    container.innerHTML = `
      <div class="col-span-full text-center py-8">
        <i data-lucide="flame" class="mx-auto text-gray-300 mb-2" style="width:40px;height:40px"></i>
        <p class="text-gray-500 font-medium">Belum ada penjualan hari ini</p>
      </div>
    `;
    lucide.createIcons();
    return;
  }
    
  container.innerHTML = topProducts.map((product, index) => {
    const productData = products.find(p => p.id === product.id);
    const image = productData?.images || 'https://via.placeholder.com/150';
    
    return `
      <div class="flex items-center gap-3 p-3 bg-gradient-to-br from-gray-50 to-white border rounded-xl">
        <img src="${image}" alt="${product.name}" class="w-12 h-12 rounded-lg object-cover flex-shrink-0">
        <div class="flex-1 min-w-0">
          <p class="font-semibold text-sm text-gray-800 truncate">${product.name}</p>
          <p class="text-xs text-gray-500">${product.qty} terjual</p>
          <p class="text-xs font-bold text-crimson">Rp ${product.revenue.toLocaleString()}</p>
        </div>
      </div>
    `;
  }).join('');
}