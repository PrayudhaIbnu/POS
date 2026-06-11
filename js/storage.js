function saveProducts() {
  localStorage.setItem("products", JSON.stringify(products));
}

function loadProducts() {
  const saved = localStorage.getItem("products");

  if (saved) {
    products = JSON.parse(saved);
  }
}

function saveCart() {
  localStorage.setItem("cashierCart", JSON.stringify(cashierCart));
  localStorage.setItem("customerCart", JSON.stringify(customerCart));
}

function loadCart() {
  const cashierSaved = localStorage.getItem("cashierCart");
  const customerSaved = localStorage.getItem("customerCart");

  cashierCart = cashierSaved ? JSON.parse(cashierSaved) : [];
  customerCart = customerSaved ? JSON.parse(customerSaved) : [];
}

loadProducts();
loadCart();
loadReports();