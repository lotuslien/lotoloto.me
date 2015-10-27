
MX.Tableaux.Floor = MX.Tableau.extend({

	init: function(opt){

		this.opt = opt = defaults(opt, {
			width: 100,
			height: 100,
			depth: 100,
			x: 0,
			y: 0,
			z: 0,
			rotationY: 0,
			rotationX: 0,
			scale: 1,
			color: "white",
			backgroundColor: "transparent",
			backgroundImage: null,
			borderRadius: null,
			className: null,
		})
		
		if (opt.className) {
			opt.backgroundColor = null
		}
		else if (opt.backgroundImage) {
			opt.color = opt.backgroundColor
		}

		var floor = new MX.BoxDimensions({
			id: "floor",
			width: opt.width/opt.scale,
			height: 1,
			depth: opt.depth/opt.scale,
			scale: opt.scale,
			y: opt.y,
			z: opt.z,
			rotationX: opt.rotationX,
			rotationY: opt.rotationY,
			borderWidth: 0,
			borderColor: "transparent",
			borderRadius: opt.borderRadius,
			className: opt.className,
			backgroundImage: opt.backgroundImage,
			color: opt.color,
			sides: "bottom"
		})
		scene.add( floor );
	
	}

});
