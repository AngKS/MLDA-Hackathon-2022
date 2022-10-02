import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import '../../../src/App.css'

import { Avatar, Divider, Tooltip } from 'antd';

function OtherChat({text}) {

    const []

    function emotionCategory(dict_input) {

        let sigmoid_output = dict_input['outputs'][0][0]

        let emotion = ''
        if (sigmoid_output < 0.25) {
            emotion = 'Negative'
        } else if (sigmoid_output >= 0.25 && sigmoid_output < 0.75) {
            emotion = 'Neutral'
        } else {
            emotion = 'Positive'
        }

        return emotion
    }

    dict_input = { 'outputs': [[0.00316798687]] }
    emotionCategory(dict_input)


    //input data here
    data = {
        'inputs': [text]
    }



    fetch(
        'https://mlda-sentiment-2022.herokuapp.com/v1/models/sentiment:predict', {
        'method': 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }
    )
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            emotion = emotionCategory(data)
            console.log(emotion)

            // state update code here!!!!!!!!!!!!!!!!!
            
        })



    return (
        <div>
            <div className='w-auto p-3 message-bubble whitespace-normal'>
                {text}
            </div>
        </div>

    )
}

export {OtherChat}