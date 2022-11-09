import { useState } from "react";
import styled from "styled-components";
import { IdeaSummaryTypes } from "../constants/types";
import IdeaPopUp from "./IdeaPopUp";
import PopUp from "./PopUp";

interface Props {
	colorTheme: string;
}
const Container = styled.div<Props>`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	background-color: ${(props) =>
		props.colorTheme === "light" ? "#fff" : "rgba(255, 255, 255, 0.02)"};
	border: ${(props) =>
		props.colorTheme === "light"
			? "2px solid rgba(28,29,34, 0.08)"
			: "none"};
	backdrop-filter: blur(10px);
	width: 15vw;
	margin: 0.8vh 0;
	padding: 1vh 1vw;
	border-radius: 12px;
	min-height: 15vh;
	cursor: move;
`;
const Crate = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
	flex-direction: column;
	width: 100%;
	margin: 1vh 0;
`;
interface SProps {
	status: boolean;
}
const StatusBall = styled.div<SProps>`
	width: 1.1vw;
	height: 1.1vw;
	border-radius: 50%;
	background-color: ${(props) => (props.status ? "#78D700" : "#FFA048")};
`;
const Title = styled.div<Props>`
	font-size: 1.5rem;
	font-weight: 700;
	color: ${(props) => (props.colorTheme === "light" ? "#000" : "#fff")};
	padding: 1vh 0 2vh 0;
`;
const MetaContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: flex-start;
	padding-top: 1vh;
`;
const AttachmentCount = styled.div<Props>`
    font-size: 0.8rem;
    font-weight: 400;
    color: ${(props) =>
		props.colorTheme === "light"
			? "rgba(28,29,34, 0.5)"
			: "rgba(255, 255, 255, 0.5)"}};
    padding: 0 1vw;
`;
const Attachments = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;
const CommentCount = styled.div<Props>`
    font-size: 0.8rem;
    font-weight: 400;
    color: ${(props) =>
		props.colorTheme === "light"
			? "rgba(28,29,34, 0.5)"
			: "rgba(255, 255, 255, 0.5)"}};
    padding: 0 1vw;
`;
const Comments = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;
interface FProps {
	colorTheme: string;
	idea: IdeaSummaryTypes;
}
const Mini_Idea = ({ colorTheme, idea }: FProps) => {
	const [ideaDetails, setIdeaDetails] = useState({
		title: idea.Title,
	});
	const [showPopUp, setShowPopUp] = useState(false);
	return (
		<>
			<Container
				colorTheme={colorTheme}
				draggable="true"
				className={"dragable"}
				onClick={() => {
					setShowPopUp(true);
				}}>
				<Crate>
					<StatusBall status={idea.StageStatus} />
					<Title colorTheme={colorTheme}>{idea.Title}</Title>
					<MetaContainer>
						<Attachments>
							<svg
								width="16"
								height="14"
								viewBox="0 0 16 14"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M13.5972 2.1818C13.0817 1.61948 12.1509 1.58483 11.5304 2.20533L5.45535 8.28033C5.29825 8.43744 5.29825 8.63757 5.45535 8.79467C5.61246 8.95178 5.81259 8.95178 5.96969 8.79467L10.9947 3.76967C11.2876 3.47678 11.7625 3.47678 12.0554 3.76967C12.3482 4.06257 12.3482 4.53744 12.0554 4.83033L7.03035 9.85533C6.28746 10.5982 5.13759 10.5982 4.39469 9.85533C3.6518 9.11244 3.6518 7.96257 4.39469 7.21967L10.4697 1.14467C11.6453 -0.0309737 13.5559 -0.0692286 14.6918 1.15616C15.856 2.33247 15.8903 4.23368 14.6697 5.366L7.55535 12.4803C5.91246 14.1232 3.33759 14.1232 1.69469 12.4803C0.0518012 10.8374 0.0518012 8.26257 1.69469 6.61967L7.76969 0.544675C8.06259 0.251782 8.53746 0.251782 8.83035 0.544675C9.12325 0.837568 9.12325 1.31244 8.83035 1.60533L2.75535 7.68033C1.69825 8.73744 1.69825 10.3626 2.75535 11.4197C3.81246 12.4768 5.43759 12.4768 6.49469 11.4197L13.6197 4.29467C13.6274 4.28699 13.6352 4.27948 13.6432 4.27214C14.2056 3.75668 14.2402 2.82584 13.6197 2.20533C13.612 2.19765 13.6045 2.18981 13.5972 2.1818Z"
									fill={
										colorTheme === "light"
											? "rgba(28,29,34, 0.5)"
											: "rgba(255, 255, 255, 0.5)"
									}
								/>
							</svg>
							<AttachmentCount colorTheme={colorTheme}>
								{0}
							</AttachmentCount>
						</Attachments>
						<Comments>
							<svg
								width="16"
								height="14"
								viewBox="0 0 16 14"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M0.5 1.5C0.5 0.671573 1.17157 0 2 0H14C14.8284 0 15.5 0.671573 15.5 1.5V9.75C15.5 10.5784 14.8284 11.25 14 11.25H10.5607L8.53033 13.2803C8.23744 13.5732 7.76256 13.5732 7.46967 13.2803L5.43934 11.25H2C1.17157 11.25 0.5 10.5784 0.5 9.75V1.5ZM14 1.5H2V9.75H5.75C5.94891 9.75 6.13968 9.82902 6.28033 9.96967L8 11.6893L9.71967 9.96967C9.86032 9.82902 10.0511 9.75 10.25 9.75H14V1.5ZM3.5 4.125C3.5 3.71079 3.83579 3.375 4.25 3.375H11.75C12.1642 3.375 12.5 3.71079 12.5 4.125C12.5 4.53921 12.1642 4.875 11.75 4.875H4.25C3.83579 4.875 3.5 4.53921 3.5 4.125ZM3.5 7.125C3.5 6.71079 3.83579 6.375 4.25 6.375H8.75C9.16421 6.375 9.5 6.71079 9.5 7.125C9.5 7.53921 9.16421 7.875 8.75 7.875H4.25C3.83579 7.875 3.5 7.53921 3.5 7.125Z"
									fill={
										colorTheme === "light"
											? "rgba(28,29,34, 0.5)"
											: "rgba(255, 255, 255, 0.5)"
									}
								/>
							</svg>
							<CommentCount colorTheme={colorTheme}>
								{0}
							</CommentCount>
						</Comments>
					</MetaContainer>
				</Crate>
			</Container>
			{showPopUp ? (
				<PopUp
					colorTheme={colorTheme}
					idea={idea}
					setShowPopUp={setShowPopUp}
				/>
			) : null}
		</>
	);
};

export default Mini_Idea;
