const pi=require('wiringpi-node')

pi.setup('phys')

pi.pinMode(18,pi.INPUT)
pi.pinMode(20,pi.INPUT)

let time=null,data={arr:[]}
let flag=false,strData=[]

setTimeout(()=>{
	console.log('ok')
},0)

pi.pullUpDnControl(18,pi.PUD_DOWN)
pi.pullUpDnControl(20,pi.PUD_DOWN)

pi.wiringPiISR(18,pi.INT_EDGE_RISING,()=>{
		time=Date.now()
		console.log('rising',time)
})

pi.wiringPiISR(20,pi.INT_EDGE_FALLING,()=>{
	console.log(Date.now(),Date.now()-time)
	if(Date.now()-time>4){
		data.arr.push(1)
	}else {
		data.arr.push(0)
	}
	dataCtrl(data.arr)
})

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
		console.log('\r\n')
		console.log('>>>')
		strData=[]
		flag=false
		// process.exit()
	}
	// console.log(code,String.fromCharCode(code))
	strData.push(String.fromCharCode(code))
	process.stdout.write(String.fromCharCode(code))
}
