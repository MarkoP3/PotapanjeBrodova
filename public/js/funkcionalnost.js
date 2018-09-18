/**
 * Created by Puzovic on 9/17/2018.
 */
document.getElementsByClassName('selected_item')[0].getElementsByTagName("img")[0].src=""; document.getElementsByClassName('orijentacija')[0].innerText="Select a ship";
var socket=io.connect();
var orijentacija=0;
var lastselect;
var yourTurn=false;
var gameId;
var izabran;
var tabela=document.getElementById('tabla');
var tabelaprotivnik=document.getElementById('protivnik');
var postavljene=new Array(81).fill(0);
var velicina=0;
function rotate()
{
    if(event.key=="r" && velicina!=0) {
        if (orijentacija == 0){
            orijentacija = 1;
            document.getElementsByClassName('orijentacija')[0].innerText="Vertically- "+velicina+" spaces";}
        else{
            orijentacija = 0;
            document.getElementsByClassName('orijentacija')[0].innerText="Horizontally- "+velicina+" spaces";
        }
       selekt(lastselect,"odabir");
    }
}
function selektovano(element)
{
    velicina=element.width/30;
    izabran=element;
    document.getElementsByClassName('selected_item')[0].getElementsByTagName("img")[0].src=izabran.src;
    if(orijentacija==0)
    {
        document.getElementsByClassName('orijentacija')[0].innerText="Horizontally- "+velicina+" spaces";
    }
    else
        document.getElementsByClassName('orijentacija')[0].innerText="Vertically- "+velicina+" spaces";
}
function refresh() {
    for (var e = 0; e < postavljene.length; e++)
    {


        if(postavljene[e]==0)
        {
            tabela.rows[parseInt(e/9)].cells[e-(parseInt(e/9))*9].style.backgroundColor="cadetblue";
        }
        else if(postavljene[e]==2)
        {
            tabela.rows[parseInt(e/9)].cells[e-(parseInt(e/9))*9].style.backgroundColor="red";
        }
        else
        {
            tabela.rows[parseInt(e/9)].cells[e-(parseInt(e/9)*9)].style.backgroundColor="black";
        }
    }
}

function selekt(element,akcija) {
    refresh();
    var x=element.cellIndex;
    lastselect=element;
    var y=element.parentNode.rowIndex;
    if(velicina!=0)
    {

        if(orijentacija==0)
        {

            if(9-x>=velicina && postavljene.slice(x+(y*9),(y*9)+x+velicina).includes(1)==false)
            {

                for(var i=x;i<x+velicina;i++)
                {
                    if(akcija=="postavi")
                    {
                        postavljene[y*9+i]=1;
                        tabela.rows[y].cells[i].style.backgroundColor = "black";

                    }
                    else {
                        tabela.rows[y].cells[i].style.backgroundColor = "white";
                    }
                }
                if(akcija=="postavi"){
                    velicina=0;
                    izabran.parentNode.removeChild(izabran);
                    document.getElementsByClassName('selected_item')[0].getElementsByTagName("img")[0].src="";
                    document.getElementsByClassName('orijentacija')[0].innerText="Select a ship";
                    if(document.getElementById('flota').getElementsByTagName('img').length==0)
                    {
                        alert("postavljeni svi");
                        document.getElementsByClassName('orijentacija')[0].innerText="";
                        document.getElementById('ready').style.display="block";
                    }
                }

            }
        }
        else
        {
            if(9-y>=velicina )
            {
                for(var e=0;e<velicina;e++)
                {
                    if(postavljene[y*9+x+(e*9)]==1)
                        return;
                }
                for(var j=y;j<y+velicina;j++)
                { if(akcija=="postavi")
                {
                    postavljene[j*9+x]=1;
                    tabela.rows[j].cells[x].style.backgroundColor="black";
                }
                else {
                    tabela.rows[j].cells[x].style.backgroundColor="white";
                }

                }
                if(akcija=="postavi"){velicina=0;
                    izabran.parentNode.removeChild(izabran);
                    document.getElementsByClassName('selected_item')[0].getElementsByTagName("img")[0].src="";
                    document.getElementsByClassName('orijentacija')[0].innerText="Select a ship";
                    if(document.getElementById('flota').getElementsByTagName('img').length==0)
                    {
                        alert("All set!");
                        document.getElementsByClassName('orijentacija')[0].innerText="";
                        document.getElementById('ready').style.display="block";
                    }
                }
            }
        }

    }
}
function findGame()
{
    socket.emit("findGame",postavljene);
    document.getElementById("ready").style.display="none";
}
function attack(element)
{
    if(yourTurn==true) {
        socket.emit("attack", {gameid: gameId, block: element.cellIndex + (element.parentNode.rowIndex * 9)});
        element.style.pointerEvents="none";
    }
    else
    {
        alert("It's not your turn wait for your turn!");
    }
}
socket.on("hit",function(data)
{
    if(data.player==socket.id)
    {
        yourTurn=false;
        if(data.type=="hit")
        {
            tabelaprotivnik.rows[parseInt(data.ship/9)].cells[data.ship-parseInt(data.ship/9)*9].style.backgroundColor="white";
        }
        else
        {
            tabelaprotivnik.rows[parseInt(data.ship/9)].cells[data.ship-parseInt(data.ship/9)*9].style.backgroundColor="red";
        }
    }
    else
    {
        yourTurn=true;
        if(data.type=="hit")
        {
            postavljene[data.ship]=2;
            tabela.rows[parseInt(data.ship/9)].cells[data.ship-parseInt(data.ship/9)*9].style.backgroundColor="red";
            alert("You got hit! Your turn to play!");
        }
        else
        {
            alert("Enemy missed!Your turn to play!");
        }
    }
});
socket.on("endGame",function(data)
{
    if(socket.id==data.winner)
    {
        alert("Nice one you won!")
    }
    else
    {
        alert("Game over you lost all of your ships are sunk")
        yourTurn=false;
    }
});
socket.on("gameFound",function (data)
{
    gameId=data.gameid;
    if(socket.id==data.turn) {
        yourTurn = true;
    alert("Your turn to play");
    }
});
socket.on("enemyDisconnected",function()
{
    location.reload();
});

