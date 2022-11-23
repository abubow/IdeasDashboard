import { useState } from "react";
import styled from "styled-components";
import { useTheme } from "../contexts/themeContext";
import Comment from "./RoiComment";
import CommentForm from "./RoiCommentForm";

interface Props {
	colorTheme: string;
}
const Container = styled.div`
	width: 100%;
	height: 100%;
	margin: 0;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	gap: 1vh;
	overflow: auto;
`;
const CommentsContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
`;
const ButtonCrate = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	width: 100%;
	height: 10vh;
	gap: 0.5vw;
    padding: 1vh 1vw;
    margin: 0 1vw;
	max-width: 60vw;
`;
const Button = styled.button<Props>`
	width: 5rem;
	height: 2rem;
	color: ${(props) => (props.colorTheme === "light" ? "black" : "white")};
	border: none;
	outline: none;
	margin-right: 2.5vw;
	background: ${(props) =>
		props.colorTheme === "light" ? "white" : "#292B31"};
	border-radius: 8px;
	opacity: 0.8;
	transition: all 0.5s ease;
`;

const CommentsList = () => {
	const allComments = [
		{
			id: 1,
			username: "John Doe",
			avatar: "https://i.pravatar.cc/150?img=1",
			date: "1/1/2021",
			body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
		},
		{
			id: 2,
			username: "Jane Doe",
			avatar: "https://i.pravatar.cc/150?img=2",
			date: "1/1/2021",
			body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
		},
		{
			id: 3,
			username: "Jack Doe",
			avatar: "https://i.pravatar.cc/150?img=3",
			date: "1/1/2021",
			body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
		},
		{
			id: 4,
			username: "Jill Doe",
			avatar: "https://i.pravatar.cc/150?img=4",
			date: "1/1/2021",
			body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
		},
		{
			id: 5,
			username: "Jim Doe",
			avatar: "https://i.pravatar.cc/150?img=5",
			date: "1/1/2021",
			body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
		},
		{
			id: 6,
			username: "Jenny Doe",
			avatar: "https://i.pravatar.cc/150?img=6",
			date: "1/1/2021",
			body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
		},
		{
			id: 7,
			username: "Jax Doe",
			avatar: "https://i.pravatar.cc/150?img=7",
			date: "1/1/2021",
			body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
		},
		{
			id: 8,
			username: "Jon Doe",
			avatar: "https://i.pravatar.cc/150?img=8",
			date: "1/1/2021",
			body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
		},
	];
	const [commentOpen, setCommentOpen] = useState(false);
    const {colorTheme} = useTheme();
	return (
		<Container>
			<ButtonCrate>
				<Button
					colorTheme={colorTheme}
					onClick={() => setCommentOpen(!commentOpen)}>
					{commentOpen ? "Close" : "Create"}
				</Button>
			</ButtonCrate>

			<CommentsContainer>
				{commentOpen ? (
					<CommentForm
						colorTheme={colorTheme}
						setCommentOpen={setCommentOpen}
					/>
				) : null}
				{allComments.map((comment) => (
					<Comment
						key={comment.id}
						comment={comment}
						colorTheme={colorTheme}
					/>
				))}
			</CommentsContainer>
		</Container>
	);
};

export default CommentsList;
