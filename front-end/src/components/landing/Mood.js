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

    const handleClickGray = (event) => {
        setSelectedMood("gray");
        event.target.style.boxShadow = "0 0 11px rgba(33,33,33,.5)";
    }
    const handleClickBlue = (event) => {
        setSelectedMood("blue");
        event.target.style.boxShadow = "0 0 11px rgba(33,33,33,.5)";
    }
    const handleClickYellow = (event) => {
        setSelectedMood("yellow");
        event.target.style.boxShadow = "0 0 11px rgba(33,33,33,.5)";
    }
    const handleClickPurple = (event) => {
        setSelectedMood("purple");
        event.target.style.boxShadow = "0 0 11px rgba(33,33,33,.5)";
    }

    return (
        <div class="grid grid-rows-2 grid-flow-col gap-4">
            <span class="row-span-1 ...">Select your current mood</span>
            <div class="row-span-1 ...">
                <div class="grid grid-rows-1 grid-flow-col">
                    <div class="col-span-1 ...">
                        <DescriptionTooltip placement="top" title="Disappointed? Upset? Spiritless? Join the conversation and let the strangers cheer you up!">
                            <div id="gray-circle" class="circle" onClick={handleClickGray}></div>
                        </DescriptionTooltip>
                    </div>
                    <div class="col-span-1 ...">
                        <DescriptionTooltip placement="top" title="Chill, calm & peaceful. Immerse yourself in the unexpected conversation with strangers.">
                            <div id="blue-circle" class="circle" onClick={handleClickBlue}></div>
                        </DescriptionTooltip>
                    </div>
                    <div class="col-span-1 ...">
                        <DescriptionTooltip placement="top" title="Feeling enjoyable and fun? Join the conversation with other strangers in the communitiiy to spread you happiness!">
                            <div id="yellow-circle" class="circle" onClick={handleClickYellow}></div>
                        </DescriptionTooltip>
                    </div>
                    <DescriptionTooltip placement="top" title="Sad & bitter. Life's treating you bad today? Let the conversation heal your sadness and release you from misery!">
                        <div id="purple-circle" class="circle" onClick={handleClickPurple}></div>
                    </DescriptionTooltip>
                </div>
            </div>
        </div>
    )
}

export { SelectMood }