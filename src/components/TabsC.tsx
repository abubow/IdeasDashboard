import styled from "styled-components";
import { useState } from "react";

interface Props {
	colorTheme: string;
}
const Container = styled.div<Props>`
	display: flex;
	justify-content: flex-start;
	align-items: center;
    flex-direction: column;
	width: 95%;
`;
const TabIdentifierCrate = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	width: 100%;
`;
interface TabProps {
	colorTheme: string;
	selected: boolean;
}
const TabIdentifier = styled.button<TabProps>`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 5vw;
	height: 3vh;
	background-color: ${(props) =>
		props.colorTheme === "light"
			? "rgba(0,0,0,0.1)"
			: "rgba(255,255,255,0.1)"};
	color: ${(props) => (props.colorTheme === "light" ? "#000" : "#fff")};
	font-size: 0.8rem;
	font-weight: 400;
	border-radius: 0.5rem 0.5rem 0 0;
	margin-right: 0.1vw;
	opacity: ${(props) => (props.selected ? "0.9" : "0.3")};
    border: none;
    outline: none;
    cursor: pointer;
    transition: all 0.2s ease-out;
    &:hover{
        opacity: 1;
    }
`;
const TabContent = styled.div<TabProps>`
    display: ${(props) => (props.selected ? "flex" : "none")};
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: ${(props) =>
        props.colorTheme === "light" ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)"};
    color: ${(props) => (props.colorTheme === "light" ? "#000" : "#fff")};
    padding: 1vh 1vw;
    border-radius: 0 0 0.5rem 0.5rem;
    margin-top: 0.1vh;
    transition: all 0.2s ease-out;
    margin-top: 0;
`;
interface FProps {
	data: {
		id: string;
		tabTitle: string;
	}[];
	colorTheme: string;
}
const TabsC = ({ data, colorTheme }: FProps) => {
	const [tabSelected, setTabSelected] = useState(data[0].id);
	return (
		<Container colorTheme={colorTheme}>
			<TabIdentifierCrate>
				{data.map((item) => (
					<TabIdentifier
						key={item.id}
						colorTheme={colorTheme}
						selected={tabSelected === item.id}
                        onClick={() => setTabSelected(item.id)}
                        >
						{item.tabTitle}
					</TabIdentifier>
				))}
                
			</TabIdentifierCrate>
            {
                data.map((item) => (
                    <TabContent
                        key={item.id}
                        colorTheme={colorTheme}
                        selected={tabSelected === item.id}
                    >
                        {item.tabTitle}
                    </TabContent>
                ))
            }
		</Container>
	);
};

export default TabsC;
