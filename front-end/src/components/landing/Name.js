import React from "react";
import TextField from '@mui/material/TextField';

function EnterName() {
    return (
        <div class="grid grid-rows-2 grid-flow-col">
            <span class="row-span-1 ...">Enter Name</span>
            <div class="row-span-1 ...">
                <TextField variant="outlined" />
            </div>
        </div>
    )
}

export { EnterName }