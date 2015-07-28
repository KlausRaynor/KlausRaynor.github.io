//////////////////////////////////////////////////////////////////////////////////////////////////////////

// connects built-in camera and reads output to take still picture

(function() {

  var streaming = false,
      video        = document.querySelector('#video'),
      canvas       = document.querySelector('#canvas'),
      startbutton  = document.querySelector('#startbutton'),
      width = 350,
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
    var data = canvas.toDataURL('image/png');
  }

  startbutton.addEventListener('click', function(ev){
      takepicture();
    ev.preventDefault();
  }, false);

})();

//////////////////////////////////////////////////////////////////////////////////////////////////////////

// Loop through the code to get each nth pixel based on x and y coordinates 
  // Iterate from x = 1 by adding the square root of the blockSize
  // Iterate from y = 1 by adding the square root of the blockSize

// stop at a pixel of choice
// call getNeighborhood for the full set of pixels
// call getXY for each pixel
// get average for the set of pixels


var imageData=ctx.getImageData(0 , 0, canvasObj.width, canvasObj.height);

// If the data is a 4 x 4 grid
var x = 1, y = 1;
do {
  do {
      

  } while (x < width);

y++;
} while (y < length);



// Provides the value at the index number of the array, based on the x and y coordinates
function getXY(array, x, y) {

  var i = x * width + y;

return index; // returns index of data array
}

// Provides the x and y coordinates of neigboring cells
function getNeighbourhood(x, y, r) {

// getting the adjacent pixels (by subtracting and adding x and y values by 1)

return xy;
}

// Calculates the average rgb value for a set of pixels
function getAverage(i, data) {

}

// // Retrieve the image pixels:

// Filters = {};
// Filters.getPixels = function(img) {
//   var c = this.getCanvas(img.width, img.height);
//   var ctx = c.getContext('2d');
//   ctx.drawImage(img);
//   return ctx.getImageData(0,0,c.width,c.height);
// };

// Filters.getCanvas = function(w,h) {
//   var c = document.createElement('canvas');
//   c.width = w;
//   c.height = h;
//   return c;
// };

// // A filterImage method that takes a filter and an image and returns the filtered pixels

// Filters.filterImage = function(filter, image, var_args) {
//   var args = [this.getPixels(image)];
//   for (var i=2; i<arguments.length; i++) {
//     args.push(arguments[i]);
//   }
//   return filter.apply(null, args);
// };


// // filter of thresholding the image

// Filters.threshold = function(pixels, threshold) {
//   var d = pixels.data;
//   for (var i=0; i<d.length; i+=4) {
//     var r = d[i];
//     var g = d[i+1];
//     var b = d[i+2];
//     var v = (0.2126*r + 0.7152*g + 0.0722*b >= threshold) ? 255 : 0;
//     d[i] = d[i+1] = d[i+2] = v
//   }
//   return pixels;
};

// // logic for averaging out the color of image taken with the camera

// var canvasObj = document.getElementById('canvas');
// var ctx=canvasObj.getContext("2d");

// function reDraw(canvasObj) {

// var rgb = { r: 0, g: 0, b: 0 }; // Set a base colour as a fallback for non-compliant browsers

// ctx.drawImage(img, 0, 0);

// ctx.putImageData(imgData,0,0);

// }

// // Define a new context for the output

// var canvas2Obj = document.getElementById('canvas2');
// var tmpCtx=canvas2Obj.getContext("2d");

// function createImageData(w,h) {
//   return this.tmpCtx.createImageData(w,h);
// };

// function drawAverage (canvas2Obj) {

// var rgb = { r: 0, g: 0, b: 0 }; // Set a base colour as a fallback for non-compliant browsers

// var imageData=ctx.getImageData(0 , 0, canvasObj.width, canvasObj.height);
// var pixelCluster = 9;
// var count = 0;
// var output = createImageData(canvasObj.width, canvasObj.height);
// var dst = output.data;


// // Go through the destination image pixels

//   for (var y = 0; y < imageData.length; y++) {
//     var sy = y
//     var dstOff = y * 4;
//     // average out colors of every 9 pixels
//     for (var i = 0; i < imgData.data.length; i += 4) {
//           count++;
//           rgb.r += imgData.data[i];
//           rgb.g += imgData.data[i + 1];
//           rgb.b += imgData.data[i + 2];

//         // if count is a multiple of 9, or every 9 pixels
//           if ((count % pixelCluster) == 0) {
//             // floor the average values to give correct rgb values (ie: round number values)
//             rgb.r = Math.floor(rgb.r / pixelCluster);
//             rgb.g = Math.floor(rgb.g / pixelCluster);
//             rgb.b = Math.floor(rgb.b / pixelCluster);        
//           }
          
//       }

//       dst[dstOff] = rgb.r; // r
//       dst[dstOff + 1] = rgb.g; // g
//       dst[dstOff + 2] = rgb.b; // b
//       // imgData.data[i+3] = 255;

//   }

//   tmpCtx.putImageData(imageData,0,0);

// }

// //activates the mean color filter ability 
// filterbutton = document.querySelector('#filterbutton');
// filterbutton.addEventListener('click', function() {
//     window.location.href = '#' + drawAverage(canvas2Obj);
// });
