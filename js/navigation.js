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
    document.getElementById("page-customer-menu")?.classList.remove("hidden");
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
    .getElementById("view-stock")
    ?.classList.toggle("hidden", view !== "stock");

  document
    .getElementById("view-reports")
    ?.classList.toggle("hidden", view !== "reports");

  const navProducts = document.getElementById("nav-products");

  const navReports = document.getElementById("nav-reports");

  navProducts?.classList.remove("bg-crimson-dark", "text-white");

  navReports?.classList.remove("bg-crimson-dark", "text-white");

  if (view === "stock") {
    renderStock();

    updateBreadcrumb(["Products", "Stock"]);
  }

  switch (view) {
    case "products":
      navProducts?.classList.add("bg-crimson-dark", "text-white");

      updateBreadcrumb(["Products"]);

      break;

    case "reports":
      navReports?.classList.add("bg-crimson-dark", "text-white");

      updateBreadcrumb(["Reports"]);

      break;

    case "stock":
      updateBreadcrumb(["Products", "Stock"]);

      break;

    default:
      updateBreadcrumb([]);
  }

  if (window.innerWidth < 768) {
    toggleLeftSidebar();
  }
}

function updateBreadcrumb(items = []) {
  const breadcrumb = document.getElementById("breadcrumb");

  if (!breadcrumb) return;

  let html = `

    <li class="flex items-center">

      <button 
        onclick="switchView('products')"
        class="flex items-center text-sm font-medium text-gray-500 hover:text-crimson">

        <i data-lucide="home" class="w-4 h-4 mr-2"></i>

        Home

      </button>

    </li>

  `;

  items.forEach((item, index) => {
    html += `

      <li class="flex items-center">

        <i data-lucide="chevron-right"
        class="w-4 h-4 mx-2 text-gray-400">
        </i>


        ${
          index === items.length - 1
            ? `<span class="text-sm font-semibold text-gray-700">
            ${item}
          </span>`
            : `<span class="text-sm text-gray-500">
            ${item}
          </span>`
        }

      </li>

    `;
  });

  breadcrumb.innerHTML = html;

  lucide.createIcons();
}
