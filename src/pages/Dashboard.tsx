import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Options from '../components/Options';
import { useState } from 'react';
import DisplayPanel from '../components/DisplayPanel';

interface Props {
    color: string;
}
const Container = styled.div<Props>`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    min-height: 100vh;
    width: 100%;
    background-color: ${props => props.color};
`;

interface PropsF {
    loggedIn: boolean,
    setLoggedIn: (loggedIn: boolean) => void,
}
const Dashboard = (props: PropsF) => {
    const colors = {
        backgroundColor: '#2A2B2F',
        navbar: '#1C1D22',
        options: '#222327',
    }
    const [colorTheme, setColorTheme] = useState('dark');
    return (
        <Container color={colorTheme === 'light' ? "#fff" : colors.backgroundColor}>
            <Navbar color={colors.navbar} />
            <Options colorTheme={colorTheme} setColorTheme={setColorTheme} color={colors.options} />
            <DisplayPanel color={colors.backgroundColor} />
        </Container>
    );
}

export default Dashboard