import sys
import time
import keyboard
import json
import queue as _queue

events_queue = _queue.Queue()
keyboard.start_recording(events_queue)

# gets the second arg e.g. `python3 record.py human` 
# will need to change when working with compiled `./dist/record human`
being = str(sys.argv[1]) 

def convert_to_dict(recorded):
  keyboard_activity = []
  for key_event in recorded:
    k = {
      "scan_code": key_event.scan_code,
      "time": key_event.time,
      "type": key_event.event_type
    }
    keyboard_activity.append(k)
  keys_json = json.dumps(keyboard_activity)
  save_to_file(keys_json)

def save_to_file(json):
  timestr = time.strftime("%Y%m%d-%H%M%S")
  filename = being + "/" + timestr + ".json"
  f = open(filename, "w+")
  f.write(json)
  
while True:
  time.sleep(1)
  stream = list(events_queue.queue)
  if (len(stream) > 0):
    events_queue.queue.clear()
    convert_to_dict(stream)