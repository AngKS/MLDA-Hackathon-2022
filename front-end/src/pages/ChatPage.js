import "../styles/chatPage.css";
import React, { useState, useEffect } from "react";
import {TopBar} from "../common/Topbar"
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import { alpha, styled } from '@mui/material/styles';

function ChatPage() {

    const [inputTxt, setInputText] = useState('')
    const [otherPpl, setOtherPpl] = useState("Allan")


    const hendleChange = () => {
        return null
    }

    return (
        <div class='h-screen'>
            <TopBar current_page='Chat'/>

            <div className="w-3/5 mx-auto flex gap-2 justify-between h-[90%]">
                <div className=''>
                    
                </div>
                <div className='red basis-1/2 rounded-lg p-5'>
                    01
                </div>

                <div className='chat basis-1/2 rounded-lg p-5 flex flex-col gap-3'>
                {/* <TextField
                    id="filled-multiline-flexible"
                    label="Multiline"
                    multiline
                    maxRows={4}
                    value={inputTxt}
                    onChange={setInputText}
                    variant="filled"
                    /> */}
                    
                    <p className='font-bold text-xl' >Chatting with {otherPpl}</p>

                    <div className="h-full bg-white w-full p-5 rounded-lg">
                    chat area 
                    </div>

                    <div className='flex gap-3 mx-auto inputArea w-full'>
                        <input type='text' className='appearance-none textBox' 
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder = 'Say something'
                        />
                        <button className='sendButton purple' >Send</button>
                    </div>

                    
                </div>
            </div>
            
        </div>
    )
}

export { ChatPage }