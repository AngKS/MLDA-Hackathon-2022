from sre_parse import CATEGORIES
from tkinter.messagebox import RETRY
from urllib import response
from flask import Flask, request
from flask import Flask, request, jsonify, json, make_response
import requests
import json
import numpy as np
import pandas as pd
import os
from joblib import dump, load
from flask_cors import CORS
from flask_talisman import Talisman
import pymongo
from datetime import datetime

import json
from bson import ObjectId

# load and reuse the model
app = Flask(__name__)
CORS(app)
Talisman(app, content_security_policy=None)



def predict_from_heroku(tokenized_list):
    url = 'https://mlda-sentiment-2022.herokuapp.com/v1/models/sentiment:predict'


    headers = {'content-Type': 'app/json'}
    json_response = requests.post(url, data=input_data, headers=headers)
    response = json.loads(json_response.text)
    return response


@app.route('/', methods=['GET'])
def landing():
    return "Hello World!"



@app.route('/predict', methods=['POST'])
def make_prediction():
    now = datetime.now()
    request_json = request.data

    print(request_json)

    url = 'https://mlda-sentiment-2022.herokuapp.com/v1/models/sentiment:predict'

    print(request_json)
    headers = {'content-Type': 'app/json'}
    json_response = requests.post(url, data=request_json, headers=headers)   
    response = json.loads(json_response.text)
    print(response)



    response = make_response(jsonify(response))
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response


    

if __name__ == '__main__':
    app.run(port=5000, debug=True)