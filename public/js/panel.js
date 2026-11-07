const socket = io();

const counterSelect = document.getElementById('counter-select');
const activeQueueEl = document.getElementById('active-queue');
const btnNext = document.getElementById('btn-next');
const btnRecall = document.getElementById('btn-recall');
const btnReset = document.getElementById('btn-reset');

let currentCount = 0;
const prefix = 'A';

function formatQueue(num) {
  return `${prefix}-${String(num).padStart(3, '0')}`;
}

socket.on('queue:state', (state) => {
  activeQueueEl.textContent = state.currentNumber;
});

btnNext.addEventListener('click', () => {
  currentCount++;
  socket.emit('queue:call', {
    queueNumber: formatQueue(currentCount),
    counterName: counterSelect.value
  });
});

btnRecall.addEventListener('click', () => {
  if (currentCount === 0) return;
  socket.emit('queue:call', {
    queueNumber: formatQueue(currentCount),
    counterName: counterSelect.value
  });
});

btnReset.addEventListener('click', () => {
  if (confirm('Yakin ingin mereset antrean ke A-000?')) {
    currentCount = 0;
    socket.emit('queue:call', { queueNumber: 'A-000', counterName: 'Menunggu Panggilan...' });
  }
});