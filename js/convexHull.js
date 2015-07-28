function convexHull(labelMap) {
    var convexHull = new ConvexHullGrahamScan();

    for(var i = 0; i < labelMap.length; i++) {
        for(var j = 0; j < labelMap[i].length; j++) {
            if ( labelMap[i][j] != 0) {
                convexHull.addPoint(j, i);
            }
        }
    } 

    //getHull() returns the array of points that make up the convex hull. 
    var hullPoints = convexHull.getHull();

// Add points (needs to be done for each point, a foreach loop on the input array can be used.)
// This is necessary to bring the x and y coordinate data in a format that can be read by the polyline function

    var XYObject = [];

    for (var i in hullPoints) {
       if (hullPoints.hasOwnProperty(i)) {
           var obj = hullPoints[i];
            for (var prop in obj) {
              // important check that this is objects own property 
              // not from prototype prop inherited
              if(obj.hasOwnProperty(prop)){
                // alert(prop + " = " + obj[prop]);
                XYObject.push(obj[prop]);

              }
           }
        }
    }

    return XYObject;
}
