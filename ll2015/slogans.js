
MX.Tableaux.Slogans = MX.Tableau.extend({

	init: function(opt){
		
		var base = this
		
		this.slogans = []
  
		this.opt = opt = defaults(opt, {
			x: 0, y: 0, z: 0,
			rotationY: 0,
			rotationX: 0,
		})

	
// 	scene.camera.move({
// 			"x": -1503,
// 			"y": 2444,
// 			"z": 13469,
// 			"rotationX": 0.505,
// 			"rotationY": 4.686,
// 	})


		var side = 650
		
		var pattern = document.createElement("canvas")
		pattern.width = side
		pattern.height = side

		var ctx = pattern.getContext("2d");

		ctx.fillStyle = grd;
		ctx.fillRect(0,0,side,side);

		var images = [
			'http://i.imgur.com/5ugS7uv.png',
			'http://i.imgur.com/5ugS7uv.png',
		]
		
		var lean = PI/10

		var x = [-1, 1, 0, -1, 1],
				y = [2, 2, 1.1, 0, 0],
				z = [0, 0, 0, 0, 0]

		images.forEach(function (url, i) {
		
			var slogan = new MX.Cutout({
				src: images[i],
				pattern: pattern,
				x: opt.x + 270*x[i],
				y: opt.y + 250*y[i],
				z: opt.z - 300*z[i],
				className: "backface-hidden",
				rotationX: 0,
				rotationY: opt.rotationY + lean * z[i]
			})
			scene.add(slogan)
			base.slogans.push(slogan)

		})
		
		base.hide()

	},
	
	show: function(){
		this.slogans.forEach(function(s){
			s.el.style.display = "block"
		})
	},
	
	hide: function(){
		this.slogans.forEach(function(s){
			s.el.style.display = "none"
		})
	}
});
