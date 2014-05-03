var stylus = require('stylus');
var nodes = stylus.nodes;

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

var stylusVars = function(config,options){

	config = flattenObject(config, (options && options.delimiter) || '-');

	var addVars = function(style){
		var n, v, u;
		for(n in config){
			v = config[n];
			if(u = v.match(/((?:\d|\.)+?)(\w\w|%)$/)){
				v = new nodes.Unit(parseFloat(u[1]),u[2]);
			}
			style.define(n,v);	
		}
	}

	return addVars;
}

module.exports = stylusVars;