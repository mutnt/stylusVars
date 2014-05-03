# StylusVars

Converts javascript variables to stylus variables; allows to use one configuration file for your sizes and colors in both javascript and stylus.
Accepts nested variables, and automatically parses units.

## Usage

```js
var config = {
	"sizes":{
		"width":"500px"
	,	"height":"200px"
	}
}
var str = "div{width:sizes-width;height:sizes-height;}";

var stylus = require('stylus');

var	stylusVars = require('stylus-vars')(config,{delimiter:'-'});
// the delimiter option defines how nested objects will be represented

stylus(str)
	.set('filename','style.css')
	.use(stylusVars)
	.render(function(err, css){
		if(err){throw err;}
		console.log(css);
	})
;

```