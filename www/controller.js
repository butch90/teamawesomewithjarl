$(function() {
  console.log( "ready!" );
	var lastColor = "ff0000";
	var lastIntens = 100;

<<<<<<< HEAD

		function sendData(arg){
			$.get('/color/' + arg);
			return;
		}

			
 	 $('#custom').change(changeCol);
=======
  var power;
  $('#custom').change(changeCol);
>>>>>>> a8409e7ab4facf53dfd9e97685b86419dc18304b

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
		
	});
	$("#off").click(function() {
		// $("#off").addClass('checked');
		console.log("off");
		power = false;
		}
		
	});
	

});