async function initApp() {
  await loadComponents();

  loadProducts();
  loadReports();
  loadCart();

  renderCustomerProducts();
  renderCustomerCart();

  navigateTo("login");

  renderProducts();
  renderCart();
  renderReports();

  lucide.createIcons();
}

function toggleDropdown(id) {
  const menu = document.getElementById(id);

  menu.classList.toggle("hidden");
}

document.addEventListener("DOMContentLoaded", initApp);
