var mysql = require('mysql');

var con = mysql.createConnection({
  host: "eu-cdbr-west-02.cleardb.net",
  user: "bb172b2bbbcbcc",
  password: "2d6dcd81",
  database: "heroku_782cc07843c58ac"
});
const express = require('express');
const app = express();
var server=app.listen(process.env.PORT || 8080);
var sockets=[];
var games = {player1:"", player1data:"", player2: "", player2data: "",player1hit:0,player2hit:0};
var gamesready=[];
var io=require('socket.io').listen(server);
app.get('/', function (zahtev,odgovor) {
   con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM tblkorisnik", function (err, result, fields) {
    if (err) throw err;
    odgovor.write(JSON.stringify(result));
  odgovor.end();
  });
});
  // odgovor.sendFile(__dirname+'/index.html');
   
});
app.use('/public',express.static('public'));

io.on('connection', function (socket) {
  sockets.push(socket.id);
    socket.on("findGame",function(data)
    {
        if(games.player1=="") {
          games.player1=socket.id;
            games.player1data=data;
        }
        else
        {
            games.player2=socket.id;
            games.player2data=data;
            gamesready.push(games);
            io.to(games.player1).to(games.player2).emit("gameFound",{gameid:gamesready.indexOf(games),turn:games.player1});
            games = {player1:"", player1data:"", player2: "", player2data: ""};

        }
    });
socket.on("attack", function (data) {
   if(gamesready[data.gameid].player1==socket.id)
   {
       if(gamesready[data.gameid].player2data[data.block]==1)
       {
           io.to(gamesready[data.gameid].player1).to(gamesready[data.gameid].player2).emit("hit",{player:socket.id,ship:data.block,type:"hit"});
        gamesready[data.gameid].player1hit++;
           if(gamesready[data.gameid].player1hit==17)
           {
               io.to(gamesready[data.gameid].player1).to(gamesready[data.gameid].player2).emit("endGame",{winner:socket.id});
               gamesready.splice(gamesready[data.gameid]);
           }
       }
       else
       {
           io.to(gamesready[data.gameid].player1).to(gamesready[data.gameid].player2).emit("hit",{player:socket.id,ship:data.block,type:"miss"});
       }
   }
    else
   {
       if(gamesready[data.gameid].player1data[data.block]==1)
       {
           io.to(gamesready[data.gameid].player1).to(gamesready[data.gameid].player2).emit("hit",{player:socket.id,ship:data.block,type:"hit"});
           gamesready[data.gameid].player2hit++;
           if(gamesready[data.gameid].player2hit==17)
           {
               io.to(gamesready[data.gameid].player1).to(gamesready[data.gameid].player2).emit("endGame",{winner:socket.id});
               gamesready.splice(gamesready[data.gameid]);
           }
       }
       else
       {
           io.to(gamesready[data.gameid].player1).to(gamesready[data.gameid].player2).emit("hit",{player:socket.id,ship:data.block,type:"miss"});
       }
   }
});
    socket.on("disconnect", function () {
      con.end();
        for(var i=0;i<gamesready.length;i++)
        {
            if(gamesready[i].player1==socket.id)
            {
                io.to(gamesready[i].player2).emit("enemyDisconnected");
                gamesready.splice(i,1);
                break;
            }
            else if(gamesready[i].player2==socket.id)
            {
                io.to(gamesready[i].player1).emit("enemyDisconnected");
                gamesready.splice(i,1);
                break;
            }
                }
 sockets.splice(sockets.indexOf(socket.id),1);
    });
});

