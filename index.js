var stylus = require('stylus');
var nodes = stylus.nodes;
var colors = require('./colors');

var flattenObject = function(obj,delimiter) {
	var ret = {};
	delimiter = delimiter || '.';
	for (var i in obj) {
		if (!obj.hasOwnProperty(i)){continue;}
		
		if (toString.call(obj[i]) == '[object Object]') {
			var flatObject = flattenObject(obj[i],delimiter);
			for (var x in flatObject) {
				if (!flatObject.hasOwnProperty(x)){continue;}
				ret[i+delimiter+x] = flatObject[x];
			}
		}
		else {ret[i] = obj[i];}
	}
	return ret;
};

function parseColor(str){
  if (str.substr(0,1) === '#') {
    // Handle color shorthands (like #abc)
    var shorthand = str.length === 4,
        m = str.match(shorthand ? /\w/g : /\w{2}/g);

    if (!m) return;
    m = m.map(function(s) { return parseInt(shorthand ? s+s : s, 16) });
    return new nodes.RGBA(m[0],m[1],m[2],1);
  }
  else if (str.substr(0,3) === 'rgb'){
    var m = str.match(/([0-9]*\.?[0-9]+)/g);
    if (!m) return;
    m = m.map(function(s){return parseFloat(s, 10)});
    return new nodes.RGBA(m[0], m[1], m[2], m[3] || 1);
  }
  else {
    var rgb = colors[str];
    if (!rgb) return;
    return new nodes.RGBA(rgb[0], rgb[1], rgb[2], 1);
  }
}

var guessNodeType = function(v,n){
	var u;
	if(typeof v == 'string'){
		u = v.match(/((?:\d|\.)+?)(\w\w|%)$/)
		if(u){
			return new nodes.Unit(parseFloat(u[1]),u[2]);
		}
		if(u = parseColor(v)){
			return u;
		}
	}
	if(Array.isArray(v)){
		if(/background|color/i.test(n) && v.length >=3 && v.every(function(item){return item==parseFloat(item);})){
			return new nodes.RGBA(v[0],v[1],v[2],v[3]?v[3]:1);
		}
	}
	return new nodes.Literal(v);
}

var stylusVars = function(config,options){

	config = flattenObject(config, (options && options.delimiter) || '-');

	var addVars = function(style){
		var n, v, u;
		for(n in config){
			v = config[n];
			style.define(n,guessNodeType(v,n));
		}
	}

	return addVars;
}

module.exports = stylusVars;