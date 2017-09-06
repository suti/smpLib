const gpio = require('pi-gpio')
const express = require('express')
const router = express.Router()
const app = express()
let flag=false

let interval=null,routers=[]


routers.push(router.get('/start',(req,res)=>{
	gpio.open(16, "output", (err) =>{
		err&&console.log(err)
	})

	interval=setInterval(()=>{
		gpio.write(16, flag?1:0, ()=> {
			flag=!flag
			// console.log(`${Date.now()},::${flag?1:0}`)
		});

	},500)
	res.send('start')
	res.end()
}))

let listener18=listener(18)
let listener19=listener(19)

listener18(v=>{
	console.log(`${Date.now()},18::${v}`)
})
listener19(v=>{
	console.log(`${Date.now()},19::${v}`)
})

function listener(num) {
	let value=null
	let listenerd=function (func) {
		setTimeout(()=>{
			gpio.read(num,(err,val)=>{
				err&&console.log(err)
				if(val!==value){
					value=val
					func&&func(val)
				}
			})
			listenerd(func)
		},1)
	}
	return listenerd
}


// gpio.open(18, "input",err=>{
// 	err&&console.log(err)
// 	// gpio.write(18,0)
// 	gpio.read(18,(err,value)=>{
// 		console.log(value)
// 	})
// })

routers.push(router.get('/stop',(req,res)=>{
	gpio.close(16)
	gpio.close(18)
	clearInterval(interval)
	interval=null
	res.send('stop')
	res.end()
}))
routers.push(router.get('/status',(req,res)=>{
	res.send(`status::${interval!==null?'running':'stop'}`)
	res.end()
}))

app.use('/',routers)

app.listen(233)