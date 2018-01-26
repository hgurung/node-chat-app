var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');
});



socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message){
    console.log('New message', message);
    var li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    $('#messages').append(li);
});

socket.on('newLocationMessage', function(message){
    var li = $('<li></li>');
    var a = $('<a target="_blank">Current Location</a>');
    li.text(`${message.from}:`);
    a.attr('href',message.url);
    li.append(a);
    $('#messages').append(li);
});

$('#message-form').on('submit',function(e) {
    e.preventDefault();
    var messageTextBox = $('[name=message]');
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function(data) {
        messageTextBox.val('');
    });
});

var locationBtn = $('#send-location');
locationBtn.on('click', function(e){
    if(!navigator.geolocation) {
        return alert('Gelolcation not supported by your browser');
    }

    locationBtn.attr('disabled','disabled').text('Sending Location...');

    navigator.geolocation.getCurrentPosition(function(position){
        locationBtn.removeAttr('disabled').text('Send Location');
        socket.emit('createLocationMessage',{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    },function() {
        locationBtn.removeAttr('disabled').text('Send Location');
        alert('Unable to fetch location');
    });
});


