let pi=require('wiringpi-node')

pi.setup('gpio')

pi.pinMode(23,pi.OUTPUT)
pi.pinMode(24,pi.INPUT)
//pi.digitalWrite(15,0)
let value=1

pi.pullUpDnControl(24,pi.PUD_UP)
pi.wiringPiISR(24,pi.INT_EDGE_FALLING,e=>{
	console.log(`pin changed to low ${e}`)
})

while(true){
	pi.digitalWrite(23,value)
	value=+!value
	pi.delay(100)
//	console.log(Date.now())
}
