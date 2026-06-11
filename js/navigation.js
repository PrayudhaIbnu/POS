function navigateTo(page) {
  document.getElementById("page-login")?.classList.add("hidden");
  document.getElementById("page-dashboard")?.classList.add("hidden");
  document.getElementById("page-add-product")?.classList.add("hidden");
  document.getElementById("page-customer")?.classList.add("hidden");
  document.getElementById("page-customer-menu")?.classList.add("hidden");

  if (page === "login") {
    currentRole = null;
    document.getElementById("page-login")?.classList.remove("hidden");
  }

  if (page === "dashboard") {
    document.getElementById("page-dashboard")?.classList.remove("hidden");

    renderProducts();
    renderCart();
    renderReports();
    switchViewMobile("products");
  }

  if (page === "customer") {
    document.getElementById("page-customer")?.classList.remove("hidden");
  }

  if (page === "customer-menu") {
    document
      .getElementById("page-customer-menu")
      ?.classList.remove("hidden");
    renderCustomerProducts();
    renderCustomerCart();
    const displayNameEl = document.getElementById("customer-display-name");
    if (displayNameEl) {
      displayNameEl.textContent = customerName || "Customer";
    }
  }

  if (page === "add-product") {
    document.getElementById("page-add-product")?.classList.remove("hidden");
  }

  currentPage = page;

  lucide.createIcons();
}

function toggleLeftSidebar() {
  const sidebar = document.getElementById("main-sidebar");
  const overlay = document.getElementById("sidebar-overlay");

  if (!sidebar || !overlay) return;

  sidebar.classList.toggle("-translate-x-full");
  overlay.classList.toggle("hidden");
}

function switchView(view) {
  activeView = view;

  document
    .getElementById("view-products")
    ?.classList.toggle("hidden", view !== "products");

  document
    .getElementById("view-reports")
    ?.classList.toggle("hidden", view !== "reports");

  const navProducts = document.getElementById("nav-products");
  const navReports = document.getElementById("nav-reports");

  navProducts?.classList.remove(
    "bg-crimson-dark",
    "text-white"
  );

  navReports?.classList.remove(
    "bg-crimson-dark",
    "text-white"
  );

  if (view === "products") {
    navProducts?.classList.add(
      "bg-crimson-dark",
      "text-white"
    );
  }

  if (view === "reports") {
    navReports?.classList.add(
      "bg-crimson-dark",
      "text-white"
    );
  }

  if (window.innerWidth < 768) {
    toggleLeftSidebar();
  }
}