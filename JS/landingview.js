jQuery(document).ready(function($){
	var formModal = $('.cd-user-modal'),
		formLogin = formModal.find('#cd-login'),
		formSignup = formModal.find('#cd-signup'),
		formForgotPassword = formModal.find('#cd-reset-password'),
		formModalTab = $('.cd-switcher'),
		tabLogin = formModalTab.children('li').eq(0).children('a'),
		tabSignup = formModalTab.children('li').eq(1).children('a'),
		forgotPasswordLink = formLogin.find('.cd-form-bottom-message a'),
		backToLoginLink = formForgotPassword.find('.cd-form-bottom-message a'),
		mainNav = $('.navbar');

	//open modal
	mainNav.on('click', function(event){
		$(event.target).is(mainNav) && mainNav.children('a').toggleClass('is-visible');
	});

	//open sign-up form
	mainNav.on('click', '.cd-signup', signup_selected);
	//open login-form form
	mainNav.on('click', '.cd-signin', login_selected); 
        
        $('#startbtn').click(function(){
        login_selected();
            
        });
       
       $( ".relod" ).click(function() {
    location.reload(true);
    });
       
        $( ".cd-signin" ).click(function() {
    login_selected();
    });


	//close modal
	formModal.on('click', function(event){
		if( $(event.target).is(formModal) || $(event.target).is('.cd-close-form') ) {
			formModal.removeClass('is-visible');
		}	
	});
	//close modal when clicking the esc keyboard button
	$(document).keyup(function(event){
    	if(event.which=='27'){
    		formModal.removeClass('is-visible');
	    }
    });

	//switch from a tab to another
	formModalTab.on('click', function(event) {
		event.preventDefault();
		( $(event.target).is( tabLogin ) ) ? login_selected() : signup_selected();
	});

	//hide or show password
	$('.hide-password').on('click', function(){
		var togglePass= $(this),
			passwordField = togglePass.prev('input');
		
		( 'password' == passwordField.attr('type') ) ? passwordField.attr('type', 'text') : passwordField.attr('type', 'password');
		( 'Hide' == togglePass.text() ) ? togglePass.text('Show') : togglePass.text('Hide');
		//focus and move cursor to the end of input field
		passwordField.putCursorAtEnd();
	});

	//show forgot-password form 
	forgotPasswordLink.on('click', function(event){
		event.preventDefault();
		forgot_password_selected();
	});

	//back to login from the forgot-password form
	backToLoginLink.on('click', function(event){
		event.preventDefault();
		login_selected();
	});

	function login_selected(){
		mainNav.children('ul').removeClass('is-visible');
		formModal.addClass('is-visible');
		formLogin.addClass('is-selected');
		formSignup.removeClass('is-selected');
		formForgotPassword.removeClass('is-selected');
		tabLogin.addClass('selected');
		tabSignup.removeClass('selected');
	}

	function signup_selected(){
		mainNav.children('ul').removeClass('is-visible');
		formModal.addClass('is-visible');
		formLogin.removeClass('is-selected');
		formSignup.addClass('is-selected');
		formForgotPassword.removeClass('is-selected');
		tabLogin.removeClass('selected');
		tabSignup.addClass('selected');
	}

	function forgot_password_selected(){
		formLogin.removeClass('is-selected');
		formSignup.removeClass('is-selected');
		formForgotPassword.addClass('is-selected');
	}

	//login/register form handling
	formLogin.find('input[type="submit"]').on('click', function(event){
            
            
            var user = $('#signin-email').val();
            var passwd = $('#signin-password').val();
            
            if(user==''||passwd==''){
		event.preventDefault();
                formLogin.find('input[type="text"]').toggleClass('has-error').next('span').toggleClass('is-visible');
            
            }else{
                
                var data = {username:user, key:passwd};
                
                var ath = JSON.stringify(data);
               
                
                $.ajax({
                    
                    url:"/api/login",
                    
                    data: ath,
                    
                    type:"POST",
                    
                    dataType:"json",
                })
                
                 .done(function(json){
                     createCookie("Groovedin",json.user,60);//create a cookie
                     createCookie("GrooveID", json.id, 60);
                     createCookie("Ticket", String(json.ticket), 0.1);
                      $('.wrapper').show();
                    
                })
                
                .fail(function(json){
                  event.preventDefault();
                formLogin.find('input[type="text"]').toggleClass('has-error').next('span').toggleClass('is-visible');
                });
                
            }
            
	});
    
        
	formSignup.find('input[type="submit"]').on('click', function(event){
            
            var user = $('#signup-username').val();
            var mail = $('#signup-email').val();
            var passwd = $('#signup-password').val();
            
            if(user==''||passwd==''||mail==''){
		event.preventDefault();
                formSignup.find('input[type="email"]').toggleClass('has-error').next('span').toggleClass('is-visible');
                formLogin.find('input[type="text"]').toggleClass('has-error').next('span').toggleClass('is-visible');
            
            }else{
            
                  var data = {email:mail, username:user, key:passwd};
                
                  var ath = JSON.stringify(data);
                   
                
                $.ajax({
                    
                    url:"/api/register",
                    
                    data: ath,
                    
                    type:"POST",
                    
                    dataType:"json",
                })
                
                 .done(function(json){
                    //done work
                })
            
               .fail(function(json){
		event.preventDefault();
		formSignup.find('input[type="email"]').toggleClass('has-error').next('span').toggleClass('is-visible');
                formLogin.find('input[type="text"]').toggleClass('has-error').next('span').toggleClass('is-visible');
                                                   
               });
            }
        
	});

        
        
        
	//IE9 placeholder fallback
	//credits http://www.hagenburger.net/BLOG/HTML5-Input-Placeholder-Fix-With-jQuery.html
	if(!Modernizr.input.placeholder){
		$('[placeholder]').focus(function() {
			var input = $(this);
			if (input.val() == input.attr('placeholder')) {
				input.val('');
		  	}
		}).blur(function() {
		 	var input = $(this);
		  	if (input.val() == '' || input.val() == input.attr('placeholder')) {
				input.val(input.attr('placeholder'));
		  	}
		}).blur();
		$('[placeholder]').parents('form').submit(function() {
		  	$(this).find('[placeholder]').each(function() {
				var input = $(this);
				if (input.val() == input.attr('placeholder')) {
			 		input.val('');
				}
		  	})
		});
	}

});


//credits http://css-tricks.com/snippets/jquery/move-cursor-to-end-of-textarea-or-input/
jQuery.fn.putCursorAtEnd = function() {
	return this.each(function() {
    	// If this function exists...
    	if (this.setSelectionRange) {
      		// ... then use it (Doesn't work in IE)
      		// Double the length because Opera is inconsistent about whether a carriage return is one character or two. Sigh.
      		var len = $(this).val().length * 2;
      		this.focus();
      		this.setSelectionRange(len, len);
    	} else {
    		// ... otherwise replace the contents with itself
    		// (Doesn't work in Google Chrome)
      		$(this).val($(this).val());
    	}
	});
};

function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

