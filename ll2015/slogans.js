
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


		var side = 500
		
		var pattern = document.createElement("canvas")
		pattern.width = side
		pattern.height = side

		var ctx = pattern.getContext("2d");

		var grd = ctx.createLinearGradient(0,0,170,0);
		grd.addColorStop(0, "black");
		grd.addColorStop(1, "black");

		ctx.fillStyle = grd;
		ctx.fillRect(0,0,side,side);

		var images = [
			'https://openclipart.org/download/130171/Grunge-02.svg',
			'https://openclipart.org/download/130171/Grunge-02.svg',
			'https://openclipart.org/download/130171/Grunge-02.svg',
			'https://openclipart.org/download/130171/Grunge-02.svg',
			'https://openclipart.org/download/130171/Grunge-02.svg'
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
