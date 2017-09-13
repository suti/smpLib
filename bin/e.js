const pi=require('wiringpi-node')

pi.setup('gpio')

pi.pinMode(23,pi.OUTPUT)
let value=1


while(true){
	pi.digitalWrite(23,value)
	value=+!value
	pi.delay(100)
//	console.log(Date.now())
}
