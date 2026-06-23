# Raihan Com — Platform Aset Kantor Bekas & Kartu Nama 3D Interaktif

[![Vite Build](https://img.shields.io/badge/vite-%23646CFF.svg?style=flat&logo=vite&logoColor=white)](https://vite.dev/)
[![React](https://img.shields.io/badge/react-%2320232d.svg?style=flat&logo=react&logoColor=%2361DAFB)](https://react.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/tailwindcss-38bdf8.svg?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TanStack Start](https://img.shields.io/badge/tanstack--start-%23FF4154.svg?style=flat)](https://tanstack.com/router/v1/docs/start/overview)
[![Bun](https://img.shields.io/badge/Bun-%23000000.svg?style=flat&logo=bun&logoColor=white)](https://bun.sh/)
[![Cloudflare Pages](https://img.shields.io/badge/cloudflare-%23F38020.svg?style=flat&logo=cloudflare&logoColor=white)](https://pages.cloudflare.com/)

Platform web modern untuk layanan jual-beli alat kantor bekas di wilayah **Jakarta & Jabodetabek**. Proyek ini menampilkan estetika premium kelas atas (*Titanium MDM Dark Navy Glassmorphism*) dan dilengkapi kartu nama 3D interaktif yang mutakhir.

---

## 🌟 Fitur Utama

- **Kartu Nama 3D Interaktif**: Kartu nama virtual realistis dengan efek kemiringan tiga dimensi (*gyroscope/mousemove tilt*), efek kilau cahaya dinamis (*glare effect*), dan fitur balik kartu (*3D flip*) manual atau sentuh.
- **Local SEO & Geo-Targeting**: Dioptimalkan secara penuh untuk pencarian lokal di area Jabodetabek (Jakarta, Bogor, Depok, Tangerang, Bekasi).
- **Alur WhatsApp Terintegrasi**: Sistem CTA yang cerdas untuk mengarahkan pengguna mengirim detail unit langsung ke tim WhatsApp dengan format pesan otomatis.
- **Titanium Design System**: Desain mewah bernuansa *dark navy glassmorphism* dengan mikro-animasi halus, performa kilat, dan dukungan aksesibilitas penuh.

---

## 🏗️ Arsitektur Proyek (Dual-Architecture)

Aplikasi ini dirancang dengan struktur ganda untuk memenuhi kebutuhan fleksibilitas pengembangan:

1. **Standalone 3D Business Card (`index.html`)**
   - Halaman statis murni (*Vanilla HTML, CSS, JS*) yang berdiri sendiri.
   - Sangat ringan, mandiri, tanpa pustaka eksternal, dan langsung dapat dideploy ke **GitHub Pages**.
   - Menampilkan visualisasi kartu nama 3D premium yang interaktif.

2. **Full-Stack SSR Application (`src/`)**
   - Website utama lengkap dengan berbagai section (Layanan, Kategori, Wilayah, Cara Kerja, Kontak, FAQ).
   - Dibangun menggunakan **TanStack Start**, **Vite**, **Tailwind CSS v4**, dan **Motion** (Framer Motion).
   - Siap dideploy sebagai aplikasi *server-side rendered* (SSR) berperforma tinggi di platform **Cloudflare Pages / Workers**.

---

## 🛠️ Teknologi & Pustaka

- **Frontend**: [React 19](https://react.dev/), [Tailwind CSS v4](https://tailwindcss.com/)
- **Routing & SSR**: [TanStack Start](https://tanstack.com/router/v1/docs/start/overview) (berbasis [Vinxi](https://github.com/nrayburn-tech/vinxi))
- **Animasi**: [Motion (Framer Motion)](https://motion.dev/)
- **Bundler & Compiler**: [Vite 7](https://vite.dev/)
- **Package Manager**: [Bun](https://bun.sh/)
- **Deployment**: Cloudflare Pages (SSR) & GitHub Pages (Statis)

---

## 🚀 Memulai Pengembangan

### Prasyarat
Pastikan Anda telah menginstal [Bun](https://bun.sh/) di komputer Anda.

### 1. Instal Dependensi
```bash
bun install
```

### 2. Jalankan Dev Server (Lokal)
Mulai server pengembangan lokal:
```bash
bun run dev
```
Buka [http://localhost:8080](http://localhost:8080) pada browser Anda.

### 3. Build untuk Produksi
Lakukan kompilasi untuk aset klien dan server:
```bash
bun run build
```
Build output akan menghasilkan:
- `dist/client/`: Aset statis klien (JS, CSS, Gambar).
- `dist/server/`: Handler server terkompilasi untuk runtime Cloudflare.

---

## 🌐 Panduan Deployment

### A. Deploy ke GitHub Pages (Halaman Kartu 3D Statis)
Halaman kartu nama 3D (`index.html` di root) dapat dideploy langsung secara statis:
1. Masuk ke **Settings** repositori Anda di GitHub.
2. Navigasi ke bagian **Pages**.
3. Di bawah **Build and deployment**, pilih source **Deploy from a branch**.
4. Pilih branch **`main`** dan folder **`/(root)`**, lalu klik **Save**.

### B. Deploy ke Cloudflare Pages (Aplikasi Web Lengkap - SSR)
Aplikasi full-stack SSR terkonfigurasi untuk berjalan di Cloudflare:
1. Pastikan Anda memiliki akun Cloudflare.
2. Jalankan perintah deploy dengan Wrangler CLI:
   ```bash
   bun run build
   npx wrangler pages deploy dist/client
   ```

---

## 📂 Struktur Direktori

```text
├── .github/              # Konfigurasi repositori GitHub (workflows, templates)
├── public/               # Aset statis publik (ikon, gambar produk, favicon)
├── src/                  # Kode sumber aplikasi utama (React)
│   ├── assets/           # Gambar & WebP teroptimasi
│   ├── components/       # Komponen UI (Card3D, Magnetic, SpotlightCard, dll)
│   ├── lib/              # Utilitas pembantu (integrasi WhatsApp, API)
│   ├── routes/           # Routing & Halaman (TanStack Router)
│   ├── styles.css        # Desain CSS global & variabel tema
│   ├── server.ts         # Entry point server SSR
│   └── start.ts          # Konfigurasi instance TanStack Start
├── index.html            # Standalone 3D Card (Vanilla HTML/CSS/JS)
├── package.json          # Manifest dependensi & script proyek
├── vite.config.ts        # Konfigurasi bundler Vite
└── wrangler.jsonc        # Konfigurasi integrasi Cloudflare Pages
```

---

## 🤝 Kontribusi

Kontribusi selalu diterima! Jika Anda ingin meningkatkan UI/UX, mengoptimalkan SEO, atau menambahkan fitur baru, silakan buka *Issue* atau kirimkan *Pull Request*.

Langkah berkontribusi:
1. Fork repositori ini
2. Buat branch fitur (`git checkout -b fitur/fitur-baru`)
3. Commit perubahan Anda (`git commit -m 'Menambahkan fitur baru yang keren'`)
4. Push ke branch (`git push origin fitur/fitur-baru`)
5. Buka Pull Request

---

## 📄 Lisensi
Proyek ini dibuat untuk transaksi perdagangan peralatan bekas kantor yang aman dan jujur. Hak Cipta dilindungi undang-undang © **Raihan Com**.
