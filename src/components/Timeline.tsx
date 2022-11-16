import styled from "styled-components";
import TimelineBar from "./TimelineBar";
import { useAllIdeas } from "../contexts/ideasContext";
import { IdeaTypes } from "../constants/types";
import { useEffect } from "react";
import { useAllIdeasSummaries } from "../contexts/allIdeaSumContext";
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
    const allIdeas:any = useAllIdeasSummaries();
	const ideasCategorized = [
		{
			title: "Thought",
			ideas: allIdeas?.allIdeaSummaries!==null &&allIdeas?.allIdeaSummaries.filter((idea: IdeaTypes) => idea.Stage === "Thought"),
		},
		{
			title: "Brainstormed",
			ideas:  allIdeas?.allIdeaSummaries!==null &&allIdeas?.allIdeaSummaries.filter(
				(idea: IdeaTypes) => idea.Stage === "Brainstormed"
			),
		},
		{
			title: "Evaluated",
			ideas:  allIdeas?.allIdeaSummaries!==null &&allIdeas?.allIdeaSummaries.filter((idea: IdeaTypes) => idea.Stage === "Evaluated"),
		},
		{
			title: "ROI Identified",
			ideas:  allIdeas?.allIdeaSummaries!==null &&allIdeas?.allIdeaSummaries.filter(
				(idea: IdeaTypes) => idea.Stage === "ROI Identified"
			),
		},
	];


	return (
		<Container>
			{
				allIdeas?.allIdeaSummaries!==null? (
			TimelineBars.map((bar, index) => {
				return (
					<div key={index}>
						<TimelineBar
							colorTheme={colorTheme}
							title={bar.title}
							ideas={
								ideasCategorized.filter(
									(idea: any) => idea.title === bar.title
								)[0].ideas
							}
							key={index}
						/>
					</div>
				);
			})
			) : (
				<div>
					<h1>No Ideas</h1>
				</div>
			)
		}
		</Container>
	);
};

export default Timeline;
