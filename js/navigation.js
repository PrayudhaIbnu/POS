function navigateTo(page) {
  window.location.hash = page;

  hideAllPages();

  switch (page) {
    case "login":
      showPage("page-login-cashier");
      break;

    case "customer-login":
      showPage("page-login-customer");
      break;

    case "dashboard":
      showPage("page-dashboard");

      renderProducts();
      renderCart();
      renderReports();

      switchView("products");
      break;

    case "customer-menu":
      showPage("page-customer-menu");

      renderCustomerProducts();
      renderCustomerCart();
      updateCustomerDisplay();
      break;

    case "add-product":
      showPage("page-add-product");
      break;

    default:
      console.warn(`Page "${page}" tidak ditemukan`);
  }

  lucide.createIcons();
}

function hideAllPages() {
  const pages = [
    "page-dashboard",
    "page-customer-menu",
    "page-add-product",
    "page-login-cashier",
    "page-login-customer",
  ];

  pages.forEach((id) => {
    document.getElementById(id)?.classList.add("hidden");
  });
}

function showPage(id) {
  const page = document.getElementById(id);

  if (!page) {
    console.warn(`Element ${id} tidak ditemukan`);
    return;
  }

  page.classList.remove("hidden");
}

function updateCustomerDisplay() {
  const displayName = document.getElementById("customer-display-name");

  if (displayName) {
    displayName.textContent = customerName || "Customer";
  }
}

function toggleLeftSidebar(forceClose = false) {
  const sidebar = document.getElementById("main-sidebar");
  const overlay = document.getElementById("sidebar-overlay");

  if (!sidebar || !overlay) return;

  if (forceClose) {
    sidebar.classList.add("-translate-x-full");
    overlay.classList.add("hidden");
    return;
  }

  sidebar.classList.toggle("-translate-x-full");
  overlay.classList.toggle("hidden");
}

function switchView(view) {
  activeView = view;

  const views = ["products", "stock", "reports"];

  views.forEach((name) => {
    document
      .getElementById(`view-${name}`)
      ?.classList.toggle("hidden", name !== view);
  });

  const navProducts = document.getElementById("nav-products");
  const navReports = document.getElementById("nav-reports");

  navProducts?.classList.remove("bg-crimson-dark", "text-white");
  navReports?.classList.remove("bg-crimson-dark", "text-white");

  switch (view) {
    case "products":
      navProducts?.classList.add("bg-crimson-dark", "text-white");
      updateBreadcrumb(["Products"]);
      break;

    case "stock":
      renderStock();
      updateBreadcrumb(["Products", "Stock"]);
      break;

    case "reports":
      navReports?.classList.add("bg-crimson-dark", "text-white");
      updateBreadcrumb(["Reports"]);
      break;

    default:
      updateBreadcrumb([]);
  }

  // Tutup sidebar jika mobile dan sedang terbuka
  if (window.innerWidth < 768) {
    toggleLeftSidebar(true);
  }

  lucide.createIcons();
}

function updateBreadcrumb(items = []) {
  const breadcrumb = document.getElementById("breadcrumb");

  if (!breadcrumb) return;

  breadcrumb.innerHTML = `
    <li class="flex items-center">
      <button
        onclick="switchView('products')"
        class="flex items-center text-sm font-medium text-gray-500 hover:text-crimson">
        <i data-lucide="home" class="w-4 h-4 mr-2"></i>
        Home
      </button>
    </li>

    ${items
      .map(
        (item, index) => `
        <li class="flex items-center">
          <i
            data-lucide="chevron-right"
            class="w-4 h-4 mx-2 text-gray-400">
          </i>

          <span class="${
            index === items.length - 1
              ? "text-sm font-semibold text-gray-700"
              : "text-sm text-gray-500"
          }">
            ${item}
          </span>
        </li>
      `,
      )
      .join("")}
  `;

  lucide.createIcons();
}
