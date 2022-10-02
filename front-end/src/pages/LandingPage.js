import React, { useState } from "react";
import { SelectMood } from "../components/landing/Mood";
import { EnterName } from "../components/landing/Name";
import GIF from "../assets/people-chatting.gif";
import Button from "@mui/material/Button";

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
                        <Button variant="outlined" onClick={handleSubmit}>Enter Chat Room</Button>
                    </div>
                </div>
            </div>
            <div class="row-span-1 col-span-1">
                <img src={GIF} alt="gif" />
            </div>
        </div>
    )
}

export { LandingPage }