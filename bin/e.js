const pi=require('wiringpi-node')
const repl = require('repl')

pi.setup('gpio')

pi.pinMode(23,pi.OUTPUT)
let value=1

repl.start({
	prompt: '请输入字符> ',
	input: inputCtrl
})

function inputCtrl(v) {
	console.log(arguments)

	// repl.end()
// 	while(true){
// 		pi.digitalWrite(23,value)
// 		value=+!value
// 		pi.delay(100)
// //	console.log(Date.now())
// 	}
}

