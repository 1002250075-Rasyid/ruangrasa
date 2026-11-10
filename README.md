# RuangRasa — Tugas 2

Landing page toko kopi lokal yang dibangun memakai HTML semantik, CSS, dan JavaScript murni. Halaman ini menjadi implementasi wireframe toko kopi dengan lima komponen utama: header/navigasi, hero, katalog produk, cerita merek, serta formulir newsletter dan footer.

## Fitur

- Navigasi utama dengan menu ringkas untuk layar ponsel.
- Filter roast dan pencarian produk yang berjalan bersama.
- Tombol tambah produk, penghitung jumlah, rincian keranjang, dan hitung total.
- Validasi email pada formulir newsletter dengan pesan status yang mudah dibaca.
- Tata letak responsif, label aksesibel, custom properties CSS, dan dukungan preferensi reduced motion.

## Struktur proyek

```text
.
├── index.html   # Struktur semantik dan konten halaman
├── styles.css   # Desain responsif, komponen, dan token warna/spasi
├── script.js    # Filter, keranjang, menu, dan validasi formulir
└── README.md    # Deskripsi dan petunjuk proyek
```

## Cara menjalankan

1. Unduh atau clone repository.
2. Buka `index.html` langsung di browser, atau jalankan server statis dari folder proyek (contoh: `python -m http.server 8000`).
3. Kunjungi `http://localhost:8000` jika memakai server lokal.

Tidak ada dependensi build atau framework. Font DM Sans dan Manrope dimuat dari Google Fonts; jika koneksi tidak tersedia, browser memakai font sans-serif pengganti.

## Komponen dan keputusan desain

| Komponen | Lokasi kode | Perilaku dan keputusan desain |
| --- | --- | --- |
| Header dan navigasi | `index.html` `.site-header`; `styles.css` `.main-nav`; `script.js` `menuToggle` | Navigasi sticky menjaga tautan utama mudah dijangkau. Pada layar kecil, tombol menu membuka panel navigasi dan menutupnya setelah tautan dipilih. |
| Hero | `index.html` `#beranda`; `styles.css` `.hero-art` | Judul dan CTA memperjelas tujuan halaman; ilustrasi cangkir dibuat dengan CSS agar tidak membutuhkan aset gambar tambahan. |
| Katalog produk | `index.html` `#produk`; `styles.css` `.product-card`; `script.js` `filterProducts()` | Kartu menampilkan asal, profil rasa, harga, dan tombol tambah. Filter tingkat sangrai dan pencarian dapat digunakan bersamaan. |
| Keranjang | `index.html` `#cart-dialog`; `styles.css` `.cart-dialog`; `script.js` `updateCart()` | Keranjang memakai dialog native, menghitung jumlah dan subtotal secara langsung, serta memberi pesan saat produk ditambah atau checkout demo dipilih. |
| Cerita merek | `index.html` `#cerita`; `styles.css` `.story-section` | Bagian cerita memberi konteks asal produk dengan teks singkat dan komposisi visual yang seirama dengan palet alam. |
| Newsletter dan footer | `index.html` `#newsletter-form` dan `#footer`; `script.js` submit handler | Email diperiksa sebelum pesan sukses ditampilkan. Form ini hanya demo antarmuka dan belum menyimpan alamat ke layanan backend. |

## Catatan pengumpulan

- Wireframe Tugas 1 yang dipakai: halaman toko kopi RuangRasa (wireframe implementasi mandiri karena berkas wireframe sebelumnya tidak disertakan).
- Buat repository GitHub publik, lalu unggah ke folder repository dengan `index.html` berada di akar.
- Opsional: aktifkan GitHub Pages dari branch dan folder akar repository. URL demo akan mengikuti format `https://nama-pengguna.github.io/nama-repo/`.
- Isi tautan repository dan demo pada formulir pengumpulan setelah repository milikmu tersedia.
