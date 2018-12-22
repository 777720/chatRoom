var express = require('express');
var app = express()
var http = require('http').Server(app); 

var io = require('socket.io')(http);
var users = []
var usersInfo = []

app.use('/', express.static(__dirname+ '/www'));



io.on('connection', function(socket) {
  io.emit('disUser', usersInfo)
  console.log(usersInfo);
  socket.on('login', (user) => {
    if (users.indexOf(user.name) > -1) { 
      socket.emit('loginError'); // 触发客户端的登录失败事件
    } else {
      users.push(user.name); //储存用户的昵称
      usersInfo.push(user); // 储存用户的昵称和头像
      socket.emit('loginSuc'); // 触发客户端的登录成功事件
      socket.nickname = user.name;
      io.emit('system', {  // 向所有用户广播该用户进入房间
        name: user.name,
        status: '进入'
      });
      io.emit('disUser', usersInfo);  // 渲染右侧在线人员信息
      console.log(users.length + ' user connect.'); // 打印连接人数
    }
  })

  socket.on('disconnect', () => {
    var index = usersInfo.indexOf(socket.nickname)
    if (index > -1) {  // 避免是undefined
      users.splice(index, 1);  // 删除用户信息
      usersInfo.splice(index, 1);  // 删除用户信息

      io.emit('system', {  // 系统通知
        name: socket.nickname,
        status: '离开'
      });

      io.emit('disUser', usersInfo);  // 重新渲染
      console.log('a user left.');
    }
  })
});

http.listen(3000, function () {
  console.log('listening on *:3000');
}); 