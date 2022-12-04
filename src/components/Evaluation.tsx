import styled from "styled-components";
import { EvaluationT } from "../constants/types";
import { useTheme } from "../contexts/themeContext";
import parse from "html-react-parser";

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

interface EvaluationProps {
	evaluation: EvaluationT;
}
const Evaluation = ({ evaluation }: EvaluationProps) => {
	const { colorTheme } = useTheme();
	return (
		<Container>
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
		</Container>
	);
};

export default Evaluation;
