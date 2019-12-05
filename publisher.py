import time
import sys
import zmq

context = zmq.Context()
socket = context.socket(zmq.PUB)
socket.bind("tcp://*:3002")

while True:
    #  Send reply back to client
    socket.send(b"world")
    time.sleep(5)
