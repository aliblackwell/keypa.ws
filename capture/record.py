"""
Record keyboard input for humans and cats
"""
from __future__ import print_function

import sys
import json
import time
from time import time as now
import queue as _queue
import keyboard

EVENTS_QUEUE = _queue.Queue()
keyboard.start_recording(EVENTS_QUEUE)

# gets the second arg e.g. `python3 record.py human`
# will need to change when working with compiled `./dist/record human`

# kpPath = str(sys.argv[0])
# if (kpPath is 'python3' or kpPath is 'python'):
#     kpPath = str(sys.argv[1])
# parentDir = kpPath.split('/')[1]
BEING = str(sys.argv[1])


def convert_to_dict(recorded, began):
    """ Format the keypresses """
    keyboard_activity = []
    for key_event in recorded:
        time_stamp = int((began - key_event.time) * -1000)
        k = {
            "scan_code": key_event.scan_code,
            "time": time_stamp,
            "type": key_event.event_type
        }
        keyboard_activity.append(k)
    keys_json = json.dumps(keyboard_activity)
    save_to_file(keys_json)


def save_to_file(json_data):
    """ Save to file based on BEING """
    print('saving')
    sys.stdout.flush()
    timestr = time.strftime("%Y%m%d-%H%M%S")
    filename = BEING + "/" + timestr + ".json"
    new_file = open('./capture/'+ filename, "w+")
    new_file.write(json_data)


while True:
    NOW = now()
    time.sleep(1)
    STREAM = list(EVENTS_QUEUE.queue)
    GOT_EVENTS = len(STREAM)
    if GOT_EVENTS > 0:
        EVENTS_QUEUE.queue.clear()
        convert_to_dict(STREAM, NOW)
