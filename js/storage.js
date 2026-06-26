function saveProducts() {
  localStorage.setItem("products", JSON.stringify(products));
}

function loadProducts() {
  const saved = localStorage.getItem("products");
  if (saved) {
    products = JSON.parse(saved);
  }
}

function saveCart() {
  localStorage.setItem("cashierCart", JSON.stringify(cashierCart));
  localStorage.setItem("customerCart", JSON.stringify(customerCart));
}

function loadCart() {
  const cashierSaved = localStorage.getItem("cashierCart");
  const customerSaved = localStorage.getItem("customerCart");
  cashierCart = cashierSaved ? JSON.parse(cashierSaved) : [];
  customerCart = customerSaved ? JSON.parse(customerSaved) : [];
}

function saveReports() {
  localStorage.setItem("reports", JSON.stringify(reports));
}

function loadReports() {
  const saved = localStorage.getItem("reports");
  if (saved) {
    reports = JSON.parse(saved);
  } else {
    reports = [];
  }
}

function saveTablesData() {
  localStorage.setItem("tables", JSON.stringify(tables));
}

// === SESSION PER TAB (sessionStorage) ===
function saveCustomerSession() {
  sessionStorage.setItem("customerName", customerName || "");
  sessionStorage.setItem("customerContact", customerContact || "");
  sessionStorage.setItem("currentRole", currentRole || "");
}

function loadCustomerSession() {
  customerName = sessionStorage.getItem("customerName") || "";
  customerContact = sessionStorage.getItem("customerContact") || "";
  currentRole = sessionStorage.getItem("currentRole") || "";
}

function clearCustomerSession() {
  sessionStorage.removeItem("customerName");
  sessionStorage.removeItem("customerContact");
  sessionStorage.removeItem("currentRole");
  localStorage.removeItem("customerCart");
  customerName = "";
  customerContact = "";
  currentRole = "";
  customerCart = [];
}

// === BROADCAST CHANNEL ===
const appChannel = new BroadcastChannel("pos_app_channel");

appChannel.onmessage = (event) => {
  const { type } = event.data;
  
  switch (type) {
    case "products_updated":
      loadProducts();
      if (typeof renderProducts === "function") renderProducts();
      if (typeof renderCustomerProducts === "function") renderCustomerProducts();
      if (typeof renderStock === "function") renderStock();
      break;
      
    case "cart_updated":
      loadCart();
      if (typeof renderCart === "function") renderCart();
      if (typeof renderCustomerCart === "function") renderCustomerCart();
      break;
      
    case "reports_updated":
      loadReports();
      if (typeof renderReports === "function") renderReports();
      break;
      
    case "tables_updated":
      loadTables();
      if (typeof renderTables === "function") renderTables();
      break;
      
    case "orders_updated": // ✅ TAMBAHKAN INI
      loadOrders();
      if (typeof renderOrders === "function") renderOrders();
      if (typeof renderCustomerStatus === "function") renderCustomerStatus();
      if (typeof updateStatusBadge === "function") updateStatusBadge();
      break;
  }
};

function broadcastUpdate(type) {
  appChannel.postMessage({ type });
}

// === LOAD ALL DATA ===
function loadAllData() {
  loadProducts();
  loadCart();
  loadReports();
  loadOrders(); // Memanggil loadOrders dari orders.js
  loadCustomerSession();
}
