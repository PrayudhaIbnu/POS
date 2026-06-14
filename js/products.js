// DATABASE UTAMA: Variabel produk diperbarui dengan properti detail & variasi pilihan rasa
let products = [
  {
    id: 1,
    name: "Seblak komplit",
    price: 18000,
    cat: "Food",
    stock: 0,
    details:
      "Dengan isian: telur, sosis, bakso, kerupuk, sayuran, dumpling keju/ayam, chikuwa, mie/kwetiau, ceker, cuanki lidah, dan siomay kering.",
    variants: [
      { title: "Sajian", options: ["Asin", "Pedas Manis", "Asam Pedas"] },
      {
        title: "Level Pedas",
        options: ["Tidak pedas", "Level 1", "Level 2"],
      },
    ],
    images:
      "https://static.wixstatic.com/media/22cafb_009aa62f9fb84c499511ff5f5d070361~mv2.jpeg/v1/fill/w_228,h_228,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Placeholder.jpeg",
  },
  {
    id: 2,
    name: "Seblak hemat",
    price: 10000,
    cat: "Food",
    stock: 0,
    details:
      "Dengan isian hemat pilihan dasar: telur, sosis, bakso, makaroni, kerupuk basah, kuah rempah kencur pedas gurih.",
    variants: [
      { title: "Sajian", options: ["Asin", "Pedas Manis", "Asam Pedas"] },
      {
        title: "Level Pedas",
        options: ["Tidak pedas", "Level 1", "Level 2"],
      },
    ],
    images:
      "https://static.wixstatic.com/media/22cafb_7b7f2ca253394dd88949b6fc3af04547~mv2.jpg/v1/fill/w_228,h_228,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Placeholder.jpg",
  },
  {
    id: 3,
    name: "Seblak seafood",
    price: 15000,
    cat: "Food",
    stock: 0,
    details:
      "Dengan kombinasi isian seafood: udang, potongan cumi, fish cake, kerupuk, dumpling keju, chikuwa, sayur, kuah gurih pedas.",
    variants: [
      { title: "Sajian", options: ["Asin", "Pedas Manis", "Asam Pedas"] },
      {
        title: "Level Pedas",
        options: ["Tidak pedas", "Level 1", "Level 2"],
      },
    ],
    images:
      "https://static.wixstatic.com/media/22cafb_c305524566f042b9a9b62b6761957524~mv2.png/v1/fill/w_228,h_228,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Placeholder.png",
  },
  {
    id: 4,
    name: "Mie jebew komplit/pedas",
    price: 15000,
    cat: "Food",
    stock: 0,
    details:
      "Mie jebew super pedas beraroma minyak cabai khas, dengan topping lengkap bakso, sosis, pangsit basah, cuanki lidah, taburan ayam.",
    variants: [
      {
        title: "Level Pedas",
        options: ["Level 1", "Level 2", "Level Super Ekstra"],
      },
    ],
    images:
      "https://static.wixstatic.com/media/22cafb_31e6d6933d284936a11e999fe208f248~mv2.png/v1/fill/w_228,h_228,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Placeholder.png",
  },
  {
    id: 5,
    name: "Mie jebew original",
    price: 10000,
    cat: "Food",
    stock: 0,
    details:
      "Mie jebew dengan racikan chili oil dan kecap asin pedas manis original tanpa tambahan topping berlebih.",
    variants: [
      {
        title: "Level Pedas",
        options: ["Tidak pedas", "Level 1", "Level 2"],
      },
    ],
    images:
      "https://static.wixstatic.com/media/22cafb_842f772f464d419cb73c4942323b556c~mv2.jpg/v1/fill/w_228,h_228,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Placeholder.jpg",
  },
  {
    id: 6,
    name: "Cireng isi (5pcs)",
    price: 2000,
    cat: "Snack",
    stock: 0,
    details:
      "Cireng goreng gurih renyah dengan isian ayam suwir pedas / sosis mercon di dalamnya.",
    images:
      "https://static.wixstatic.com/media/22cafb_ad5aa12649bb433085727a9e217eee71~mv2.jpg/v1/fill/w_228,h_228,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Placeholder.jpg",
  },
  {
    id: 7,
    name: "Risol (1pcs)",
    price: 3000,
    cat: "Snack",
    stock: 0,
    details:
      "Risol premium renyah isi mayo gurih kental, smoked beef slices, dan potongan telur rebus.",
    images:
      "https://static.wixstatic.com/media/22cafb_c6eb9233aa524575843c64c41385b519~mv2.jpg/v1/fill/w_228,h_228,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Placeholder.jpg",
  },
  {
    id: 8,
    name: "Tempura",
    price: 1000,
    cat: "Snack",
    stock: 0,
    details:
      "Jajanan tempura ikan goreng tusuk yang disajikan hangat dengan siraman saus sambal encer.",
    images:
      "https://static.wixstatic.com/media/22cafb_f3521d19f48b4bbcbdaee5ca3da25041~mv2.jpeg/v1/fill/w_228,h_228,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Placeholder.jpeg",
  },
  {
    id: 9,
    name: "Bakaran",
    price: 2000,
    cat: "Snack",
    stock: 0,
    details:
      "Sosis, bakso ikan, atau dumpling ayam bakar berlumur bumbu BBQ manis gurih pedas.",
    images:
      "https://static.wixstatic.com/media/22cafb_4c9c0d2ecf424a5fa726300ac45ee062~mv2.jpeg/v1/fill/w_228,h_228,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Placeholder.jpeg",
  },
  {
    id: 10,
    name: "Donat",
    price: 2500,
    cat: "Snack",
    stock: 0,
    details:
      "Donat kentang jadul yang empuk dan lembut dengan taburan gula halus putih melimpah.",
    images:
      "https://static.wixstatic.com/media/22cafb_6244e9029c3f4a569137b5f86995b681~mv2.jpg/v1/fill/w_228,h_228,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Placeholder.jpg",
  },
  {
    id: 11,
    name: "Es teh",
    price: 3000,
    cat: "Beverage",
    stock: 0,
    details:
      "Seduhan teh manis tradisional wangi melati yang disajikan dingin segar dengan es batu.",
    images:
      "https://static.wixstatic.com/media/22cafb_03da8cd3c6f44f2084873fc767abd4d2~mv2.png/v1/fill/w_228,h_228,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Placeholder.png",
  },
  {
    id: 12,
    name: "Nutrisari",
    price: 5000,
    cat: "Beverage",
    stock: 0,
    details:
      "Minuman buah serbuk jeruk manis dingin instan kaya akan vitamin C penyegar dahaga.",
    images:
      "https://static.wixstatic.com/media/22cafb_5e88342ac9db44048c96aa26b60635ee~mv2.jpg/v1/fill/w_228,h_228,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Placeholder.jpg",
  },
  {
    id: 13,
    name: "Air mineral",
    price: 4000,
    cat: "Beverage",
    stock: 0,
    details:
      "Air minum dalam kemasan botol dingin ukuran ukuran standar 600ml.",
    images:
      "https://static.wixstatic.com/media/22cafb_022eadf62bbc4ab596d47fe7a414efd6~mv2.webp/v1/fill/w_228,h_228,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Placeholder.webp",
  },
];

