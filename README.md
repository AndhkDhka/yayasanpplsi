# Yayasan PPLSI (SDN Balas Klumprik) — Static Website

Ini adalah versi **statis** (HTML + CSS + JS murni) dari proyek Laravel
`sdn-balaslumprik`. Situs ini **tidak memerlukan** PHP, Laravel, MySQL,
Composer, npm, atau server backend apa pun — cukup buka `index.html` di
browser, atau unggah seluruh folder ke GitHub Pages / Vercel.

## Struktur Proyek

```
/
├── index.html              Beranda
├── profil.html             Profil & tata kelola yayasan
├── programs.html            Unit layanan, program unggulan, fasilitas
├── ppdb.html                "Peformance" — rekam prestasi & mitra nasional
├── berita.html               Berita, galeri, video, kunjungan & alumni
├── berita-literasi.html      Contoh halaman detail berita
├── berita-prestasi.html      Contoh halaman detail berita
├── berita-hardiknas.html     Contoh halaman detail berita
├── README.md
└── assets/
    ├── css/style.css        CSS hasil kompilasi Tailwind (statis, tanpa CDN)
    ├── js/main.js            Perilaku interaktif (menu, slider, reveal, filter, form)
    └── images/                Seluruh gambar/logo (sudah dioptimasi ukurannya)
```

## Apa yang Dikonversi

Proyek Laravel aslinya memiliki route publik berikut, dan masing-masing
sudah dipetakan 1:1 ke halaman statis:

| Route Laravel      | Halaman Statis           |
|---------------------|---------------------------|
| `/`                  | `index.html`              |
| `/profil`            | `profil.html`             |
| `/programs`          | `programs.html`           |
| `/ppdb`              | `ppdb.html`                |
| `/kontak`            | `kontak.html`              |
| `/berita`            | `berita.html`              |
| `/berita/{slug}`     | `berita-*.html` (contoh untuk 3 berita) |

Semua kode Blade (`@extends`, `@section`, `@yield`, `@include`, `@foreach`,
`@if`, `{{ }}`) telah dikonversi menjadi HTML biasa. Data dummy dari
controller (`HomeController`, `ProfilController`, `BeritaController`, dll.)
dijadikan konten statis langsung di HTML.

Catatan penting: pada kode Laravel aslinya, route `/ppdb` sebenarnya
menampilkan halaman "Rekam Prestasi" (bukan formulir pendaftaran PPDB),
jadi halaman statis `ppdb.html` meniru konten aslinya apa adanya.

## Gambar yang Diganti dengan Placeholder

Beberapa path gambar dirujuk di kode Blade tetapi file aslinya tidak ada
di folder `public/` proyek Laravel (kemungkinan diunggah lewat CMS/admin
yang tidak ikut ter-zip, atau memang belum diisi). Untuk gambar-gambar
tersebut, dibuatkan **placeholder bergambar** bernuansa merah marun sesuai
warna brand, dengan label teks agar mudah diidentifikasi dan diganti nanti:

- Foto hero beranda (`assets/images/hero/`)
- Foto berita di beranda/berita (`assets/images/berita/`)
- Beberapa foto program, prestasi, fasilitas, dan mitra
  (`program/`, `prestasi/`, `fasilitas/`, `mitra/`, dll.)
- 3 video "hover-preview" di halaman Programs (tidak ada file video asli
  di proyek, jadi diganti poster gambar + label "Video Segera Hadir")

**Silakan ganti file-file ini** di `assets/images/` dengan foto asli sekolah
kapan pun sudah tersedia — nama file dan lokasinya sudah disiapkan agar
tinggal ditimpa (overwrite), tanpa perlu mengubah HTML.

Semua gambar asli dari proyek Laravel juga sudah dikompresi/diresize agar
loading lebih cepat (ukuran total gambar turun dari ±110 MB menjadi ±16 MB).

## Fitur yang Disimulasikan dengan JavaScript (tanpa backend)

- **Hero slider** — bergantian otomatis tiap 5 detik (vanilla JS)
- **Scroll reveal** — animasi fade-in saat elemen masuk viewport
- **Navbar transparan → solid** saat discroll
- **Menu mobile** — toggle buka/tutup
- **Pencarian berita** client-side sederhana (filter judul/isi kartu)
- **Filter galeri** client-side (siap dipakai bila kategori ditambahkan)

