import React from "react";
import "../../styles/mood.css";
import { styled } from '@mui/material/styles';
// import Button from '@mui/material/Button';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

function SelectMood({ setSelectedMood }) {
    const DescriptionTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} arrow classes={{ popper: className }} />
    ))(({ theme }) => ({
        [`& .${tooltipClasses.arrow}`]: {
            color: '#f5f5f9',
        },
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: '#f5f5f9',
            color: 'rgba(0, 0, 0, 0.87)',
            border: '1px solid #dadde9',
        },
    }));

    const handleClickGray = () => {
        setSelectedMood("gray");
    }
    const handleClickBlue = () => {
        setSelectedMood("blue");
    }
    const handleClickYellow = () => {
        setSelectedMood("yellow");
    }
    const handleClickPurple = () => {
        setSelectedMood("purple");
    }

    return (
        <div class="grid grid-rows-2 grid-flow-col gap-4">
            <span class="row-span-1 ...">Select your current mood</span>
            <div class="row-span-1 ...">
                <div class="grid grid-rows-1 grid-flow-col">
                    <div class="col-span-1 ...">
                        <DescriptionTooltip title="Disappointed? Upset? Spiritless? Join the conversation and let the strangers cheer you up!">
                            <div id="gray-circle" class="circle" onClick={handleClickGray}></div>
                        </DescriptionTooltip>
                    </div>
                    <div class="col-span-1 ...">
                        <DescriptionTooltip title="Chill, calm & peaceful. Immerse yourself in the unexpected conversation with strangers.">
                            <div id="blue-circle" class="circle" onClick={handleClickBlue}></div>
                        </DescriptionTooltip>
                    </div>
                    <div class="col-span-1 ...">
                        <DescriptionTooltip title="Feeling enjoyable and fun? Join the conversation with other strangers in the communitiiy to spread you happiness!">
                            <div id="yellow-circle" class="circle" onClick={handleClickYellow}></div>
                        </DescriptionTooltip>
                    </div>
                    <DescriptionTooltip title="Sad & bitter. Life's treating you bad today? Let the conversation heal your sadness and release you from misery!">
                        <div id="purple-circle" class="circle" onClick={handleClickPurple}></div>
                    </DescriptionTooltip>
                </div>
            </div>
        </div>
    )
}

export { SelectMood }