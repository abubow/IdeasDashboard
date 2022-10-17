import styled from "styled-components";
import { useState } from "react";

interface Props {
    color: string;
}
const Container = styled.div<Props>`
    position: fixed;
    top: 0;
    left: 25%;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: ${props => props.color};
    flex: 10;
`;

interface PropsF {
    color: string,
}
const DisplayPanel = ( { color }: PropsF ) => {
    return (
        <Container color={color}>
            <h1>Display Panel</h1>
        </Container>
    );
}

export default DisplayPanel