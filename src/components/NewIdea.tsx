import styled from "styled-components";
import { IdeaTypes } from "../constants/types";
import { useRef, useState } from "react";

const Container = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-direction: column;
	width: 95%;
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
	min-height: 40vh;
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
	border: none;
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
				? "2px solid rgb(28,29,34, 0.2)"
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
const DeleteButton = styled.button``;
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
	justify-content: flex-start;
	align-items: center;
	flex-direction: row;
	width: 100%;
	margin: 0 0 0 3vw;
	padding: 0;
`;
const NewIdea = ({ colorTheme }: Props) => {
	const [pros, setPros] = useState<Array<string>>([]);
	const [cons, setCons] = useState<Array<string>>([]);

	const proInputRef = useRef<HTMLInputElement>(null);
	const conInputRef = useRef<HTMLInputElement>(null);
	return (
		<Container>
			<NewIdeaForm colorTheme={colorTheme}>
				<Title colorTheme={colorTheme}>New Idea</Title>
				<InputContainer>
					<NewIdeaInput
						colorTheme={colorTheme}
						type="text"
						required
					/>
					<InputLabel colorTheme={colorTheme}>Title</InputLabel>
				</InputContainer>
				<InputContainer>
					<NewIdeaInput
						colorTheme={colorTheme}
						type="text"
						required
					/>
					<InputLabel colorTheme={colorTheme}>Description</InputLabel>
				</InputContainer>
				<InputContainer>
					<NewIdeaInput
						colorTheme={colorTheme}
						type="file"
						accept="image/png, image/jpg, image/gif, image/jpeg"
						required
						style={{ padding: "1.5vh 1vw" }}
					/>
				</InputContainer>
				<ProConContainer colorTheme={colorTheme}>
					<div style={{ width: "100%", paddingLeft: "1vw" }}>
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
												...pros.slice(index + 1),
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
							placeholder="Add Pros"
							required
							style={{
								padding: "1.5vh 1vw",
								width: "80%",
								margin: "0 0 0 1vw",
							}}
							ref={proInputRef}
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
							required
							style={{
								padding: "1.5vh 1vw",
								width: "80%",
								margin: "0 0 0 1vw",
							}}
							ref={conInputRef}
						/>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
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
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M12 6v12m6-6H6"
							/>
						</svg>
					</InputContainer>
				</ProConContainer>
				<button>Submit</button>
			</NewIdeaForm>
		</Container>
	);
};

export default NewIdea;
