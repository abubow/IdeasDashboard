import styled, { keyframes } from "styled-components";
import { IdeaTypes, newIdeaSummaryTypes, newIdeaTypes } from "../constants/types";
import { useRef, useState } from "react";
import { addDoc } from "firebase/firestore";
import { useAllIdeas } from "../contexts/ideasContext";
import useUserAuth from "../contexts/authContext";
import { useAllIdeasSummaries } from "../contexts/allIdeaSumContext";

const Container = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-direction: column;
	width: 95%;
	overflow-y: scroll;
`;
interface Props {
	colorTheme: string;
}
const NewIdeaForm = styled.form<Props>`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-direction: column;
	width: 90%;
	background-color: ${(props) =>
		props.colorTheme === "light" ? "#fff" : "#24262C"};
	color: ${(props) => (props.colorTheme === "light" ? "#000" : "#fff")};
	border-radius: 12px;
	padding: 1vh 1vw;
	backdrop-filter: blur(0.5rem);
	border: ${(props) =>
		props.colorTheme === "light" ? "2px dashed rgb(28,29,34, 0.08)" : ""};
`;
const InputContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	margin-bottom: 1vh;
	width: 100%;
	min-height: 8vh;
	height: auto;
	margin: 0;
	padding: 0;
`;
const NewIdeaInput = styled.input<Props>`
	position: relative;
	min-width: 60vw;
	min-height: 4vh;
	background-color: transparent;
    word-wrap: break-word;
    word-break: break-all;
	font-size: 1rem;
	font-weight: 400;
    border: ${(props) =>
		props.colorTheme === "light"
			? "2px dashed rgb(28,29,34, 0.08)"
			: " 2px dashed rgb(255, 255, 255, 0.08)"};
    color: ${(props) =>
		props.colorTheme === "light"
			? "rgb(28,29,34, 0.8)"
			: "rgb(255, 255, 255, 0.8)"};
	outline: none;
	margin: 0 5vw;
	padding: 3vh 1.5vw 1vh 1.5vw;
    border-radius: 8px;
    &:focus ~ label,
    &:valid ~ label {
    {
        color: ${(props) =>
			props.colorTheme === "light" ? "#fff" : "#24262C"};
        top: 15%;
        left: 2vw;
        font-size: 0.8rem;
        background-color: ${(props) =>
			props.colorTheme === "light"
				? "rgb(28,29,34, 1)"
				: "rgb(255, 255, 255, 1 )"};
        border-radius: 8px;
        margin: 0 0.5vw;
        opacity: 1;
        height: 2vh;
    };
    &:focus{
        border: ${(props) =>
			props.colorTheme === "light"
				? "2px solid rgb(28,29,34, 0.2)"
				: " 2px solid rgb(255, 255, 255, 0.2)"};
    };
    &::placeholder {
        opacity: 0;
    }
`;
const ListInput = styled.input<Props>`
	position: relative;
	min-width: 40vw;
	min-height: 4vh;
	background-color: transparent;
	word-wrap: break-word;
	word-break: break-all;
	font-size: 1rem;
	font-weight: 400;
	border: 1px solid
		${(props) =>
			props.colorTheme === "light"
				? "rgb(28,29,34, 0.08)"
				: "rgb(255, 255, 255, 0.08)"};
	color: ${(props) =>
		props.colorTheme === "light"
			? "rgb(28,29,34, 0.8)"
			: "rgb(255, 255, 255, 0.8)"};
	outline: none;
	margin: 0 5vw;
	padding: 3vh 1.5vw 1vh 1.5vw;
	border-radius: 8px;
	&:focus {
		border: ${(props) =>
			props.colorTheme === "light"
				? "2px dashed rgb(28,29,34, 0.2)"
				: " 2px solid rgb(255, 255, 255, 0.2)"};
	}
	&::placeholder {
		opacity: 0.5;
	}
`;

