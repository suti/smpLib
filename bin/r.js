const pi=require('wiringpi-node')

pi.setup('gpio')

pi.pinMode(24,pi.INPUT)

let time=null,data={arr:[]}

// let {arr}=data
// arr=[]


// define(data,'arr',dataCtrl)

data.arr=[]

setTimeout(()=>{
	console.log('ok')
},3000)

pi.pullUpDnControl(24,pi.PUD_UP)
pi.wiringPiISR(24,pi.INT_EDGE_RISING,e=>{
	if(time){
		let delay=Date.now()-time
		if(delay>120){
			let n=((delay/100)|0)+((delay-((delay/100)|0)*100)>20?1:0)-1,t=[]
			for(let i=0;i<n;i++)
				t.push(0)
			data.arr.push(...t,1)
		}else {
			data.arr.push(1)
		}
		time=Date.now()
	}else {
		time=Date.now()
		console.log(data)
		data.arr.push(1)
	}
	dataCtrl(data.arr)
})

function dataCtrl(v) {
	if(v==undefined) return
	console.log(v)
	if(v.length<=8) return
	let arrs=[],code
	for(let i=0;i<8;i++){
		arrs.push(data.arr.shift())
	}
	code=parseInt(arrs.join(''),2)
	console.log(code,String.fromCharCode(code))
}

// function define(obj,key,fc){
// 	let val,_this=this
// 	Object.defineProperty(obj,key,{
// 		enumerable: true,
// 		configurable: true,
// 		get: ()=>val,
// 		set:newVal=> {
// 			var value =  val
// 			if (newVal === value) {
// 				return
// 			}
// 			val = newVal
// 			fc.call(_this)
// 		}
// 	})
// }

