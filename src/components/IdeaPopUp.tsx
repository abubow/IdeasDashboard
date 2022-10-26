import styled from "styled-components"

interface Props {
    colorTheme: string;
}
const Container = styled.dialog<Props>`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    transition: all 0.5s ease;
    background-color: ${props => props.colorTheme === 'light' ? 'rgba(255, 255, 255, 0.5' : 'rgba(0, 0, 0, 0.3)'};
    backdrop-filter: blur(25px);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
    color: ${props => props.colorTheme === 'light' ? 'black' : 'white'};
    width: 76vw;
    height: 90vh;
    border-radius: 12px;
    border: 1px solid ${props => props.colorTheme === 'light' ? 'rgba(255, 255, 255, 0.5' : 'rgba(0, 0, 0, 0.5)'};
    outline: none;
    z-index: 100;
`;
const IdeaForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 1vh 1vw;
    margin-bottom: 1vh;
`;
interface FPProps {
    colorTheme: string;
    idea: {
        title: string;
        description: string;
        ideaId: string
    }
    setIdea: React.Dispatch<React.SetStateAction<{
        title: string;
        description: string;
        ideaId: string
    }>>;
    // setIdeaPopUp: (ideaPopUp: string) => void;
    // ideaPopUp: string;
}
const IdeaPopUp = ( {colorTheme, idea, setIdea}: FPProps ) => {
    return (
    <Container colorTheme={colorTheme}>
        <IdeaForm>
            <input type="text" placeholder="Title" />
            <h1>
                {idea.title}
            </h1>
            <p>
                {idea.description}
            </p>
            <button type="submit" onClick={
                ()=>{
                    console.log("submit")
                }
            }>
                Submit
            </button>
            <button type="button">Cancel</button>
        </IdeaForm>
    </Container>
    )
}

export default IdeaPopUp
