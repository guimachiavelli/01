(function() {
	'use strict';

	var getJSON = function (jsonUrl) {
		var request, data;

		request = new XMLHttpRequest();
		request.open('GET', jsonUrl, true);

		request.onload = function() {
		  if (request.status >= 200 && request.status < 400){
			data = JSON.parse(request.responseText);
		  } else {
			// We reached our target server, but it returned an error
		  }
		};

		request.onerror = function() {
		  // There was a connection error of some sort
		};

		request.send();

		return data;
	};

	module.exports = getJSON;

})();
