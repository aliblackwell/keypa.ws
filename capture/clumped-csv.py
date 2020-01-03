import json
import csv
import os
import random

titles = ['key_code', 'direction', 'time_stamp', 'target']

with open('validate.csv', 'w') as validate_file:
    validate_writer = csv.writer(validate_file)
    validate_writer.writerow(titles)
    with open('testing.csv', 'w') as testing_file:
        testing_writer = csv.writer(testing_file)
        testing_writer.writerow(titles)
        with open('training.csv', 'w') as new_file:
            training_writer = csv.writer(new_file)
            training_writer.writerow(titles)
            cat_files = os.listdir(os.getcwd() + '/cat/')
            cat_files_wdir = []
            for f in cat_files:
                cat_files_wdir.append('cat/'+f)
            human_files = os.listdir(os.getcwd() + '/human/')
            human_files_wdir = []
            for h in human_files:
                human_files_wdir.append('human/'+h)
            all_files = cat_files_wdir + human_files_wdir
            random.shuffle(all_files)
            total_files = len(all_files)
            tenth = int(total_files / 10)
            counter = 0
            for filename in all_files:
                if filename.endswith(".json"):
                    #print("json file found:\t", filename)
                    mammal = filename.split('/')[0]
                    parsed = json.loads(open(filename).read())

                    scan_code_list = ''
                    type_list = ''
                    time_list = ''
                    target = mammal
                    for item in parsed:
                        scan_code_list += ';' + str(item['scan_code'])
                        type_list += ';' + item['type']
                        time_list += ';' + str(item['time']).split('.')[1]
                    if(counter < tenth):
                        validate_writer.writerow(
                            [scan_code_list, type_list, time_list, target])
                    elif (counter < tenth*2):
                        testing_writer.writerow(
                            [scan_code_list, type_list, time_list, target])
                    else:
                        training_writer.writerow(
                            [scan_code_list, type_list, time_list, target])
                    counter = counter + 1
