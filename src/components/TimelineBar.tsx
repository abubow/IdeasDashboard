import styled from "styled-components";
import { IdeaSummaryTypes, IdeaTypes } from "../constants/types";
import Mini_Idea from "./Mini_Idea";
import { useDrop } from "react-dnd/dist/hooks/useDrop";
import { useState } from "react";
interface Props {
	colorTheme: string;
}
const Container = styled.div<Props>`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-direction: column;
	background-color: ${(props) =>
		props.colorTheme === "light" ? "#fff" : "#24262C"};
	min-width: 17vw;
	max-width: 20vw;
	margin: 0 0.3vw;
	border: ${(props) =>
		props.colorTheme === "light"
			? "2px dashed rgb(28,29,34, 0.08)"
			: "none"};
	border-radius: 10px;
	padding: 1vh 0;
`;
const Title = styled.div<Props>`
	font-size: 0.8rem;
	font-weight: 400;
	color: ${(props) =>
		props.colorTheme === "light"
			? "rgba(28,29,34, 0.5)"
			: "rgba(255, 255, 255, 0.5)"};
	padding-left: 1vw;
	margin: 1vh 0 1vh 0.2vw;
	align-self: flex-start;
`;
const IdeaContainer = styled.div`
	display: flex;
	flex-direction: column;
	border-radius: 10px;
`;
const EmptyContainer = styled.div<Props>`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	border: ${(props) =>
		props.colorTheme === "light"
			? "2px dashed rgba(28,29,34, 0.08)"
			: "2px dashed rgba(255, 255, 255, 0.08)"};
	backdrop-filter: blur(10px);
	width: 15vw;
	margin: 0.8vh 0;
	padding: 1vh 1vw;
	border-radius: 12px;
	min-height: 15vh;
	cursor: move;
`;
interface FProps {
	colorTheme: string;
	title: string;
	ideas: IdeaSummaryTypes[];
    changePosition: (id: string, fromStage: string, toStage: string) => void;
}
const TimelineBar = ({ colorTheme, title, ideas, changePosition }: FProps) => {
	// using useDrop hook to handle drop event and check if it is hovering over the drop target
	const [myIdeas, setMyIdeas] = useState<IdeaSummaryTypes[]>(ideas);
	const [ishovering, setIsHovering] = useState<boolean>(false);
	const handleDrop = (item: IdeaSummaryTypes) => {
		if (item.Stage.toLowerCase() === title.toLowerCase()) {
			return;
		}
		if (myIdeas.some((idea) => idea.id === item.id)) {
			return;
		}
        changePosition(item.id, item.Stage, title);
		// const newIdea: IdeaSummaryTypes = {
		// 	id: item.id,
		// 	Title: item.Title,
		// 	Stage: title,
		// 	StageStatus: item.StageStatus,
		// 	Attachments: item.Attachments,
		// 	IdeaOutline: item.IdeaOutline,
		// 	Comments: item.Comments,
		// };
		// setMyIdeas([...myIdeas, newIdea]);
	};
	const [{ isOver }, drop] = useDrop({
		accept: "idea",
		drop: (item: IdeaSummaryTypes) => {
			handleDrop(item);
			setIsHovering(false);
		},
		collect: (monitor) => ({
			isOver: !!monitor.isOver(),
		}),
		hover: (item: IdeaSummaryTypes) => {
			setIsHovering(true);
		},
	});
	return (
		<Container colorTheme={colorTheme}>
			<Title colorTheme={colorTheme}>
				{title} ({ideas.length})
			</Title>
			<IdeaContainer ref={drop}>
				{myIdeas.map((idea, index) => {
					return (
						<Mini_Idea
							colorTheme={colorTheme}
							idea={idea}
							key={index}
						/>
					);
				})}
				{myIdeas.length === 0 && (
					<EmptyContainer colorTheme={colorTheme}/>
				)}
				{ishovering && isOver && (
					<EmptyContainer colorTheme={colorTheme}>
						drop here
					</EmptyContainer>
				)}
			</IdeaContainer>
		</Container>
	);
};

export default TimelineBar;