function renderProducts() {
  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.value = "";
  }
  setCategoryFilter("All");
}

function filterProducts() {
  const query = document
    .getElementById("search-input")
    .value.toLowerCase()
    .trim();
  const filtered = products.filter((p) => {
    const matchKeyword = p.name.toLowerCase().includes(query);
    const matchCategory =
      selectedCategory === "All" || p.cat === selectedCategory;
    return matchKeyword && matchCategory;
  });

  const grid = document.getElementById("product-grid");
  if (filtered.length === 0) {
    grid.innerHTML = `<div class="col-span-full text-center py-10 text-gray-400">Produk tidak ditemukan</div>`;
    return;
  }

  grid.innerHTML = filtered
    .map(
      (p) => `
<div class="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition flex flex-col justify-between">
  <div>
    <div class="relative h-32 bg-gray-200 flex items-center justify-center">
      <img
        src="${p.images || "https://via.placeholder.com/150"}"
        alt="${p.name}"
        class="object-cover h-full w-full ${p.stock <= 0 ? "opacity-60" : ""}"
      />

      ${
        p.stock <= 0
          ? `
          <span class="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
            Stok Habis
          </span>
        `
          : ""
      }
    </div>

    <div class="p-3 pb-0">
      <p class="font-semibold text-gray-800 text-sm truncate">
        ${p.name}
      </p>

      <p class="text-gray-400 text-[10px] line-clamp-2 mt-0.5 min-h-[30px]">
        ${p.details || "Tidak ada rincian deskripsi item."}
      </p>

      <p class="mt-1 text-xs ${
        p.stock <= 0
          ? "text-red-500 font-semibold"
          : p.stock <= 10
            ? "text-yellow-500 font-semibold"
            : "text-green-600"
      }">
        Stok: ${p.stock ?? 0}
      </p>
    </div>
  </div>

  <div class="p-3 pt-1">
    <p class="text-crimson font-bold text-sm">
      Rp ${p.price.toLocaleString()}
    </p>

    <button
      ${p.stock <= 0 ? "disabled" : `onclick="openDetailModal(${p.id})"`}
      class="mt-2 w-full ${
        p.stock <= 0
          ? "bg-gray-300 cursor-not-allowed text-gray-500"
          : "bg-pos-green hover:bg-pos-green-hover text-white"
      } text-sm font-medium py-2 rounded-lg flex items-center justify-center gap-1 transition"
    >
      <i data-lucide="${
        p.stock <= 0 ? "package-x" : "eye"
      }" style="width:14px;height:14px;"></i>

      ${p.stock <= 0 ? "Stok Habis" : "Lihat"}
    </button>
  </div>
</div>
                                `,
    )
    .join("");
  lucide.createIcons();
}

