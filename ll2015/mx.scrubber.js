/*
	Use the scrollwheel to tween between different points and orientations

	scrubber = new MX.Scrubber(cam, [
		{
			position: [0, viewHeight, -1000],
			rotation: [0, 0]
		},
		{
			position: [0, 1000, 1000],
			rotation: [0, Math.PI]
		},
		{
			position: [0, viewHeight, -1000],
			rotation: [0, 2*Math.PI]
		},
		{
			position: [0, viewHeight, -2000],
			rotation: [0, 0]
		}
	])
	
	// in your animate function:
	scrubber.update()
	
*/

MX.Scrubber = function (obj, points) {

	obj = obj || {}
	points = points || {}

	var reversible = true, loop = false;
	
	var total = points.length * 100,
			distance = 0
			destination = 0,
			last_index = -1,
			last_name = null,
			locked = false,
			point_count = points.length + (loop+0)

	var avg_speed = scroll_avg_speed = 5,
			click_avg_speed = 20,
			webkit_ratio = 0.02
	
	if (points[0].position) {
		points.forEach(function(p){
			p.x = p.position[0]
			p.y = p.position[1]
			p.z = p.position[2]
			p.rotationX = p.rotation[0]
			p.rotationY = p.rotation[1]
		})
	}

	document.addEventListener('touchstart', next, false);
	document.addEventListener('mousedown', next, false);
	document.addEventListener('mousewheel', onDocumentMouseWheel, false);
  document.addEventListener('DOMMouseScroll', onDocumentMouseWheel, false);
	function onDocumentMouseWheel (e) {

		if (locked) return
		
		var delta = 0;
		
		// WebKit
		if ( event.wheelDeltaY ) {
			delta -= event.wheelDeltaY * webkit_ratio
		}
		// Opera / Explorer 9
		else if ( event.wheelDelta ) {
			delta -= event.wheelDelta * webkit_ratio
		}
		// Firefox
		else if ( event.detail ) {
			delta += event.detail * 2
		}
		if (! reversible && delta < 0) return;
		
		if (destination < total-100 || delta < 0) {
			e.preventDefault()
		}
		else {
			return
		}
		
		destination += delta
		
		avg_speed = scroll_avg_speed
	}
	
	function add_point(point){
		if (point.type == "Camera") {
			point = {
				position: [ point.x, point.y, point.z ],
				rotation: [ point.rotationX, point.rotationY ],
				callback: noop
			}
		}
		points.push(point)
		total = points.length * 100
	}
	
	function reset(){
		distance = destination = 0
		last_index = -1
		last_name = null
	}
	
	function next(){
		destination = ~~(destination/100) * 100
		destination += 100
		avg_speed = click_avg_speed
	}
	
	function update(){
		if (locked) return

		if (destination > total-100) destination = total-100

		distance = avg(distance, destination, avg_speed)
		var ratio = distance / total
		
		if (! loop) {
			if (ratio < 0)	{
				destination = 0
				ratio = 0
			}
			else if (ratio > 1) {
				destination = total
				ratio = 1
			}
		}
		
		var diff = ratio * point_count
		var step = (distance % 100) / 100
		var src = ~~clamp(diff, 0, point_count-1)
		var halfway = ~~clamp(diff + 0.5, 0, point_count-1)
		var dest = ~~clamp(diff + 1, 0, point_count-1)

		if (halfway != last_index) {
			last_index = halfway
			if (points[last_index].name != last_name) {
				last_name = points[last_index].name
			}
			$("#info .active").removeClass("active")
			$("#info div[data-name='" + last_name + "']").addClass("active")
			points[halfway].callback && points[halfway].callback()
		}
		
		var ry0 = points[src].rotationY
		var ry1 = points[dest].rotationY
		if (abs(ry0 - ry1) == TWO_PI) {
			ry0 = ry1
		}
		
		obj.x = lerp(step, points[src].x, points[dest].x)
		obj.y = lerp(step, points[src].y, points[dest].y)
		obj.z = lerp(step, points[src].z, points[dest].z)
		obj.rotationX = lerp(step, points[src].rotationX, points[dest].rotationX)
		obj.rotationY = lerp(step, ry0, ry1)
		if (obj.rotationY > PI) { obj.rotationY -= TWO_PI }
	}

	var scrubber = {
		init: function(){
			app && app.movements && app.movements.lock()
		},
		lock: function(){
			app && app.movements && app.movements.unlock()
			locked = true
		},
		unlock: function(){
			app && app.movements && app.movements.lock()
			locked = false
		},
		step: function(n){
			distance = destination = n * 100
		},
		add_point: add_point,
		reset: reset,
		next: next,
		update: update,
		
		obj: obj,
		points: points
	}
	
	return scrubber;
}
