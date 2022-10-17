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
    flex-direction: column;
    min-height: 100vh;
    width: 20vw;
    transition: all 0.5s ease;
    background-color: ${props => props.colorTheme === 'light' ? '#fff' : props.color};
    color: ${props => props.colorTheme === 'light' ? '#000' : '#fff'};
    box-shadow: ${props => props.colorTheme === 'light' ? '0 0 50px 0 rgba(0, 0, 0, 0.1)' : 'none'};
    z-index: 1;
`;
const Heading = styled.h1`
    font-style: normal;
    font-weight: 700;
    font-size: 30px;
`;
interface PropsF {
    colorTheme: string,
    color: string,
    content: {
        title: string,
        options: {
            name: string,
            subOptions: string[],
        }[]
    }
    setColorTheme: (colorTheme: string) => void,
}
const Options = ( { colorTheme, setColorTheme, content, color }: PropsF ) => {
  return (
    <Container colorTheme={colorTheme} color={color}>
        <Heading>
            content.title
        </Heading>
        <ul>
            {content.options.map((option, index) => {
                return (
                    <li key={index}>
                        {option.name}
                        <ul>
                            {option.subOptions.map((subOption, index) => {
                                return (
                                    <li key={index}>
                                        {subOption}
                                    </li>
                                );
                            })}
                        </ul>
                    </li>
                );
            })}
        </ul>
        <button onClick={() => setColorTheme(colorTheme === 'light' ? 'dark' : 'light')}>Toggle Color Theme</button>
    </Container>
  );
}

export default Options