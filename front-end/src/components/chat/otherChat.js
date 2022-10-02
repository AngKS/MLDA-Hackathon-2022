import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import '../../../src/App.css'

import { Avatar, Divider, Tooltip } from 'antd';
import axios from 'axios'

function OtherChat({text}) {

    const [sentiments, setSentiments] = useState(null)

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



    // fetch(
    //     'https://mlda-sentiment-2022.herokuapp.com/v1/models/sentiment:predict', {
    //     'method': 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(data),
    // }
    // )
    //     .then((response) => response.json())
    //     .then((data) => {
    //         console.log(data)
    //         let emotion = emotionCategory(data)
    //         console.log(emotion)

    //         // state update code here!!!!!!!!!!!!!!!!!
            
    //     })

    useEffect(() => {

        // run sentiment analysis here
        axios.post(
            'https://mlda-sentiment-2022.herokuapp.com/v1/models/sentiment:predict',
            {
                inputs: [text]
            }

        ).then(result => {
            let emotion = emotionCategory(result)
            setSentiments(emotion)
        })
    }, [])
    
    useEffect(() => {
        
        if (sentiments == 'Positive') {
            let div = document.getElementById('prediction')
            div.classList.add('bg-green-200')
        } else if (sentiments == 'Negative') {
            let div = document.getElementById('prediction')
            div.classList.add('bg-red-200')
        } else {
            let div = document.getElementById('prediction')
            div.classList.add('bg-yellow-200')
        }


    }, [sentiments])
    

    return (
        <div>
            <div className='w-auto p-3 message-bubble whitespace-normal'>
                {text}
            </div>

            <span id="prediction" className="text-sm rounded-xl text-white absolute w-fit h-fit px-2">{sentiments}</span>

        </div>

    )
}

export {OtherChat}