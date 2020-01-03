import sys
import time
import keyboard
import queue as _queue
import coremltools
from coremltools.models import MLModel

embedding_path = './model/KeyPaws.mlproj/Models/KeyPaws 4.mlmodel'
embedding_model = MLModel(embedding_path)

# embedding_spec = embedding_model.get_spec()
# print(embedding_spec.description)

events_queue = _queue.Queue()
keyboard.start_recording(events_queue)

def convert_to_query(recorded):
    scan_code_list = ''
    type_list = ''
    time_list = ''
    for key_event in recorded:
        scan_code_list += ';' + str(key_event.scan_code)
        type_list += ';' + key_event.event_type
        time_list += ';' + str(key_event.time).split('.')[1]
    return {'key_code': scan_code_list, 'direction': type_list, 'time_stamp': time_list}

def get_prediction(q):
  prediction = embedding_model.predict(q)
  #if (prediction['target'] == 'cat'):
  print(prediction['target'])
  sys.stdout.flush()

while True:
    time.sleep(1)
    stream = list(events_queue.queue)
    if (len(stream) > 0):
        events_queue.queue.clear()
        query = convert_to_query(stream)
        get_prediction(query)
