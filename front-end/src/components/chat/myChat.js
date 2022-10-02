import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import '../../../src/App.css'

import { Avatar, Divider, Tooltip } from 'antd';

function MyChat({text}) {

    return (
        <div className="w-full flex items-center justify-end">
            <div className='p-3 message-bubble-mine bg-green-200 whitespace-normal'>
                {text}
            </div>
        </div>


    )
}

export {MyChat}