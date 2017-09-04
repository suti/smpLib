const gpio = require('pi-gpio')
let flag=false

gpio.open(8, "output", function(err) {		// Open pin 16 for output
	console.log(err)
});
setInterval(()=>{
	gpio.write(8, flag?1:0, function() {			// Set pin 16 high (1)
		// gpio.close(8);						// Close pin 16
	});
	flag=!flag
	console.log('change! ::',flag?1:0)
},1000)

// setInterval(()=>{
// 	gpio.write(8, flag?1:0, e=>{
// 		console.log('pi-gpio-waring!!',e)
// 	});
// 	flag=!flag
// },300)