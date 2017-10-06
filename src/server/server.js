const server = require('http').createServer();
const io = require('socket.io')(server);

const store = require('./store');

io.on('connection', socket => {
  socket.emit('state', store.getState())
  socket.on('action', store.dispatch);
});

store.subscribe(() =>
  io.emit('state', store.getState()));

store.dispatch({
  type: 'init_state',
  payload: require('./topics')
});

server.listen(8080);