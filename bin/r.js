const pi=require('wiringpi-node')

pi.setup('gpio')

pi.pinMode(24,pi.INPUT)

let time=null,data={arr:[]}
let flag=false,strData=[]

setTimeout(()=>{
	console.log('ok')
},0)

pi.pullUpDnControl(24,pi.PUD_DOWN)

pi.wiringPiISR(24,pi.INT_EDGE_BOTH,()=>{
	let value = pi.digitalRead(24)
	if(!value){
		time=Date.now()
	}else {
		// console.log(Date.now(),time,Date.now()-time)
		if(Date.now()-time>24){
			data.arr.push(1)
		}else {
			data.arr.push(0)
		}
		dataCtrl(data.arr)
	}


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
		console.log('exit!')
		strData=[]
		// process.exit()
	}
	// console.log(code,String.fromCharCode(code))
	strData.push(String.fromCharCode(code))
	process.stdout.write(String.fromCharCode(code))
}
