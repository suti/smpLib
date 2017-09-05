const gpio = require('pi-gpio')
const express = require('express')
const router = express.Router()
const app = express()
let flag=false

let interval=null,routers=[]


routers.push(router.get('/start',(req,res)=>{
	gpio.open(16, "output", function(err) {		// Open pin 16 for output
		// if(err) throw err
		console.log(err)

	});
	gpio.open(18, "output",err=>{
		// if(err) throw err
		console.log(err)
		gpio.write(18,0)
	})
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
	gpio.close(16)
	gpio.close(18)
	clearInterval(interval)
	res.send('stop')
	res.end()
}))
routers.push(router.get('/status',(req,res)=>{
	res.send(`status::${interval!==null?'running':'stop'}`)
	res.end()
}))

app.use('/',routers)

app.listen(233)