async function initApp() {
  try {
    await loadComponents();

    loadProducts();
    loadReports();
    loadCart();
    loadOrders();
    loadCustomerSession();

    renderProducts();
    renderCart();
    renderReports();
    loadTables();
    renderTables();

    renderCustomerProducts();
    renderCustomerCart();

    if (typeof renderCategoryFilters === "function") {
      renderCategoryFilters();
    }

    const hash = window.location.hash.replace("#", "");
    const [page, queryString] = hash.split("?");
    navigateTo(page || "login", queryString || "");

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
