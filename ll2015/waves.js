
MX.Tableaux.Waves = MX.Tableau.extend({

	init: function(opt){
		
		opt = defaults(opt, {
			x: 0,
			y: 0,
			z: 0,
			gap: 0,
		})

		wave = new MX.Image({
			src: "http://41.media.tumblr.com/0b77dcfc0cd180b343313769995f2571/tumblr_ml7mmzjpj61r6wq7io1_500.jpg",
			x: opt.x - 200 - opt.gap/2,
			y: opt.y + 200,
			z: opt.z + 60,
			scale: 1.3,
		})
		wave.rotationY = PI/4
		scene.add(wave)

		wave = new MX.Image({
			src: "http://41.media.tumblr.com/0b77dcfc0cd180b343313769995f2571/tumblr_ml7mmzjpj61r6wq7io1_500.jpg",
			x: opt.x + 200 + opt.gap/2,
			y: opt.y + 400,
			z: opt.z + 100,
			scale: 1.3,
		})
		wave.rotationY = Math.PI - PI/4
		scene.add(wave)
	}

});
