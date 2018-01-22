const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname + '/../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

const {generateMessage} = require('./utils/message');

io.on('connection', (socket) => {
    console.log('new user connected');
    
    socket.emit('newMessage', generateMessage('Admin','Welcome to chat app!'));

    socket.broadcast.emit('newMessage', generateMessage('Admin','New user joined!'));

    socket.on('createMessage', (message) => {
        console.log('Create message', message);
        io.emit('newMessage',generateMessage(message.from,message.text));
    });

    socket.on('disconnect' , () => {
        console.log('User was disconnected');
    });
});

app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`Starter on port ${port}`);        
});


