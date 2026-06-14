function renderStock() {
  const container = document.getElementById("stock-product-list");

  if (!container) return;

  container.innerHTML = "";

  products.forEach((product) => {
    let status = "Tersedia";

    let badge = "bg-green-100 text-green-700";

    if (product.stock <= 10) {
      status = "Stok Menipis";

      badge = "bg-yellow-100 text-yellow-700";
    }

    if (product.stock <= 0) {
      status = "Habis";

      badge = "bg-red-100 text-red-700";
    }

    container.innerHTML += `


<div class="bg-white border rounded-xl shadow-sm p-5">


<div class="flex justify-between">


<div>

<h3 class="font-bold text-lg">
${product.name}
</h3>


<p class="text-sm text-gray-500">
${product.cat}
</p>


</div>



<span class="text-xs px-3 py-1 rounded-full ${badge}">
${status}
</span>


</div>



<div class="mt-5">


<p class="text-sm text-gray-500">
Stok Tersedia
</p>


<h2 class="text-4xl font-bold">
${product.stock}
</h2>


</div>




<button

onclick="addStock(${product.id})"

class="mt-5 w-full bg-crimson text-white py-2 rounded-lg">

<i data-lucide="plus">
</i>

Tambah Stok

</button>



</div>


`;
  });

  lucide.createIcons();
}

function addStock(id) {
  let product = products.find((item) => item.id === id);

  let amount = prompt(`Tambah stok untuk ${product.name}`);

  if (!amount) return;

  product.stock += Number(amount);

  renderStock();
}
