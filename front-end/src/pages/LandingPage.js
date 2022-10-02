import React, { useState } from "react";
import { SelectMood } from "../components/landing/Mood";
import { EnterName } from "../components/landing/Name";

function LandingPage() {
    const [userName, setUserName] = useState(null);

    return (
        <div class="grid grid-rows-1 grid-flow-col gap-4">
            <div class="row-span-1 col-span-1">
                <div class="grid grid-rows-3 grid-flow-col gap-4">
                    <div class="row-span-1 ...">
                        <EnterName />
                    </div>
                    <div class="row-span-1 ...">
                        <SelectMood />
                    </div>
                    <div class="row-span-1 ...">Enter Chat Room</div>
                </div>
            </div>
            <div class="row-span-1 col-span-1">
                picture
            </div>
        </div>
    )
}

export { LandingPage }