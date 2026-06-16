async function loadComponent(id, path) {
  try {
    const res = await fetch(path);

    console.log(id, path, res.status);

    const html = await res.text();

    const target = document.getElementById(id);

    if (!target) {
      console.error(`Container tidak ditemukan: ${id}`);
      return;
    }

    target.innerHTML = html;
  } catch (err) {
    console.error(`Gagal load ${path}`, err);
  }
}

async function loadComponents() {
  try {
    await Promise.all([
      loadComponent(
        "login-cashier-component",
        "./components/login-cashier.html"
      ),

      loadComponent(
        "login-customer-component",
        "./components/login-customer.html"
      ),

      loadComponent(
        "customer-menu-component",
        "./components/customer-menu.html"
      ),

      loadComponent(
        "sidebar-component",
        "./components/cashier-sidebar.html"
      ),

      loadComponent(
        "product-grid-component",
        "./components/product-grid.html"
      ),

      loadComponent(
        "stock-component",
        "./components/stock.html"
      ),

      loadComponent(
        "customer-cart-component",
        "./components/customer-cart.html"
      ),

      loadComponent(
        "reports-component",
        "./components/reports.html"
      ),

      loadComponent(
        "stock-modal-component",
        "./components/stock-modal.html"
      ),

      loadComponent(
        "payment-modal-component",
        "./components/payment-modal.html"
      ),

      loadComponent(
        "receipt-modal-component",
        "./components/receipt-modal.html"
      ),

      loadComponent(
        "product-detail-modal-component",
        "./components/detail-modal.html"
      ),

      loadComponent(
        "add-product-component",
        "./components/add-product.html"
      ),

      loadComponent(
        "footer-component",
        "./components/footer.html"
      ),
    ]);

    // Jalankan setelah semua component selesai dimuat
    if (typeof applyConfig === "function") {
      applyConfig(defaultConfig);
    }

    if (typeof lucide !== "undefined") {
      lucide.createIcons();
    }

    console.log("✅ Semua component berhasil dimuat");
  } catch (error) {
    console.error("❌ Gagal memuat component:", error);
  }
}

// Jalankan saat halaman siap
document.addEventListener("DOMContentLoaded", async () => {
  await loadComponents();
});