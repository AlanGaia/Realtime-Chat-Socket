const express = require('express');
const path = require('path');
const http = require('http');
const PORT = 3000 || process.env.PORT;
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app)
const io = socketio(server);

//set Static folder
app.use(express.static(path.join(__dirname, 'public')));

//Run when Client Connects
io.on('connection', socket => {
    //Welcome to current User connected
    socket.emit('message', 'Welcome to CheatMe Chat!');
    // Broadcast when a User connects 
    socket.broadcast.emit('message','A user has joined the chat');
    //Runs when client disconnect
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat');
    });
    
    // listen for chat message
    socket.on('chatMessage', (msg) => {
        io.emit('message', msg)
    })
});

server.listen(PORT, () => {
    console.log(`server started on http://localhost:${PORT}`);    
})