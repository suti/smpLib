import RPi.GPIO as GPIO
import time

try:
    import RPi.GPIO as GPIO
except RuntimeError:
    print("引入错误")

GPIO.setmode(GPIO.BOARD)
GPIO.setwarnings(False)

Gpio_flag=1

GPIO.add_event_detect(18, GPIO.RISING,callback=watcher)

def setTimeOutTo():
    GPIO.output(16,Gpio_flag)
    Gpio_flag=1 if False else 0
    time.sleep(0.1)
    setTimeOutTo()

def watcher (v):
    print time.time()
    print ':: '+v



