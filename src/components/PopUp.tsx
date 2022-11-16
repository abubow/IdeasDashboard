import styled from "styled-components";
import Tabs from "./Tabs";
import TabsC from "./TabsC";
import { useEffect, useState } from "react";
import { IdeaSummaryTypes, IdeaTypes } from "../constants/types";
import { doc, getDoc } from "firebase/firestore";
import { AllIdeasProvider } from "../contexts/ideasContext";
import { db } from "../firebase-config";
const Container = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	min-width: 100vw;
	min-height: 100vh;
	background-color: rgba(0, 0, 0, 0.05);
	backdrop-filter: blur(2px);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 100;
`;
interface Props {
	colorTheme: string;
}
const Crate = styled.div<Props>`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-direction: column;
	transition: all 0.5s ease;
	background-color: ${(props) =>
		props.colorTheme === "light"
			? "rgba(255, 255, 255, 0.5)"
			: "rgba(0, 0, 0, 0.5)"};
	backdrop-filter: blur(25px);
	-webkit-backdrop-filter: blur(85px);
	box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
	color: ${(props) => (props.colorTheme === "light" ? "black" : "white")};
	width: 76vw !important;
	height: 90vh !important;
	border-radius: 12px;
	border: 1px solid
		${(props) =>
			props.colorTheme === "light"
				? "rgba(255, 255, 255, 0.5)"
				: "rgba(0, 0, 0, 0.5)"};
`;
const IdeaForm = styled.div`
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
	color: ${(props) => (props.colorTheme === "light" ? "#000" : "#fff")};
	padding-left: 3vw;
	margin-top: 2vh;
	width: 100%;
	margin: 4vh 0 5vh 1vw;
`;
const ButtonCrate = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	width: 100%;
	height: 10vh;
	gap: 0.5vw;
	margin: 0 4vw 1vh 0;
`;
const Button = styled.button<Props>`
	width: 5rem;
	height: 2rem;
	color: ${(props) => (props.colorTheme === "light" ? "black" : "white")};
	border: none;
	outline: none;
	background: ${(props) =>
		props.colorTheme === "light" ? "white" : "#292B31"};
	border-radius: 8px;
	opacity: 0.8;
	box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
	transition: all 0.5s ease;
`;
interface FPProps {
	colorTheme: string;
	idea: IdeaSummaryTypes;
	setShowPopUp: React.Dispatch<React.SetStateAction<boolean>>;
	// setIdeaPopUp: (ideaPopUp: string) => void;
	// ideaPopUp: string;
}
const PopUp = ({ colorTheme, idea, setShowPopUp }: FPProps) => {
	// get idea Outline by using the firebase document reference
	const [ideaOutline, setIdeaOutline] = useState<IdeaTypes | null>(null);
	const [ideaOutlineLoading, setIdeaOutlineLoading] = useState<boolean>(true);
	const [ideaOutlineError, setIdeaOutlineError] = useState<boolean>(false);

	useEffect(() => {
		const getIdeaOutline = async () => {
            setIdeaOutlineLoading(true);
            setIdeaOutlineError(false);
			try {
                const docRef = doc(db, "Ideas", idea.IdeaOutline);
				const ideaOutline = await getDoc(docRef);
                if (ideaOutline.data()!==undefined) {
                    setIdeaOutline(ideaOutline.data() as IdeaTypes);
                }
                else{
                    setIdeaOutlineError(true);
                }
				setIdeaOutlineLoading(false);
			} catch (error) {
				setIdeaOutlineError(true);
				setIdeaOutlineLoading(false);
                console.error(error);
                
			}
		};
		getIdeaOutline();
	}, [idea.IdeaOutline]);
	return (
		<Container>
			{ideaOutlineLoading || ideaOutline === null ? (
				<div>Loading...</div>
			) : ideaOutlineError ? (
				<div>Error</div>
			) : (
				<Crate colorTheme={colorTheme}>
					<Title colorTheme={colorTheme}>{idea.Title}</Title>
					<IdeaForm>
						<TabsC
							idea={ideaOutline}
							colorTheme={colorTheme}
						/>
					</IdeaForm>
					<ButtonCrate>
						<Button colorTheme={colorTheme}>Save</Button>
						<Button
							colorTheme={colorTheme}
							onClick={() => setShowPopUp(false)}>
							Cancel
						</Button>
					</ButtonCrate>
				</Crate>
			)}
		</Container>
	);
};

export default PopUp;
