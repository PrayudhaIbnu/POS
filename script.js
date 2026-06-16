async function initApp() {
  try {
    // Load semua component HTML dulu
    await loadComponents();

    // Load data dari localStorage
    loadProducts();
    loadReports();
    loadCart();

    // Render data
    renderProducts();
    renderCart();
    renderReports();

    renderCustomerProducts();
    renderCustomerCart();

    // Halaman awal
    const page = window.location.hash.replace("#", "");

    navigateTo(page || "login");

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
