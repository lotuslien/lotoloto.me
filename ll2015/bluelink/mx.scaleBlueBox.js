MX.ScaleBox = MX.Object3D.extend({

	// this will be called within the contructor
	init: function (opt) {

		var base = this

		this.type = "ScaleBox"
		
		var id = this.id = opt.id || guid()
		this.x = opt.x || 0
		this.y = opt.y || 0
		this.z = opt.z || 0
		this.rotationX = opt.rotationX || 0
		this.rotationY = opt.rotationY || 0
		this.rotationZ = opt.rotationZ || 0
		var scale = this.scale = opt.scale || 1
		var width = this.width = scale * (opt.width || 100)
		var height = this.height = scale * (opt.height || 100)
		var depth = this.depth = scale * (opt.depth || 100)
		var color = this.color = opt.color || 'rgba(0, 255, 122, .1)'
		var sides = this.sides = opt.sides || "top bottom left right front back"

		// an Object3D's associated DOM node is the "el" property
		this.el.classList.add('box')

		var angle = MX.rotationUnit === 'deg' ? 90 : (Math.PI / 2)

		var top = this.top = new MX.Object3D('.face.top')
		top.rotationX = angle
		top.width = 1
		top.height = 1
		top.scaleX = width
		top.scaleY = 1
		top.scaleZ = depth
		top.y = height

		var bottom = this.bottom = new MX.Object3D('.face.bottom')
		bottom.rotationX = -angle
		bottom.width = 1
		bottom.height = 1
		bottom.scaleX = width
		bottom.scaleY = 1
		bottom.scaleZ = depth
		bottom.y = 0

		var left = this.left = new MX.Object3D('.face.left')
		left.rotationY = -angle
		left.width = 1
		left.height = 1
		left.scaleX = 1
		left.scaleY = height
		left.scaleZ = depth
		left.x = -width/2
		left.y = height/2

		var right = this.right = new MX.Object3D('.face.right')
		right.rotationY = angle
		right.width = 1
		right.height = 1
		right.scaleX = 1
		right.scaleY = height
		right.scaleZ = depth
		right.x = width/2
		right.y = height/2

		var front = this.front = new MX.Object3D('.face.front')
		front.width = 1
		front.height = 1
		front.scaleX = width
		front.scaleY = height
		front.scaleZ = 1
		front.z = -depth/2
		front.y = height/2

		var back = this.back = new MX.Object3D('.face.back')
		back.width = 1
		back.height = 1
		back.scaleX = width
		back.scaleY = height
		back.scaleZ = 1
		back.rotationY = angle * 2
		back.z = depth/2
		back.y = height/2

		// adding children, must also be instances of Object3D
		if (-1 != sides.indexOf("top")) this.add(top)
		if (-1 != sides.indexOf("bottom")) this.add(bottom)
		if (-1 != sides.indexOf("left")) this.add(left)
		if (-1 != sides.indexOf("right")) this.add(right)
		if (-1 != sides.indexOf("front")) this.add(front)
		if (-1 != sides.indexOf("back")) this.add(back)

		this.children.forEach(function (face) {
			face.el.style.backgroundColor = color
		})

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
		var params = "id width height depth x y z rotationX rotationY color sides".split(" ")
		return this.__toString(params)
	},
	
	clone: function(){
		return new MX[this.type] (this)
	}

	// other properties will be mixed into the prototype of the new constructor

})
