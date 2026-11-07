# 🏥 Sistem Antrean Terpadu (Real-Time Smart Queue System)

Aplikasi antrean publik *multi-client* berbasis web yang menghubungkan ruang pemeriksaan/layanan (dokter/petugas) dengan layar monitor publik secara waktu nyata (*real-time*). Dilengkapi dengan sintesis audio frekuensi nada bel (*chime*) dan pembaca nomor otomatis berbahasa Indonesia via *Web Speech API*.

---

## 📌 Alur Kerja Sistem

1. **Panel Petugas (`/panel.html`)**: Petugas memilih loket/poli yang aktif, kemudian menekan tombol kontrol untuk memanggil nomor antrean berikutnya, memanggil ulang nomor yang sama, atau menyetel ulang nomor antrean.
2. **Server Backend (`server.js`)**: Mengelola *state* antrean di memori, mencatat riwayat panggilan, dan menyiarkan data secara instan ke seluruh antarmuka yang terhubung menggunakan WebSocket.
3. **Layar Monitor Publik (`/display.html`)**: Memperbarui nomor display besar, mencatat daftar histori, membunyikan lonceng dua nada (*ding-dong*), dan melafalkan nomor panggilan serta loket tujuan dalam Bahasa Indonesia.

---

## 🛠️ Tech Stack & Modul

| Lapisan | Teknologi | Kegunaan |
| :--- | :--- | :--- |
| **Backend** | Node.js & Express.js | Menjalankan server HTTP dan melayani file antarmuka statis |
| **Real-Time Engine** | Socket.io | Protokol WebSocket untuk pengiriman pesan instan antarperangkat |
| **Frontend UI** | HTML5 & Tailwind CSS (CDN) | Tata letak layar monitor responsif dan panel kontrol petugas |
| **Audio Synthesizer** | Web Audio API | Menghasilkan frekuensi nada bel *ding-dong* tanpa file audio eksternal |
| **Voice Synthesis** | Web Speech API | Melafalkan pengumuman antrean otomatis berbahasa Indonesia |

---

## 📋 Prasyarat Sistem

Pastikan perangkat komputer sudah terpasang perangkat lunak berikut:
* **Node.js** (versi 16.x atau lebih baru)
* **Git**
* **Google Chrome** atau **Microsoft Edge** (diperlukan untuk kompatibilitas penuh Web Speech API)

---

## 🚀 Panduan Instalasi & Menjalankan Proyek

Jalankan perintah berikut secara berurutan di terminal (PowerShell / Command Prompt):

### 1. Kloning Repositori
```bash
git clone [https://github.com/prhmni/sistem-antrean.git](https://github.com/prhmni/sistem-antrean.git)
cd sistem-antrean