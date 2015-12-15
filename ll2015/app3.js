

// Check if supports 3D transforms
function has3d(){
	var el = $('<p>')[0], $iframe = $('<iframe>'), has3d, t,
		transforms = {
			'webkitTransform': '-webkit-transform',
			'OTransform': '-o-transform',
			'msTransform': '-ms-transform',
			'transform': 'transform'
		};
 
	// Add it to the body to get the computed style
	// Sandbox it inside an iframe to avoid Android Browser quirks
	$iframe.appendTo('body').contents().find('body').append( el );
 
	for (t in transforms) {
		if (el.style[t] !== undefined) {
			el.style[t] = 'translate3d(1px,1px,1px)';
			has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
		}
	}
 
	$iframe.remove();
 
	return has3d !== undefined && has3d.length > 0 && has3d !== "none";
}



// Identify browser based on useragent string
(function( ua ) {
  ua = ua.toLowerCase();
  var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
    /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
    /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
    /(msie) ([\w.]+)/.exec( ua ) ||
    ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
    [];
  var matched = {
    browser: match[ 1 ] || "",
    version: match[ 2 ] || "0"
  };
  browser = {};
  if ( matched.browser ) {
      browser[ matched.browser ] = true;
      browser.version = matched.version;
  }
  // Chrome is Webkit, but Webkit is also Safari.
  if ( browser.chrome ) {
    browser.webkit = true;
  } else if ( browser.webkit ) {
    browser.safari = true;
  }
  $.browser = browser;
  return browser;
})( navigator.userAgent );

var is_iphone = (navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i));
var is_ipad = (navigator.userAgent.match(/iPad/i));
var is_android = (navigator.userAgent.match(/Android/i))
var is_mobile = is_iphone || is_ipad || is_android;

if (is_mobile) {
	window.location.href = "mobile.html"
}
else if ($.browser.msie || ! has3d()) {
	window.location.href = "https://lotoloto.me/ll2015/index.html"
}

var scene,
		cam,
		map;

var viewHeight = window.viewHeight || 550

var app = new function(){}
app.dragging = false

app.init = function () {

	var mainbox,
			coords,
			box, size,
			floor,
			// controls = new MX.RotationControl(),
			movements

	scene = new MX.Scene().addTo('#scene')
	scene.width = window.innerWidth
	scene.height = window.innerHeight
	scene.perspective = window.innerHeight

	window.onresize = function () {
		scene.width = window.innerWidth
		scene.height = window.innerHeight
		scene.perspective = window.innerHeight
		scene.update()
	}

	cam = scene.camera
	cam.y = viewHeight

	if (MX.Map) map = new MX.Map()
	
	movements = app.movements = new MX.Movements(cam, viewHeight)
	movements.init()

	function animate (t) {
		requestAnimationFrame(animate)
		//controls.update()
		environment.update(t)
		window.path && path.update(t)
		movements.update()
		scene.update()
	}

	window.inAnimation = true

	var loader = new Loader(function(){
		$("#loader").hide()
		window.environment && window.environment.init()
		window.editor && window.editor.init()
		window.path && window.path.init()
		animate()
	})
	
	loader.preloadImages([
	
	])
	
	$("#looks a").on("mousedown", function(e){ e.stopPropagation() })

	$("#facebook").click(share.facebook)
	$("#twitter").click(share.twitter)

}

app.position = function(obj){
	return {
		x: obj.x,
		y: obj.y,
		z: obj.z,
		rotationX: obj.rotationX,
		rotationY: obj.rotationY
	}
}

var share = {
	"url": "http://lotoloto.me/ll2015/index.html",
	"facebook_msg": "http://lotoloto.me/ll2015/index.html | place-holder text",
	"twitter_msg": "http://lotoloto.me/ll2015/index.html | place-holder text",
	"openLink": function (url) {
		window.open(url, "_blank");
	},
	"facebook": function () {
		var url = "https://www.facebook.com/share.php?u=" + encodeURIComponent(share.url) + "&t=" + encodeURIComponent(share.facebook_msg);
		share.openLink(url);
		return false;
	},
	"twitter": function () {
		var url = "https://twitter.com/home?status=" + encodeURIComponent(share.url + " " + share.twitter_msg);
		share.openLink(url);
		return false;
	}
}
