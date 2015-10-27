
MX.Tableaux.IntroText = MX.Tableau.extend({

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
		})
		
		var f = new MX.Image({
			src: "http://i.imgur.com/tkRFIyu.gif",
			x: opt.x,
			y: opt.y,
			z: opt.z,
			scale: 1.5,
		})
		scene.add(f)
	}

});
