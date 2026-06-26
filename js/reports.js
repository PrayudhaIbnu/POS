let filteredReports = [];
let currentReportFilter = {
  date: 'all',
  method: 'all',
  startDate: null,
  endDate: null
};

function renderReports() {
  applyReportFilters();
}

function applyReportFilters() {
  // Get filter values
  const dateFilter = document.getElementById('report-date-filter')?.value || 'all';
  const methodFilter = document.getElementById('report-method-filter')?.value || 'all';
  const startDate = document.getElementById('report-start-date')?.value;
  const endDate = document.getElementById('report-end-date')?.value;

  // Filter reports
  filteredReports = reports.filter(trx => {
    // Method filter
    if (methodFilter !== 'all' && trx.method !== methodFilter) {
      return false;
    }

    // Date filter
    const trxDate = new Date(trx.timestamp || trx.id);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    if (dateFilter === 'today') {
      if (trxDate < today) return false;
    } else if (dateFilter === 'yesterday') {
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      if (trxDate < yesterday || trxDate >= today) return false;
    } else if (dateFilter === 'week') {
      const weekAgo = new Date(today);
      weekAgo.setDate(weekAgo.getDate() - 7);
      if (trxDate < weekAgo) return false;
    } else if (dateFilter === 'month') {
      const monthAgo = new Date(today);
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      if (trxDate < monthAgo) return false;
    }

    // Custom date range
    if (startDate) {
      const start = new Date(startDate);
      if (trxDate < start) return false;
    }
    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      if (trxDate > end) return false;
    }

    return true;
  });

  // Sort by newest first
  filteredReports.sort((a, b) => (b.timestamp || b.id) - (a.timestamp || a.id));

  // Update UI
  updateReportStats();
  renderReportTable();
  renderPaymentBreakdown();
  renderTopProducts();
}

function updateReportStats() {
  const totalRevenue = filteredReports.reduce((sum, trx) => sum + trx.total, 0);
  const totalTransactions = filteredReports.length;
  const avgTransaction = totalTransactions > 0 ? Math.round(totalRevenue / totalTransactions) : 0;

  // Today's stats
  const today = new Date();
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const todayReports = reports.filter(trx => {
    const trxDate = new Date(trx.timestamp || trx.id);
    return trxDate >= todayStart;
  });
  const todayRevenue = todayReports.reduce((sum, trx) => sum + trx.total, 0);

  // Update DOM
  document.getElementById('report-total-revenue').textContent = 'Rp ' + totalRevenue.toLocaleString();
  document.getElementById('report-total-orders').textContent = totalTransactions;
  document.getElementById('report-revenue-change').textContent = `dari ${totalTransactions} transaksi`;
  document.getElementById('report-today-revenue').textContent = 'Rp ' + todayRevenue.toLocaleString();
  document.getElementById('report-today-count').textContent = `${todayReports.length} transaksi`;
  document.getElementById('report-avg-transaction').textContent = 'Rp ' + avgTransaction.toLocaleString();
  
  const badge = document.getElementById('report-total-badge');
  if (badge) badge.textContent = totalTransactions;
}