function setCategoryFilter(category) {
  selectedCategory = category;
  document.querySelectorAll(".cat-filter-btn").forEach((btn) => {
    if (btn.textContent.trim() === category) {
      btn.className =
        "cat-filter-btn px-4 py-2 rounded-full text-sm font-medium bg-crimson text-white shadow-sm";
    } else {
      btn.className =
        "cat-filter-btn px-4 py-2 rounded-full text-sm font-medium bg-white border border-gray-200 text-gray-600 hover:bg-gray-50";
    }
  });
  filterProducts();
}

function refreshProducts() {
  loadProducts?.();
  filterProducts();
  renderStock?.();

  lucide.createIcons();

  showToast?.("Data berhasil diperbarui");
}

function openDetailModal(id) {
  const product = products.find((p) => p.id === id);
  if (!product) return;

  if (!product || product.stock <= 0) {
    alert("Stok produk habis");
    return;
  }

  activeProductForModal = product;
  document.getElementById("modal-product-name").textContent = product.name;
  document.getElementById("modal-product-price").textContent =
    "Rp " + product.price.toLocaleString();
  document.getElementById("modal-product-details").textContent =
    product.details || "Tidak ada spesifikasi khusus.";

  const variantsContainer = document.getElementById("modal-variants-container");
  variantsContainer.innerHTML = "";

  // Jika produk memiliki variasi, buat elemen pemilih tombol pilihan
  if (product.variants && product.variants.length > 0) {
    product.variants.forEach((v, index) => {
      const block = document.createElement("div");
      block.className = "space-y-1.5";
      block.innerHTML = `
                                      <span class="text-xs font-bold text-gray-700 block">${v.title}:</span>
                                      <div class="flex flex-wrap gap-1.5 select-group" data-variant-title="${v.title}">
                                        ${v.options
                                          .map(
                                            (opt, oIndex) => `
                                          <button type="button" onclick="selectVariantOption(this)" class="variant-opt-btn px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-medium text-gray-600 bg-white hover:border-crimson hover:bg-red-50/30 transition ${oIndex === 0 ? "border-crimson bg-red-50 text-crimson font-semibold" : ""}">
                                            ${opt}
                                          </button>
                                        `,
                                          )
                                          .join("")}
                                      </div>
                                    `;
      variantsContainer.appendChild(block);
    });
  } else {
    variantsContainer.innerHTML = `<p class="text-xs text-gray-400 italic">Menu ini tidak memerlukan kustomisasi opsi rasa.</p>`;
  }

  document.getElementById("detail-modal").classList.remove("hidden");
  lucide.createIcons();
}

function closeDetailModal() {
  document.getElementById("detail-modal").classList.add("hidden");
  activeProductForModal = 5;
}

function selectVariantOption(btn) {
  // Hapus penanda aktif pada saudara se-grup opsi variasi tersebut
  const parent = btn.parentElement;
  parent.querySelectorAll(".variant-opt-btn").forEach((b) => {
    b.className =
      "variant-opt-btn px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-medium text-gray-600 bg-white hover:border-crimson hover:bg-red-50/30 transition";
  });
  // Aktifkan pilihan saat ini
  btn.className =
    "variant-opt-btn px-3 py-1.5 border border-crimson rounded-lg text-xs font-semibold text-crimson bg-red-50 transition";
}

function saveProduct() {
  const name = document.getElementById("prod-name").value.trim();
  const price = parseInt(document.getElementById("prod-price").value) || 0;
  const cat = document.getElementById("prod-cat").value;
  if (name && price > 0) {
    products.push({
      id: Date.now(),
      name,
      price,
      cat,
      details: "Produk menu baru ditambahkan lewat sistem manajemen.",
      variants:
        cat === "Food"
          ? [
              { title: "Sajian", options: ["Hot"] },
              {
                title: "Level Pedas",
                options: ["Tidak pedas", "Level 1", "Level 2"],
              },
            ]
          : [],
      images:
        "https://static.wixstatic.com/media/22cafb_009aa62f9fb84c499511ff5f5d070361~mv2.jpeg/v1/fill/w_228,h_228,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Placeholder.jpeg",
    });
    saveProducts();
    renderFooterStats();
    navigateTo("dashboard");
  }
}
