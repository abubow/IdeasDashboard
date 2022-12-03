import styled from "styled-components";
import TimelineBar from "./TimelineBar";
import { useAllIdeas } from "../contexts/ideasContext";
import { IdeaTypes } from "../constants/types";
import { useEffect, useState } from "react";
import { useAllIdeasSummaries } from "../contexts/allIdeaSumContext";
import { HTML5Backend } from "react-dnd-html5-backend";

import { DndProvider } from "react-dnd";
const Container = styled.div`
	position: relative;
	display: flex;
	justify-content: center;
	gap: 1%;
	width: 100%;
	min-width: 90%;
	overflow: auto;
	&::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.9);
		border-radius: 10px;
		background-color: rgba(255, 255, 255, 0.1);
	}

	&::-webkit-scrollbar {
		width: 8px;
	}

	&::-webkit-scrollbar-thumb {
		background-color: rgba(0, 0, 0, 0.4);
		-webkit-border-radius: 10px;
	}
`;

interface Props {
	colorTheme: string;
}
const Timeline = ({ colorTheme }: Props) => {
	const TimelineBars = [
		{
			title: "Thought",
		},
		{
			title: "Brainstormed",
		},
		{
			title: "Evaluated",
		},
		{
			title: "ROI Identified",
		},
	];
	const allIdeas: any = useAllIdeasSummaries();
	const [ideasCategorized, setIdeasCategorized] = useState([
		{
			title: "Thought",
			ideas:
				allIdeas?.allIdeaSummaries !== null &&
				allIdeas?.allIdeaSummaries.filter(
					(idea: IdeaTypes) => idea.Stage.toLowerCase() === "thought"
				),
		},
		{
			title: "Brainstormed",
			ideas:
				allIdeas?.allIdeaSummaries !== null &&
				allIdeas?.allIdeaSummaries.filter(
					(idea: IdeaTypes) => idea.Stage.toLowerCase() === "brainstormed"
				),
		},
		{
			title: "Evaluated",
			ideas:
				allIdeas?.allIdeaSummaries !== null &&
				allIdeas?.allIdeaSummaries.filter(
					(idea: IdeaTypes) => idea.Stage.toLowerCase() === "evaluated"
				),
		},
		{
			title: "ROI Identified",
			ideas:
				allIdeas?.allIdeaSummaries !== null &&
				allIdeas?.allIdeaSummaries.filter(
					(idea: IdeaTypes) => idea.Stage.toLowerCase() === "roi identified"
				),
		},
	]);
	const changePosition = async (id: string, fromStage: string, toStage: string) => {
		// change position of idea in state
		if (fromStage === toStage) return;
		const fromStageIndex = ideasCategorized.findIndex(
			(stage: any) => stage.title === fromStage
		);
		const toStageIndex = ideasCategorized.findIndex(
			(stage: any) => stage.title === toStage
		);
		const ideaIndex = ideasCategorized[fromStageIndex].ideas.findIndex(
			(idea: any) => idea.id === id
		);
		const idea = ideasCategorized[fromStageIndex].ideas[ideaIndex];
		ideasCategorized[fromStageIndex].ideas.splice(ideaIndex, 1);
		const newIdea = { ...idea, Stage: toStage };
		ideasCategorized[toStageIndex].ideas.push(newIdea);
		setIdeasCategorized([...ideasCategorized]);
		await allIdeas?.updateIdeaSummaryInDatabase(newIdea);
	};
	return (
			<Container>
				{allIdeas?.allIdeaSummaries !== null ? (
					TimelineBars.map((bar, index) => {
						return (
							<div key={index}>
								<TimelineBar
									colorTheme={colorTheme}
									title={bar.title}
									ideas={
										ideasCategorized[index].ideas !== null &&
										ideasCategorized[index].ideas
									}
									key={index}
									changePosition={changePosition}
								/>
							</div>
						);
					})
				) : (
					<div>
						<h1>No Ideas</h1>
					</div>
				)}
			</Container>
	);
};

export default Timeline;
