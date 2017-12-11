$(document).ready(function(){
	
	//animate scroll to whereever you want on the page 
	function scrollToElement(element,isNav)
	{
		
		var scrollToId = element.attr("href");
		
		console.log(scrollToId);
		console.log($(scrollToId).offset().top);

		var scrollOffset = $(scrollToId).offset().top;

		
		if(isNav){
			scrollOffset -= $(".navbar-header").height()
		}
		console.log(scrollOffset);

		$('html, body').animate({
	        scrollTop: scrollOffset
	    	}, 1000);

		

	}
	



	function isEmail(email) {
  	var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  	return regex.test(email);
	}

	// var getStartedBtn = $("#getStartedBtn");
	// getStartedBtn.click(function(event){

		// // event.preventDefault();

		// var name = $("#nameBox").val();
		// var email = $("#emailBox").val();
		// var message = $("#messageBox").val();
	

		// if (name&&isEmail(email)&&message) 
		// {

			// // $("#nameBox").addAttr('required');
			// // $("#emailBox").addAttr('required');
			// // $("#messageBox").addAttr('required');	


			
			// location.href = 'mailto:' + encodeURIComponent("info@equalpay.co") + '?subject=' + encodeURIComponent("We're Ready for Equal Pay") + '&body=' + encodeURIComponent(message);
			

			// // $("#nameBox").removeAttr('required');
			// // $("#emailBox").removeAttr('required');
			// // $("#messageBox").removeAttr('required');		


			// $("#nameBox").val("");
			// $("#emailBox").val("");
			// $("#messageBox").val("");
			
		// }

	// });
	
	$('#eqpaymailform input').on('invalid',function(){
		kkst_reset();
	});
	
	$('#eqpaymailform').submit(function(event){

		// event.preventDefault();

		var name = $("#nameBox").val();
		var email = $("#emailBox").val();
		var message = $("#messageBox").val();
	

		if (name&&isEmail(email)&&message) 
		{

			// $("#nameBox").attr('required','');
			// $("#emailBox").attr('required','');
			// $("#messageBox").attr('required','');

			// var prevAction = $(this).attr('action');
			// $(this).attr('action', 'mailto:' + "info@equalpay.co" + '?subject=' + "We're Ready for Equal Pay" + '&body=' + message);
			
			//var mailWin = window.open('mailto:' + "info@equalpay.co" + '?subject=' + "We're Ready for Equal Pay" + '&body=' + message);
			//mailWin.close();
			
			// $("#nameBox").removeAttr('required');
			// $("#emailBox").removeAttr('required');
			// $("#messageBox").removeAttr('required');		

			kkst_sendingEmail();
			$.get("https://pzuihg7byg.execute-api.us-east-1.amazonaws.com/rel2?message="+message+"&name="+name+"&email="+email)
			.done(function(data){
				if (data.indexOf("The email was successfully sent") != -1)
					kkst_emailSent();
				else
					kkst_emailFailed();
			})
			.fail(kkst_emailFailed)
			.always(function(){
				// $("#nameBox").val("");
				// $("#emailBox").val("");
				// $("#messageBox").val("");
				
				// $('#eqpaymailform')[0].reset();
				
				$("#nameBox").removeAttr('required');
				$("#emailBox").removeAttr('required');
				$("#messageBox").removeAttr('required');		
				$('#eqpaymailform input[type=reset]').trigger('click');
				// setTimeout(function(){
					$("#nameBox").attr('required','');
					$("#emailBox").attr('required','');
					$("#messageBox").attr('required','');
				// }, 3000);
			});

			
			
			
		}
		
		event.preventDefault();

	});
	
	function kkst_sendingEmail()
	{
		$("#kkspinnercontainer > span").html("Sending Email...");
		$("#kkformsubmitoverlay").css("visibility","visible");
		$("#kkspinnercontainer > img").css("display","inline");
		$("#kkspinnercontainer").css("visibility","visible");
	}
	
	function kkst_reset()
	{
		$("#kkspinnercontainer").css("visibility","hidden");
	}
	
	function kkst_emailSent()
	{
		$("#kkspinnercontainer > span").html("Email Sent!");
		$("#kkformsubmitoverlay").css("visibility","hidden");
		$("#kkspinnercontainer > img").css("display","none");
		$("#kkspinnercontainer").css("visibility","visible");
	}
	
	function kkst_emailFailed()
	{
		$("#kkspinnercontainer > span").html("Failed to send email!");
		$("#kkformsubmitoverlay").css("visibility","hidden");
		$("#kkspinnercontainer > img").css("display","none");
		$("#kkspinnercontainer").css("visibility","visible");
	}

	var enterpriseLogos = $(".enterpriseLogo").click(function(){

		console.log("You clicked " + $(this).attr("id"));
	});

	$(window).scroll(function (event) {
        if($(window).scrollTop() >= 100)
        {
        	$("#titleDiv").addClass("scrolled col-md-4 col-sm-4");
        	$("#mainNavMenu").addClass("scrolled col-md-4 col-sm-5");
        	$(".navbar-right").addClass("scrolled");
        }
        else{
        	$("#titleDiv").removeClass("scrolled col-md-4 col-sm-4");
        	$("#mainNavMenu").removeClass("scrolled col-md-4 col-sm-5");
        	$(".navbar-right").removeClass("scrolled");
        }

    });

	

	var disable_keyevents = false;
	$('textarea,input')
    .focus(function(){ 
    	disable_keyevents = true;
    	$(document).di 
    	})
    .blur(function() { disable_keyevents = true; });


    //animate scroll to navbar links
    $(".navItem").on("click",function(){
    	scrollToElement($(this),true);
    });

    //animate scroll to bottom
    $("#imgBtn>a").on("click",function(){
    	scrollToElement($(this));	
    });

    $("#learnMoreBtnA").on("click",function(){
    	scrollToElement($(this),true);	
    });


    //scroll menu back up when nav item is clicked
    $(function(){ 
     var navMain = $(".navbar-collapse"); // avoid dependency on #id
     // "a:not([data-toggle])" - to avoid issues caused
     // when you have dropdown inside navbar
     navMain.on("click", "a:not([data-toggle])", null, function () {
         navMain.collapse('hide');
     });
	});
   
  	



  //   var spacePressedCount = 0;
  //   $(document).keypress(function(event){
    	
		// event.stopPropagation();
  //   	event.preventDefault();
  //   	if(event.target.nodeName != 'INPUT'){

    	
  //   	if(event.which===32)
  //   	{
  //   		spacePressedCount++;
    		
  //   		switch (spacePressedCount) {
		// 	    case 1:
		// 	        // code
		// 	        window.location.hash = "abtUs";
		// 	        break;
			    
		// 	    case 2:
		// 	        // code
		// 	        window.location.hash = "cert";
		// 	        break;
			    
		// 	    case 3:
		// 	        // code
		// 	        window.location.hash = "exp";
		// 	        break;
			    
		// 	    case 4:
		// 	        // code
		// 	        window.location.hash = "goPlat";
		// 	        break;
			    
		// 	    default:
		// 	        // code
		// 	        window.location.hash = "backToTop";
		// 	        spacePressedCount = 0;
		// 	        break;
		// 	}			

  //   	}

  //   	else{

  //   	}

  //   	}

    	


  //   });

  $(window).trigger('scroll');

});