import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Options from '../components/Options';
import { useState } from 'react';
import DisplayPanel from '../components/DisplayPanel';
import IdeaPopUp from '../components/IdeaPopUp';
import { OptionsSelectedProvider } from '../contexts/optionsContext';

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
    const OptionsContent = {
        title: 'Ideas Panel',
        options: [
            {
                    name: 'Projects',
                    subOptions: ['All Projects', 'New Idea', 'Initial Stage', 'Done'],
            },
            {
                    name: 'Approved',
                    subOptions: [],
            }
            ],
    }

    const [colorTheme, setColorTheme] = useState('light');
    return (
        <Container color={colorTheme === 'light' ? "#fff" : colors.backgroundColor}>
            <Navbar color={colors.navbar} />
            <OptionsSelectedProvider>
                <>
                    <Options colorTheme={colorTheme} setColorTheme={setColorTheme} color={colors.options} content={OptionsContent} />
                    <DisplayPanel colorTheme={colorTheme} />
                </>
            </OptionsSelectedProvider>
        </Container>
    );
}

export default Dashboard