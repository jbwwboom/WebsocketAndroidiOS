var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var orientation = {};


app.get('/', function(req, res){
    res.send("Websocket Android & iOS");
});

io.on('connection', function(client){
    console.log('a user connected');
    client.on('disconnect', function(){
        delete orientation[client.id];
        console.log(client.id + ' disconnected');
    });

    client.on('change orientation', function(msg){
        orientation[client.id] = msg;
        console.log('orientation: ' + msg);
        var bool = 'true';
        for(var i in orientation){
            console.log(orientation[i]);
            if(msg != orientation[i]){
                bool = 'false';
            }
        }
        io.emit('orientation', bool);
    });


});

http.listen(3000, function(){
    console.log('listening on *:3000');
});

