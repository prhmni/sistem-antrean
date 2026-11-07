const socket = io();

const currentNumberEl = document.getElementById('current-number');
const currentCounterEl = document.getElementById('current-counter');
const historyListEl = document.getElementById('history-list');
const clockEl = document.getElementById('clock');
const btnAudioInit = document.getElementById('btn-audio-init');

let isAudioReady = false;
let audioCtx = null;

// Jam digital realtime
setInterval(() => {
  clockEl.textContent = new Date().toLocaleTimeString('id-ID');
}, 1000);

// 1. Fungsi Nada Bel "Ding-Dong" (Web Audio API)
function playDingDong() {
  return new Promise((resolve) => {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const now = audioCtx.currentTime;

    // Nada pertama (Ding - Nada Tinggi)
    const osc1 = audioCtx.createOscillator();
    const gain1 = audioCtx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(587.33, now); // Nada D5
    gain1.gain.setValueAtTime(0.25, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
    osc1.connect(gain1);
    gain1.connect(audioCtx.destination);
    osc1.start(now);
    osc1.stop(now + 0.7);

    // Nada kedua (Dong - Nada Rendah)
    const osc2 = audioCtx.createOscillator();
    const gain2 = audioCtx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(440.00, now + 0.35); // Nada A4
    gain2.gain.setValueAtTime(0.3, now + 0.35);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 1.1);
    osc2.connect(gain2);
    gain2.connect(audioCtx.destination);
    osc2.start(now + 0.35);
    osc2.stop(now + 1.1);

    // Tunggu nada selesai sebelum suara ucapan dimulai
    setTimeout(resolve, 1100);
  });
}

// 2. Fungsi Pembaca Suara Otomatis
async function announceQueue(number, counter) {
  if (!isAudioReady) return;

  // Bunyikan nada bel terlebih dahulu
  await playDingDong();

  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();

  // Pisahkan huruf awal dan angka (misal "A-001" menjadi "A" dan "1")
  const parts = number.split('-');
  const huruf = parts[0];
  const angka = parseInt(parts[1], 10);

  // Kalimat panggilan resmi
  const text = `Nomor antrean... ${huruf}... ${angka}... silakan menuju ke... ${counter}`;
  
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'id-ID';
  utterance.rate = 0.85; // Tempo santai dan lugas
  utterance.pitch = 1.0;

  // Gunakan suara Bahasa Indonesia jika browser menyediakannya
  const voices = window.speechSynthesis.getVoices();
  const indoVoice = voices.find((v) => v.lang.includes('id') || v.lang.includes('ID'));
  if (indoVoice) utterance.voice = indoVoice;

  window.speechSynthesis.speak(utterance);
}

// 3. Tangani Aktivasi Audio Browser
btnAudioInit.addEventListener('click', () => {
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  audioCtx.resume();
  isAudioReady = true;

  btnAudioInit.className = 'bg-emerald-600 text-white font-bold text-xs uppercase px-4 py-2 rounded-full flex items-center gap-2 shadow-lg';
  btnAudioInit.innerHTML = '<span>🔊 Suara Aktif</span>';

  // Uji coba suara singkat
  playDingDong();
});

// Pastikan daftar suara siap di browser
if ('speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
  };
}

// 4. Menerima Sinyal dari Server
let lastCalledNumber = 'A-000';

socket.on('queue:state', (state) => {
  currentNumberEl.textContent = state.currentNumber;
  currentCounterEl.textContent = state.currentCounter;

  // Jalankan suara saat ada panggilan baru atau tombol "Panggil Ulang" ditekan
  if (state.currentNumber !== 'A-000') {
    announceQueue(state.currentNumber, state.currentCounter);
  }

  // Perbarui histori
  historyListEl.innerHTML = '';
  if (state.history.length === 0) {
    historyListEl.innerHTML = '<li class="text-slate-500 text-center py-4">Belum ada riwayat panggilan.</li>';
  } else {
    state.history.forEach((item) => {
      const li = document.createElement('li');
      li.className = 'flex justify-between items-center bg-slate-700/50 p-3 rounded-xl border border-slate-700';
      li.innerHTML = `
        <span class="font-bold text-amber-400 text-lg">${item.number}</span>
        <span class="text-sm text-slate-300">${item.counter}</span>
        <span class="text-xs text-slate-400 font-mono">${item.time}</span>
      `;
      historyListEl.appendChild(li);
    });
  }
});