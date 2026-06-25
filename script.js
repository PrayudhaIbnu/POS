async function initApp() {
  try {
    // Load semua component HTML dulu
    await loadComponents();

    loadAllData();
    loadTables();
    loadOrders();

    // Render data
    renderProducts();
    renderCart();
    renderReports();
    renderTables();
    renderCustomerProducts();
    renderCustomerCart();

    // Render orders jika fungsi ada
    if (typeof renderOrders === "function") {
      renderOrders();
    }

    // Halaman awal
    const hash = window.location.hash.replace("#", "");
    const [page, queryString] = hash.split("?");

    navigateTo(page || "login", queryString || "");

    // Render icon terakhir
    lucide.createIcons();
  } catch (error) {
    console.error("Gagal inisialisasi aplikasi:", error);
  }
}

function toggleDropdown(id) {
  const menu = document.getElementById(id);
  menu.classList.toggle("hidden");
}

document.addEventListener("DOMContentLoaded", initApp);
