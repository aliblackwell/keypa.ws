"""
Get keyboard input and predict cat or human
"""
from __future__ import print_function
import sys
import time
import queue as _queue
import keyboard
from coremltools.models import MLModel

EMBEDDING_PATH = './model/KeyPaws.mlproj/Models/KeyPaws 4.mlmodel'
EMBEDDING_MODEL = MLModel(EMBEDDING_PATH)

# embedding_spec = EMBEDDING_MODEL.get_spec()
# print(embedding_spec.description)

EVENTS_QUEUE = _queue.Queue()
keyboard.start_recording(EVENTS_QUEUE)


def convert_to_query(recorded):
    "Format keyboard events for ML model"
    scan_code_list = ''
    type_list = ''
    time_list = ''
    for key_event in recorded:
        scan_code_list += ';' + str(key_event.scan_code)
        type_list += ';' + key_event.event_type
        time_list += ';' + str(key_event.time).split('.')[1]
    return {'key_code': scan_code_list, 'direction': type_list, 'time_stamp': time_list}


def get_prediction(query):
    "Make a prediction"
    prediction = EMBEDDING_MODEL.predict(query)
    print(prediction['target'])
    sys.stdout.flush()


while True:
    time.sleep(1)
    STREAM = list(EVENTS_QUEUE.queue)
    GOT_KEYS = len(STREAM)
    if GOT_KEYS > 0:
        EVENTS_QUEUE.queue.clear()
        QUERY = convert_to_query(STREAM)
        get_prediction(QUERY)