const InputLabel = styled.label<Props>`
	position: absolute;
	top: 50%;
	left: 2vw;
	transform: translateY(-50%);
	padding: 0 1vw;
	pointer-events: none;
	transition: all 0.2s ease-in-out;
	color: ${(props) => (props.colorTheme === "light" ? "#000" : "#fff")};
	font-size: 1rem;
	font-weight: 400;
	opacity: 0.5;
`;

const Title = styled.label<Props>`
	font-size: 1.7rem;
	font-weight: 600;
	color: ${(props) => (props.colorTheme === "light" ? "#000" : "#fff")};
	padding-left: 1vw;
	margin-top: 1vh;
	width: 100%;
	margin: 3vh 0 4vh 1vw;
`;
const DeleteButton = styled.button`
	width: 2vh;
	height: 2vh;
	background-color: transparent;
	border: none;
	outline: none;
	cursor: pointer;
`;
const ProConContainer = styled.div<Props>`
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
	flex-direction: column;
	width: 95.5%;
	min-height: 10vh;
	height: auto;
	margin: 1vh 0;
	padding: 2vh 0;
	border-radius: 8px;
	border: ${(props) =>
		props.colorTheme === "light"
			? "2px dashed rgb(28,29,34, 0.08)"
			: " 2px dashed rgb(255, 255, 255, 0.08)"};
`;
const UL = styled.ul`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-direction: column;
	width: 100%;
	margin: 0 0 0 1vw;
	padding: 0;
`;
const LI = styled.li<Props>`
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	flex-direction: row;
	width: 80%;
	max-width: 40vw;
	text-overflow: ellipsis;
	margin: 0 0 0 3vw;
	padding: 0 0 0 1vw;
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
	box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
	transition: all 0.5s ease;
`;
const ButtonCrate = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	width: 100%;
	height: 10vh;
	gap: 0.5vw;
	margin: 0 4vw 1vh 0;
