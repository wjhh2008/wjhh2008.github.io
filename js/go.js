
function update(nu,value){
    document.getElementById('s'+nu).innerHTML = value+'%';
    document.getElementById('p'+nu).value = value
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
        for (var i=0;i<lines.length-1;i++){
            var items = lines[i].split(",");
            update(i,items[2]);
        }
        document.getElementById('test').innerHTML = lines.length;
        //document.write(xmlhttp.responseText);
    }else{
        document.getElementById('test').innerHTML = xmlhttp.responseText;
    }
    
}