import sys
import time
import json
import keyboard
import queue as _queue
import tkinter as tk

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


root = tk.Tk()

canvas1 = tk.Canvas(root, width=300, height=300)
canvas1.pack()


def hello():
    stream = list(events_queue.queue)
    query = convert_to_query(stream)
    label1 = tk.Label(root, text=query['direction'], fg='green',
                      font=('helvetica', 12, 'bold'))
    canvas1.create_window(150, 200, window=label1)


button1 = tk.Button(text='Click Me', command=hello, bg='brown', fg='white')
canvas1.create_window(150, 150, window=button1)

root.mainloop()


def save_to_file(query):
    keys_json = json.dumps(query)
    timestr = time.strftime("%Y%m%d-%H%M%S")
    filename = timestr + ".json"
    f = open(filename, "w+")
    f.write(keys_json)


def main():
    while True:
        time.sleep(2)
        stream = list(events_queue.queue)
        if (len(stream) > 0):
            events_queue.queue.clear()
            query = convert_to_query(stream)
            save_to_file(query)


if __name__ == "__main__":
    main()

print('hello')
