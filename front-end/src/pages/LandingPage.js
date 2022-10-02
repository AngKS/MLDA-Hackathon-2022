import React, { useState } from "react";
import { SelectMood } from "../components/landing/Mood";
import { EnterName } from "../components/landing/Name";
import GIF from "../assets/people-chatting.gif";
import Button from "@mui/material/Button";
import "../styles/landing.css";
import { Link } from 'react-router-dom';
import IMAGE from "../assets/LOGO.png";

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

    return (
        <div class="grid grid-rows-1 grid-flow-col gap-4">
            <div class="row-span-1 col-span-1">
            <img src={IMAGE} alt="LOGO" className="logo" />
                <div class="grid grid-rows-3 grid-flow-col gap-4">
                    <div class="row-span-1 ...">
                        <EnterName setUserName={setUserName} />
                        {isNameVisible ? <span style={{ color: 'red' }}>Please enter a name</span> : <span></span>}
                    </div>
                    <div class="row-span-1 ...">
                        <SelectMood setSelectedMood={setSelectedMood} />
                        {isMoodVisible ? <span style={{ color: 'red' }}>Please select a mood</span> : <span></span>}
                    </div>
                    <div class="row-span-1 ...">
                            <Button component={Link} to="/chatroom" variant="outlined" onClick={handleSubmit}>Enter Chat Room</Button>
                    </div>
                </div>
            </div>
            <div class="row-span-1 col-span-1">
                <img class="chat_img" src={GIF} alt="gif" />
            </div>
        </div>
    )
}

export { LandingPage }