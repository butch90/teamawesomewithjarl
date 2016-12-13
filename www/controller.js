$(function() {
  console.log( "ready!" );

  var power;
  $('#custom').change(changeCol);

	function changeCol(){
	 //  var color = $('#custom').val();
		// color = color.substring(1);
		// console.log(color);
		// $.get('/color/' + color);
		$( "#bar" ).change(function() {
  	
  	var color = $('#custom').val();
		color = color.substring(1);
  	var newValue = $(this).val();
  	console.log(newValue);
  	console.log(color);
  	$.get('/color/' + color + '/' + newValue );
	});
	}

	// $("#custom").spectrum({
	// 	preferredFormat: "hex",
	//   color: "#f00"
	// });   
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
	$("#shutDown").click(function(){
		var color = "000000";
		console.log(color)
		$.get('/color/' + color);
	});




});