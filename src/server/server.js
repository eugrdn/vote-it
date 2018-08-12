const server = require('http').createServer();
const io = require('socket.io')(server);
const store = require('./store');
const PORT = process.env.PORT || 8080;

io.on('connection', socket => {
  socket.emit('state', store.getState());
  socket.on('action', store.dispatch);
});

store.subscribe(() =>
  io.emit('state', store.getState()));

store.dispatch({
  type: 'init_state',
  payload: require('./topics')
});

server.listen(PORT, () => console.log(`Server is listening on the port:${PORT}`));