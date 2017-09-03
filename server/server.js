
var express = require('express');
var app = express();
var server = require('http').createServer();
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/node_modules'));
app.get('/', function(req, res){
  res.sendFile("index.html", {"root": __dirname});
});

io.on('connection', function(socket){
   console.log('user connected');
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);

});

    socket.on('join:room', function(data){
        var room_name = data.room_name;
        socket.join(room_name);
    });


    socket.on('leave:room', function(msg){
        msg.text = msg.user + " has left the room";
        socket.in(msg.room).emit('exit', msg);
        socket.leave(msg.room);
    });


    socket.on('send:message', function(msg){
        socket.in(msg.room).emit('message', msg);
    });

    socket.on('echo', function (data) {
        socket.emit('echo', data);
    });

    socket.on('echo-ack', function (data, callback) {
        callback(data);

    socket.on('disconnect', function(){
    console.log('user disconnected');
  });

});

server.listen(3000);