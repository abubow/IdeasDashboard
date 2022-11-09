import styled from "styled-components";
import { useState } from "react";
import Timeline from "./Timeline";
import useUserAuth from "../contexts/authContext";
import AllIdeas from "./AllIdeas";
import useOptionSelected from "../contexts/optionsContext";
import NewIdea from "./NewIdea";
import SettingsPopup from "./SettingsPopup";
import { useTheme } from "../contexts/themeContext";
import { AllIdeasProvider } from "../contexts/ideasContext";

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

const TopBar = styled.div<Props>`
    width: 100%;
    height: 20vh;
    background-color: ${props => props.colorTheme === 'light' ? '#fff' : props.color};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1vw;
    margin-bottom: 1vh;
`;

const ProfileContainer = styled.div<Props>`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 20vw;
    height: 100%;
    background-color: ${props => props.colorTheme === 'light' ? '#fff' : props.color};
    color: ${props => props.colorTheme === 'light' ? '#000' : '#fff'};
    padding-right: 1vw;
`;

const Username = styled.div<Props>`
    font-size: 1rem;
    font-weight: 400;
    color: ${props => props.colorTheme === 'light' ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)'};
    padding-right: 1vw;
`;

const Profile = styled.img<Props>`
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    background-color: #000;
`;
const DisplayPanel = () => {
    const { user }:any = useUserAuth();
    const { optionSelected }:any = useOptionSelected();
    const [settingsOpen, setSettingsOpen] = useState(false);
    const { colorTheme, setColorTheme } = useTheme();
    return (
        <AllIdeasProvider>
            <Container colorTheme={colorTheme}>
                <TopBar colorTheme={colorTheme}>
                <Title colorTheme={colorTheme}>
                    Welcome Back, {
                        user?.displayName.split(' ')[0]
                    }👋
                </Title>
                <ProfileContainer colorTheme={colorTheme}>
                    <Username colorTheme={colorTheme}>
                        {
                            user?.displayName
                        }
                    </Username>
                    <Profile src="https://avatars.githubusercontent.com/u/47056243?v=4" colorTheme={colorTheme} onClick={() => setSettingsOpen(true)}/>
                </ProfileContainer>
                {
                    settingsOpen ? <SettingsPopup colorTheme={colorTheme} setSettingsOpen={setSettingsOpen}/> : null
                }
                </TopBar>
                {
                    optionSelected === 'Projects' ? <Timeline colorTheme={colorTheme}/> : 
                    optionSelected == 'New Idea' ? <NewIdea colorTheme={colorTheme}/> :
                    <AllIdeas colorTheme={colorTheme}/>
                }
            </Container>
        </AllIdeasProvider>
    );
}

export default DisplayPanel