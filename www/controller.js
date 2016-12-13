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
});