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
    console.log('capture clicked!');
      takepicture();
    ev.preventDefault();
  }, false);

})();

//////////////////////////////////////////////////////////////////////////////////////////////////////////

// logic for averaging out the color of image taken with the camera
//loop iterates from y = 1 by adding the square root of the block size.
//loop iterates from x = 1 by adding the square root of the block size.

//initializing DOM elements
var pixelateBtn  = document.querySelector('#pixelate');
var canvas       = document.querySelector('#canvas');
var canvas2      = document.querySelector('#canvas2');
var ctx          = canvas.getContext('2d');
var ctx2         = canvas2.getContext('2d');

 //////////////////////////////////////////////////////

 var blockSize   = 9;  //change if we want more pixelation.
 var width       = 336; //hard coding these two numbers!
 var height      = 252; //hard coding these two numbers!
 var r           = 1; //radius around home pixel!
 var imageData;              //found in pixelate()
 var data;                   //found in pixelate()
 var neighborhoodIndexArray; //found in pixelate()
 var rgbAverageArray;        //found in pixelate()
 var indexArray  = [];       //found in getIndexes()
 var j           = 0;        // found in getIndexes() used for counter of indexArray
 var genericCounter = 0;     //our final pixelated image should be a 84 x 112 'pixelated' image.  This means 
                             //we run through the for loops 9,408 times.


//when pixelate is clicked, run this
function pixelate() {

 imageData   = ctx.getImageData(0, 0, canvas.width, canvas.height); //must define imageData and data var
 data        = imageData.data;                                      // within pixelate function to grab data...
  for(var y = 1; y < height; y+=Math.sqrt(blockSize)) {
    for(var x = 1; x < width; x+=Math.sqrt(blockSize)){

          neighborhoodIndexArray = getIndexes(getNeighborhood(x,y,r));
          rgbAverageArray = getAverage(neighborhoodIndexArray, data);

          neighborhoodIndexArray.forEach(function(value) { 
           data[value] = rgbAverageArray[0];
           data[value + 1] = rgbAverageArray[1];
           data[value + 2] = rgbAverageArray[2];  
          });
          neighborhoodIndexArray.splice(0, neighborhoodIndexArray.length);
          rgbAverageArray.splice(0, rgbAverageArray.length);
    } //end for x
  } //end for y
} //end pixelate()


//eventListener for pixelate function/button
//this writes the new image!!
pixelateBtn.addEventListener('click', function() {
  console.log('pixelate clicked!');
pixelate();
ctx2.putImageData(imageData, 0, 0);
});


//functions for stuff!! ! AGGHGHHHHH

//this function finds and reports the coordinates around a central pixel coordinate.
function getNeighborhood(x, y, r) {

  var neighborArray = [];
  neighborArray[0] = x - r;
  neighborArray[1] = y - r;

  neighborArray[2] = x;
  neighborArray[3] = y - r;

  neighborArray[4] = x + r;
  neighborArray[5] = y - r;

  neighborArray[6] = x - r;
  neighborArray[7] = y;

  neighborArray[8] = x; //center
  neighborArray[9] = y; //center

  neighborArray[10] = x + r;
  neighborArray[11] = y;

  neighborArray[12] = x - r;
  neighborArray[13] = y + r;

  neighborArray[14] = x;
  neighborArray[15] = y + r;

  neighborArray[16] = x + r;
  neighborArray[17] = y + r;
  //return array of length 18 mapped to 9 pixel coordinates.
  return neighborArray;

}
function getIndexes(nArray) {  //argument is neighborArray from getNeighbor()
    
      //counter for indexArray index position is j
    for(var z = 0; z < nArray.length; z+=2) {
        indexArray[j] = (nArray[z + 1] * height * 4) + (nArray[z]); //formula converting coordinates to index.  
                                                                  //Takes y coord * height + x coord
                                                                  //calculates for all 4 values!! Remember??
        j++;
    }
     j = 0; //reset indexArray counter (maybe unnecessary?)
     return indexArray;
    //return array of 9 indexes 
}

function getAverage(indexArray, dataArray) {

  var red = 0;
  var green = 0;
  var blue = 0;
  var averagedArray = [];
  var length = indexArray.length;

  for(var i = 0; i < length; i++){
    red += dataArray[indexArray[i]];
    blue += dataArray[indexArray[i] + 1];
    green += dataArray[indexArray[i] + 2];
}

    red   /= length;  //assigning averages to each value.
    blue  /=  length;
    green /= length;

    var k = 0;
    averagedArray[k] = Math.floor(red);
    averagedArray[k + 1] = Math.floor(blue);
    averagedArray[k + 2] = Math.floor(green);
    averagedArray[k + 3] = 255; //alpha

    return averagedArray;
    //returns averaged RGB values for given indexes as an array of length 4.
}



// function getAverage () {

//  var ctx         = canvas.getContext('2d');
//  var ctx2        = canvas2.getContext('2d');
//  var myImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//  var data        = myImageData.data;
//  var width       = myImageData.width;
//  var height      = Math.floor(myImageData.height);

//   var pixelate = function() {

//     var newData = makePixels(height, width, data, ctx2);  
//     myImageData.data = newData;

//          ctx2.putImageData(myImageData, 0, 0);  
//     };

//   var pixelatebtn = document.getElementById('pixelate');
//   pixelatebtn.addEventListener('click', pixelate);

// }

//   var counter = 0;
//   var rComponent = 0;
//   var gComponent = 0;
//   var bComponent = 0;


// var newData;
// function makePixels(h, w, data, ctx) {

//   var dL = canvas2.getContext('2d').getImageData(0,0, w, h).data.length;
//   var blockSize = 9;
//   newData = ctx.createImageData(w,h);
//   var i = 0;
//   console.log(data);
//   for(var posY = 1; posY < h; posY++) { //height or 'posY'
//     for(var posX = 1; posX < w; posX+=4) { //width or 'posX'
//       if(counter < blockSize) {
//         rComponent += data[((posX*(w * 4)) + (posY * 4))];
//         gComponent += data[((posX*(w * 4)) + (posY * 4)) + 1];
//         bComponent += data[((posX*(w * 4)) + (posY * 4)) + 2];
//         counter++;
//       } else if(((posX * posY) * 4) < dL) {
//         counter = 0;
//         newData.data[i] = 0;
//         newData.data[i + 1] = 0;
//         newData.data[i + 2] = 0;
//         newData.data[i + 3] = 255;
//         i =+ 4;    
//         rComponent, gComponent, bComponent = 0;
//       }

      
//     }
//   }
//   console.log("Done");

//   return newData;
// }