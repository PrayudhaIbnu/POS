var tables = [];

function loadTables() {
  const saved = localStorage.getItem("tables");
  if (saved) {
    tables = JSON.parse(saved);
  } else {
    // Data default dengan struktur konsisten
    tables = [
      {
        id: 1,
        code: "A01",
        name: "Meja 1",
        active: true,
        occupied: false,
        qrUrl: "http://127.0.0.1:5500/#customer-login?table=A01",
      },
      {
        id: 2,
        code: "A02",
        name: "Meja 2",
        active: true,
        occupied: false,
        qrUrl: "http://127.0.0.1:5500/#customer-login?table=A02",
      },
      {
        id: 3,
        code: "A03",
        name: "Meja 3",
        active: true,
        occupied: false,
        qrUrl: "http://127.0.0.1:5500/#customer-login?table=A03",
      },
      {
        id: 4,
        code: "A04",
        name: "Meja 4",
        active: true,
        occupied: false,
        qrUrl: "http://127.0.0.1:5500/#customer-login?table=A04",
      },
      {
        id: 5,
        code: "A05",
        name: "Meja 5",
        active: true,
        occupied: false,
        qrUrl: "http://127.0.0.1:5500/#customer-login?table=A05",
      },
    ];
    saveTablesData();
  }
}

function saveTablesData() {
  localStorage.setItem("tables", JSON.stringify(tables));
  broadcastUpdate("tables_updated");
}

function openTableModal() {
  document.getElementById("table-modal")?.classList.remove("hidden");
  document.getElementById("table-name").value = "";
  document.getElementById("table-code").value = "";
  document.getElementById("qr-preview").classList.add("hidden");

  // Auto-generate QR saat user ketik kode meja
  const codeInput = document.getElementById("table-code");
  codeInput.addEventListener("input", generateQRPreview);
}

function closeTableModal() {
  document.getElementById("table-modal")?.classList.add("hidden");
}

function generateQRPreview() {
  const code = document.getElementById("table-code").value.trim();
  const qrPreview = document.getElementById("qr-preview");
  const qrContainer = document.getElementById("qr-code-container");
  const qrUrlDisplay = document.getElementById("qr-url-display");

  if (code) {
    const qrUrl = `${window.location.origin}${window.location.pathname}#customer-login?table=${code}`;
    qrUrlDisplay.textContent = qrUrl;

    // Generate QR code menggunakan API gratis
    qrContainer.innerHTML = `
      <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrUrl)}" 
           alt="QR Code" 
           class="w-32 h-32">
    `;
    qrPreview.classList.remove("hidden");
  } else {
    qrPreview.classList.add("hidden");
  }
}

function saveTable() {
  const name = document.getElementById("table-name").value.trim();
  const code = document.getElementById("table-code").value.trim();

  if (!name || !code) {
    alert("Lengkapi data meja");
    return;
  }

  // Cek apakah kode meja sudah ada
  const exists = tables.find((t) => t.code === code);
  if (exists) {
    alert("Kode meja sudah digunakan!");
    return;
  }

  const qrUrl = `${window.location.origin}${window.location.pathname}#customer-login?table=${code}`;

  tables.push({
    id: Date.now(),
    name,
    code,
    active: true,
    occupied: false,
    qrUrl,
  });

  saveTablesData();
  renderTables();
  closeTableModal();
}

function deleteTable(id) {
  if (!confirm("Hapus meja ini?")) return;
  tables = tables.filter((t) => t.id !== id);
  saveTablesData();
  renderTables();
}

function toggleTableStatus(id) {
  const table = tables.find((t) => t.id === id);
  if (!table) return;
  table.active = !table.active;
  saveTablesData();
  renderTables();
}

// Tambahkan fungsi ini di tables.js
function toggleTableOccupied(id) {
  const table = tables.find((t) => t.id === id);
  if (!table) return;
  table.occupied = !table.occupied;
  saveTablesData();
  renderTables();
}

// Update fungsi renderTables() untuk menampilkan tombol QR dan Isi/Kosongkan
function renderTables() {
  const grid = document.getElementById("table-grid");
  if (!grid) return;

  const total = tables.length;
  const occupied = tables.filter((t) => t.occupied && t.active).length;
  const available = tables.filter((t) => !t.occupied && t.active).length;

  document.getElementById("total-tables").textContent = total;
  document.getElementById("occupied-tables").textContent = occupied;
  document.getElementById("available-tables").textContent = available;

  grid.innerHTML = tables
    .map((table) => {
      const status = !table.active
        ? "Nonaktif"
        : table.occupied
          ? "Terisi"
          : "Kosong";

      const badge = !table.active
        ? "bg-gray-100 text-gray-600"
        : table.occupied
          ? "bg-red-100 text-red-600"
          : "bg-green-100 text-green-600";

      return `
        <div class="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">
          <div class="flex justify-between items-start">
            <div>
              <h3 class="font-bold text-lg">${table.name || table.code}</h3>
              <p class="text-gray-500 text-sm">${table.code || table.number}</p>
            </div>
            <span class="px-3 py-1 rounded-full text-xs font-medium ${badge}">
              ${status}
            </span>
          </div>
          
          <div class="grid grid-cols-2 gap-2 mt-5">
            <button
              onclick="showTableQR(tables.find(t => t.id === ${table.id}))"
              class="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-1 transition">
              <i data-lucide="qr-code" style="width:16px;height:16px"></i>
              QR
            </button>
            
            <button
              onclick="toggleTableOccupied(${table.id})"
              class="${table.occupied ? "bg-green-500 hover:bg-green-600" : "bg-yellow-500 hover:bg-yellow-600"} text-white py-2 rounded-lg transition">
              ${table.occupied ? "Kosongkan" : "Isi"}
            </button>
          </div>
          
          <div class="grid grid-cols-2 gap-2 mt-2">
            <button
              onclick="toggleTableStatus(${table.id})"
              class="bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg transition">
              ${table.active ? "Nonaktifkan" : "Aktifkan"}
            </button>
            
            <button
              onclick="deleteTable(${table.id})"
              class="bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition">
              Hapus
            </button>
          </div>
        </div>
      `;
    })
    .join("");

  lucide.createIcons();
}

// Fungsi untuk menampilkan QR Code
function showTableQR(table) {
  const qrUrl =
    table.qrUrl ||
    `${window.location.origin}${window.location.pathname}#customer-login?table=${table.code || table.number}`;

  const modal = document.createElement("div");
  modal.className =
    "fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4";
  modal.innerHTML = `
    <div class="bg-white rounded-2xl w-full max-w-sm p-6 text-center">
      <h3 class="text-xl font-bold mb-4">${table.name || table.code}</h3>
      <div class="bg-white p-4 inline-block rounded-xl">
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrUrl)}" 
             alt="QR Code" 
             class="w-48 h-48">
      </div>
      <p class="text-sm text-gray-500 mt-4 break-all">${qrUrl}</p>
      <button onclick="this.closest('.fixed').remove()" 
              class="mt-4 w-full bg-crimson hover:bg-crimson-dark text-white py-3 rounded-xl font-medium transition">
        Tutup
      </button>
    </div>
  `;
  document.body.appendChild(modal);
}
