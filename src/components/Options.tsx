import styled from "styled-components";
// importing prop types to make sure the props are the right type
interface Props {
    colorTheme: string,
    color: string,
}
const Container = styled.div<Props>`
    position: fixed;
    top: 0;
    left: 4vw;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    width: 15vw;
    background-color: ${props => props.colorTheme === 'light' ? '#fff' : props.color};
`;
interface PropsF {
    colorTheme: string,
    color: string,
    setColorTheme: (colorTheme: string) => void,
}
const Options = ( { colorTheme, setColorTheme, color }: PropsF ) => {
  return (
    <Container colorTheme={colorTheme} color={color}>
        <h1>Options</h1>
    </Container>
  )
}

export default Options