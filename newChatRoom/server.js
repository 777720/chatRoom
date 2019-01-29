var express = require('express');
var app = express()
var http = require('http').Server(app); 

var io = require('socket.io')(http);
var users = []
var usersInfo = []

io.on('connection', function (socket) {
  
  
  socket.on('new message', function (data) {
    io.emit('new message', data);
    // socket.broadcast.emit('new message', data)
  });

  // 当客户端发出“add user”时，服务端监听到并执行相关代码
  socket.on('add user', function (userInfo) {
    users.push({ username: userInfo.username, avtornum: userInfo.avtornum  })
    console.log(users)
    io.emit('login', users);
  });

  // 当用户断开时执行此指令
  socket.on('disconnect', function () { });
});





http.listen(3077, function () {
  console.log('listening on *:3077');
}); 