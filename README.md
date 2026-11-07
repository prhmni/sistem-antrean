# 📢 Sistem Antrean Terpadu (Real-Time Smart Queue)

Aplikasi manajemen antrean layanan publik (*multi-client*) berbasis WebSocket untuk sinkronisasi waktu nyata (*real-time*) antara panel kontrol petugas dan layar monitor antrean publik, dilengkapi dengan sistem audio pengumuman otomatis.

## 🚀 Fitur Utama

- **Layar Monitor Publik (`display.html`)**: Menampilkan nomor antrean aktif, nama poli/loket tujuan, riwayat antrean terakhir, jam digital, teks berjalan (*running text*), nada lonceng (*ding-dong*), dan panggilan suara otomatis Bahasa Indonesia.
- **Panel Petugas / Dokter (`panel.html`)**: Pemilihan loket/poli, pemanggilan nomor berikutnya sekuensial, panggil ulang (*recall*), dan reset antrean.
- **Sinkronisasi Real-Time**: Pembaruan status instan ke seluruh antarmuka menggunakan **Socket.io**.

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Komunikasi Real-Time**: Socket.io (WebSocket)
- **Frontend**: HTML5, Tailwind CSS (CDN), Vanilla JavaScript
- **Audio**: Web Audio API & Web Speech API

## 💻 Panduan Menjalankan

1. Kloning repositori:
   ```bash
   git clone [https://github.com/prhmni/sistem-antrean.git](https://github.com/prhmni/sistem-antrean.git)
   cd sistem-antrean