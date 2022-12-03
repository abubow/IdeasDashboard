import styled from "styled-components";
import { useEffect, useState } from "react";
import { IdeaTypes } from "../constants/types";
import parse from "html-react-parser";
import CommentsList from "./CommentsList";
import ROI from "./ROI";

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
	width: 6vw;
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
	overflow-x: auto;
	&:hover {
		opacity: 1;
	}
	@media (max-width: 768px) {
		width: 25vw;
	}
	@media (max-width: 425px) {
		width: 35vw;
	}
	@media (max-width: 1024px) {
		width: 10vw;
	}
`;
const TabContent = styled.div<TabProps>`
	display: ${(props) => (props.selected ? "flex" : "none")};
	justify-content: flex-start;
	align-items: flex-start;
	flex-direction: column;
	width: 100%;
	height: 100%;
	background-color: ${(props) =>
		props.colorTheme === "light"
			? "rgba(0,0,0,0.1)"
			: "rgba(255,255,255,0.1)"};
	color: ${(props) => (props.colorTheme === "light" ? "#000" : "#fff")};
	padding: 1vh 1vw;
	opacity: 0.9;
	border-radius: 0 0 0.5rem 0.5rem;
	transition: all 0.3s ease-in;
	margin-top: 0;
	max-height: 60vh;
	overflow-y: auto;
`;
const Description = styled.div<Props>`
	font-size: 0.9rem;
	font-weight: 400;
	color: ${(props) => (props.colorTheme === "light" ? "#000" : "#fff")};
	text-align: justify;
	max-height: 70vh;
	padding: 1vh 2vw;
	line-height: 1.2rem;
`;
const Pros = styled.ol<Props>`
	margin: 0 2vw;
`;
const Cons = styled.ol<Props>`
	margin: 0 2vw;
`;
const Li = styled.li<Props>`
	font-size: 0.8rem;
	font-weight: 400;
	color: ${(props) => (props.colorTheme === "light" ? "#000" : "#fff")};
	margin: 0.5vh 1vw;
`;
interface FProps extends Props {
	idea: IdeaTypes;
	ideaId: string;
}
const TabsC = ({ idea, colorTheme, ideaId }: FProps) => {
	const Tabs = [
		{
			id: "1",
			name: "General",
		},
		{
			id: "2",
			name: "Evaluation",
		},
		{
			id: "3",
			name: "Roi",
		},
		{
			id: "4",
			name: "Comments",
		},
		{
			id: "5",
			name: "Attachments",
		},
	];
	const [tabSelected, setTabSelected] = useState(Tabs[0].id);
	return (
		<Container colorTheme={colorTheme}>
			<TabIdentifierCrate>
				{Tabs.map((item) => (
					<TabIdentifier
						key={item.id}
						colorTheme={colorTheme}
						selected={tabSelected === item.id}
						onClick={() => setTabSelected(item.id)}>
						{item.name}
					</TabIdentifier>
				))}
			</TabIdentifierCrate>
			{Tabs.map((item) => (
				<TabContent
					key={item.id}
					colorTheme={colorTheme}
					selected={tabSelected === item.id}>
					{item.id === "1" ? (
						<>
							<Description colorTheme={colorTheme}>
								{parse(idea.Description)}
							</Description>
							<Pros colorTheme={colorTheme}>
								<h2>Pros</h2>
								{idea.Pros?.map((item) => (
									<Li
										key={item}
										colorTheme={colorTheme}>
										{item}
									</Li>
								))}
							</Pros>
							<Cons colorTheme={colorTheme}>
								<h2>Cons</h2>
								{idea.Cons?.map((item) => (
									<Li
										key={item}
										colorTheme={colorTheme}>
										{item}
									</Li>
								))}
							</Cons>
						</>
					) : item.id === "2" ? (
							<Description colorTheme={colorTheme}>
								{idea.Evaluation
									? parse(
											`
										score: ${idea.Evaluation[0]}` +
												"<br/>" +
												`
										${idea.Evaluation[1]}
										`
									  )
									: "No evaluation yet"}
							</Description>
					) : item.id === "3" ? (
							<ROI ROIarray={idea.ROI} idea={idea} ideaId={ideaId} />
					) : (
							<CommentsList colorTheme={colorTheme} ideaCommentsList={idea.Comments} idea={idea} ideaId={ideaId} />
					)}
				</TabContent>
			))}
		</Container>
	);
};

export default TabsC;
