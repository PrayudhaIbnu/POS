function renderReports() {
  const totalRevenue = reports.reduce((sum, trx) => sum + trx.total, 0);
  document.getElementById("report-total-revenue").textContent =
    "Rp " + totalRevenue.toLocaleString();
  document.getElementById("report-total-orders").textContent = reports.length;

  const tbody = document.getElementById("report-table-body");
  if (reports.length === 0) {
    tbody.innerHTML = `
                                    <tr>
                                      <td colspan="4" class="p-8 text-center text-gray-400">Belum ada riwayat transaksi</td>
                                    </tr>`;
  } else {
    tbody.innerHTML = [...reports]
      .reverse()
      .map(
        (trx) => `
                                    <tr class="hover:bg-gray-50 transition">
                                      <td class="p-4 font-medium text-gray-700">${trx.time}</td>
                                      <td class="p-4 font-mono text-gray-500 text-xs">#${trx.id}</td>
                                      <td class="p-4">
                                        <span class="px-2 py-1 rounded text-xs font-semibold ${trx.method === "Cash" ? "bg-orange-100 text-orange-700" : trx.method === "QRIS" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"}">${trx.method}</span>
                                      </td>
                                      <td class="p-4 text-right font-bold text-gray-800">Rp ${trx.total.toLocaleString()}</td>
                                    </tr>
                                  `,
      )
      .join("");
  }
}
function saveReports() {
  localStorage.setItem("reports", JSON.stringify(reports));
}

function loadReports() {
  const data = localStorage.getItem("reports");

  reports = data ? JSON.parse(data) : [];
}