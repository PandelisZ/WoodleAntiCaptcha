chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading

	 	if ( $("font:contains('plus')").text() ){
	 		var captcha = $("font:contains('plus')").text();
	 	}
	 	else if ( $("font:contains('and')").text() ){
	 		var captcha = $("font:contains('and')").text();
	 	}
	 	else if ( $("font:contains('+')").text() ){
	 		var captcha = $("font:contains('+')").text();
	 	}
	 	else {
	 		console.log("Error with detecting captcha")
	 	}

	 	var number = captcha.match(/\d*/g);
		number = $.grep(number,function(n){ return(n) });
		var result = parseInt(number[0]) + parseInt(number[1]);
		$("input[name='txtMathAns']").val(result);
	}
	}, 10);
});