import styled from "styled-components";
import { EvaluationT } from "../constants/types";
import { useTheme } from "../contexts/themeContext";
import parse from "html-react-parser";
import useUserAuth from "../contexts/authContext";
import { useState } from "react";
import EvaluationForm from "./EvaluationForm";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	width: 80%;
	@media (max-width: 768px) {
		width: 100%;
	}
`;

const Score = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	gap: 0.5vw;
`;

interface Props {
	colorTheme: string;
}
const ScoreText = styled.div<Props>`
	font-size: 1rem;
	font-weight: 400;
	color: ${(props) => (props.colorTheme === "light" ? "#000" : "#fff")};
`;

const EvalComment = styled.div<Props>`
	font-size: 0.95rem;
	font-weight: 200;
	color: ${(props) => (props.colorTheme === "light" ? "#000" : "#fff")};
	margin: 1vh 0;
`;
const ClickableSvg = styled.svg`
	cursor: pointer;
	border-radius: 50%;
	background-color: rgba(0, 0, 0, 0.05);
	padding: 0.75vh;
	min-width: 2rem;
	min-height: 2rem;
	transition: all 0.5s ease;
	margin-left: 0.5vw;
	&:hover {
		background-color: rgba(0, 0, 0, 0.1);
	}
	@media (max-width: 768px) {
		min-width: 1.8rem;
		min-height: 1.8rem;
	}
`;

interface EvaluationProps {
	evaluation: EvaluationT | null;
	ideaId: string;
	idea: any;
}
const Evaluation = ({ evaluation, ideaId, idea }: EvaluationProps) => {
	const { colorTheme } = useTheme();
	const user: any = useUserAuth();
	const [editing, setEditing] = useState(false);
	return (
		<Container>
			{evaluation !== null ? (
				<>
					<Score>
						Score:
						<ScoreText colorTheme={colorTheme}>
							{evaluation.Score}
						</ScoreText>
						<ScoreText colorTheme={colorTheme}>
							/ {evaluation.TotalScore}
						</ScoreText>
					</Score>
					<EvalComment colorTheme={colorTheme}>
						{parse(evaluation.Evaluation)}
					</EvalComment>
				</>
			) : (editing ? (
						<EvaluationForm setEvaluationOpen={setEditing} ideaId={ideaId} idea={idea} />
					) : (
				<div
					style={{
						position: "relative",
						width: "100%",
						height: "100%",
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}>
					<div>No evaluation yet</div>
					<ClickableSvg
						viewBox="0 0 12 12"
						fill="none"
						width="16"
						height="16"
						onClick={() => {
							setEditing(true);
						}}
						style={{
							zIndex: 1,
							backgroundColor:
								colorTheme === "light"
									? "rgba(255,255,255,0.9)"
									: "rgba(0,0,0,0.8)",
							color: colorTheme === "light" ? "#000" : "#fff",
						}}
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M9.49771 3.2093L10.2059 3.91755M10.5599 1.43869C10.6994 1.57819 10.8101 1.74381 10.8856 1.92609C10.9611 2.10838 11 2.30375 11 2.50106C11 2.69837 10.9611 2.89374 10.8856 3.07603C10.8101 3.25831 10.6994 3.42393 10.5599 3.56343L3.83257 10.2918L1 11L1.70814 8.20668L8.43833 1.44153C8.7036 1.17492 9.05941 1.01783 9.43511 1.00143C9.81082 0.985026 10.179 1.11052 10.4664 1.35299L10.5599 1.43869Z"
							stroke={colorTheme === "light" ? "#1A1831" : "#fff"}
							strokeWidth="1"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</ClickableSvg>
				</div>)
			)}
		</Container>
	);
};

export default Evaluation;
