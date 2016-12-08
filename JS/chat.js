jQuery(document).ready(function($){
    
    
   /* if (document.cookie.indexOf('loggedin') > -1 ) {
  alert("cookie exists");
//setup page for user
}*/


$('#send').on('submit',function(event){
     event.preventDefault();
    var msg = $("#mesg").val();
      
    $('<div/>', {
    'class': 'bubble me',
    text: msg
}).appendTo('.chat');

      $('#mesg').val('');
      console.log(msg);
      //send to server
      
});





        });

