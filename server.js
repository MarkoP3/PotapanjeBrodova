const express = require('express');
const app = express();
var server=app.listen(8080);
var io=require('socket.io').listen(server);
var i="beli";
users=[];
connections=[];
app.get('/',function (req, res) { if(connections.length<2){res.sendFile(__dirname+'/index.html');} else
{
    res.writeHead(200,{'content-type':'text/plain'} );
    res.write("Pun server");
    res.end();
}});
app.use('/css',express.static('css'));
app.use('/img',express.static('img'));
app.use('/js',express.static('js'));

io.sockets.on('connection',function(socket)
{

socket.emit('setpl',{msg:i});
    connections.push(socket);
    users.push(i);
        if (i == 'beli') {
            i = 'crni';
        }
        else {
            i = 'beli';
        }




socket.on('disconnect',function(data)
{
    i=users[connections.indexOf(socket)];
    users.splice(connections.indexOf(socket),1);
    connections.splice(connections.indexOf(socket),1);
});
    socket.on('send message',function(data){
        io.sockets.emit('new message',{msg:data});
    });
});
