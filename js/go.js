
function update(nu,value,time){
    var txt = null;
    var sp = document.getElementById('s'+nu);
    var ps = document.getElementById('p'+nu);
    
    if (time>=3600000){
        var h = Math.round(time/3600000);
        txt = h>1?h+" hours ago":"an hour ago";
        sp.style.color="red";
    }else if(time>=60000){
        var m = Math.round(time/60000);
        txt = m>1?m+" minutes ago":"a minute ago";
        if (m>15)
            sp.style.color="#FFCC00";
    }else {
        txt = "a few seconds ago"
    }
    
    sp.innerHTML = value+'%'+"    Last update "+txt;
    ps.value = value;
}
function loadXML(){
    var xmlhttp = null;
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    
    //document.getElementById('test').innerHTML = "nice";
    xmlhttp.open("GET", "https://api.xively.com/v2/feeds/628656427.csv?timezone=+8", false);
    xmlhttp.setRequestHeader("X-ApiKey", "Wn6Cs6OuTACpKGlssPnOajl1sgsx0byLhgheUzl1MrI0tRbD");
    xmlhttp.send();
    if (xmlhttp.readyState==4 && xmlhttp.status==200){
        var lines = xmlhttp.responseText.split("\n");
       // document.getElementById('test').innerHTML =null;
       // document.getElementById('test1').innerHTML = ;
        
        for (var i=0;i<lines.length-1;i++){
            var items = lines[i].split(",");
            var passtime =Date.now()-new Date(items[1]).getTime();
            update(i,items[2],passtime);
        }
        //document.write(xmlhttp.responseText);
    }else{
        document.getElementById('test').innerHTML = xmlhttp.responseText;
    }
    delete xmlhttp;
    
}