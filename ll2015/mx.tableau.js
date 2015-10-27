

var Tableau = function(){
	this.extend = extend.bind(Tableau)

	function extend (props) {
		var Super = this
		var ExtendedTableau = function () {
			Super.call(this)
			props.init && props.init.apply(this, arguments)
		}
		ExtendedTableau.prototype = Object.create(Tableau.prototype)
		for (var prop in props) {
			if (props.hasOwnProperty(prop) && prop !== 'init') {
				ExtendedTableau.prototype[prop] = props[prop]
			}
		}
		ExtendedTableau.extend = extend.bind(ExtendedTableau)
		return ExtendedTableau
	}
}

Tableau.prototype.init = function(opt){}
Tableau.prototype.animate = function(t){}
Tableau.prototype.show = function(){}
Tableau.prototype.hide = function(){}

MX.Tableau = new Tableau()
MX.Tableaux = {}

/*

MX.Tableaux.Foo = MX.Tableau.extend({
	// this will be called within the contructor
	init: function (opt) {
	},
	
	show: function(){
	},
	
	hide: function(){
	},
	
	animate: function() {
	}
})

*/
