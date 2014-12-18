# StylusVars

Converts javascript variables to stylus variables; allows to use one configuration file for your sizes and colors in both javascript and stylus.
Accepts nested variables, and automatically parses units and colors.

## Usage

```javascript
var config = {
	sizes:{
		width:"500px"
	,	height:"200px"
	}
,	background:"rgba(10,10,100)"
,	color:[100,10,10,.5]//this array will be parsed as a color because the key contains "background" or "color"
,	someArray:[100,0,0,2]
}
var str = require('fs').readFileSync(__dirname+'/style.styl',{encoding:'utf8'});

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


```stylus
//style.styl
div
	width sizes-width + 50
	height sizes-height
	background background
	color color
```

yields:

```css
div {
  width: 550px;
  height: 200px;
  background: #0a0a64;
  color: rgba(100,10,10,0.5);
}
```