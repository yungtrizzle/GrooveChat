var conn;
jQuery(document).ready(function($){
    
    
   if (document.cookie.indexOf('Groovedin') > -1 ) {
//setup page for user
    
    var tik = readCookie('Ticket');
    var use = readCookie('Groovedin');
    
    conn = new WebSocket("ws://localhost:8080/api/ws?ticket="+tik);
    
     //$('.right .top .name').text('Desc:');
       
      $('#inout').text(use);
     $('.wrapper').show();
   

conn.onmessage=function(event){
    
    var msg = event.data.split('\n');
    
      for (var i = 0; i < msg.length; i++) {
          
    $('<div/>', {
    'class': 'bubble you',
    text: msg[i]
    }).appendTo('.chat');
   
      }
};


conn.onclose=function(event){
 
 var tik = readCookie('Ticket');
 conn = new WebSocket("ws://localhost:8080/api/ws?ticket="+tik);
 
}; 

$('#send').on('submit',function(event){
     event.preventDefault();
    var msg = $("#mesg").val();
      
    $('<div/>', {
    'class': 'bubble me',
    text: msg
    }).appendTo('.chat');

    conn.send(msg);

    $('#mesg').val('');
    //scrolling mechanism here
    $container = $('.chat');
    $container[0].scrollTop = $container[0].scrollHeight;  
    
      
});

  }
        });



function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}


function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}

