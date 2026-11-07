const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

let queueState = {
  currentNumber: 'A-000',
  currentCounter: 'Menunggu Panggilan...',
  history: []
};

io.on('connection', (socket) => {
  socket.emit('queue:state', queueState);

  socket.on('queue:call', (data) => {
    queueState.currentNumber = data.queueNumber;
    queueState.currentCounter = data.counterName;

    queueState.history.unshift({
      number: data.queueNumber,
      counter: data.counterName,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    });

    if (queueState.history.length > 5) {
      queueState.history.pop();
    }

    io.emit('queue:state', queueState);
  });
});

server.listen(PORT, () => {
  console.log(`Server aktif di: http://localhost:${PORT}`);
  console.log(`Layar Monitor  : http://localhost:${PORT}/display.html`);
  console.log(`Panel Petugas  : http://localhost:${PORT}/panel.html`);
});