chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading

		if (isCaptchaPresent()) {
		 	var number = captcha.match(/\d*/g);
			number = $.grep(number,function(n){ return(n) });
			var result = parseInt(number[0]) + parseInt(number[1]);
			$("input[name='txtMathAns']").val(result);
	 	}
	}
	}, 10);
});

	function isCaptchaPresent() {
		if ($("font:contains('plus')").text() || $("font:contains('and')").text() || $("font:contains('+')").text() || $("font:contains('difference')").text() || $("font:contains('subtract')").text() || $("font:contains('-')").text()) {
			return true;
		} else {
			return false;
		}
	}