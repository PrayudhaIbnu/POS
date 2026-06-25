var currentOrderFilter = "all"; 
function loadOrders() {
  const saved = localStorage.getItem("customerOrders");
  if (saved) {
    customerOrders = JSON.parse(saved);
  } else {
    customerOrders = [];
  }
}

function saveOrders() {
  localStorage.setItem("customerOrders", JSON.stringify(customerOrders));
}
function filterOrders(status) {
  currentOrderFilter = status;
  
  // Update button styles
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.classList.remove("bg-crimson", "text-white");
    btn.classList.add("bg-gray-100", "text-gray-600");
  });
  
  const activeBtn = document.getElementById(
    status === "all" ? "filter-all" :
    status === "Menunggu Diproses" ? "filter-waiting" :
    status === "Sedang Diproses" ? "filter-processing" :
    "filter-completed"
  );
  
  if (activeBtn) {
    activeBtn.classList.remove("bg-gray-100", "text-gray-600");
    activeBtn.classList.add("bg-crimson", "text-white");
  }
  
  renderOrders();
}

function getStatusBadge(status) {
  const badges = {
    "Menunggu Diproses": "bg-orange-100 text-orange-700 border-orange-200",
    "Sedang Diproses": "bg-blue-100 text-blue-700 border-blue-200",
    "Selesai": "bg-green-100 text-green-700 border-green-200",
    "Dibatalkan": "bg-red-100 text-red-700 border-red-200"
  };
  return badges[status] || "bg-gray-100 text-gray-700 border-gray-200";
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

function getNextStatus(currentStatus) {
  const flow = {
    "Menunggu Diproses": "Sedang Diproses",
    "Sedang Diproses": "Selesai",
    "Selesai": null
  };
  return flow[currentStatus];
}

function updateOrderStatus(orderId, newStatus) {
  const order = customerOrders.find(o => o.id === orderId);
  if (!order) return;
  
  order.status = newStatus;
  order.updatedAt = new Date().toISOString();
  saveOrders();
  renderOrders();
  
  // Broadcast ke tab lain
  if (typeof broadcastUpdate === "function") {
    broadcastUpdate("orders_updated");
  }
}

function deleteOrder(orderId) {
  if (!confirm("Hapus pesanan ini?")) return;
  customerOrders = customerOrders.filter(o => o.id !== orderId);
  saveOrders();
  renderOrders();
  
  if (typeof broadcastUpdate === "function") {
    broadcastUpdate("orders_updated");
  }
}

function clearCompletedOrders() {
  const completedCount = customerOrders.filter(o => o.status === "Selesai" || o.status === "Dibatalkan").length;
  if (completedCount === 0) {
    alert("Tidak ada pesanan selesai untuk dihapus.");
    return;
  }
  
  if (!confirm(`Hapus ${completedCount} pesanan yang sudah selesai/dibatalkan?`)) return;
  
  customerOrders = customerOrders.filter(o => o.status !== "Selesai" && o.status !== "Dibatalkan");
  saveOrders();
  renderOrders();
  
  if (typeof broadcastUpdate === "function") {
    broadcastUpdate("orders_updated");
  }
}

function viewOrderDetail(orderId) {
  const order = customerOrders.find(o => o.id === orderId);
  if (!order) return;
  
  const total = order.items.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const orderTime = new Date(order.id).toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
  
  const modal = document.createElement("div");
  modal.className = "fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn";
  modal.innerHTML = `
    <div class="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden">
      <!-- Header -->
      <div class="bg-gradient-to-r from-crimson to-crimson-dark text-white p-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <i data-lucide="receipt" style="width:24px;height:24px"></i>
            </div>
            <div>
              <h3 class="text-xl font-bold">Detail Pesanan</h3>
              <p class="text-sm text-white/80">#${order.id}</p>
            </div>
          </div>
          <button onclick="this.closest('.fixed').remove()" class="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center transition">
            <i data-lucide="x" style="width:20px;height:20px"></i>
          </button>
        </div>
      </div>

      <!-- Content -->
      <div class="p-6 max-h-[70vh] overflow-y-auto">
        <!-- Customer Info -->
        <div class="grid grid-cols-2 gap-3 mb-5">
          <div class="bg-gray-50 rounded-xl p-3">
            <p class="text-xs text-gray-500 mb-1">Customer</p>
            <p class="font-semibold text-gray-800">${order.customer}</p>
          </div>
          <div class="bg-gray-50 rounded-xl p-3">
            <p class="text-xs text-gray-500 mb-1">Meja / HP</p>
            <p class="font-semibold text-gray-800">${order.table}</p>
          </div>
          <div class="bg-gray-50 rounded-xl p-3">
            <p class="text-xs text-gray-500 mb-1">Waktu Pesan</p>
            <p class="font-semibold text-gray-800 text-sm">${orderTime}</p>
          </div>
          <div class="bg-gray-50 rounded-xl p-3">
            <p class="text-xs text-gray-500 mb-1">Status</p>
            <span class="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadge(order.status)}">
              <i data-lucide="${getStatusIcon(order.status)}" style="width:12px;height:12px"></i>
              ${order.status}
            </span>
          </div>
        </div>

        <!-- Items -->
        <div class="mb-5">
          <p class="text-sm font-semibold text-gray-700 mb-3">Item Pesanan</p>
          <div class="space-y-2">
            ${order.items.map(item => `
              <div class="flex justify-between items-center bg-gray-50 rounded-lg p-3">
                <div class="flex-1">
                  <p class="font-medium text-gray-800 text-sm">${item.name}</p>
                  ${item.chosenVariant ? `<p class="text-xs text-gray-500">${item.chosenVariant}</p>` : ""}
                  <p class="text-xs text-gray-400">${item.qty} x Rp ${item.price.toLocaleString()}</p>
                </div>
                <p class="font-semibold text-gray-800">Rp ${(item.price * item.qty).toLocaleString()}</p>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- Total -->
        <div class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
          <div class="flex items-center justify-between">
            <p class="text-sm text-gray-600 font-medium">Total Pembayaran</p>
            <p class="text-2xl font-bold text-crimson">Rp ${total.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  lucide.createIcons();
}

function renderOrders() {
  const list = document.getElementById("orders-list");
  if (!list) return;
  
  // Update stats
  const total = customerOrders.length;
  const waiting = customerOrders.filter(o => o.status === "Menunggu Diproses").length;
  const processing = customerOrders.filter(o => o.status === "Sedang Diproses").length;
  const completed = customerOrders.filter(o => o.status === "Selesai").length;
  
  document.getElementById("order-total").textContent = total;
  document.getElementById("order-waiting").textContent = waiting;
  document.getElementById("order-processing").textContent = processing;
  document.getElementById("order-completed").textContent = completed;
  
  // Filter orders
  let filteredOrders = currentOrderFilter === "all" 
    ? customerOrders 
    : customerOrders.filter(o => o.status === currentOrderFilter);
  
  // Sort by newest first
  filteredOrders = [...filteredOrders].sort((a, b) => b.id - a.id);
  
  if (filteredOrders.length === 0) {
    list.innerHTML = `
      <div class="bg-white rounded-xl border p-12 text-center">
        <i data-lucide="inbox" class="mx-auto text-gray-300 mb-3" style="width:48px;height:48px"></i>
        <p class="text-gray-500 font-medium">Tidak ada pesanan</p>
        <p class="text-sm text-gray-400 mt-1">Pesanan dari customer akan muncul di sini</p>
      </div>
    `;
    lucide.createIcons();
    return;
  }
  
  list.innerHTML = filteredOrders.map(order => {
    const total = order.items.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const orderTime = new Date(order.id).toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit"
    });
    const nextStatus = getNextStatus(order.status);
    
    return `
      <div class="bg-white rounded-xl border shadow-sm hover:shadow-md transition">
        <div class="p-5">
          <div class="flex items-start justify-between mb-4">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 bg-crimson/10 rounded-xl flex items-center justify-center">
                <i data-lucide="user" class="text-crimson" style="width:20px;height:20px"></i>
              </div>
              <div>
                <h4 class="font-bold text-gray-800">${order.customer}</h4>
                <p class="text-sm text-gray-500">
                  <i data-lucide="hash" class="inline w-3 h-3 mr-1"></i>
                  ${order.table}
                </p>
              </div>
            </div>
            
            <div class="text-right">
              <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(order.status)}">
                <i data-lucide="${getStatusIcon(order.status)}" style="width:12px;height:12px"></i>
                ${order.status}
              </span>
              <p class="text-xs text-gray-400 mt-1">${orderTime}</p>
            </div>
          </div>
          
          <!-- Items Preview -->
          <div class="bg-gray-50 rounded-lg p-3 mb-4">
            <div class="space-y-1">
              ${order.items.slice(0, 3).map(item => `
                <div class="flex justify-between text-sm">
                  <span class="text-gray-700">${item.qty}x ${item.name}</span>
                  <span class="text-gray-500">Rp ${(item.price * item.qty).toLocaleString()}</span>
                </div>
              `).join("")}
              ${order.items.length > 3 ? `
                <p class="text-xs text-gray-400 pt-1">+${order.items.length - 3} item lainnya</p>
              ` : ""}
            </div>
          </div>
          
          <!-- Footer -->
          <div class="flex items-center justify-between pt-3 border-t">
            <div>
              <p class="text-xs text-gray-500">Total</p>
              <p class="text-lg font-bold text-crimson">Rp ${total.toLocaleString()}</p>
            </div>
            
            <div class="flex gap-2">
              <button
                onclick="viewOrderDetail(${order.id})"
                class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium text-sm flex items-center gap-1 transition">
                <i data-lucide="eye" style="width:14px;height:14px"></i>
                Detail
              </button>
              
              ${nextStatus ? `
                <button
                  onclick="updateOrderStatus(${order.id}, '${nextStatus}')"
                  class="px-4 py-2 ${nextStatus === 'Selesai' ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'} text-white rounded-lg font-medium text-sm flex items-center gap-1 transition">
                  <i data-lucide="${nextStatus === 'Selesai' ? 'check-circle' : 'arrow-right'}" style="width:14px;height:14px"></i>
                  ${nextStatus}
                </button>
              ` : ""}
              
              <button
                onclick="deleteOrder(${order.id})"
                class="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg font-medium text-sm flex items-center gap-1 transition">
                <i data-lucide="trash-2" style="width:14px;height:14px"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join("");
  
  lucide.createIcons();
}

// Listen for broadcast updates
if (typeof appChannel !== "undefined") {
  appChannel.onmessage = (event) => {
    if (event.data.type === "orders_updated") {
      loadOrders();
      renderOrders();
    }
  };
}