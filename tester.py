import time
import sys
import zmq
import keyboard

context = zmq.Context()
socket = context.socket(zmq.PUB)
socket.bind("tcp://*:3026")


def print_pressed_keys(e):
    # e.name = key name, e.scan_code = code, e.time = timestamp
    # if (e.scan_code is 18):
    #     cat_detected()
    # line = ', '.join(str(name) for name in keyboard._pressed_events)
    # # '\r' and end='' overwrites the previous line.
    # # ' '*40 prints 40 spaces at the end to ensure the previous line is cleared.
    # print('\r' + line + ' '*40, end='')
    socket.send(b"world")


keyboard.hook(print_pressed_keys)

while True:
    time.sleep(1)
