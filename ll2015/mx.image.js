MX.Image = MX.Object3D.extend({
  init: function (ops) {
  
  	this.type = "Image"

    var layer = this
    layer.width = 0
    layer.height = 0
		layer.x = ops.x || 0
		layer.y = ops.y || 0
		layer.z = ops.z || 0

    if (ops.src) this.loadTexture(ops)

    layer.el.classList.add(ops.className)
		layer.el.style.backgroundRepeat = 'no-repeat'

    this.dirty = true
    this.updateChildren = true
    this.update()
  },

  loadTexture: function(ops){
    var layer = this
    var image = new Image()
    image.onload = function(){
      layer.scale = ops.scale || 1
      layer.width = image.naturalWidth
      layer.height = image.naturalHeight
      layer.x = ops.x || 0
      layer.y = (ops.y || 0) + layer.scale * layer.height/2 + 1
      layer.z = ops.z || 0
      layer.rotationX = ops.rotationX || 0
      layer.rotationY = ops.rotationY || 0
      layer.rotationZ = ops.rotationZ || 0
      layer.el.style.backgroundImage = "url(" + image.src + ")"
      layer.el.classList.add('image')
      layer.dirty = true
      layer.update()
    }
    image.src = ops.src;
  },

	toString: function(){
		var params = "id src width height depth x y z rotationX rotationY rotationZ scale".split(" ")
		return this.__toString(params)
	},

})
