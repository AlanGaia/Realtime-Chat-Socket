const express = require('express');
const path = require('path');
const http = require('http');
const PORT = 3000 || process.env.PORT;
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const {userJoin, getCurrentUser, userLeave, getRoomUsers} = require('./utils/users');


const app = express();
const server = http.createServer(app)
const io = socketio(server);

//set Static folder
app.use(express.static(path.join(__dirname, 'public')));

//Route /
app.get('/', (req, res) => {
  res.sendFile('index.html');
})
const serverBot = 'Dev BOT'

//Run when Client Connects
io.on('connection', socket => {
    socket.on('joinRoom', ({username,room}) => {
      const user = userJoin(socket.id, username, room);

      socket.join(user.room);

      //Welcome to current User connected
      socket.emit('message', formatMessage(serverBot,'Welcome to CheatMe Chat!'));

      // Broadcast when a User connects 
      socket.broadcast.to(user.room).emit('message',formatMessage(serverBot,`${user.username} has joined the Chat`));

      // Send users and room info
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    })
    

    // listen for chat message
    socket.on('chatMessage', (msg) => {
        const user = getCurrentUser(socket.id);
        io.emit('message', formatMessage(user.username, msg));
    })


    //Runs when client disconnect
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);

        if (user){
          io.to(user.room).emit('message', formatMessage(serverBot,`${user.username} has left the chat`));
        }
        // Send users and room info
        io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
    });
    });
});

server.listen(PORT, () => {
    console.log(`server started on http://localhost:${PORT}`);    
})