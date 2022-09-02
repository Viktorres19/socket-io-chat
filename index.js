const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

server.listen(3000);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

users = [];
connections = [];
// відслідковуємо подію connection
io.sockets.on('connection', function(socket) {
  console.log("Успішне приєднання");
  // беремо масив connections і в нього вбудовуємо об'єкт socket
  connections.push(socket);

  // функція, що буде видаляти об'єкт socket з масиву connections
  socket.on('disconnect', function(data) {
    connections.splice(connections.indexOf(socket), 1);
    console.log("Відключились");
  });
  // тут ми отримуємо параметр data
  socket.on('send mess', function(data) {
    // вказуємо до якої нової події ми будемо звертатись
    // io.sockets.emit('add mess', {msg: data});
    io.sockets.emit('add mess', {mess: data.mess, name: data.name, className: data.className});
  });


});