function renderReportTable() {
  const tbody = document.getElementById('report-table-body');
  if (!tbody) return;

  const showingCount = document.getElementById('report-showing-count');
  if (showingCount) {
    showingCount.textContent = `Menampilkan ${filteredReports.length} transaksi`;
  }

  if (filteredReports.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" class="p-8 text-center text-gray-400">
          <i data-lucide="inbox" class="mx-auto text-gray-300 mb-2" style="width:40px;height:40px"></i>
          <p class="font-medium">Tidak ada transaksi yang sesuai filter</p>
          <p class="text-sm mt-1">Coba ubah filter pencarian Anda</p>
        </td>
      </tr>
    `;
    lucide.createIcons();
    return;
  }

  const displayReports = filteredReports.slice(0, 50);

  tbody.innerHTML = displayReports.map(trx => {
    const time = trx.time || new Date(trx.timestamp || trx.id).toLocaleString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const methodColors = {
      'Cash': 'bg-orange-100 text-orange-700',
      'QRIS': 'bg-purple-100 text-purple-700',
      'Card': 'bg-blue-100 text-blue-700'
    };

    // ✅ PERBAIKAN: Handle items yang undefined
    const itemCount = trx.items && Array.isArray(trx.items) 
      ? trx.items.reduce((sum, item) => sum + (item.qty || 1), 0) 
      : 0;
    
    const itemPreview = trx.items && Array.isArray(trx.items) && trx.items.length > 0
      ? trx.items.map(item => `${item.qty}x ${item.name}`).join(', ')
      : '-';

    return `
      <tr class="hover:bg-gray-50 transition">
        <td class="p-4 font-medium text-gray-700">${time}</td>
        <td class="p-4 font-mono text-xs text-gray-500">#${trx.id}</td>
        <td class="p-4">
          <span class="px-2 py-1 rounded text-xs font-semibold ${methodColors[trx.method] || 'bg-gray-100 text-gray-700'}">
            ${trx.method}
          </span>
        </td>
        <td class="p-4 text-gray-600" title="${itemPreview}">
          <span class="font-medium">${itemCount} item</span>
          ${itemPreview !== '-' ? `<p class="text-xs text-gray-400 truncate max-w-[200px]">${itemPreview}</p>` : ''}
        </td>
        <td class="p-4 text-right font-bold text-gray-800">Rp ${trx.total.toLocaleString()}</td>
        <td class="p-4 text-center">
          <button
            onclick="viewTransactionDetail('${trx.id}')"
            class="text-crimson hover:text-crimson-dark font-medium text-xs flex items-center gap-1 mx-auto">
            <i data-lucide="eye" style="width:14px;height:14px"></i>
            Detail
          </button>
        </td>
      </tr>
    `;
  }).join('');

  const from = filteredReports.length > 0 ? 1 : 0;
  const to = Math.min(filteredReports.length, 50);
  const total = filteredReports.length;

  document.getElementById('report-from').textContent = from;
  document.getElementById('report-to').textContent = to;
  document.getElementById('report-total').textContent = total;

  lucide.createIcons();
}

function renderPaymentBreakdown() {
  const container = document.getElementById('report-payment-breakdown');
  if (!container) return;

  const methods = {
    'Cash': { label: 'Tunai', icon: 'banknote', color: 'orange' },
    'QRIS': { label: 'QRIS', icon: 'qr-code', color: 'purple' },
    'Card': { label: 'Kartu', icon: 'credit-card', color: 'blue' }
  };

  const breakdown = {};
  filteredReports.forEach(trx => {
    if (!breakdown[trx.method]) {
      breakdown[trx.method] = { count: 0, total: 0 };
    }
    breakdown[trx.method].count++;
    breakdown[trx.method].total += trx.total;
  });

  const totalRevenue = filteredReports.reduce((sum, trx) => sum + trx.total, 0);

  if (Object.keys(breakdown).length === 0) {
    container.innerHTML = `
      <div class="text-center py-8 text-gray-400">
        <i data-lucide="pie-chart" class="mx-auto mb-2" style="width:40px;height:40px"></i>
        <p>Belum ada data pembayaran</p>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  container.innerHTML = Object.entries(breakdown).map(([method, data]) => {
    const percentage = totalRevenue > 0 ? Math.round((data.total / totalRevenue) * 100) : 0;
    const info = methods[method] || { label: method, icon: 'wallet', color: 'gray' };

    return `
      <div class="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
        <div class="w-10 h-10 bg-${info.color}-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <i data-lucide="${info.icon}" class="text-${info.color}-600" style="width:18px;height:18px"></i>
        </div>
        <div class="flex-1">
          <div class="flex items-center justify-between mb-1">
            <p class="font-semibold text-gray-800">${info.label}</p>
            <p class="font-bold text-gray-800">Rp ${data.total.toLocaleString()}</p>
          </div>
          <div class="flex items-center justify-between text-xs text-gray-500">
            <span>${data.count} transaksi</span>
            <span>${percentage}%</span>
          </div>
          <div class="mt-2 bg-gray-200 rounded-full h-2">
            <div class="bg-${info.color}-500 h-2 rounded-full transition-all" style="width: ${percentage}%"></div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  lucide.createIcons();
}

function renderTopProducts() {
  const container = document.getElementById('report-top-products');
  if (!container) return;

  // Count product sales from filtered reports
  const productSales = {};
  
  filteredReports.forEach(trx => {
    if (trx.items) {
      trx.items.forEach(item => {
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
    }
  });

  const topProducts = Object.values(productSales)
    .sort((a, b) => b.qty - a.qty)
    .slice(0, 5);

  if (topProducts.length === 0) {
    container.innerHTML = `
      <div class="text-center py-8 text-gray-400">
        <i data-lucide="award" class="mx-auto mb-2" style="width:40px;height:40px"></i>
        <p>Belum ada data produk terlaris</p>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  const medals = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣'];

  container.innerHTML = topProducts.map((product, index) => {
    const productData = products.find(p => p.id === product.id);
    const image = productData?.images || 'https://via.placeholder.com/150';

    return `
      <div class="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition">
        <div class="text-xl w-8 text-center">${medals[index]}</div>
        <img src="${image}" alt="${product.name}" class="w-10 h-10 rounded-lg object-cover flex-shrink-0">
        <div class="flex-1 min-w-0">
          <p class="font-medium text-sm text-gray-800 truncate">${product.name}</p>
          <p class="text-xs text-gray-500">${product.qty} terjual</p>
        </div>
        <div class="text-right flex-shrink-0">
          <p class="font-bold text-sm text-crimson">Rp ${product.revenue.toLocaleString()}</p>
        </div>
      </div>
    `;
  }).join('');

  lucide.createIcons();
}

function viewTransactionDetail(trxId) {
  const trx = reports.find(r => r.id === trxId);
  if (!trx) return;

  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn';
  
  // ✅ Handle items yang undefined
  const totalItems = trx.items && Array.isArray(trx.items) 
    ? trx.items.reduce((sum, item) => sum + (item.qty || 1), 0) 
    : 0;

  modal.innerHTML = `
    <div class="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden">
      <div class="bg-gradient-to-r from-crimson to-crimson-dark text-white p-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <i data-lucide="receipt" style="width:24px;height:24px"></i>
            </div>
            <div>
              <h3 class="text-xl font-bold">Detail Transaksi</h3>
              <p class="text-sm text-white/80">#${trx.id}</p>
            </div>
          </div>
          <button onclick="this.closest('.fixed').remove()" class="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center transition">
            <i data-lucide="x" style="width:20px;height:20px"></i>
          </button>
        </div>
      </div>

      <div class="p-6 max-h-[70vh] overflow-y-auto">
        <div class="grid grid-cols-2 gap-3 mb-5">
          <div class="bg-gray-50 rounded-xl p-3">
            <p class="text-xs text-gray-500 mb-1">Waktu</p>
            <p class="font-semibold text-gray-800 text-sm">${trx.time || '-'}</p>
          </div>
          <div class="bg-gray-50 rounded-xl p-3">
            <p class="text-xs text-gray-500 mb-1">Metode</p>
            <span class="inline-block px-2 py-1 rounded text-xs font-semibold ${trx.method === 'Cash' ? 'bg-orange-100 text-orange-700' : trx.method === 'QRIS' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}">
              ${trx.method}
            </span>
          </div>
          <div class="bg-gray-50 rounded-xl p-3">
            <p class="text-xs text-gray-500 mb-1">Total Items</p>
            <p class="font-semibold text-gray-800">${totalItems} item</p>
          </div>
          <div class="bg-gray-50 rounded-xl p-3">
            <p class="text-xs text-gray-500 mb-1">Status</p>
            <span class="inline-block px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-700">Selesai</span>
          </div>
        </div>

        ${trx.items && Array.isArray(trx.items) && trx.items.length > 0 ? `
          <div class="mb-5">
            <p class="text-sm font-semibold text-gray-700 mb-3">Item yang Dibeli</p>
            <div class="space-y-2">
              ${trx.items.map(item => `
                <div class="flex justify-between items-center bg-gray-50 rounded-lg p-3">
                  <div class="flex-1">
                    <p class="font-medium text-gray-800 text-sm">${item.name}</p>
                    ${item.chosenVariant ? `<p class="text-xs text-gray-500">${item.chosenVariant}</p>` : ''}
                    <p class="text-xs text-gray-400">${item.qty} x Rp ${item.price.toLocaleString()}</p>
                  </div>
                  <p class="font-semibold text-gray-800">Rp ${(item.price * item.qty).toLocaleString()}</p>
                </div>
              `).join('')}
            </div>
          </div>
        ` : `
          <div class="mb-5 bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center">
            <p class="text-sm text-yellow-700">⚠️ Detail item tidak tersedia untuk transaksi lama</p>
          </div>
        `}

        <div class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
          <div class="flex items-center justify-between">
            <p class="text-sm text-gray-600 font-medium">Total Pembayaran</p>
            <p class="text-2xl font-bold text-crimson">Rp ${trx.total.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  lucide.createIcons();
}

function exportReports() {
  if (filteredReports.length === 0) {
    alert('Tidak ada data untuk diekspor');
    return;
  }

  let csv = 'Waktu,ID Transaksi,Metode,Jumlah Item,Total\n';
  filteredReports.forEach(trx => {
    const itemCount = trx.items && Array.isArray(trx.items) 
      ? trx.items.reduce((sum, item) => sum + (item.qty || 1), 0) 
      : 0;
    csv += `${trx.time || '-'},${trx.id},${trx.method},${itemCount},${trx.total}\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `laporan_penjualan_${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  window.URL.revokeObjectURL(url);

  alert('Laporan berhasil diekspor!');
}

function saveReports() {
  localStorage.setItem("reports", JSON.stringify(reports));
}

function loadReports() {
  const data = localStorage.getItem("reports");
  reports = data ? JSON.parse(data) : [];
}