	/**
 * PhysicsJS by Jasper Palfree <wellcaffeinated.net>
 * http://wellcaffeinated.net/PhysicsJS
 *
 * Simple Spin example for PhysicsJS
 */
 console.log('outside physics');

Physics(function(world){
     console.log('inside physics');
 var renderer = Physics.renderer('canvas', {
 	el: 'viewport',
 	width: 500,
 	height:500
 });
 world.add(renderer);
    
});

var square = Physics.body('rectangle', {
	x:250,
	y:250,
	width: 50,
	height: 50
});
world.add(square);
world.render();