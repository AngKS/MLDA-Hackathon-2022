import "../styles/chatPage.css";
import React, { useState, useEffect } from "react";
import { TopBar } from "../common/Topbar"
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import { alpha, styled } from '@mui/material/styles';
import { OtherChat } from '../components/chat/otherChat'
import { MyChat } from "../components/chat/myChat";
import { Avatar, Divider, Tooltip } from 'antd';
import io from 'socket.io-client'
import queryString from 'query-string'

import loadingGIF from '../assets/loading.gif'

import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

let socket;

function ChatPage2() {

    const [inputTxt, setInputText] = useState('')
    const [chat, setChat] = useState([])
    const [name, setName] = useState(null)
    const [room, setRoom] = useState(null)
    const [otherUser, setOtherUser] = useState('')
    const ENDPOINT = 'wss://mlda-websocket-server.herokuapp.com/'

    let sendMessage = (event) => {
        event.preventDefault()
        if (inputTxt) {
            socket.emit('sendMessage', inputTxt, () => {
                setInputText('')

            })
        }
    }

    const [loading, setLoading] = useState(true)


    useEffect(() => {
        setLoading(true)

        const { qs_name, qs_mood } = queryString.parse(window.location.search)
        setName(qs_name)
        console.log(window.location.search)
        let connectionOptions = {
            "force new connection": true,
            "reconnectionAttempts": "Infinity",
            "timeout": 10000,
            "transports": ["websocket"]
        };
        socket = io(ENDPOINT, connectionOptions);
        socket.on('connect_error', () => {
            return (
                <div>
                    <h3>Server Error!</h3>
                </div>
            )
        })

        console.log("Connecting to host", qs_name, qs_mood)

        socket.emit('join', { name: qs_name, mood: qs_mood }, () => { })
        

        // get room data
        socket.on('roomData', (data)=> {
            
            // get other user
            let secondPerson = data.users.filter((user) => user.name !== qs_name)
            console.log(secondPerson.name)
            secondPerson = secondPerson.name ? secondPerson.name : 'Other User'
            setOtherUser(secondPerson)
            setRoom(data.room)

        })


        // console.log(Users)

        return () => {
            socket.emit('end')
            socket.off()
            setLoading(false)
        }

    }, [])


    useEffect(() => {
        socket.on('message', (message) => {
            if (message.user !== name) {
                setOtherUser(message.user)
            }
            setChat([...chat, message])
        })
    }, [chat])

    // add enter key press
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            sendMessage(event)
        }
    }
    // add event listener for enter key press
    useEffect(() => {
        document.addEventListener("keydown", handleKeyPress, false);
        return () => {
            document.removeEventListener("keydown", handleKeyPress, false);
        };
    }, [ handleKeyPress])

    // auto scroll to bottom of div when new message is added
    useEffect(() => {
        if (loading === false) {
            const chatDiv = document.getElementById('chatArea')
            chatDiv.scrollTop = chatDiv.scrollHeight
        }

    }, [chat])

    const antIcon = (
        <LoadingOutlined
          style={{
            fontSize: 24,
          }}
          spin
        />
      );
      


    return (
        <div class='h-screen'>
            <TopBar current_page='Chat' />

            {loading === false && <div className="w-3/5 mx-auto flex gap-2 justify-between h-[90%]">
                <div className=''>

                </div>
                <div className='red basis-1/3 rounded-lg p-5'>
                    01
                </div>

                <div className='chat basis-2/3 rounded-lg p-5 flex flex-col gap-3'>

                    <div className="flex gap-3 items-center">
                        <div className='profile max-w-[10%] flex-1 '>
                            <Avatar className="rounded-full" src="https://joeschmoe.io/api/v1/random" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex gap-2">
                                <p className='font-bold text-2xl' >{otherUser}</p>

                            </div>
                            <span>Chat ID: <span className="px-2 py-1.5 bg-slate-100 rounded-md font-mono text-sm">{room}</span></span>
                        </div>

                    </div>


                    <div id="chatArea" className="h-full justify-end max-h-full scroll-smooth overflow-y-scroll bg-white w-full p-5 rounded-lg">
                        {
                            chat.map((item, index) => {
                                if (item.user === name) {
                                    return <MyChat text={item.text} />
                                }
                                else if (item.user === 'admin') {
                                    <div className="w-full flex items-center justify-end">
                                        <div className='p-3 message-bubble-mine bg-blue-200'>
                                            {item.text}
                                        </div>
                                    </div>
                                }
                                else {
                                    return <OtherChat text={item.text} />
                                }
                            })
                        }

                    </div>


                    <div className='flex gap-3 mx-auto inputArea w-full'>
                        <input type='text' className='appearance-none textBox'
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder='Say something'
                            value={inputTxt}

                        />
                        <button className='sendButton purple' onClick={
                            (e) => {
                                sendMessage(e)
                                setInputText('')
                            }
                            
                            }>Send</button>
                    </div>

                </div>
            </div>}

            {loading === true && 
                <div className='loading flex justify-center'>
                    <div>
                        <img className="" src={loadingGIF} alt="gif" />
                        
                    </div>
                </div>
            }

        </div>
    )
}

export { ChatPage2 }