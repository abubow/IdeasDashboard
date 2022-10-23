import styled from "styled-components";
import Mini_Idea from "./Mini_Idea";
interface Props {
    colorTheme: string;
}
const Container = styled.div<Props>`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    background-color: ${props => props.colorTheme === 'light' ? '#fff' : '#24262C'};
    min-width: 17vw;
    max-width: 20vw;
    margin: 0 0.3vw;
    border-radius: 10px;
    padding: 1vh 0;
`;
const Title = styled.div<Props>`
    font-size: 0.8rem;
    font-weight: 400;
    color: ${props => props.colorTheme === 'light' ? '#000' : '#fff'};
    padding-left: 1vw;
    margin: 1vh 0 1vh 0.2vw;
    align-self: flex-start;
`;
const IdeaContainer = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 10px;
`;
interface FProps {
    colorTheme: string;
    title: string;
    ideas: {
        title: string;
        done: boolean;
        attachments: number;
        comments: number;
    }[]
}
const TimelineBar = ({colorTheme, title, ideas}: FProps) => {
  return (
    <Container colorTheme={colorTheme}>
        <Title colorTheme={colorTheme}>
            {title} ({ideas.length})
        </Title>
        <IdeaContainer>
            {
                ideas.map((idea, index) => {
                    return (
                        <Mini_Idea colorTheme={colorTheme} idea={idea} key={index}/>
                    )
                })
            }
        </IdeaContainer>
    </Container>
  )
}

export default TimelineBar