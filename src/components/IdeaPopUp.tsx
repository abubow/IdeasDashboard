import styled from "styled-components"
import Tabs from "./Tabs";

interface Props {
    colorTheme: string;
}
const Container = styled.dialog<Props>`
    position: fixed;
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
    transition: all 0.5s ease;
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
const ButtonCrate = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: 10vh;
    gap: 1vw;
    margin-right: 4vw;
`;
const Button = styled.button<Props>`
    width: 5rem;
    height: 2rem;
    color: ${props => props.colorTheme === 'light' ? 'black' : 'white'};
    border: none;
    outline: none;
    background: #292B31;
    border-radius: 8px;
    opacity: 0.8;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
    transition: all 0.5s ease;  
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
    setShowPopUp: React.Dispatch<React.SetStateAction<boolean>>;
    // setIdeaPopUp: (ideaPopUp: string) => void;
    // ideaPopUp: string;
}
const IdeaPopUp = ( {colorTheme, idea, setIdea, setShowPopUp}: FPProps ) => {
    const data = [
        {id : '1',
         tabTitle: "General",
        },
        {id : '2',
         tabTitle: "Evaluation",
        },
        {id : '3',
         tabTitle: "ROI",
        }
      ]
    return (
    <Container colorTheme={colorTheme}>
        <IdeaForm onSubmit={(e) => e.preventDefault()}>
            <Title colorTheme={colorTheme}>
                {idea.title}
            </Title>
            <Tabs data={data} />
            <ButtonCrate>
                <Button colorTheme={colorTheme} type="submit" onClick={
                    (e)=>{
                        e.preventDefault();
                        console.log("submit")
                    }
                }>
                    Submit
                </Button>
                <Button colorTheme={colorTheme} type="button" onClick={
                    ()=>{
                        setShowPopUp(false)
                    }
                }>
                    Cancel
                </Button>

            </ButtonCrate>
        </IdeaForm>
    </Container>
    )
}

export default IdeaPopUp
