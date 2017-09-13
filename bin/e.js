const pi=require('wiringpi-node')
const readline = require('readline')

pi.setup('gpio')

pi.pinMode(23,pi.OUTPUT)

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

rl.question('请输入字符串', v => {
	strs(v)
	rl.close();
});

function strs(v) {
	let arr=[]
	v.split('').forEach(e=>{
		arr.push(e.charCodeAt(0))
	})
	for(let i=0;i<arr.length;i++){
		for(let j=0;j<8;j++){
			let value=arr[i]>>j&1
			console.log(`[${i}][${j}]::${value}`)
			if(value){
				pi.digitalWrite(23,value)
				pi.delay(50)
				pi.digitalWrite(23,+!value)
				pi.delay(50)
			}else {
				pi.delay(100)
			}
		}
	}
}
