const pi=require('wiringpi-node')

pi.setup('phys')

pi.pinMode(18,pi.INPUT)

let time=null,data=[]
let flag=false,strData=[],count=0

setTimeout(()=>{
	console.log('ok')
},0)

pi.pullUpDnControl(18,pi.PUD_DOWN)

pi.wiringPiISR(18,pi.INT_EDGE_BOTH,()=>{

	if(!(count%2)){
		time=Date.now()
	}else {
		if(Date.now()-time>40){
			data.push(1)
		}else {
			data.push(0)
		}
		dataCtrl()
	}
	count+=1

})

function dataCtrl() {
	if(data==undefined) return
	// console.log(data)
	if(data.length<8) return
	let arrs=[],code
	for(let i=0;i<8;i++){
		arrs.push(data.shift())
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
