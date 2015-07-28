function reSize(initialWidth, initialHeight) {

// resizing image

    $each($$('.controls LI A'), function(el, i){
        el.addEvent('click', function(e){
            e = new Event(e).stop();

            var newW = initialWidth, newH = 0;
            switch(el.rel){
                case 'zoomOut':
                    newW -= 20; 
                    break;
                case 'zoomIn':
                    newW += 20;
                    break;
                case 'resizeProportionally':
                    var newSize = scaleSize(200, 200, $(el.rev).width, $(el.rev).height);
                    $(el.rev).width = newSize[0];
                    $(el.rev).height = newSize[1];
                    return;
                default:
                    newW = initialWidth;                   
            }

            var ratio = initialHeight / initialWidth;
            newH = newW * ratio;

            img.width = newW;
            img.height = newH;
        });
    });
}

// var newSize = scaleSize(200, 200, myImg.width, myImg.length);
// alert('New Width: ' + newSize[0] + ', New Height: ' + newSize[1]);


// calculates the new size of the image

function scaleSize(maxW, maxH, currW, currH){

var ratio = currH / currW;

    if(currW >= maxW && ratio <= 1) {
        currW = maxW;
        currH = currW * ratio;
        } else if (currH >= maxH){
    currH = maxH;
    currW = currH / ratio;
    }
// console.log (currW, currH);
return [currW, currH];
}
