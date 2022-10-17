import styled from "styled-components";
import { useState } from "react";

interface Props {
    color: string;
    colorTheme: string;
}
const Container = styled.div<Props>`
    position: fixed;
    top: 0;
    left: 24vw;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    transition: all 0.5s ease;
    background-color: ${props => props.colorTheme === 'light' ? '#fff' : props.color};
    color: ${props => props.colorTheme === 'light' ? '#000' : '#fff'};
    width: 76vw;
    flex: 10;
`;

interface PropsF {
    color: string,
    colorTheme: string,
}
const DisplayPanel = ( { color, colorTheme }: PropsF ) => {
    return (
        <Container color={color} colorTheme={colorTheme}>
            <h1>Display Panel</h1>
        </Container>
    );
}

export default DisplayPanel