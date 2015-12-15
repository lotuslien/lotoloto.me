

MX.Movements = function (cam, viewHeight) {

	var moveForward,
			moveLeft,
			moveBackward,
			moveRight,
			moveUp,
			moveDown,
			turnLeft,
			turnRight,
			turnUp,
			turnDown,
			jumping = false,
			creeping = false,
			locked = false,
			gravity = false

	var v = 28,
			vr = Math.PI * 0.015
			jumpV = 30,
			vx = vy = vz = 0,
			creepFactor = 0.1

	var DEFAULT_SCALE = scale = 1.0

	return {

		init: function () {

			document.addEventListener('keydown', function (e) {
			// console.log(e.keyCode)
				if (locked) return;
				switch ( e.keyCode ) {
				
					case 16: // shift
						creeping = true
						break

					case 38: // up
					case 87: // w
						moveForward = true
						break

					case 37: // left
					case 65: // a
						moveLeft = true
						break

					case 40: // down
					case 83: // s
						moveBackward = true
						break

					case 39: // right
					case 68: // d
						moveRight = true
						break

					case 81: // q
						turnDown = true
						break
							
					case 69: // e
						turnRight = true
						break
				
					case 82: // r
						turnUp = true
						break

					case 70: // f
						turnDown = true
						break

					case 32: // space
						if (gravity) {
							jumping = true

							vy = abs(vy) + jumpV * scale

							if (e.shiftKey) {
								vy *= -1
							}
						}
						else {
							if (e.shiftKey) {
								moveDown = true
							}
							else {
								moveUp = true
							}
						}
						break

					case 27:  // esc
						map.toggle()
						break
				}
			})

			document.addEventListener('keyup', function (e) {
				if (locked) return;
				switch ( e.keyCode ) {
			
					case 16: // shift
						creeping = false
						break

					case 38: // up
					case 87: // w
						moveForward = false
						break

					case 37: // left
					case 65: // a
						moveLeft = false
						break

					case 40: // down
					case 83: // s
						moveBackward = false
						break

					case 39: // right
					case 68: // d
						moveRight = false
						break

					case 81: // q
						turnUp = false
						break
							
					case 69: // e
						turnRight = false
						break

					case 82: // r
						turnUp = false
						break

					case 70: // f
						turnDown = false
						break

					case 32: // space
						moveUp = moveDown = false
						break
					
					case 48: // 0
						cam.rotationX = 0
						cam.rotationY = 0
						cam.x = 0
						cam.y = viewHeight
						cam.z = 0
						break
				}
			})
			
			var mouseX, mouseY, dx, dy, rotX, rotY, dragging = false
			document.addEventListener('mousedown', function (e) {
				if (locked) return;
				mouseX = e.pageX
				mouseY = e.pageY
				rotX = cam.rotationX
				rotY = cam.rotationY
				dragging = true
			})
			
			document.addEventListener('mousemove', function (e) {
				if (locked || ! dragging || app.dragging) return
				var dx = (e.pageX - mouseX) / window.innerWidth * Math.PI/3
				var dy = (e.pageY - mouseY) / window.innerHeight * Math.PI/3
				cam.rotationY = rotY + dx
				cam.rotationX = rotX - dy
			})
			
			document.addEventListener('mouseup', function (e) {
				app.dragging = dragging = false
			})
			
			window.addEventListener('blur', reset)
			window.addEventListener('focus', reset)
			function reset(){
				moveForward = moveLeft = moveBackward = moveRight = moveUp = moveDown = turnLeft = turnRight = jumping = dragging = creeping = false
			}

		},

		update: function () {

			if (locked) return;
			
			var ry = cam.rotationY
			var s = creeping ? scale * creepFactor : scale
			var vrrrr = creeping ? vr * creepFactor * 5 : vr

			if (moveForward || moveBackward || moveRight || moveLeft || moveUp || moveDown || turnLeft || turnRight || turnUp || turnDown) {

				vx = vy = vz = 0                              

				if (moveForward) {
					vx += v * Math.cos(ry + Math.PI / 2) * s
					vz += v * Math.sin(ry + Math.PI / 2) * s
				}
				if (moveBackward) {
					vx -= v * Math.cos(ry + Math.PI / 2) * s
					vz -= v * Math.sin(ry + Math.PI / 2) * s
				}
				if (moveLeft) {
					vx -= v * Math.cos(ry) * s
					vz -= v * Math.sin(ry) * s
				}
				if (moveRight) {
					vx += v * Math.cos(ry) * s
					vz += v * Math.sin(ry) * s
				}
				if (moveUp) {
					vy += v * scale
				}
				if (moveDown) {
					vy -= v * scale
				}

				if (turnUp) {
					cam.rotationX -= vrrrr
				}
				if (turnDown) {
					cam.rotationX += vrrrr
				}
				if (turnLeft) {
					cam.rotationY += vrrrr
				}
				if (turnRight) {
					cam.rotationY -= vrrrr
				}

				cam.x += vx
				cam.y += vy
				cam.z += vz

			}

			if (gravity) {
				vy -= 1 * scale

				cam.y += vy

				if (cam.y <= viewHeight * scale) {
						cam.y = viewHeight * scale
						vy = 0
						jumping = false
				}
			}

		},
		
		lock: function(){ locked = true },
		unlock: function(){ locked = false },
		scale: function(n){ if (n) scale = n; return scale },
		resetScale: function(n){ scale = DEFAULT_SCALE }
	}
}
