"""
Data wrangling for Create ML model training
"""

import json
import csv
import os
import random

TITLES = ['key_code', 'direction', 'time_stamp', 'target']
FRACTION = 20
with open('capture/validate.csv', 'w') as validate_file:
    VALIDATE_WRITER = csv.writer(validate_file)
    VALIDATE_WRITER.writerow(TITLES)
    with open('capture/testing.csv', 'w') as testing_file:
        TESTING_WRITER = csv.writer(testing_file)
        TESTING_WRITER.writerow(TITLES)
        with open('capture/training.csv', 'w') as new_file:
            TRAINING_WRITER = csv.writer(new_file)
            TRAINING_WRITER.writerow(TITLES)
            CAT_FILES = os.listdir(os.getcwd() + '/capture/cat/')
            CAT_FILES_WDIR = []
            for f in CAT_FILES:
                CAT_FILES_WDIR.append('capture/cat/'+f)
            HUMAN_FILES = os.listdir(os.getcwd() + '/capture/human/')
            HUMAN_FILES_WDIR = []
            for h in HUMAN_FILES:
                HUMAN_FILES_WDIR.append('capture/human/'+h)
            ALL_FILES = CAT_FILES_WDIR + HUMAN_FILES_WDIR
            random.shuffle(ALL_FILES)
            TOTAL_FILES = len(ALL_FILES)
            PORTION = int(TOTAL_FILES / FRACTION)
            COUNTER = 0
            for filename in ALL_FILES:
                if filename.endswith(".json"):
                    #print("json file found:\t", filename)
                    mammal = filename.split('/')[1]
                    parsed = json.loads(open(filename).read())

                    scan_code_list = ''
                    type_list = ''
                    time_list = ''
                    target = mammal
                    for item in parsed:
                        scan_code_list += ';' + str(item['scan_code'])
                        type_list += ';' + item['type']
                        time_list += ';' + str(item['time'])
                    if COUNTER < PORTION:
                        VALIDATE_WRITER.writerow(
                            [scan_code_list, type_list, time_list, target])
                    elif COUNTER < PORTION*2:
                        TESTING_WRITER.writerow(
                            [scan_code_list, type_list, time_list, target])
                    else:
                        TRAINING_WRITER.writerow(
                            [scan_code_list, type_list, time_list, target])
                    COUNTER = COUNTER + 1
