import "../styles/chatPage.css";
import React, { useState, useEffect } from "react";
import { TopBar } from "../common/Topbar"
import { OtherChat } from '../components/chat/otherChat'
import { MyChat } from "../components/chat/myChat";
import { Avatar, Divider, Tooltip } from 'antd';
import io from 'socket.io-client'
import queryString from 'query-string'
import SuggestionsBar from "../components/suggestions/SuggestionsBar";
import axios from 'axios'


let socket;

function ChatPage() {

    const [inputTxt, setInputText] = useState('')
    const [chat, setChat] = useState([])
    const [name, setName] = useState(null)
    const [room, setRoom] = useState("Connecting...")
    const [otherUser, setOtherUser] = useState('')
    const [predicted, setPredicted] = useState('')
    const [sentiment, setSentiment] = useState('')
    // const ENDPOINT = 'wss://mlda-websocket-server.herokuapp.com/'
    const ENDPOINT = 'localhost:8080'

    let sendMessage = (event) => {
        event.preventDefault()
        if (inputTxt) {
            socket.emit('sendMessage', inputTxt, () => {
                setChat([...chat, { text: inputTxt, user: name }])
                setInputText('')

            })

        }
    }


    useEffect(() => {
        const { qs_name, qs_mood } = queryString.parse(window.location.search)
        setName(qs_name)
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


        socket.emit('join', { name: qs_name, mood: qs_mood }, () => { })


        // get room data
        socket.on('roomData', (data) => {

            // get other user

            let otherUser = data.users.filter((user) => user.name !== qs_name)
            setOtherUser(otherUser[0].name)

            setRoom(data.room)

        })


        return () => {
            socket.emit('end')
            socket.off()
        }

    }, [])



    useEffect(() => {
        socket.on('message', (message) => {
            if (message.user !== name) {
                setChat([...chat, message])
            }

        })
    }, [chat])

    // check for hate speech
    let checkToxicity =  (text) => {
        let data = {
            inputs: text
        }
        axios.post(
            'https://api-inference.huggingface.co/models/unitary/toxic-bert',
            {
                headers: {
                    'Authorization': "Bearer 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"
                },
                data
                
            })
            .then(result => {
                console.log(result)
                return result
            })
    }



    // add enter key press
    const handleKeyPress = async (event) => {
        if (event.key === 'Enter') {

            await checkToxicity(inputTxt)

            sendMessage(event)
        }
        else {
            // focus on input field
            document.getElementById('chatField').focus()

        }
    }
    // add event listener for enter key press
    useEffect(() => {
        document.addEventListener("keydown", handleKeyPress, false);
        return () => {
            document.removeEventListener("keydown", handleKeyPress, false);
        };
    }, [handleKeyPress])

    // auto scroll to bottom of div when new message is added
    useEffect(() => {
        const chatDiv = document.getElementById('chatArea')
        chatDiv.scrollTop = chatDiv.scrollHeight
    }, [chat])

    // when user leaves chat room; navagate to home page

    useEffect(() => {
        window.addEventListener('beforeunload', (event) => {
            socket.emit('end')
            socket.off()
            console.log("APP CLOSED")
            window.location.href = '/'
        }
        )


    }, [])

    // disable reloads
    useEffect(() => {
        window.addEventListener('beforeunload', (event) => {
            event.preventDefault()
            event.returnValue = ''
        })
    }, [])

    useEffect(() => {
      
    
        if (predicted === 'Positive') {
            let div = document.getElementById('emotionBar')
            div.classList.add('bg-green-300')
            div.classList.remove('bg-red-300')
            div.classList.remove('bg-yellow-300')
        } else if (predicted === 'Negative') {
            let div = document.getElementById('emotionBar')
            div.classList.add('bg-red-300')
            div.classList.remove('bg-green-300')
            div.classList.remove('bg-yellow-300')

        } else {
            let div = document.getElementById('emotionBar')
            div.classList.add('bg-yellow-300')
            div.classList.remove('bg-red-300')
            div.classList.remove('bg-green-300')

        }
    }, [predicted])
    


    return (
        <div className='h-screen'>
            <TopBar current_page='Chat' />
            <div className="w-3/5 mx-auto flex gap-2 justify-between h-[90%]">
                <div className=''>

                </div>
                <div className='bg-purple-200 h-full w-full flex flex-col justify-end mb-5 basis-1/3 rounded-lg p-5'>
                    <div classname="bg-red-400 text-white w-full rounded-b-lg hover:cursor-pointer">
                        <span>Leave Room</span>
                    </div>
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
                    <div id="emotionBar" classname="w-full px-3 py-2.5 rounded-xl text-white">{predicted}</div>

                    <div id="chatArea" className="h-full justify-end max-h-full scroll-smooth overflow-y-scroll bg-white w-full p-5 rounded-lg ">
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
                                    return <OtherChat text={item.text} sentiment={sentiment} setpredicted={setPredicted} />
                                }
                            })
                        }
                    </div>

                    <SuggestionsBar />

                    <div className='flex gap-3 mx-auto inputArea w-full'>
                        <input id="chatField" type='text' className='appearance-none textBox'
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
            </div>

        </div>
    )
}

export { ChatPage }