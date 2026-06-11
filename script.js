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

document.addEventListener("DOMContentLoaded", initApp);