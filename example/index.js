var config = {
	sizes:{
		width:"500px"
	,	height:"200px"
	}
,	background:"rgba(10,10,100)"
,	color:[100,10,10,.5]
,	someArray:[100,0,0,2]
}
var str = require('fs').readFileSync(__dirname+'/style.styl',{encoding:'utf8'});

var stylus = require('stylus');

var	stylusVars = require('../index')(config,{delimiter:'-'});

stylus(str)
	.set('filename','style.css')
	.use(stylusVars)
	.render(function(err, css){
		if(err){throw err;}
		console.log(css);
	})
;