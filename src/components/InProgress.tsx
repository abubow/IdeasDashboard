import { Key } from "react";
import styled from "styled-components";
import { IdeaSummaryTypes } from "../constants/types";
import { useAllIdeasSummaries } from "../contexts/allIdeaSumContext";
import Mini_Idea from "./Mini_Idea";
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
	min-width: 50vw;
	max-width: 70vw;
	margin: 0 0.3vw;
	border: ${(props) =>
		props.colorTheme === "light"
			? "2px dashed rgb(28,29,34, 0.08)"
			: "none"};
	border-radius: 10px;
	padding: 1vh 1vw;
	overflow-y: auto;
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
	-webkit-touch-callout: none;
	-webkit-user-select: none;
	-khtml-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
`;
const IdeaContainer = styled.div`
	display: flex;
	justify-content: flex-center;
	align-items: center;
	gap: 1vh 1vw;
	flex-wrap: wrap;
	border-radius: 10px;
	padding-left: 1vw;
`;

const InProgress = ({ colorTheme }: Props) => {
	const allIdeas: any = useAllIdeasSummaries();
	return (
		<Container colorTheme={colorTheme}>
			<Title colorTheme={colorTheme}>
				In Progress (
				{allIdeas
					? allIdeas.allIdeaSummaries.filter(
							(idea: IdeaSummaryTypes) => {
								!idea.StageStatus;
							}
					  ).length
					: 0}
				)
			</Title>
			<IdeaContainer>
				{allIdeas.allIdeaSummaries?.map(
					(idea: IdeaSummaryTypes, index: Key | null | undefined) => {
						if (!idea.StageStatus) {
							return (
								<Mini_Idea
									colorTheme={colorTheme}
									idea={idea}
									key={index}
								/>
							);
						}
					}
				)}
			</IdeaContainer>
		</Container>
	);
};

export default InProgress;
