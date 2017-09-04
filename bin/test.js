const gpio = require('pi-gpio')
let flag=false
setInterval(()=>{
	gpio.write(8, flag?1:0, e=>{
		console.log('pi-gpio-waring!!',e)
	});
	flag=!flag
})