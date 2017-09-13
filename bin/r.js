const pi=require('wiringpi-node')

pi.setup('gpio')

pi.pinMode(24,pi.INPUT)

let time=null,data={arr:[]}
let flag=false

setTimeout(()=>{
	console.log('ok')
},0)

pi.pullUpDnControl(24,pi.PUD_DOWN)

pi.wiringPiISR(24,pi.INT_EDGE_BOTH,()=>{
	// if(time){
	// 	let delay=Date.now()-time
	// 	if(delay>100){
	// 		let n=((delay/100)|0)+((delay-((delay/100)|0)*100)>100?1:0)-1,t=[]
	// 		for(let i=0;i<n;i++)
	// 			t.push(0)
	// 		data.arr.push(...t,1)
	// 	}else {
	// 		data.arr.push(1)
	// 	}
	// 	time=Date.now()
	// }else {
	// 	time=Date.now()
	// 	console.log(data)
	// 	data.arr.push(1)
	// }
	let value = pi.digitalRead(24)
	// console.log(value)
	if(!value){
		time=Date.now()
	}else {
		console.log(Date.now(),time,Date.now()-time)
		if(Date.now()-time>100){
			data.arr.push(1)
		}else {
			data.arr.push(0)
		}
		dataCtrl(data.arr)
	}


})

// pi.wiringPiISR(24,pi.INT_EDGE_FALLING,e=>{
//
// })



function dataCtrl(v) {
	if(v==undefined) return
	// console.log(v)
	if(v.length<8) return
	let arrs=[],code
	for(let i=0;i<8;i++){
		arrs.push(data.arr.shift())
	}
	if(!flag){
		flag=true
		return
	}
	code=parseInt(arrs.join(''),2)
	if(flag&&code===129){
		console.log('exit!')
		process.exit()
	}
	console.log(code,String.fromCharCode(code))
}
