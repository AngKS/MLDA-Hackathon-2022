import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import '../../../src/App.css'

import { Avatar, Divider, Tooltip } from 'antd';
import axios from 'axios'

function OtherChat({text, sentiment, setpredicted}) {

    const [sentiments, setSentiments] = useState("Nothing")

    function emotionCategory(dict_input) {

        let sigmoid_output = dict_input.data['outputs'][0][0]
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


    useEffect(() => {

        // run sentiment analysis here
        axios.post(
            'https://flask-sentiment-ntu.herokuapp.com/predict',
            {
                inputs: [text]
            }

        ).then(result => {
            console.log(result)
            
            let emotion = emotionCategory(result)
            console.log(emotion)
            setSentiments(emotion)
            setpredicted(emotion)
        })
    }, [])
    
    

    return (
        <div className="relative">
            <div className='w-auto p-3 message-bubble whitespace-normal'>
                {text}
            </div>


        </div>

    )
}

export {OtherChat}