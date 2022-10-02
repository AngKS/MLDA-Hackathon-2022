import React, { useState } from "react";
import { SelectMood } from "../components/landing/Mood";
import { EnterName } from "../components/landing/Name";
import GIF from "../assets/people-chatting.gif";
import Button from "@mui/material/Button";
import "../styles/landing.css";
import { Link } from 'react-router-dom';
import IMAGE from "../assets/LOGO.png";
import { TopBar } from "../common/Topbar";

function LandingPage() {
    const [userName, setUserName] = useState(null);
    const [selectedMood, setSelectedMood] = useState(null);
    const [isNameVisible, setIsNameVisible] = useState(false);
    const [isMoodVisible, setIsMoodVisible] = useState(false);

    const handleSubmit = () => {
        console.log(userName);
        console.log(selectedMood);
        if (userName == null) {
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

    return (
        <div>
            <TopBar current_page="Chat" />
            <div class="grid grid-rows-1 grid-flow-col gap-4 w-3/5 mx-auto">
                <div class="row-span-1 col-span-1">
                    <div class="grid grid-rows-4 grid-flow-col gap-4">
                        <div class="row-span-1  w-full">
                            <EnterName setUserName={setUserName} />
                            {isNameVisible ? <span style={{ color: 'red' }}>Please enter a name</span> : <span></span>}
                        </div>
                        <div class="row-span-1 ...">
                            <SelectMood setSelectedMood={setSelectedMood} />
                            {isMoodVisible ? <span style={{ color: 'red' }}>Please select a mood</span> : <span></span>}
                        </div>
                        <div class="w-64" style={{ display: 'block' }}>
                            {selectedMood === "yellow" && <div><h5 class="font-mono" style={{ color: "#FFD60A" }}>Happy</h5><p class="text-sm">Feeling enjoyable and fun? Join the conversation with others in the community to spread your happiness!</p></div>}
                            {selectedMood === "blue" && <div><h5 class="font-mono" style={{ color: "#48CAE4" }}>Serenity</h5><p class="text-sm">Chill, calm & peaceful. Immerse yourself in the unexpected conversation with someone!</p></div>}
                            {selectedMood === "purple" && <div><h5 class="font-mono" style={{ color: "#DEC0F1" }}>Sad</h5><p class="text-sm">Sad & bitter. Life's treating you bad today? Let the conversation heal your sadness and release you from misery!</p></div>}
                            {selectedMood === "gray" && <div><h5 class="font-mono" style={{ color: "#808080" }}>Depressed</h5><p class="text-sm">Dissapointed? Upset? Spiritless? Join the conversation and let others cheer you up!</p></div>}
                        </div>
                        <div class="row-span-1 ...">
                            {userName && selectedMood ? <Button component={Link} to="/chatroom" variant="outlined" onClick={handleSubmit}>Enter Chat Room</Button> : <Button variant="outlined" onClick={handleSubmit}>Enter Chat Room</Button>}
                        </div>
                    </div>

                </div>
                <div class="row-span-1 col-span-1">
                    <img class="chat_img mt-8" src={GIF} alt="gif" />
                </div>
            </div>
        </div>
    )
}

export { LandingPage }