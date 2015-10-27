
MX.Tableaux.Fish = MX.Tableau.extend({

	init: function(opt){
		this.opt = opt = defaults(opt, {
			x: 0,
			y: 0,
			z: 0,
			height: 800,
			radius: 100,
			minScale: 0.5,
			maxScale: 1.0,
			rotationY: 0,
			rotationRangeY: PI/3,
			padding: 10,
			centerRadius: 0,
			speed: PI/200,
			dieSpeed: 1/60
		})
		
		// Fish
		this.fish = []
		this.dead = false
		var fish, x, y, z, radius, theta, scale

		for (var i = 0; i < opt.fishCount; i++) {

			radius = rand(opt.radius) + opt.centerRadius
			theta = rand(TWO_PI)
			
			x = radius * cos(theta)
			y = randrange(0, opt.height)
			z = radius * sin(theta)
			
			scale = randrange(opt.minScale, opt.maxScale)
			
			fish = new MX.Image({
				src: "http://lotoloto.me/ll2015/index.html",
				x: x + opt.x,
				y: y + opt.y,
				z: z + opt.z,
				className: "backface-visible",
				rotationX: 0,
				rotationY: Math.PI/2 + theta
			})
			fish.scaleX = -scale
			fish.scaleY = scale
			fish.scaleZ = -1

			fish.radius = radius
			fish.theta = theta
			fish.yOffset = y
			fish.index = i*2
			fish.speed = opt.speed
			fish.dieTween = 1.0
			
			fish.rotationYOffset = 0
		
			this.fish.push(fish)
			box.water.add(fish)
			
			//
/*
			x = radius * cos(theta)
			y = randrange(0, opt.height)
			z = radius * sin(theta)

			scale = randrange(opt.minScale, opt.maxScale)


			fish = new MX.Image({
				src: "http://okfocus.s3.amazonaws.com/kenso/underwater/fish" + ((i%4)+1) + ".png",
				x: x + opt.x,
				y: y + opt.y,
				z: z + opt.z,
				scale: scale,
				className: "backface-hidden",
				rotationX: 0,
				rotationY: Math.PI/2 + theta
			})
			fish.scaleX = scale
			fish.scaleY = scale -1
			fish.scaleZ = 1

			fish.radius = radius
			fish.theta = theta
			fish.yOffset = y
			fish.index = i + 1
			fish.speed = opt.speed
			fish.dieTween = 1.0
			
			fish.rotationYOffset = Math.PI
			
			this.fish.push(fish)
			scene.add(fish)
*/

		}
	},
	
	update: function(t){
		var dead = this.dead
		var opt = this.opt
		
		var i = 0
		
		this.fish.forEach(function(fish){
			i++;
			
			if (dead) {
				fish.dieTween = clamp(fish.dieTween - opt.dieSpeed, 0.0, 1.0)
			}
			
			else {
				fish.dieTween = clamp(fish.dieTween + opt.dieSpeed, 0.0, 1.0)
			}
			
			fish.theta = (fish.theta + fish.speed * fish.dieTween)
			fish.y = opt.y + fish.index + (fish.yOffset + lerp( sinp(t/10000 + i*opt.fishCount), 0, opt.height )) * fish.dieTween
			
			fish.x = opt.x + cos(fish.theta) * fish.radius
			fish.z = opt.z + sin(fish.theta) * fish.radius
			
			fish.rotationX = PI * 3/2 * (1-fish.dieTween)
			fish.rotationY = ((PI/2 + fish.theta) % TWO_PI) * (fish.dieTween) + fish.rotationYOffset
		
		})

	}

});
