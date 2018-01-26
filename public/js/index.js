var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');
});



socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message){
    console.log('New message', message);
    var template = $('#message-template').html();
    var formattedTime = moment(message.createAt).format('h:mm a');
    var html = Mustache.render(template,{
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });
    $('#messages').append(html);
});

socket.on('newLocationMessage', function(message){
    var template = $('#location-message-template').html();
    var formattedTime = moment(message.createAt).format('h:mm a');
    var html = Mustache.render(template,{
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    });
    $('#messages').append(html);
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


