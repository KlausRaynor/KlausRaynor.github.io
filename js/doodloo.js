//////////////////////////////////////////////////////////////////////////////////////////////////////////

// connects built-in camera and reads output to take still picture

(function() {

  var streaming = false,
      video        = document.querySelector('#video'),
      canvas       = document.querySelector('#canvas'),
      canvas2      = document.querySelector('#canvas2'),
      startbutton  = document.querySelector('#startbutton'),
      width = 336,
      height = 0;

  navigator.getMedia = ( navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia ||
                         navigator.msGetUserMedia);

  navigator.getMedia(
    {
      video: true,
      audio: false
    },
    function(stream) {
      if (navigator.mozGetUserMedia) {
        video.mozSrcObject = stream;
      } else {
        var vendorURL = window.URL || window.webkitURL;
        video.src = vendorURL.createObjectURL(stream);
      }
      video.play();
    },
    function(err) {
      console.log("An error occured! " + err);
    }
  );

  video.addEventListener('canplay', function(ev){
    if (!streaming) {
      height = video.videoHeight / (video.videoWidth/width);
      video.setAttribute('width', width);
      video.setAttribute('height', height);
      canvas.setAttribute('width', width);
      canvas.setAttribute('height', height);
      streaming = true;
    }
  }, false);

  function takepicture() {
    canvas.width = width;
    canvas.height = height;
    canvas.getContext('2d').drawImage(video, 0, 0, width, height);
    canvas2.width = width;
    canvas2.height = height;
  }

  startbutton.addEventListener('click', function(ev){
      takepicture();
      getAverage();
    ev.preventDefault();
  }, false);

})();

//////////////////////////////////////////////////////////////////////////////////////////////////////////

// logic for averaging out the color of image taken with the camera

 var ctx         = canvas.getContext('2d');
 var ctx2        = canvas2.getContext('2d');
 var myImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
 var data        = myImageData.data;
 var width       = myImageData.width;
 var height      = Math.floor(myImageData.height);


function getAverage () {

  var pixelate = function() {

    var data = makePixels(height, width, data);  

         ctx2.putImageData(myImageData, 0, 0);  
    };

  var pixelatebtn = document.getElementById('pixelate');
  pixelatebtn.addEventListener('click', pixelate);

}

  var counter = 0;
  var rComponent = 0;
  var gComponent = 0;
  var bComponent = 0;
  var dL = canvas2.getContext('2d').getImageData(0,0, width, height).data.length;
  var blockSize = 9;


function makePixels(h, w, data) {
  for(var posY = 1; posY < h; posY++) { //height or 'posY'
    for(var posX = 1; posX < w; posX+=4) { //width or 'posX'
      if(counter < blockSize) {
        rComponent += data[((posX*(w * 4)) + (posY * 4))];
        gComponent += data[((posX*(w * 4)) + (posY * 4)) + 1];
        bComponent += data[((posX*(w * 4)) + (posY * 4)) + 2];
        console.log('rComponent = ' + rComponent + ', gComponent = '+ gComponent + ', bComponent = ' + bComponent);  //debug
        posX += 4;
        counter++;
      } else if(((posX * posY) * 4) < dL) {
        counter = 0;
        rComponent = rComponent / blockSize;
        gComponent = gComponent / blockSize;
        bComponent = bComponent / blockSize;
        break;
      }
      rComponent, gComponent, bComponent = 0;
    }
  }

  return data;
}