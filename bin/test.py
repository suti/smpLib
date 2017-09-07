import RPi.GPIO as GPIO
import time

try:
    import RPi.GPIO as GPIO
except RuntimeError:
    print("引入错误")

# Gpio_flag = 1

# def setTimeOutTo():
#     global Gpio_flag
#     GPIO.output(11,Gpio_flag)
#     Gpio_flag=1 if False else 0
#     time.sleep(0.5)
#     setTimeOutTo()

def watcher(v):
    print (time.time())
    print (GPIO.input(v))


GPIO.setmode(GPIO.BOARD)
GPIO.setwarnings(False)

GPIO.setup(12,GPIO.IN)
GPIO.setup(11,GPIO.OUT)

# GPIO.add_event_detect(12, GPIO.RISING,callback=watcher)
#
# # setTimeOutTo()
#
# while True:
#     GPIO.output(11,0)
#     time.sleep(0.5)
#     GPIO.output(11,1)
#     time.sleep(0.5)

inputValue = input("请输入字符")
inputArr = []
for str in inputValue:
    inputArr.append(ord(str))

print (inputArr)
for byte in inputArr:
    byteLength=8
    for i in range(0,byteLength):
        time.sleep(0.2)
        if byte>>i&1 :
            GPIO.output(11,1)
        else:
            GPIO.output(11,0)
