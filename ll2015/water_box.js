MX.Tableaux.WaterBox = MX.Tableau.extend({

	init: function(opt){
	
		opt = defaults(opt, {
			width: 500,
			height: 200,
			depth: 200,
			x: 240,
			y: 0,
			z: 0,
			rotationX: 0,
			rotationZ: 0,
			padding: 5,
			scale: 1,
			innerColor: "#def"
		})
	
		// Small water box
		this.water = new MX.BoxDimensions({
			width: opt.width,  
			height: opt.height,
			depth: opt.depth,
			backgroundImage: "http://38.media.tumblr.com/tumblr_lx7cdufXDf1qzu8e8o1_400.gif",
			borderWidth: 0,
			borderColor: "blue",
			x: opt.x,
			y: opt.y,
			z: opt.z,
			scale: opt.scale,
			rotationX: opt.rotationX,
			rotationZ: opt.rotationZ,
//			className: "backface-hidden",
//			sides: "top left right front back",
		})
		scene.add( this.water );

// 		this.water2 = new MX.BoxDimensions({
// 			width: opt.width,
// 			height: opt.height,
// 			depth: opt.depth,
// 			backgroundImage: "http://dumpfm.s3.amazonaws.com/images/20120209/1328764462143-dumpfm-qil-water3b.gif",
// 			borderWidth: 0,
// 			borderColor: "blue",
// 			x: opt.x,
// 			y: opt.y - opt.height * opt.scale,
// 			z: opt.z,
// 			scale: opt.scale,
// 			rotationX: opt.rotationX,
// 			rotationZ: opt.rotationZ,
// //			className: "backface-hidden",
// 			sides: "top",
// 		})
// 		this.water2.top.rotationY = PI
// 		scene.add( this.water2 )


		this.water.children.some(function(c){
			c.scale *= -1
//			c.el.classList.add("backface-hidden")
		})
//		this.water.bottom.scale *= 1
//		this.water.bottom.el.classList.add("backface-hidden")

this.water2 = this.water
/*
		this.water2 = new MX.BoxDimensions({
			width: opt.width,
			height: opt.height,
			depth: opt.depth,
			backgroundImage: "http://dumpfm.s3.amazonaws.com/images/20120209/1328764462143-dumpfm-qil-water3b.gif",
			borderWidth: 0,
			borderColor: "blue",
			x: opt.x,
			y: opt.y,
			z: opt.z,
			scale: opt.scale,
			rotationX: opt.rotationX,
			rotationZ: opt.rotationZ,
//			className: "backface-hidden"
		})
		this.water2.children.some(function(c){
			c.scale = -1
			c.el.classList.add("backface-hidden")
		})
//		this.water2.bottom.scale = 1

		scene.add( this.water2 );
*/

	},
	
	update: function(t) {
		this.water.rotationY += Math.PI/200
// 		this.water2.rotationY += Math.PI/200
	}

});
