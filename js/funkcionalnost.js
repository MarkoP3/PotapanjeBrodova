var x;
var y;
var x1;
var y1;
var rot=180;
var potezi="";
var pl;
var player="beli";
var kliknutonafiguru=false;
function pozicija(re,te) {
    var elemenat=document.getElementById('tabla').rows[re].cells[te];
if(kliknutonafiguru==false ) {
    y = parseInt(te);
    x = parseInt(re);
    x1 = x;
    y1 = y;
     if (document.getElementById('tabla').rows[x].cells[y].innerHTML != "" && player==document.getElementById('tabla').rows[x].cells[y].getElementsByTagName('img')[0].src.split('/')[document.getElementById('tabla').rows[x].cells[y].getElementsByTagName('img')[0].src.split('/').length-1].split('_')[0]  ){
        mogucipotezi(document.getElementById('tabla').rows[x].cells[y].getElementsByTagName('img')[0].src);
        kliknutonafiguru = true;
        document.getElementById('tabla').rows[x].cells[y].style.opacity="0.6";
    }
    else{
document.getElementById('igra').innerHTML="Trenutno igra :"+player;
    }
}
   else {

    y1 = elemenat.cellIndex;
    x1 = elemenat.parentNode.rowIndex;
        if (potezi.includes(x1 + "-" + y1)) {
            var inhtml = document.getElementById('tabla').rows[x].cells[y].innerHTML;
            document.getElementById('tabla').rows[x].cells[y].innerHTML = "";
            document.getElementById('tabla').rows[x1].cells[y1].innerHTML = inhtml;
            document.getElementById('tabla').rows[x].cells[y].style.opacity = "1";

            kliknutonafiguru = false;
            if(player=="beli")
            {
                player="crni";
            }
            else
            {
                player="beli";
            }

          //  setTimeout(rotiraj, 500);
        }
  else if(document.getElementById('tabla').rows[x].cells[y].getElementsByTagName('img')[0].src.split('/')[document.getElementById('tabla').rows[x].cells[y].getElementsByTagName('img')[0].src.split('/').length-1].split('_')[0]==document.getElementById('tabla').rows[x1].cells[y1].getElementsByTagName('img')[0].src.split('/')[document.getElementById('tabla').rows[x1].cells[y1].getElementsByTagName('img')[0].src.split('/').length-1].split('_')[0])
    {
        kliknutonafiguru = false;
        document.getElementById('tabla').rows[x].cells[y].style.opacity = "1";
    pozicija(document.getElementById('tabla').rows[x1].cells[y1]);
    }






}

   }
function rotiraj()
{
    for(var i=0;i<8;i++)
    {
        for(var j=0;j<8;j++)
        {
            if( document.getElementById('tabla').rows[i].cells[j].getElementsByTagName('img')[0]!=undefined) {
                document.getElementById('tabla').rows[i].cells[j].getElementsByTagName('img')[0].style.transform = "rotate("+rot+"deg)";
            }
        }
    }

    document.getElementById('tabla').style.transform="rotate("+rot+"deg)";

    rot+=180;

}

