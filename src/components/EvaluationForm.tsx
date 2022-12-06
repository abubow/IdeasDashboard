import {
	addDoc,
	arrayUnion,
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	updateDoc,
	where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { EvaluationT, IdeaTypes } from "../constants/types";
import useUserAuth from "../contexts/authContext";
import { useTheme } from "../contexts/themeContext";
import { db } from "../firebase-config";

interface Props {
	colorTheme: string;
}
const EvaluationContainer = styled.form<Props>`
    background: ${(props) =>
		props.colorTheme === "light"
			? "rgba(28,29,34, 0.05)"
			: "rgba(255, 255, 255, 0.1)"};
    backdrop-filter: blur(10px);
    border-radius: 10px;
    padding: 1vh 1vw;
    margin: 1vh 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    @media (max-width: 768px) {
        width: 100%;
    }
    .evaluation-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        @media (max-width: 768px) {
            flex-direction: column;
            align-items: flex-start;
            gap: 1vh;
        }
        .evaluation-header-left {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            @media (max-width: 768px) {
                gap: 1vw;
            }
            .evaluation-avatar {
                width: 2.5vw;
                height: 2.5vw;
                border-radius: 50%;
                margin-right: 0.5vw;
                @media (max-width: 768px) {
                    width: 5vw;
                    height: 5vw;
                }
            }
            .evaluation-username {
                font-size: 0.8rem;
                font-weight: 400;
                color: ${(props) =>
					props.colorTheme === "light" ? "#000" : "#fff"};
                margin-right: 0.5vw;
                @media (max-width: 768px) {
                    font-size: 1rem;
                }
            }
        }
        .evaluation-header-right {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            gap: 0.5vw;
            .evaluation-date {
                font-size: 0.8rem;
                font-weight: 400;
                color: ${(props) =>
					props.colorTheme === "light" ? "#000" : "#fff"};
            }
        }
    }
    .evaluation-body {
        margin-top: 0.5vh;
        font-size: 0.8rem;
        font-weight: 400;
        width: 100%;
        color: ${(props) => (props.colorTheme === "light" ? "#000" : "#fff")};
        .evaluation-textarea {
            width: 100%;
            height: 5vh;
            border: none;
            background: transparent;
            color: ${(props) =>
				props.colorTheme === "light" ? "#000" : "#fff"};
            font-size: 0.8rem;
            font-weight: 400;
            resize: none;
            margin: 0.5vh 0 0 0.5vw;
            &:focus {
                outline: none;
            }
            &::placeholder {
                padding-left: 0.5vw;
                color: ${(props) =>
					props.colorTheme === "light" ? "#000" : "#fff"};
                text-align: left;
                text-indent: 0.5vw;
                text-transform: capitalize;
                text-decoration: none;
            }
    }
    .evaluation-date {
        font-size: 0.8rem;
        font-weight: 400;
        color: ${(props) => (props.colorTheme === "light" ? "#000" : "#fff")};
    }
    .evaluation-score {
        font-size: 0.8rem;
        font-weight: 400;
        color: ${(props) => (props.colorTheme === "light" ? "#000" : "#fff")};
        background: ${(props) =>
            props.colorTheme === "light" ? "#fff" : "#000"};
        padding: 0.5vh 0.5vw;
        border-radius: 5px;
        outline: none;
        border: none;
        cursor: pointer;
        max-width: 2em;
        &:focus {
            outline: none;
        }
    }
`;
const ButtonCrate = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	width: 100%;
	height: 5vh;
	gap: 0.5vw;
	margin: 0 1vw 1vh 0;
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
	transition: all 0.5s ease;
`;
const dotCarousel = keyframes`
	0% {
		box-shadow: 9984px 0 0 -1px #9880ff, 9999px 0 0 1px #9880ff, 10014px 0 0 -1px #9880ff;
	}
	50% {
		box-shadow: 10014px 0 0 -1px #9880ff, 9984px 0 0 -1px #9880ff, 9999px 0 0 1px #9880ff;
	}
	100% {
		box-shadow: 9999px 0 0 1px #9880ff, 10014px 0 0 -1px #9880ff, 9984px 0 0 -1px #9880ff;
	}
`;
const LoadingDots = styled.div`
	position: relative;
	left: -9999px;
	width: 10px;
	height: 10px;
	border-radius: 5px;
	background-color: #9880ff;
	color: #9880ff;
	box-shadow: 9984px 0 0 0 #9880ff, 9999px 0 0 0 #9880ff,
		10014px 0 0 0 #9880ff;
	animation: ${dotCarousel} 1.5s infinite linear;
`;
interface EvaluationFormProps {
	setEvaluationOpen: React.Dispatch<React.SetStateAction<boolean>>;
	idea: IdeaTypes;
	ideaId: string;
}
const EvaluationForm = ({
	setEvaluationOpen,
	idea,
	ideaId,
}: EvaluationFormProps) => {
	const { user, userDetails, userDetailsId }: any = useUserAuth();
	const [evaluation, setEvaluation] = useState("");
	const [score, setScore] = useState(0);
	const [totalScore, setTotalScore] = useState(0);
	const {colorTheme} = useTheme();

	const [loading, setLoading] = useState(false);
	const evaluationsRef = collection(db, "RoiEvaluations");
    const userInfoRef = collection(db, 'UserInfo');
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (evaluation.length === 0) return;
		if (score > totalScore || score < 0) return;

		if (idea == null) {
			return;
		}
        const queryI = query(userInfoRef, where('UserId', '==', user?.uid));
        const querySnapshot = await getDocs(queryI);
		const evaluationPost:EvaluationT = {
			Evaluation: evaluation,	
			EvaluatorId: querySnapshot.docs[0].id,
			Score: score,
			TotalScore: totalScore,
		};
		const ret = await addDoc(evaluationsRef, evaluationPost);
		console.table(userDetails);
		// updating the evaluations reference array in the idea
		const ideaRef = collection(db, "Ideas");
		const ideaDoc = doc(ideaRef, ideaId);	
		const ideaData = await getDoc(ideaDoc;
		const ideaEvaluations = ideaData.data()?.Evaluations;
		if (ideaEvaluations == null) {

		await updateDoc(ideaDoc, {
			Evaluations: [ret.id],
		});
		setEvaluationOpen(false);
	};
	return (
		<EvaluationContainer
			colorTheme={colorTheme}
			onSubmit={handleSubmit}>
			<div className="evaluation-header">
				<div className="evaluation-header-right">
					<p className="evaluation-date">
						{new Date().toLocaleDateString()}
					</p>
					<input
						type={"number"}
						className="evaluation-score"
						placeholder={"Score"}
						max={10}
						min={0}
                        value={roi}
                        onChange={(e) => setRoi(parseInt(e.target.value))}
					/>
					<input
						type={"number"}
						className="evaluation-score"
						placeholder={"Score"}
						max={10}
						min={0}
                        value={roi}
                        onChange={(e) => setRoi(parseInt(e.target.value))}
					/>
				</div>
			</div>
			<div className="evaluation-body">
				<textarea
					className="evaluation-textarea"
					placeholder="Write a evaluation..."
					value={evaluation}
					onChange={(e) => setEvaluation(e.target.value)}
				/>
				<ButtonCrate>
					<Button
						type="submit"
						colorTheme={colorTheme}>
						{loading ? (
							<LoadingDots />
						) : (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								style={{
									width: "1.5vw",
									height: "1.5vw",
									color:
										colorTheme === "light"
											? "#000"
											: "#fff",
								}}>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
								/>
							</svg>
						)}
					</Button>
					<Button
						type="button"
						colorTheme={colorTheme}
						onClick={() => setEvaluationOpen(false)}>
						Close
					</Button>
				</ButtonCrate>
			</div>
		</EvaluationContainer>
	);
};

export default EvaluationForm;
