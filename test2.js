const gpio = require('pi-gpio')

let flag=false
gpio.close(16)
gpio.close(15)
	gpio.open(15, "output", (err) => {
		err && console.log(err)
		gpio.write(15, 0)
	})

gpio.open(16, "output", (err) => {
	err && console.log(err)

	interval = setInterval(() => {
		gpio.write(16, flag ? 1 : 0, () => {
			flag = !flag
			console.log(123)
		})
	}, 400)
})
