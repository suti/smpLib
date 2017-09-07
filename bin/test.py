import RPi.GPIO as GPIO
import time

try:
    import RPi.GPIO as GPIO
except RuntimeError:
    print("引入错误")

Gpio_flag = 1

def setTimeOutTo():
    global Gpio_flag
    GPIO.output(16,Gpio_flag)
    Gpio_flag=1 if False else 0
    time.sleep(0.1)
    setTimeOutTo()

def watcher(v):
    print (str(time.time())+':: '+v)


GPIO.setmode(GPIO.BOARD)
GPIO.setwarnings(False)

GPIO.setup(18,GPIO.IN)
GPIO.setup(16,GPIO.OUT)

GPIO.add_event_detect(18, GPIO.RISING,callback=watcher)

setTimeOutTo()


