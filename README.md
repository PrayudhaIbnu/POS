# Restaurant POS System

Sistem Point of Sale (POS) berbasis Web untuk kebutuhan restoran, cafe, coffee shop, dan bisnis kuliner. Aplikasi ini dirancang dengan tampilan modern, responsif, dan mudah digunakan oleh kasir maupun pelanggan.

---

## Deskripsi

Restaurant POS System adalah aplikasi kasir berbasis web yang membantu mengelola proses pemesanan, pembayaran, inventori, serta laporan penjualan dalam satu platform.

Aplikasi ini menggunakan teknologi Front-End tanpa framework sehingga ringan, mudah dipelajari, dan dapat dijalankan langsung melalui browser.

---

# Fitur Utama

## Authentication

### Customer Login
- Login pelanggan
- Registrasi pelanggan
- Penyimpanan data pengguna menggunakan Local Storage
- Validasi login

### Cashier Login
- Login kasir
- Akses dashboard administrasi

---

## Dashboard

Dashboard menampilkan ringkasan data bisnis secara realtime:

- Total penjualan
- Total transaksi
- Total produk
- Produk terlaris
- Statistik performa restoran

---

## Product Management

Manajemen produk makanan dan minuman.

Fitur:

- Menambah produk
- Mengubah produk
- Menghapus produk
- Menampilkan daftar menu
- Kategori produk
- Harga produk
- Gambar produk

---

## Sales & Checkout

Sistem transaksi kasir.

Fitur:

- Menambah item ke keranjang
- Mengubah jumlah item
- Menghapus item
- Perhitungan subtotal otomatis
- Perhitungan total pembayaran
- Cetak struk transaksi
- Riwayat transaksi

---

## Inventory Management

Pengelolaan stok bahan atau produk.

Fitur:

- Tambah stok
- Edit stok
- Hapus stok
- Monitoring ketersediaan stok
- Status stok rendah

---

## Reports

Laporan bisnis dan penjualan.

Fitur:

- Laporan transaksi
- Total pendapatan
- Jumlah pesanan
- Statistik penjualan
- Ringkasan performa bisnis

---

## Modern UI

Tampilan menggunakan konsep:

- Minimalist Design
- Luxury Restaurant Theme
- Responsive Layout
- Mobile Friendly
- Elegant Typography

---

# Alur Sistem

## 1. Login

User melakukan login sebagai:

- Customer
- Cashier

↓

## 2. Dashboard

Kasir masuk ke Dashboard untuk melihat:

- Ringkasan penjualan
- Statistik bisnis

↓

## 3. Product Selection

Kasir memilih menu yang dipesan pelanggan.

↓

## 4. Cart

Produk masuk ke keranjang.

Kasir dapat:

- Menambah jumlah item
- Mengurangi jumlah item
- Menghapus item

↓

## 5. Checkout

Sistem menghitung:

- Subtotal
- Total pembayaran

↓

## 6. Transaction Saved

Data transaksi disimpan.

↓

## 7. Report Update

Laporan otomatis diperbarui berdasarkan transaksi terbaru.

---

# Teknologi yang Digunakan

## Frontend

- HTML5
- CSS3
- JavaScript (ES6)

---

## Styling

- Tailwind CSS
- Custom CSS
- Flexbox
- CSS Grid

---

## Data Storage

- Local Storage API

Digunakan untuk:

- Data pengguna
- Data produk
- Data transaksi
- Data inventori

---

## Typography

- Poppins
- Playfair Display

---

## Icons

- Font Awesome
- Hero Icons

---

# 💾 Penyimpanan Data

Saat ini aplikasi menggunakan:

```javascript
localStorage
```

Data yang tersimpan:

- Users
- Products
- Inventory
- Orders
- Reports

---

# Responsive Design

Aplikasi mendukung:

- Desktop
- Laptop
- Tablet
- Mobile

---

# ⚙️ Cara Menjalankan

## Clone Repository

```bash
git clone https://github.com/PrayudhaIbnu/POS.git
```

## Masuk Folder

```bash
cd POS
```

## Jalankan

Buka:

```text
index.html
```

atau gunakan Live Server.
---

# Developer

Developed by

**null**

Restaurant POS System Project

---

# 📄 License

This project is developed for educational.
