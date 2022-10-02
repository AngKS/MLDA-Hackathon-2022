import React from "react";
import TextField from '@mui/material/TextField';

function EnterName({ setUserName }) {
    const handleChange = (event) => {
        setUserName(event.target.value);
    }

    return (
        <div class="flex flex-col pt-7 w-full gap-2">
            <span class="">Enter Name</span>
            <div class="w-full">
                <TextField className="w-full" size="small" variant="outlined" required onChange={handleChange}/>
            </div>
        </div>
    )
}

export { EnterName }