async function loadComponent(id, path) {
  const res = await fetch(path);
  const html = await res.text();

  const target = document.getElementById(id);

  if (target) {
    target.innerHTML = html;
  }
}

async function loadComponents() {
  await Promise.all([
    loadComponent("login-component", "./components/login.html"),

    loadComponent("customer-menu-component", "./components/customer-menu.html"),

    loadComponent("sidebar-component", "./components/cashier-sidebar.html"),

    loadComponent("product-grid-component", "./components/product-grid.html"),

    loadComponent("stock-component", "components/stock.html"),

    loadComponent("customer-cart-component", "./components/customer-cart.html"),

    loadComponent("reports-component", "./components/reports.html"),

    loadComponent("stock-modal-box", "./components/stock-modal.html"),

    loadComponent("payment-modal-component", "./components/payment-modal.html"),

    loadComponent("receipt-modal-component", "./components/receipt-modal.html"),

    loadComponent(
      "product-detail-modal-component",
      "./components/detail-modal.html",
    ),
    loadComponent("add-product-component", "./components/add-product.html"),
  ]);
}

async function loadComponent(id, path) {
  const res = await fetch(path);
  const html = await res.text();

  const target = document.getElementById(id);

  if (!target) {
    console.error(`Container tidak ditemukan: ${id}`);
    return;
  }

  target.innerHTML = html;
}
