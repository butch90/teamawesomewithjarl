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
		$(".screen").css("background", lastColor);

		$(".rainbow").css("color", lastColor);
  	
	}
	
	$( "#bar" ).change(intensity); 
	function intensity() {
  		var newValue = $(this).val();
  		lastIntens = newValue;
	  	if(!$('#custom').val()){
	  		color = lastColor;
	  		sendData(newValue);  
		  	$(".screen").css("opacity", lastIntens/100);
	  		return;
	  	}
  	var color = $('#custom').val();
  	sendData(newValue);
  	$(".screen").css("opacity", lastIntens/100);
	}


	setInterval(function(){
		$.get("/lastcolor", (data) => {
			$(".screen").css("background", "#"+data.color);
			$(".rainbow").css("color", "#"+data.color);
			//console.log(data.color);
		});
		
	}, 100);


	$("#test-slider").slider({});


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
		$.get('/power/on');
		
	});
	$("#off").click(function() {
		// $("#off").addClass('checked');
		power = false;
		$.get('/power/off');
		/*$(".screen").css("background", lastColor);*/	
	});

	$("#blink").change(function() {
		$.get('/power/on/' + $(this).val());		
	});
});
