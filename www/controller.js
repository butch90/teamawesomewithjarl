$(function() {
  console.log( "ready!" );

  $('#custom').change(changeCol);

	function changeCol(){
	  var color = $('#custom').val();
		color = color.substring(1);
		console.log(color);
		$.get('/color/' + color);
	}

	$("#custom").spectrum({
		preferredFormat: "hex",
	  color: "#f00"
	});   

	$("#shutDown").click(function(){
		var color = "000000";
		console.log(color)
		$.get('/color/' + color);
	})
});