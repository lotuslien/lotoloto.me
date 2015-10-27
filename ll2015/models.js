MX.Tableaux.Models = MX.Tableau.extend({

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
			spacingY: 0,
		})

		for (var i = 1; i <= 9; i++) {
			girl = new MX.Image({
				src: "http://i.imgur.com/tkRFIyu.gif",
				x: (100 + (9-i) * 40) * pow(-1, i),
				y: (i-1) * opt.spacingY + opt.y,
				z: 400 * i + opt.z,
				scale: 0.5,
				rotationY: PI/6 * pow(-1, i+1)
			})
			scene.add(girl)
		}
	}

});
