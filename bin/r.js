const pi=require('wiringpi-node')

pi.setup('phys')

pi.pinMode(18,pi.INPUT)

let time=null,data={arr:[]}
let flag=false,strData=[],test=[]

setTimeout(()=>{
	console.log('ok')
},0)

pi.pullUpDnControl(18,pi.PUD_DOWN)

pi.wiringPiISR(18,pi.INT_EDGE_BOTH,()=>{
	let value = pi.digitalRead(18)
	if(!value){
		time=Date.now()
	}else {
		// console.log(Date.now(),time,Date.now()-time)
		if(Date.now()-time>50){
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
	// test.push(arrs)
	// if(test.length>2){
	// 	test.shift()
	// }
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
	strData.push(String.fromCharCode(code))
	process.stdout.write(String.fromCharCode(code))
}
