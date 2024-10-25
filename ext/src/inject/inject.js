chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading

		// Load Tesseract.js library
        var script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/tesseract.js@2.1.4/dist/tesseract.min.js';
        document.head.appendChild(script);

        script.onload = function() {
            // Capture the CAPTCHA image element
            var captchaImage = document.querySelector('img[alt="captcha"]');

            if (captchaImage) {
                // Preprocess the image if necessary (e.g., resize, convert to canvas)
                var canvas = document.createElement('canvas');
                var context = canvas.getContext('2d');
                canvas.width = captchaImage.width;
                canvas.height = captchaImage.height;
                context.drawImage(captchaImage, 0, 0);

                // Use Tesseract.js to perform OCR on the image
                Tesseract.recognize(
                    canvas,
                    'eng',
                    {
                        logger: function(m) {
                            console.log(m);
                        }
                    }
                ).then(function(result) {
                    var captchaText = result.text.trim();

                    // Process the extracted text using ChatGPT Vision
                    // (Assuming you have a function or API call to ChatGPT Vision here)
                    solveCaptchaWithChatGPT(captchaText);
                });
            } else {
                console.log("CAPTCHA image not found");
            }
        };

        function solveCaptchaWithChatGPT(captchaText) {
            // Implement your logic to solve the CAPTCHA using ChatGPT Vision
            // For example, send an API request to ChatGPT Vision with captchaText
            // and handle the response to fill in the CAPTCHA answer
            console.log("Extracted CAPTCHA text:", captchaText);
        }
	}
	}, 10);
});