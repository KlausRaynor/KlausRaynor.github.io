(function() {


	var width = 320;
	var height = 0;

	var streaming = false;

	var video = null;
	var canvas = null;
	var photo = null;
	var start = null;

	function startup() {
		video = document.getElementById('video');
		canvas = document.getElementById('canvas');
		photo = document.getElementById('photo');
		start = document.getElementById('start');

		navigator.getMedia = (navigator.getUserMedia ||
							  navigator.webkitGetUserMedia ||
							  navigator.mozGetUserMedia ||
							  navigator.msGetUserMedia);

		navigator.getMedia({
			video: true,
			audio: false
		},
		function(stream) {
			if(navigator.mozGetUserMedia) {
				video.mozSrcObject = stream;
			} else{
				var vendorURL = window.URL || window.webkitURL;
				video.src = vendorURL.createObjectURL(stream);
			}
			video.play();
		},
		function(err) {
			console.log("an error occured! " + err);
		});
	

		video.addEventListener('canplay', function(ev){
			if(!streaming) {
				height = video.videoHeight / (video.videoWidth/width);

				if(isNaN(height)){
					height = width / (4/3); //fixes firefox bug
				}

				video.setAttribute('width', width);
				video.setAttribute('height', height);
				canvas.setAttribute('width', width);
				canvas.setAttribute('height', height);
				streaming=true;
			}
		}, false);

		start.addEventListener('click', function(ev){
			takepicture();
			ev.preventDefault();
		}, false);

		clearphoto();
	} // end function startup


	function clearphoto() {
		var context = canvas.getContext('2d');
		context.fillStyle = '#AAA';
		context.fillRect(0,0, canvas.width, canvas.height);

		var data = canvas.toDataURL('image/png');
		photo.setAttribute('src', data);
	}

	function takepicture() {
		var context = canvas.getContext('2d');
		
		if(width && height){
			canvas.width = width;
			canvas.height = height;
			context.drawImage(video, 0, 0, width, height);

			var data = canvas.toDataURL('image/png');
			photo.setAttribute('src', data);
		} else {
			clearphoto();
		}

	}

	window.addEventListener('load', startup, false);
})();