Semua ada di satu file: `assets/js/main.js`.

## Formulir Kontak

Formulir di `kontak.html` sudah disiapkan agar bisa langsung berfungsi
tanpa backend, menggunakan **FormSubmit** (https://formsubmit.co):

```html
<form action="https://formsubmit.co/info@yayasanpplsi.or.id" method="POST" ...>
```

Ganti alamat email di atas dengan email resmi yayasan. Alternatif lain:

- **Netlify Forms**: jika hosting di Netlify, tambahkan atribut
  `data-netlify="true"` dan `name="kontak"` pada tag `<form>`.
- **Biarkan statis**: skrip `main.js` akan menampilkan pesan info bila
  form belum dihubungkan ke layanan pengiriman apa pun.

## Fitur yang Dihapus/Tidak Tersedia di Versi Statis

Karena GitHub Pages / Vercel (versi statis) tidak dapat menjalankan
backend, fitur-fitur berikut dari proyek Laravel **tidak** ada di versi
statis ini (proyek asli sendiri juga belum mengimplementasikan login/CRUD,
sebatas kerangka autentikasi bawaan Laravel Breeze):

- Proses submit form PPDB ke database (`PpdbController@submit`) — di kode
  asli pun baru berupa placeholder (`// Ppdb::create($request->all())`
  masih dikomentari), belum tersambung ke database sungguhan.
- Login/admin dashboard bawaan Laravel Breeze (`/login`, `/register`,
  `/dashboard`) — halaman ini tidak bersifat publik sehingga tidak
  disertakan pada situs statis.
- Data berita/galeri dinamis dari database — semua diganti versi statis.

## Cara Deploy ke GitHub Pages

1. Buat repository baru di GitHub, misalnya `yayasan-pplsi-web`.
2. Unggah seluruh isi folder ini (bukan folder itu sendiri, tapi isinya:
   `index.html`, `assets/`, dll.) ke root repository tersebut.
3. Masuk ke **Settings → Pages**.
4. Pada **Source**, pilih branch `main` (atau `master`) dan folder `/root`.
5. Klik **Save**. Setelah beberapa menit, situs akan aktif di:
   `https://<username>.github.io/<nama-repo>/`
6. (Opsional) Jika ingin domain custom, tambahkan file `CNAME` berisi
   nama domain Anda di root repo, lalu atur DNS sesuai dokumentasi
   GitHub Pages.

## Cara Deploy ke Vercel

1. Buat akun di https://vercel.com bila belum punya.
2. Klik **Add New → Project**, lalu impor repository GitHub yang berisi
   folder situs ini (atau unggah langsung via drag-and-drop di dashboard
   Vercel / gunakan Vercel CLI: `vercel deploy`).
3. Saat konfigurasi build, pilih **Other / No Framework** — kosongkan
   "Build Command" dan set "Output Directory" ke `.` (root), karena situs
   ini sudah berupa HTML statis tanpa proses build.
4. Klik **Deploy**. Vercel akan otomatis memberi URL `https://<nama-proyek>.vercel.app`.

Tidak diperlukan `npm install`, tidak ada `vercel.json` khusus, dan tidak
ada environment variable yang wajib diisi.

## Menjalankan di Lokal

Karena situs ini 100% statis, cukup buka `index.html` langsung di
browser. Untuk pengalaman terbaik (agar path relatif & iframe peta
berjalan sempurna di semua browser), Anda juga bisa menjalankan server
statis sederhana, misalnya:

```bash
# Python 3
python3 -m http.server 8000

# lalu buka http://localhost:8000
```

## Kredit Teknis

- CSS dikompilasi dari Tailwind CSS (build statis, sudah di-purge sesuai
  kelas yang benar-benar dipakai) — tidak memuat CDN eksternal apa pun.
- Tidak ada dependency JavaScript pihak ketiga; `main.js` ditulis murni
  vanilla JS agar situs tetap ringan dan tidak bergantung pada koneksi
  internet untuk berfungsi (kecuali untuk memuat peta Google Maps dan
  video YouTube yang memang berbasis iframe eksternal).
