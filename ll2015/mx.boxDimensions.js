MX.BoxDimensions = MX.Object3D.extend({

	// this will be called within the contructor
	init: function (opt) {

		var base = this

		this.type = "BoxDimensions"
		
		var id = this.id = opt.id || guid()
		this.x = opt.x || 0
		this.y = opt.y || 0
		this.z = opt.z || 0
		// this.scale = opt.scale || 1
		var scale = opt.scale || 1
		this.rotationX = opt.rotationX || 0
		this.rotationY = opt.rotationY || 0
		this.rotationZ = opt.rotationZ || 0
		var width = this.width = opt.width || 100
		var height = this.height = opt.height || 100
		var depth = this.depth = opt.depth || 100
		var color = this.color = opt.color || 'rgba(0, 255, 122, .1)'
		var backgroundImage = this.backgroundImage = opt.backgroundImage;
		var borderColor = this.borderColor = opt.borderColor || '#0f3'
		var borderWidth = this.borderWidth = typeof opt.borderWidth !== 'undefined' ? opt.borderWidth : 3;
		var borderRadius = this.borderRadius = typeof opt.borderRadius !== 'undefined' ? opt.borderRadius : undefined;
		var sides = this.sides = opt.sides || "top bottom left right front back"
		var className = this.className = opt.className || null

		// an Object3D's associated DOM node is the "el" property
		this.el.classList.add('box')

		var angle = MX.rotationUnit === 'deg' ? 90 : (Math.PI / 2)

		this.top = this.bottom = this.left = this.right = this.front = this.back = null
		if (-1 != sides.indexOf("top")) {
			var top = this.top = new MX.Object3D('.face.top')
			top.rotationX = angle
			top.width = width
			top.height = depth
			top.y = height * scale
			top.scale = scale
			this.add(top)
		}
		if (-1 != sides.indexOf("bottom")) {
			var bottom = this.bottom = new MX.Object3D('.face.bottom')
			bottom.rotationX = -angle
			bottom.width = width
			bottom.height = depth
			bottom.y = 0
			bottom.scale = scale
			this.add(bottom)
		}
		if (-1 != sides.indexOf("left")) {
			var left = this.left = new MX.Object3D('.face.left')
			left.rotationY = -angle
			left.width = depth
			left.height = height
			left.x = -width/2 * scale
			left.y = height/2 * scale
			left.scale = scale
			this.add(left)
		}
		if (-1 != sides.indexOf("right")) {
			var right = this.right = new MX.Object3D('.face.right')
			right.rotationY = angle
			right.width = depth
			right.height = height
			right.x = width/2 * scale
			right.y = height/2 * scale
			right.scale = scale
			this.add(right)
		}
		if (-1 != sides.indexOf("front")) {
			var front = this.front = new MX.Object3D('.face.front')
			front.width = width
			front.height = height
			front.z = -depth/2 * scale
			front.y = height/2 * scale
			front.scale = scale
			this.add(front)
		}
		if (-1 != sides.indexOf("back")) {
			var back = this.back = new MX.Object3D('.face.back')
			back.width = width
			back.height = height
			back.rotationY = angle * 2
			back.z = depth/2 * scale
			back.y = height/2 * scale
			back.scale = scale
			this.add(back)
		}

		this.children.forEach(function (face) {
			if (borderRadius) {
				face.el.style.borderRadius = borderRadius + "px"
			}
			if (className) {
				face.el.classList.add(className)
			}
			else {
				if (backgroundImage) {
					face.el.style.backgroundImage = "url(" + backgroundImage + ")"
				}
				else if (color) {
					face.el.style.backgroundColor = color
				}
				if (borderWidth) {
					face.el.style.border = borderWidth + 'px solid ' + borderColor
				}
			}
		})

		// bottom.el.style.border = "0"

		// this applies the updated CSS style
		// required for any change to take effect
		// when a parent object's update() is called
		// all its children will be updated as well
		this.update()

		// if this object's children won't move by themselves
		this.updateChildren = true

		this.setWidth = function(w){
			base.width = top.width = bottom.width = front.width = back.width = w
			left.x = -w/2
			right.x = w/2
			base.dirty = true
		}
		this.setHeight = function(h){
			base.height = left.height = right.height = front.height = back.height = h
			bottom.y = 0
			left.y = right.y = front.y = back.y = h/2
			top.y = h
			base.dirty = true
		}
		this.setDepth = function(d){
			base.depth = top.height = bottom.height = left.width = right.width = d
			front.z = -d/2
			back.z = d/2
			base.dirty = true
		}

	},

	toString: function(){
		var params = "id width height depth x y z rotationX rotationY scale color borderColor borderWidth backgroundImage borderRadius sides".split(" ")
		return this.__toString(params)
	},

	// other properties will be mixed into the prototype of the new constructor

})
