import React from "react";
import TextField from '@mui/material/TextField';

function EnterName({ setUserName }) {
    const handleChange = (event) => {
        setUserName(event.target.value);
    }

    return (
        <div class="grid grid-rows-2 grid-flow-col pt-7">
            <span class="row-span-1 ...">Enter Name</span>
            <div class="row-span-1 ...">
                <TextField size="small" variant="outlined" required onChange={handleChange}/>
            </div>
        </div>
    )
}

export { EnterName }