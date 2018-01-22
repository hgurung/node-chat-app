var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');
    socket.emit('createMessage', {
        from: 'harris_grg1@hotmail.com',
        text: 'whats up bitch'
    });
});



socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message){
    console.log('New message', message);
});



