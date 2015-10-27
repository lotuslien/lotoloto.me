var Loader = Loader || (function(){
  function Loader (readyCallback){
    this.assets = {};
    this.images = [];
    this.readyCallback = readyCallback;
  }

  // Register an asset as loading
  Loader.prototype.register = function(s){
    this.assets[s] = false;
  }

  // Signal that an asset has loaded
  Loader.prototype.ready = function(s){
    window.debug && console.log("ready >> " + s);

    this.assets[s] = true;
    if (this.loaded) return;
    if (! this.isReady()) return;

    this.loaded = true;
    this.readyCallback && this.readyCallback();
  }

  // (boolean) Is the loader ready?
  Loader.prototype.isReady = function(){
    for (var s in this.assets) {
      if (this.assets.hasOwnProperty(s) && this.assets[s] != true) {
        return false;
      }
    }
    return true;
  }

  // (int) Number of assets remaining
  Loader.prototype.remainingAssets = function(){
    var n = 0;
    for (var s in this.assets) {
      if (this.assets.hasOwnProperty(s) && this.assets[s] != true) {
        n++;
        console.log('remaining: ' + s);
      }
    }
    return n;
  }

  // Preload the images in config.images
  Loader.prototype.preloadImages = function(images){
    this.register("preload");
    for (var i = 0; i < images.length; i++) {
      this.preloadImage(images[i]);
    }
    this.ready("preload");
  }
  Loader.prototype.preloadImage = function(src){
    var _this = this;
    this.register(src);
    var img = new Image();
    img.onload = function(){
      _this.ready(src);
    }
    img.src = src;
    if (img.complete) img.onload();
    _this.images.push(img);
  }

  return Loader;
})();
