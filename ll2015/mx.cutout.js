MX.Cutout = MX.Object3D.extend({
  init: function (ops) {
  
  	this.type = "Cutout"

    var layer = this
    layer.width = 0
    layer.height = 0

    if (ops.src) this.loadTexture(ops)

		if (ops.texture) {
		}
		else if (ops.classname) {
			layer.el.classList.add(ops.classname)
		}
		else {
		}
		layer.el.style.backgroundRepeat = 'no-repeat'

    this.dirty = true
    this.updateChildren = true
    this.update()
  },

  loadTexture: function(ops){
    var layer = this
    var image = new Image()
    var pattern = ops.pattern
    var texture = ops.texture
    
    image.onload = function(){
			var canvas = document.createElement("canvas")
			var ctx = canvas.getContext('2d')

			layer.width = canvas.width = image.naturalWidth
			layer.height = canvas.height = image.naturalHeight

			ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
			ctx.globalCompositeOperation = "source-in"
			
			if (texture) {
				ctx.fillStyle = ctx.createPattern(texture, 'repeat')
				ctx.fillRect(0, 0, canvas.width, canvas.height)
			}
			if (pattern) {
				ctx.fillStyle = ctx.createPattern(pattern, 'repeat')
				ctx.fillRect(0, 0, canvas.width, canvas.height)
			}

			layer.scale = ops.scale || 1
			layer.x = ops.x || 0
			layer.y = (ops.y || 0) + layer.height/2 + 1
			layer.z = ops.z || 0
			layer.rotationX = ops.rotationX || 0
			layer.rotationY = ops.rotationY || 0
			layer.el.appendChild(canvas)

			layer.el.classList.add('image')
			ops.className && layer.el.classList.add(ops.className)
			layer.dirty = true
			layer.update()
    }
    image.src = ops.src;
  }
})