function mogucipotezi(r)
{
    potezi="";
    if(r.includes("pijun"))
    {
if(r.includes("crni")) {
    if(x+1<8  && document.getElementById('tabla').rows[x+1].cells[y].innerHTML==""  )
    {potezi += (x + 1) + "-" + y + ",";}
    if( y+1<8 && document.getElementById('tabla').rows[x+1].cells[y+1].innerHTML.includes("beli") )
    {
    potezi += (x + 1) + "-" + (y + 1) + ",";}
    if( y-1>=0 && document.getElementById('tabla').rows[x+1].cells[y-1].innerHTML.includes("beli") ){
    potezi += (x + 1) + "-" + (y - 1) + ",";}
}
        else
{
    if(x-1>=0 && document.getElementById('tabla').rows[x-1].cells[y].innerHTML=="")
    {potezi += (x -1) + "-" + y + ",";}
    if(y+1<8 && document.getElementById('tabla').rows[x-1].cells[y+1].innerHTML.includes("crni"))
    {potezi += (x - 1) + "-" + (y + 1) + ",";}
    if(y-1>=0 && document.getElementById('tabla').rows[x-1].cells[y-1].innerHTML.includes("crni")){  potezi += (x - 1) + "-" + (y - 1) + ",";}
}


    }

    function potezitop(){
        var top=true;
        var bottom=true;
        var left=true;
        var right=true;
        for(var j=1;j<8;j++)
        {

            if(x+j<8 && top==true)
            {
                if(document.getElementById('tabla').rows[x+j].cells[y].innerHTML=="")
                {
                    potezi += (x + j) + "-" + y + ",";
                }
                else
                {
                    if(document.getElementById('tabla').rows[x+j].cells[y].getElementsByTagName('img')[0].src.split('/')[document.getElementById('tabla').rows[x+j].cells[y].getElementsByTagName('img')[0].src.split('/').length-1].split('_')[0]== r.split('/')[r.split('/').length-1].split('_')[0])
                    {
                        top=false;
                    }
                    else
                    {
                        potezi += (x + j) + "-" + y + ",";
                        top=false;
                    }
                }
            }

            if(x-j>=0 && bottom==true)
            {
                if(document.getElementById('tabla').rows[x-j].cells[y].innerHTML=="")
                {
                    potezi += (x - j) + "-" + y + ",";
                }
                else
                {
                    if(document.getElementById('tabla').rows[x-j].cells[y].getElementsByTagName('img')[0].src.split('/')[document.getElementById('tabla').rows[x-j].cells[y].getElementsByTagName('img')[0].src.split('/').length-1].split('_')[0]== r.split('/')[r.split('/').length-1].split('_')[0])
                    {
                        bottom=false;
                    }
                    else
                    {
                        potezi += (x - j) + "-" + y + ",";
                        bottom=false;
                    }
                }
            }


            if(y+j<8 && right==true)
            {
                if(document.getElementById('tabla').rows[x].cells[y+j].innerHTML=="")
                {
                    potezi += x + "-" + (y+j) + ",";
                }
                else
                {
                    if(document.getElementById('tabla').rows[x].cells[y+j].getElementsByTagName('img')[0].src.split('/')[document.getElementById('tabla').rows[x].cells[y+j].getElementsByTagName('img')[0].src.split('/').length-1].split('_')[0]== r.split('/')[r.split('/').length-1].split('_')[0])
                    {
                        right=false;
                    }
                    else
                    {
                        potezi += x  + "-" + (y+j) + ",";
                        right=false;
                    }
                }
            }

            if(y-j>=0 && left==true)
            {
                if(document.getElementById('tabla').rows[x].cells[y-j].innerHTML=="")
                {
                    potezi += x + "-" + (y-j) + ",";
                }
                else
                {
                    if(document.getElementById('tabla').rows[x].cells[y-j].getElementsByTagName('img')[0].src.split('/')[document.getElementById('tabla').rows[x].cells[y-j].getElementsByTagName('img')[0].src.split('/').length-1].split('_')[0]== r.split('/')[r.split('/').length-1].split('_')[0])
                    {
                        left=false;
                    }
                    else
                    {
                        potezi += x  + "-" + (y-j) + ",";
                        left=false;
                    }
                }
            }


        }

    }

    if(r.includes("top"))
    {
potezitop();

    }

    if(r.includes('konj'))
    {
        if(x+2<8)
        {
            if(y+1<8 && (document.getElementById('tabla').rows[x+2].cells[y+1].innerHTML=="" || document.getElementById('tabla').rows[x+2].cells[y+1].getElementsByTagName('img')[0].src.split('/')[document.getElementById('tabla').rows[x+2].cells[y+1].getElementsByTagName('img')[0].src.split('/').length-1].split('_')[0]!= r.split('/')[r.split('/').length-1].split('_')[0] ))
            {
                potezi += (x+2)  + "-" + (y+1) + ",";
            }
            if(y-1>=0 && (document.getElementById('tabla').rows[x+2].cells[y-1].innerHTML=="" || document.getElementById('tabla').rows[x+2].cells[y-1].getElementsByTagName('img')[0].src.split('/')[document.getElementById('tabla').rows[x+2].cells[y-1].getElementsByTagName('img')[0].src.split('/').length-1].split('_')[0]!= r.split('/')[r.split('/').length-1].split('_')[0]))
            {
                potezi += (x+2)  + "-" + (y-1) + ",";
            }
        }
        if(x-2>=0)
        {
            if(y+1<8 && (document.getElementById('tabla').rows[x-2].cells[y+1].innerHTML=="" || document.getElementById('tabla').rows[x-2].cells[y+1].getElementsByTagName('img')[0].src.split('/')[document.getElementById('tabla').rows[x-2].cells[y+1].getElementsByTagName('img')[0].src.split('/').length-1].split('_')[0]!= r.split('/')[r.split('/').length-1].split('_')[0]))
            {
                potezi += (x-2)  + "-" + (y+1) + ",";
            }
            if(y-1>=0 && (document.getElementById('tabla').rows[x-2].cells[y-1].innerHTML=="" || document.getElementById('tabla').rows[x-2].cells[y-1].getElementsByTagName('img')[0].src.split('/')[document.getElementById('tabla').rows[x-2].cells[y-1].getElementsByTagName('img')[0].src.split('/').length-1].split('_')[0]!= r.split('/')[r.split('/').length-1].split('_')[0]))
            {
                potezi += (x-2)  + "-" + (y-1) + ",";
            }
        }
        if(y+2<8)
        {
            if(x+1<8 && (document.getElementById('tabla').rows[x+1].cells[y+2].innerHTML=="" || document.getElementById('tabla').rows[x+1].cells[y+2].getElementsByTagName('img')[0].src.split('/')[document.getElementById('tabla').rows[x+1].cells[y+2].getElementsByTagName('img')[0].src.split('/').length-1].split('_')[0]!= r.split('/')[r.split('/').length-1].split('_')[0]))
            {
                potezi += (x+1)  + "-" + (y+2) + ",";
            }
            if(x-1>=0 && (document.getElementById('tabla').rows[x-1].cells[y+2].innerHTML=="" || document.getElementById('tabla').rows[x-1].cells[y+2].getElementsByTagName('img')[0].src.split('/')[document.getElementById('tabla').rows[x-1].cells[y+2].getElementsByTagName('img')[0].src.split('/').length-1].split('_')[0]!= r.split('/')[r.split('/').length-1].split('_')[0]))
            {
                potezi += (x-1)  + "-" + (y+2) + ",";

            }
        }
        if(y-2>=0)
        {
            if(x+1<8 && (document.getElementById('tabla').rows[x+1].cells[y-2].innerHTML=="" || document.getElementById('tabla').rows[x+1].cells[y-2].getElementsByTagName('img')[0].src.split('/')[document.getElementById('tabla').rows[x+1].cells[y-2].getElementsByTagName('img')[0].src.split('/').length-1].split('_')[0]!= r.split('/')[r.split('/').length-1].split('_')[0]))
            {
                potezi += (x+1)  + "-" + (y-2) + ",";
            }
            if(x-1>=0 && (document.getElementById('tabla').rows[x-1].cells[y-2].innerHTML=="" || document.getElementById('tabla').rows[x-1].cells[y-2].getElementsByTagName('img')[0].src.split('/')[document.getElementById('tabla').rows[x-1].cells[y-2].getElementsByTagName('img')[0].src.split('/').length-1].split('_')[0]!= r.split('/')[r.split('/').length-1].split('_')[0]))
            {
                potezi += (x-1)  + "-" + (y-2) + ",";
            }
        }

    }
    function potezilovac()
    {
        var top=true;
        var bottom=true;
        var left=true;
        var right=true;
        for(var j=1;j<8;j++)
        {

            if(x+j<8 && y+j<8 && top==true)
            {
                if(document.getElementById('tabla').rows[x+j].cells[y+j].innerHTML=="")
                {
                    potezi += (x + j) + "-" + (y+j) + ",";
                }
                else
                {
                    if(document.getElementById('tabla').rows[x+j].cells[y+j].getElementsByTagName('img')[0].src.split('/')[document.getElementById('tabla').rows[x].cells[y].getElementsByTagName('img')[0].src.split('/').length-1].split('_')[0]== r.split('/')[document.getElementById('tabla').rows[x].cells[y].getElementsByTagName('img')[0].src.split('/').length-1].split('_')[0])
                    {
                        top=false;
                    }
                    else
                    {
                        potezi += (x + j) + "-" + (y+j) + ",";
                        top=false;
                    }
                }
            }

            if(x+j<8 && y-j>=0 && bottom==true)
            {
                if(document.getElementById('tabla').rows[x+j].cells[y-j].innerHTML=="")
                {
                    potezi += (x + j) + "-" +(y-j) + ",";
                }
                else
                {
                    if(document.getElementById('tabla').rows[x+j].cells[y-j].getElementsByTagName('img')[0].src.split('/')[document.getElementById('tabla').rows[x].cells[y].getElementsByTagName('img')[0].src.split('/').length-1].split('_')[0]== r.split('/')[document.getElementById('tabla').rows[x].cells[y].getElementsByTagName('img')[0].src.split('/').length-1].split('_')[0])
                    {
                        bottom=false;
                    }
                    else
                    {
                        potezi += (x + j) + "-" + (y-j) + ",";
                        bottom=false;
                    }
                }
            }


            if(y+j<8 && x-j>=0 && right==true)
            {
                if(document.getElementById('tabla').rows[x-j].cells[y+j].innerHTML=="")
                {
                    potezi += (x-j) + "-" + (y+j) + ",";
                }
                else
                {
                    if(document.getElementById('tabla').rows[x-j].cells[y+j].getElementsByTagName('img')[0].src.split('/')[document.getElementById('tabla').rows[x].cells[y].getElementsByTagName('img')[0].src.split('/').length-1].split('_')[0]== r.split('/')[document.getElementById('tabla').rows[x].cells[y].getElementsByTagName('img')[0].src.split('/').length-1].split('_')[0])
                    {
                        right=false;
                    }
                    else
                    {
                        potezi += (x-j)  + "-" + (y+j) + ",";
                        right=false;
                    }
                }
            }

            if(y-j>=0 && x-j>=0 && left==true)
            {
                if(document.getElementById('tabla').rows[x-j].cells[y-j].innerHTML=="")
                {
                    potezi += (x-j) + "-" + (y-j) + ",";
                }
                else
                {
                    if(document.getElementById('tabla').rows[x-j].cells[y-j].getElementsByTagName('img')[0].src.split('/')[document.getElementById('tabla').rows[x].cells[y].getElementsByTagName('img')[0].src.split('/').length-1].split('_')[0]== r.split('/')[document.getElementById('tabla').rows[x].cells[y].getElementsByTagName('img')[0].src.split('/').length-1].split('_')[0])
                    {
                        left=false;
                    }
                    else
                    {
                        potezi += (x-j)  + "-" + (y-j) + ",";
                        left=false;
                    }
                }
            }


        }
    }
    if(r.includes('lovac'))
    {
potezilovac();
    }
    if(r.includes('kraljica'))
    {
        potezitop();
        potezilovac();
    }


}


