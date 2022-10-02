import gzip
import shutil
import requests
import json
import pandas as pd
import os
import numpy as np
import plotly.express as px
import tensorflow
import seaborn as sns
import matplotlib.pyplot as plt
from collections import Counter
from textblob import TextBlob

import concurrent.futures.process


def correcting(input, index):
    print(f"{index}")
    tb = TextBlob(input)
    corrected = str(tb.correct())
    return corrected


def main():
    print('Reading Dataset')

    df = pd.read_json('consolidated/final_2.json')
    df = df.drop(columns=['index'], axis=0)
    df['count'] = 1
    df = df.dropna()
    df = df.iloc[:5000]

    print('Extracting values')
    review_list = df['reviewText'].values
    correct_list = []

    review_index = [i for i in range(len(review_list))]

    print('Start Processing')
    with concurrent.futures.ProcessPoolExecutor() as executor:
        for output, index in zip(executor.map(correcting, review_list, review_index), review_index):
            print(f"{index}/{len(review_list)}")
            correct_list.append(output)

    df['correctedText'] = correct_list
    df.to_json('./formatted/final_3.json')

if __name__ == '__main__':
    main()