const gpio = require('pi-gpio')
let flag=false

gpio.open(16, "output", function(err) {		// Open pin 16 for output
	console.log(err)
});
gpio.open(18, "output",err=>{
  if(err){
    console.log(err)
  }
  gpio.write(18,0)
})

setInterval(()=>{
	gpio.write(16, flag?1:0, function() {			// Set pin 16 high (1)
		// gpio.close(8);						// Close pin 16
	});
	flag=!flag
	console.log('change! ::',flag?1:0)
},500)

// setInterval(()=>{
// 	gpio.write(8, flag?1:0, e=>{
// 		console.log('pi-gpio-waring!!',e)
// 	});
// 	flag=!flag
// },300)
