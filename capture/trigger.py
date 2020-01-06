"""
Trigger accessibility permission popup on Mac
"""

from __future__ import print_function

import sys
import time
import queue as _queue
import keyboard

EVENTS_QUEUE = _queue.Queue()
keyboard.start_recording(EVENTS_QUEUE)

while True:
    EVENTS_QUEUE.queue.clear()
    print('active')
    sys.stdout.flush()
    time.sleep(1)
