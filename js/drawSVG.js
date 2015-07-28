function drawSVG(poly, height, width) {
    
    var canvas=document.getElementById("viewport")
    var vctx = canvas.getContext('2d');

    canvas.width = width;
    canvas.height = height;

    vctx.strokeStyle = 'red';
    vctx.lineWidth = 5;

    vctx.beginPath();
    vctx.moveTo(poly[0], poly[1]);
    for( item = 2 ; item < poly.length - 1 ; item += 2 ) {
        vctx.lineTo( poly[item] , poly[item + 1] )
    }
    vctx.closePath(); 
    vctx.stroke();
}

