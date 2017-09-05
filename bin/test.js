const gpio = require('pi-gpio')
const express = require('express')
const router = express.Router()
const app = express()
let flag=false

let interval=null,routers=[]
gpio.open(16, "output", function(err) {		// Open pin 16 for output
	if(err) throw err

});
gpio.open(18, "output",err=>{
	if(err) throw err
  gpio.write(18,0)
})

routers.push(router.get('/start',(req,res)=>{
	interval=setInterval(()=>{
		gpio.write(16, flag?1:0, ()=> {
			flag=!flag
			console.log(`${Date.now()},::${flag?1:0}`)
		});
	},500)
	res.send('start')
	res.end()
}))

routers.push(router.get('/stop',(req,res)=>{
	clearInterval(interval)
	res.send('stop')
	res.end()
}))

app.use('/',routers)