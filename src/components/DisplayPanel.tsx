import styled from "styled-components";
import { useState } from "react";
import Timeline from "./Timeline";

interface Props {
    colorTheme: string;
}
const Container = styled.div<Props>`
    position: absolute;
    top: 0;
    left: 24vw;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    transition: all 0.5s ease;
    background-color: ${props => props.colorTheme === 'light' ? '#fff' : props.color};
    color: ${props => props.colorTheme === 'light' ? '#000' : '#fff'};
    width: 76vw;
    flex: 10;
    height: 100%; 
`;

const Title = styled.div<Props>`
    font-size: 1.7rem;
    font-weight: 600;
    color: ${props => props.colorTheme === 'light' ? '#000' : '#fff'};
    padding-left: 1vw;
    margin-top: 1vh;
    width: 100%;
    margin: 4vh 0 5vh 1vw;
`;
interface PropsF {
    colorTheme: string,
}
const DisplayPanel = ( {  colorTheme }: PropsF ) => {
    return (
        <Container colorTheme={colorTheme}>
            <Title colorTheme={colorTheme}>
                Welcome Back, Abuzar👋
            </Title>
            <Timeline colorTheme={colorTheme} />
        </Container>
    );
}

export default DisplayPanel