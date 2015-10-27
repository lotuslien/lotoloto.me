if (window.$) {
  $.fn.int = function(){ return parseInt($(this).val(),10) }
  $.fn.float = function(){ return parseFloat($(this).val()) }
  $.fn.string = function(){ return trim($(this).val()) }
  $.fn.enable = function() { return $(this).attr("disabled",null) }
  $.fn.disable = function() { return $(this).attr("disabled","disabled") }
}

function trim(s){ return s.replace(/^\s+/,"").replace(/\s+$/,"") }

var E = Math.E
var PI = Math.PI
var PHI = (1+Math.sqrt(5))/2
var TWO_PI = PI*2
var LN10 = Math.LN10
function clamp(n,a,b){ return n<a?a:n<b?n:b }
function norm(n,a,b){ return (n-a) / (b-a) }
function lerp(n,a,b){ return (b-a)*n+a }
function mix(n,a,b){ return a*(1-n)+b*n }
function ceil(n){ return Math.ceil(n) }
function floor(n){ return Math.floor(n) }
function round(n){ return Math.round(n) }
function max(a,b){ return Math.max(a,b) }
function min(a,b){ return Math.min(a,b) }
function abs(n){ return Math.abs(n) }
function sign(n){ return Math.abs(n)/n }
function pow(n,b) { return Math.pow(n,b) }
function exp(n) { return Math.exp(n) }
function log(n){ return Math.log(n) }
function ln(n){ return Math.log(n)/LN10 }
function sqrt(n) { return Math.sqrt(n) }
function cos(n){ return Math.cos(n) }
function sin(n){ return Math.sin(n) }
function tan(n){ return Math.tan(n) }
function acos(n){ return Math.cos(n) }
function asin(n){ return Math.sin(n) }
function atan(n){ return Math.atan(n) }
function atan2(a,b){ return Math.atan2(a,b) }
function sec(n){ return 1/cos(n) }
function csc(n){ return 1/sin(n) }
function cot(n){ return 1/tan(n) }
function cosp(n){ return (1+Math.cos(n))/2 } // cos^2
function sinp(n){ return (1+Math.sin(n))/2 }
function random(){ return Math.random() }
function rand(n){ return (Math.random()*n) }
function randint(n){ return rand(n)|0 }
function randrange(a,b){ return a + rand(b-a) }
function choice(a){ return a[randint(a.length)] }
function deg(n){ return n*180/PI }
function rad(n){ return n*PI/180 }
function xor(a,b){ a=!!a; b=!!b; return (a||b) && !(a&&b) }
function mod(n,m){ return n-(m * floor(n/m)) }
function dist(x0,y0,x1,y1){ return sqrt(pow(x1-x0,2)+pow(y1-y0,2)) }
function angle(x0,y0,x1,y1){ return atan2(y1-y0,x1-x0) }
function avg(m,n,a){ return (m*(a-1)+n)/a }
function noop(){}

function pixel(x,y){ return 4*(mod(y,actual_h)*actual_w+mod(x,actual_w)) }
function rgbpixel(d,x,y){
  var p = pixel(~~x,~~y)
  r = d[p]
  g = d[p+1]
  b = d[p+2]
  a = d[p+3]
}
function fit(d,x,y){ rgbpixel(d,x*actual_w/w,y*actual_h/h) }

function step(a, b){
  return (b >= a) + 0 
               // ^^ bool -> int
}

function julestep (a,b,n) {
  return clamp(norm(n,a,b), 0.0, 1.0);
}

// hermite curve apparently
function smoothstep(min,max,n){
  var t = clamp((n - min) / (max - min), 0.0, 1.0);
  return t * t * (3.0 - 2.0 * t)
}

function shuffle(a){
  for (var i = a.length; i > 0; i--){
    var r = randint(i)
    var swap = a[i-1]
    a[i-1] = a[r]
    a[r] = swap
  }
  return a
}
function reverse(a){
  var reversed = []
  for (var i = 0, _len = a.length-1; i <= _len; i++){
    reversed[i] = a[_len-i]
  }
  return reversed
}
function deinterlace(a){
  var odd = [], even = []
  for (var i = 0, _len = a.length; i < _len; i++) {
    if (i % 2) even.push(a[i])
    else odd.push(a[i])
  }
  return [even, odd]
}
function weave(a){
  var aa = deinterlace(a)
  var b = []
  aa[0].forEach(function(el){ b.push(el) })
  reverse(aa[1]).forEach(function(el){ b.push(el) })
  return b
}

var guid_syllables = "iz az ez or iv ex baz el lo lum ot un no".split(" ")
var guid_n = 0
function guid(n){
	var len = guid_syllables.length
	return ((++guid_n*(len-1)*(~~log(guid_n))).toString(len)).split("").map(function(s){
		return guid_syllables[parseInt(s, len) % len--]
	}).join("")
}

function defaults (dest, src) {
	dest = dest || {}
	for (var i in src) {
		dest[i] = typeof dest[i] == 'undefined' ? src[i] : dest[i]
	}
	return dest
}

// Change straight quotes to curly and double hyphens to em-dashes.
function smarten(a) {
  a = a.replace(/(^|[-\u2014\s(\["])'/g, "$1\u2018");       // opening singles
  a = a.replace(/'/g, "\u2019");                            // closing singles & apostrophes
  a = a.replace(/(^|[-\u2014/\[(\u2018\s])"/g, "$1\u201c"); // opening doubles
  a = a.replace(/"/g, "\u201d");                            // closing doubles
  a = a.replace(/--/g, "\u2014");                           // em-dashes
  return a
};

(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());
