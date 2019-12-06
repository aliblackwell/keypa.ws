import json
import csv
import os
for filename in os.listdir(os.getcwd() + '/cat/'):
    if filename.endswith(".json"):
        print("json file found:\t", filename)
        parsed = json.loads(open('cat/' + filename).read())
        with open('cat-csv/'+filename+'.csv', 'w') as new_file:
          csv_file = csv.writer(new_file)
          for item in parsed:
              csv_file.writerow([item['scan_code'], item['type'], item['time']])
