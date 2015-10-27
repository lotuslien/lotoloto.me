MX.Text = MX.Object3D.extend({
  init: function (ops) {

		this.type = "Text"
		
    var layer = new MX.Object3D('text')
    layer.width = ops.width || 100
    layer.height = ops.height || 50
    layer.x = ops.x || 0
    layer.y = ops.y || 0
    layer.z = ops.z || 0
    layer.scale = ops.scale || 1
    layer.el.innerHTML = ops.value || ""
    if (ops.id) layer.el.id = ops.id;
    if (ops.background) layer.el.style.background = ops.background;
    if (ops.color) layer.el.style.color = ops.color;
    if (ops.fontSize) layer.el.style.fontSize = ops.fontSize + "px";

    this.add(layer)

    this.children.forEach(function (c, i) {
      if (ops.classname) {
        c.el.classList.add(ops.classname)
      }
      else {
      }
      c.el.style.backgroundRepeat = 'no-repeat'
    })

    this.dirty = true
    this.updateChildren = true
    this.update()
  }
})
