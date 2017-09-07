"use strict"

const gpio = require('pi-gpio')
const express = require('express')
const router = express.Router()
const app = express()

let flag=false

let interval=null,routers=[],counts=0


routers.push(router.get('/start',(req,res)=> {
	gpio.open(16, "output", (err) => {
		err && console.log(err)

		interval = setInterval(() => {
			gpio.write(16, flag ? 1 : 0, () => {
				flag = !flag
				counts+=1
			})

		}, 2)
		gpio.open(15, "output", (err) => {
			err && console.log(err)

			gpio.write(15, 0)


		})


		res.send('start')
		res.end()
	})
}))

// +async function init() {
// 	let listener18=await listener(18)
// 	// let listener19=await listener(19)
//
// 	listener18(v=>{
// 		console.log(`${Date.now()},18::${v}`)
// 	})
// 	// listener19(v=>{
// 	// 	console.log(`${Date.now()},19::${v}`)
// 	// })
//
// }()
//
// gpio.getDirection(19,(err,val)=>{
// 	console.log(val)
// })
let listener18,count=0
listener(18).then(v=>{
	listener18=v
	listener18(v=>{
		console.log(`${Date.now()},18::${v}`)
		count+=1
	})
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

	return new Promise(resolve=>{
		gpio.open(num,'input',err=>{
			err&&console.log(err)
			resolve(listenerd)
		})
	})

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
	res.send('stop',count,counts)
	res.end()
}))
routers.push(router.get('/status',(req,res)=>{
	res.send(`status::${interval!==null?'running':'stop'}`)
	res.end()
}))

app.use('/',routers)

app.listen(233)