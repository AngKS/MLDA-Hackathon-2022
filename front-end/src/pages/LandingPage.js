import React, { useState, useEffect } from "react";
import { SelectMood } from "../components/landing/Mood";
import GIF from "../assets/scrolling.gif";
import Button from "@mui/material/Button";
import "../styles/landing.css";
import { Link } from 'react-router-dom';
import IMAGE from "../assets/LOGO.png";
import { TopBar } from "../common/Topbar";
import TextField from '@mui/material/TextField';


function LandingPage({userMood, username, setUserMood, setUsername, toxicity, setToxicity}) {
    const [selectedMood, setSelectedMood] = useState(null);
    const [isNameVisible, setIsNameVisible] = useState(false);
    const [isMoodVisible, setIsMoodVisible] = useState(false);



    const handleSubmit = () => {
        console.log(username);
        console.log(selectedMood);
        if (username == null) {
            setIsNameVisible(true);
        } else {
            setIsNameVisible(false);
        }
        if (selectedMood == null) {
            setIsMoodVisible(true);
        } else {
            setIsMoodVisible(false);
        }
    }

    const goToSecond = () => {
        console.log('Next Page')
    }

    useEffect(() => {
        setUserMood(selectedMood)
    }, [selectedMood])
    

    return (
        <div>
            <TopBar current_page="Chat" />
            <div class="grid grid-rows-1 grid-flow-col gap-4 w-3/5 mx-auto relative">
                <div className={`${toxicity != null ? "absolute" : "hidden"} px-3 py-2.5 bg-red-400 bottom-0 left-[50%] text-white rounded-lg`} onClick={() => {
                    setToxicity(null)
                }}>You have been removed from the Chat due to suspected {toxicity} activity.</div>
                <div class="row-span-1 col-span-1">
                    <div class="grid grid-rows-4 grid-flow-col gap-4">
                        <div class="row-span-1  w-full">
                            <div class="flex flex-col pt-7 w-full gap-2">
                                <span class="">Enter Name</span>
                                <div class="w-full">
                                    <TextField className="w-full" size="small" variant="outlined" required onChange={(e) => {
                                        setUsername(e.target.value);
                                    }} />
                                </div>
                            </div>
                            {isNameVisible ? <span style={{ color: 'red' }}>Please enter a name</span> : <span></span>}
                        </div>
                        <div class="row-span-1 ...">
                            <SelectMood setSelectedMood={setSelectedMood} />
                            {isMoodVisible ? <span style={{ color: 'red' }}>Please select a mood</span> : <span></span>}
                        </div>
                        <div class="w-64" style={{ display: 'block' }}>
                            {selectedMood === null && <div>Please select one based on your current mood.</div>}
                            {selectedMood === "Happy" && <div><h5 class="font-mono" style={{ color: "#FFD60A" }}>Happy</h5><p class="text-sm">Feeling enjoyable and fun? Join the conversation with others in the community to spread your happiness!</p></div>}
                            {selectedMood === "Serenity" && <div><h5 class="font-mono" style={{ color: "#48CAE4" }}>Serenity</h5><p class="text-sm">Chill, calm & peaceful. Immerse yourself in the unexpected conversation with someone!</p></div>}
                            {selectedMood === "Sad" && <div><h5 class="font-mono" style={{ color: "#DEC0F1" }}>Sad</h5><p class="text-sm">Sad & bitter. Life's treating you bad today? Let the conversation heal your sadness and release you from misery!</p></div>}
                            {selectedMood === "Depressed" && <div><h5 class="font-mono" style={{ color: "#808080" }}>Depressed</h5><p class="text-sm">Dissapointed? Upset? Spiritless? Join the conversation and let others cheer you up!</p></div>}
                        </div>
                        <div class="row-span-1 ...">
                            {username && selectedMood ? <Button component={Link} to={`/chatroom?qs_name=${username}&qs_mood=${userMood}`} variant="outlined" onClick={handleSubmit}>Enter Chat Room</Button> : <Button variant="outlined" onClick={handleSubmit}>Enter Chat Room</Button>}
                        </div>
                    </div>

                </div>
                <div class="row-span-1 col-span-1">
                    <img class="chat_img" src={GIF} alt="gif" />
                </div>
            </div>
        </div>
    )
}

export { LandingPage }