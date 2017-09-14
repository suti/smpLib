const pi=require('wiringpi-node')
const readline = require('readline')

pi.setup('phys')

pi.pinMode(16,pi.OUTPUT)

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

setInput()

function setInput() {
	rl.question('请输入字符串', v => {
		strs(v)
		// rl.close();
	});
}


function strs(v) {
	let arr=[129]
	v.split('').forEach(e=>{
		arr.push(e.charCodeAt(0))
	})
	arr.push(129)
	for(let i=0;i<arr.length;i++){
		let items=arr[i].toString(2).split('')
		for(let x=items.length;x<8;x++){
			items.unshift('0')
		}
		process.stdout.write(`[${i}]::`)
		for(let j=0;j<8;j++){
			let value=items[j]|0
				// (arr[i]>>j)&1
			process.stdout.write(`${value}`)
			if(value){
				pi.digitalWrite(16,1)
				pi.delay(6)
			}else {
				pi.digitalWrite(16,1)
				pi.delay(2)
			}
			pi.digitalWrite(16,0)
			pi.delay(2)
		}
		console.log('\r\n')
	}

	setInput()
}
