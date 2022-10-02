import React from "react";

function SelectMood() {
    return (
        <div class="grid grid-rows-2 grid-flow-col gap-4">
            <span class="row-span-1 ...">Select your current mood</span>
            <div class="row-span-1 ...">
                <div class="grid grid-rows-1 grid-flow-col">
                    <div class="col-span-1 ...">
                        Mood 1
                    </div>
                    <div class="col-span-1 ...">
                        Mood 2
                    </div>
                    <div class="col-span-1 ...">
                        Mood 3
                    </div>
                    <div class="col-span-1 ...">
                        Mood 4
                    </div>
                </div>
            </div>
        </div>
    )
}

export { SelectMood }