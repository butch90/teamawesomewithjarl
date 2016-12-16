$(function() {
  	console.log( "ready!" );
	var lastColor = "ff0000";
	var lastIntens = 100;

  	var power;
  	$('#custom').change(changeCol);

	function sendData(arg){
		$.get('/power/intensity/' + arg);
		return;
	}

	function changeCol(){
		
		var color = $('#custom').val();
		lastColor = color;
		color = color.substring(1);
		$.get('/color/' + color);
		//console.log(color, "color-change");
		$(".screen.rainbow").css("background", lastColor);
  	
	}
	
	$( "#bar" ).change(intensity); 
	function intensity() {
  		var newValue = $(this).val();
  		lastIntens = newValue;
	  	if(!$('#custom').val()){
	  		color = lastColor;
	  		sendData(newValue);  
		  	console.log(lastIntens/100);
		  	$(".screen").css("opacity", lastIntens/100);
	  		return;
	  	}
  	var color = $('#custom').val();
  	console.log(newValue, "newValue");
  	console.log(color);
  	sendData(newValue);
	}

	setInterval(function(){
		$.get("/lastcolor", (data) => {
			$(".screen").css("background", "#"+data.color);
			//console.log(data.color);
		});
		
	}, 100);

	$("#custom").spectrum({
		preferredFormat: "hex",
	  color: "#f00"
	});

	$("#rainbow").click(function() {
		$.get('/rainbow');
		
	});

	$("#random").click(function() {
		$.get('/random');
		
	});   
 
	$("#on").click(function() {
		console.log("on");
		$.get('/power/on');
		
	});
	$("#off").click(function() {
		// $("#off").addClass('checked');
		console.log("off");
		power = false;
		$.get('/power/off');		
	});

});
