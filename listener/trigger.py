import sys
import time
import keyboard
import queue as _queue

events_queue = _queue.Queue()
keyboard.start_recording(events_queue)

while True:    
    events_queue.queue.clear()
    print('active')
    sys.stdout.flush()
    time.sleep(1) 
