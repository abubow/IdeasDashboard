import { useState } from "react";
import styled from "styled-components";
 
interface Props {
    colorTheme: string;
}
const ToggleSwitchD = styled.div<Props>`
    background: ${props => props.colorTheme === 'light' ? 'rgba(28,29,34, 0.1)' : 'rgba(255, 255, 255, 0.3)'};
    backdrop-filter: blur(10px);
    border: 1px solid ${props => props.colorTheme === 'light' ? '0, 0, 0, 0.2' : 'rgba(255, 255, 255, 0.2)'};
    height: 2em;
    width: 5em;
    border-radius: 2em;
    margin-right: 1.5em;
    transition: all 0.2s ease-out;
    .knob {
        position: relative;
        width: 1.9em;
        height: 1.9em;
        background: ${props => props.colorTheme === 'light' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(28,29,34, 0.3)'};
        border: 1px solid ${props => props.colorTheme === 'light' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.5)'};
        border-radius: 50%;
        left: 0em;
        transition: left 0.3s ease-out;
        &.active {
            left: 3em;
        }
    }
`;

const ToggleSwitch = ({ colorTheme, isToggleOn, setIsToggleOn } :any) => {
    const handleClick = () => {
        setIsToggleOn(!isToggleOn);
    };
    return (
        <ToggleSwitchD onClick={handleClick} colorTheme={colorTheme}>
            <div className={isToggleOn ? 'knob active' : 'knob'} />
        </ToggleSwitchD>
    );
}

export default ToggleSwitch;