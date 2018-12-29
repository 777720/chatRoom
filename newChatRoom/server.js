var express = require('express');
var app = express()
var http = require('http').Server(app); 

var io = require('socket.io')(http);
var users = []
var usersInfo = []

io.on('connection', function (socket) {
  console.log('连接了！');
  socket.emit('message', "this is a test");
  // 当客户端发出“new message”时，服务端监听到并执行相关代码
  socket.on('new message', function (data) {
    // 广播给用户执行“new message”
    socket.broadcast.emit('new message', {});
  });

  // 当客户端发出“add user”时，服务端监听到并执行相关代码
  socket.on('add user', function (username) {
    socket.username = username;
    //服务端告诉当前用户执行'login'指令
    socket.emit('login', {});
  });

  // 当用户断开时执行此指令
  socket.on('disconnect', function () { });
});





http.listen(3077, function () {
  console.log('listening on *:3077');
}); 