`;
const Listing = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-direction: column;
	width: 100%;
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
const NewIdea = ({ colorTheme }: Props) => {
	const [title, setTitle] = useState("");
	const [Description, setDescription] = useState("");

	const [pros, setPros] = useState<Array<string>>([]);
	const [cons, setCons] = useState<Array<string>>([]);

	const [submitting, setSubmitting] = useState(false);

	const proInputRef = useRef<HTMLInputElement>(null);
	const conInputRef = useRef<HTMLInputElement>(null);

	const formRef = useRef<HTMLFormElement>(null);

	const ideaContext: any = useAllIdeas();
	const ideasSummaryContext: any = useAllIdeasSummaries();
	const authContext: any = useUserAuth();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		if (!authContext.user) return;
		e.preventDefault();
		const newIdea: newIdeaTypes = {
			Title: title,
			Description: Description,
			Pros: pros.length > 0 ? pros : null,
			Cons: cons.length > 0 ? cons : null,
			Stage: "Thought",
			StageStatus: false,
			Evaluation: null,
			ROI: null,
			TeamId: null,
			AuthorId: authContext.user.uid,
			Comments: null,
			comments: null
		};
		setSubmitting(true);
		const ideaRef = await ideaContext.addIdeaToDatabase(newIdea);
		const newIdeaSummary: newIdeaSummaryTypes = {
			Title: title,
			Stage: "Thought",
			Comments:  0,
			Attachments: 0,
			IdeaOutline: ideaRef.id,
			StageStatus: false,
		};
		await ideasSummaryContext.addIdeaSummaryToDatabase(newIdeaSummary);
		setPros([]);
		setCons([]);
		formRef.current?.reset();
		setSubmitting(false);
	};
	const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setPros([]);
		setCons([]);
		formRef.current?.reset();
	};
	return (
		<Container>
			{submitting ? (
				<LoadingDots />
			) : (
				<NewIdeaForm
					colorTheme={colorTheme}
					ref={formRef}
					onSubmit={handleSubmit}>
					<Title colorTheme={colorTheme}>New Idea</Title>
					<InputContainer>
						<NewIdeaInput
							colorTheme={colorTheme}
							type="text"
							required
							onChange={(e) => setTitle(e.target.value)}
						/>
						<InputLabel colorTheme={colorTheme}>Title</InputLabel>
					</InputContainer>
					<InputContainer>
						<NewIdeaInput
							colorTheme={colorTheme}
							type="text"
							required
							onChange={(e) => setDescription(e.target.value)}
						/>
						<InputLabel colorTheme={colorTheme}>
							Description
						</InputLabel>
					</InputContainer>
					<InputContainer>
						<NewIdeaInput
							colorTheme={colorTheme}
							type="file"
							accept="image/*"
							style={{ padding: "1.5vh 1.5vw" }}
						/>
					</InputContainer>
					<ProConContainer colorTheme={colorTheme}>
						<Listing>
							<div
								style={{
									width: "90%",
									padding: "1vh 1vw 2vh 0",
								}}>
								Pros
							</div>
							<UL>
								{pros.map((pro, index) => {
									return (
										<LI
											colorTheme={colorTheme}
											key={index}>
											+ {pro}
											<DeleteButton
												onClick={() => {
													setPros([
														...pros.slice(0, index),
														...pros.slice(
															index + 1
														),
													]);
												}}>
												-
											</DeleteButton>
										</LI>
									);
								})}
							</UL>
						</Listing>
						<InputContainer>
							<ListInput
								colorTheme={colorTheme}
								type="text"
								placeholder="Add Pros"
								style={{
									padding: "1.5vh 1vw",
									width: "80%",
									margin: "0 0 0 1vw",
								}}
								ref={proInputRef}
								onKeyPress={(e) => {
									if (e.key === "Enter") {
										// prevent page refresh
										e.preventDefault();
									}
								}}
							/>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								style={{
									width: "2vw",
									height: "2vh",
									marginLeft: "1vw",
									cursor: "pointer",
								}}
								onClick={() => {
									if (proInputRef.current?.value) {
										setPros([
											...pros,
											proInputRef.current.value,
										]);
										proInputRef.current.value = "";
									}
								}}>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M12 6v12m6-6H6"
								/>
							</svg>
						</InputContainer>
					</ProConContainer>
					<ProConContainer colorTheme={colorTheme}>
						<div style={{ width: "100%", paddingLeft: "1vw" }}>
							Cons
						</div>
						<UL>
							{cons.map((con, index) => {
								return (
									<LI
										colorTheme={colorTheme}
										key={index}>
										+ {con}
										<DeleteButton
											onClick={() => {
												setCons([
													...cons.slice(0, index),
													...cons.slice(index + 1),
												]);
											}}>
											-
										</DeleteButton>
									</LI>
								);
							})}
						</UL>
						<InputContainer>
							<ListInput
								colorTheme={colorTheme}
								type="text"
								placeholder="Add Cons"
								style={{
									padding: "1.5vh 1vw",
									width: "80%",
									margin: "0 0 0 1vw",
								}}
								onKeyPress={(e) => {
									if (e.key === "Enter") {
										// prevent page refresh
										e.preventDefault();
									}
								}}
								ref={conInputRef}
							/>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								style={{
									width: "2vw",
									height: "2vh",
									marginLeft: "1vw",
									cursor: "pointer",
								}}
								onClick={() => {
									if (conInputRef.current?.value) {
										setCons([
											...cons,
											conInputRef.current.value,
										]);
										conInputRef.current.value = "";
									}
								}}>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M12 6v12m6-6H6"
								/>
							</svg>
						</InputContainer>
					</ProConContainer>
					<ButtonCrate>
						<Button
							colorTheme={colorTheme}
							type="submit">
							Submit
						</Button>
						<Button
							colorTheme={colorTheme}
							onClick={handleCancel}>
							Cancel
						</Button>
					</ButtonCrate>
				</NewIdeaForm>
			)}
		</Container>
	);
};

export default NewIdea;
