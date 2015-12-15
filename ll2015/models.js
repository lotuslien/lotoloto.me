MX.Tableaux.Models = MX.Tableau.extend({

	init: function(opt){

		this.opt = opt = defaults(opt, {
			width: 100,
			height: 100,
			depth: 100,
			x: 20,
			y: 0,
			z: 0,
			rotationY: 0,
			rotationX: 0,
			scale: 1,
				spacingY: 0,
 		})
 
-		for (var i = 1; i <= 6; i++) {
+		for (var i = 1; i <= 4; i++) {
 			girl = new MX.Image({
 				src: "https://cloud.githubusercontent.com/assets/8115609/11075775/0d1d3fe4-87c5-11e5-8afa-5a45376c0a23.gif",
-				x: (150 + (4-i) * 40) * pow(-1, i),
+				x: (300 + (4-i) * 40) * pow(-1, i),
 				y: (i-1) * opt.spacingY + opt.y,
 				z: 400 * i + opt.z,
 				scale: 1,
-				rotationY: PI/6 * pow(-1, i+1)
+				rotationY: PI/3 * pow(-1, i+1)
 			})
 			scene.add(girl)
 		}


	}

});
