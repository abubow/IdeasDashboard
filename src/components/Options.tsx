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
    justify-content: flex-start;
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
    width: 100%;
    padding: 10% 0 0 8%;
    margin-bottom: 0.5rem;
`;
const UnorderedList = styled.ul`
    list-style: none;
    margin: 0;
    width: 100%;
    padding: 0 8%;
`;
const OptionsContent = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    width: 100%;
`;
const Option = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-item: center;
`;
const OptionLi = styled.li`
    width: 100%;
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
            {content.title}
        </Heading>
        <OptionsContent>
            {content.options.map((option, index) => {
                return (<>
                    <Heading>
                    </Heading>
                    <UnorderedList>
                        <OptionLi key={index}>
                            <Option>
                                {option.name}
                                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 1L5 5L1 1" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </Option>
                        </OptionLi>
                        <UnorderedList>
                                {option.subOptions.map((subOption, index) => {
                                    return (
                                        <li key={index}>
                                            {subOption}
                                        </li>
                                    );
                                })}
                        </UnorderedList>
                    </UnorderedList></>
                );
            })}
        </OptionsContent>
        <button onClick={() => setColorTheme(colorTheme === 'light' ? 'dark' : 'light')}>Toggle Color Theme</button>
    </Container>
  );
}

export default Options