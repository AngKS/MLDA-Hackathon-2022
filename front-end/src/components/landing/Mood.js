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
    }
    const handleClickBlue = (event) => {
        setSelectedMood("blue");
    }
    const handleClickYellow = (event) => {
        setSelectedMood("yellow");
    }
    const handleClickPurple = (event) => {
        setSelectedMood("purple");
    }

    return (
        <div class="grid grid-rows-2 grid-flow-col gap-4"  style={{ height: "80px" }}>
            <span class="row-span-1 ..." >Select your current mood</span>
            <div class="row-span-1 ...">
                <div class="grid grid-rows-1 grid-flow-col" >
                    <div class="col-span-1 ...">
                        <DescriptionTooltip placement="top" title="Feeling enjoyable and fun? Join the conversation with others in the communitiiy to spread you happiness!">
                            <div className="emoji" onClick={handleClickYellow}><span>😄</span></div>
                        </DescriptionTooltip>
                    </div>
                    <div class="col-span-1 ...">
                        <DescriptionTooltip placement="top" title="Chill, calm & peaceful. Immerse yourself in the unexpected conversation with someone.">
                            <div className="emoji" onClick={handleClickBlue}><span>🙂</span></div>
                        </DescriptionTooltip>
                    </div>
                    <div class="col-span-1 ...">
                        <DescriptionTooltip placement="top" title="Disappointed? Upset? Spiritless? Join the conversation and let someone cheer you up!">
                            <div className="emoji" onClick={handleClickGray}><span>😣</span></div>
                        </DescriptionTooltip>
                    </div>
                    <DescriptionTooltip placement="top" title="Sad & Bitter. Life's treating you bad today? Let the conversation heal your sadness and release you from misery!">
                        <div className="emoji" onClick={handleClickPurple}><span>😫</span></div>
                    </DescriptionTooltip>
                </div>
            </div>
        </div>
    )
}

export { SelectMood }