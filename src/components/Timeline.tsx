import styled from "styled-components";
import TimelineBar from "./TimelineBar";
import { useAllIdeas } from "../contexts/ideasContext";
import { IdeaTypes } from "../constants/types";
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
    const allIdeas:any = useAllIdeas();
	return (
		<Container>
			{TimelineBars.map((bar, index) => {
				return (
					<div key={index}>
						<TimelineBar
							colorTheme={colorTheme}
							title={bar.title}
							ideas={
                                allIdeas.filter((idea: IdeaTypes) => {
                                    return idea.Stage === bar.title;
                                }
                            )}
							key={index}
						/>
					</div>
				);
			})}
		</Container>
	);
};

export default Timeline;
