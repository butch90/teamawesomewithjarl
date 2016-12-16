$(function() {
  	console.log( "ready!" );
	var lastColor = "ff0000";
	var lastIntens = 100;


	function sendData(arg){
		$.get('/color/' + arg);
		return;
	}

			
 	$('#custom').change(changeCol);
  	var power;
  	$('#custom').change(changeCol);

	function changeCol(){
		
		var color = $('#custom').val();
		lastColor = color;
		color = color.substring(1);
		sendData(color);
		console.log(color, "color-change");
  	
	}

	$( "#bar" ).change(intensity); 
	function intensity() {
  		var newValue = $(this).val();
  		lastIntens = newValue;
	  	if(!$('#custom').val()){
	  		color = lastColor;
	  		sendData(newValue);  
	  		return;
	  	}
  	var color = $('#custom').val();
  	console.log(newValue, "newValue");
  	console.log(color);
  	sendData(newValue);
	
	}


	
	$("#custom").spectrum({
		preferredFormat: "hex",
	  color: "#f00"
	});   

 
	$("#on").click(function() {
		console.log("on");
		power = true;
		$.get('/power/on');
		
	});
	$("#off").click(function() {
		// $("#off").addClass('checked');
		console.log("off");
		$.get('/power/off');		
	});
	

});