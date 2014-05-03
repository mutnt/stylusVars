var config = {
	"sizes":{
		"width":"500px"
	,	"height":"200px"
	}
}
var str = "div{width:sizes-width;height:sizes-height;}";

var stylus = require('stylus');

var	stylusVars = require('./index')(config,{delimiter:'-'});

stylus(str)
	.set('filename','style.css')
	.use(stylusVars)
	.render(function(err, css){
		if(err){throw err;}
		console.log(css);
	})
;