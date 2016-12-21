var conn;
jQuery(document).ready(function($){
    
    
   if (document.cookie.indexOf('Groovedin') > -1 ) {
//setup page for user
     $('.wrapper').show();
    
    var tik = readCookie('Ticket');
    
    conn = new WebSocket("ws://localhost:8080/api/ws?ticket="+tik);

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
    
    $('<div/>', {
    'class': 'conversation-start',
    'html': $('<span>', {
        text:'Connection Closed'
    }),
    
    }).appendTo('.chat');
   
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
      console.log(msg);
      //send to server
      
});

  }
        });

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

