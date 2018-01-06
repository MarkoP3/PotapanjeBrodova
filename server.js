const express = require('express');
const app = express();
var server=app.listen(8080);
var io=require('socket.io').listen(server);
var i="beli";
users=[];
connections=[];
app.get('/',function (req, res) { res.sendFile(__dirname+'/index.html');});
app.use('/css',express.static('css'));
app.use('/img',express.static('img'));
app.use('/js',express.static('js'));

io.sockets.on('connection',function(socket)
{

socket.emit('setpl',{msg:i});
    connections.push(socket);
        if (i == 'beli') {
            i = 'crni';
        }
        else {
            i = 'beli';
        }
  

//console.log('neko se poveza');
socket.on('disconnect',function(data)
{
    connections.splice(connections.indexOf(socket),1);
   // console.log('disconnected');
});
    socket.on('send message',function(data){
        io.sockets.emit('new message',{msg:data});
    });
});
