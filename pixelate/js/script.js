// 		var img = new Image();
// 		img.src = 'https://my.vetmatrixbase.com/clients/12679/images/Gorgeous_puppies.jpg';
// 		img.onload = function() {
// 			draw(this);
// 		}
		

// function draw(img) {
// 	var canvas = document.getElementById('canvas');
// 	var ctx = canvas.getContext('2d');
// 	var imgData = ctx.getImageData(0,0, canvas.width, canvas.height);
// 	var data = imgData.data;
// 	ctx.drawImage(img, 0,0);
// 	img.style.display = 'none';

// 	var pixelate = function() {	
// 		for (var i = 0; i < data.length; i += 9) {
// 				var pixel;
// 			for(var j = 1; j < 10; j++) {
// 				pixel += (data[i] + j);
// 			}
// 			data[i],
// 			data[i + 1], 
// 			data[i + 2], 
// 			data[i + 3], 
// 			data[i + 4], 
// 			data[i + 5], 
// 			data[i + 6], 
// 			data[i + 7], 
// 			data[i + 8], 
// 			data[i + 9] = pixel;

// 			console.log(pixel);
// 			pixel = 0;
// 		}
// 		ctx.putImageData(imgData, 0, 0);
// 		start.addEventListener('click', pixelate);
// 	}
// }



function everyNine() {
	var avg = 0;
	for(i = 0; i < 91; i++) {
		if((i + 9) % 9 != 0) {
			avg +=i;
			console.log('average during loop = ' + avg);
		} else {
			avg = (avg + 9);
			console.log('with 9 = ' + avg);
			avg = avg / 9;
			console.log('actual average = ' + avg);
			avg = 0;
		}
	}
}

everyNine();




width / 3
height /3 

take these numbers and make them the conditional for the for loops

take red, blue, green components in data and create a 3x3 grid taht is the same color.

do this by doing 
row 1, col 1, 2, 3
row 2, col 1, 2, 3
row 3, col 1, 2, 3

