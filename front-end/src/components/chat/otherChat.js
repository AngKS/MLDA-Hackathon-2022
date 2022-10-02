import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import '../../../src/App.css'

import { Avatar, Divider, Tooltip } from 'antd';

function OtherChat({text}) {

    return (
        <div>
            <div className='w-auto p-3 message-bubble'>
                {text}
            </div>
        </div>

    )
}

export {OtherChat}