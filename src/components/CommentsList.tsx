import { collection, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { CommentSummaryTypes, CommentT, IdeaTypes, UserDetailsTypes } from "../constants/types";
import { db } from "../firebase-config";
import CommentProps from "./Comment";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

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
	align-items: center;
	width: 100%;
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
interface FProps extends Props {
	ideaCommentsList: Array<string> | null;
	idea: IdeaTypes;
	ideaId: string;
}
const CommentsList = ({ colorTheme, ideaCommentsList, idea, ideaId }: FProps) => {
	const [allComments, setAllComments] = useState<CommentT[]|null>();
	const [commentOpen, setCommentOpen] = useState(false);
	const [loading, setLoading] = useState(true);
	
	const commentsCollectionRef = collection(db, "Comments");
	const userDetailsCollectionRef = collection(db, "UserInfo");
	useEffect(
		() => {
			const getComments = async () => {
				setLoading(true);
				const commentsArray: CommentT[] = [];
				ideaCommentsList?.forEach(async (commentId) => {
					const commentDoc = doc(commentsCollectionRef, commentId);
					const commentData = await getDoc(commentDoc);
					const comment= commentData.data() as CommentSummaryTypes;
					// get user details from authorId
					const userDetailsDoc = doc(userDetailsCollectionRef, comment.AuthorId);
					const userDetailsData = await getDoc(userDetailsDoc);
					const userDetails = userDetailsData.data() as UserDetailsTypes;
					console.table( userDetails ? userDetails : "undefined user" + comment.AuthorId);
					const commentObj: CommentT = {
						id: parseInt(commentId),
						username: userDetails?.FirstName + " " + userDetails?.LastName,
						avatar: userDetails?.pfpPath,
						body: comment?.body,
						// convert timestamp to date
						date: comment?.PostDate.toDate().toDateString(),	
					};
					commentsArray.push(commentObj);
				});
				setAllComments(commentsArray);
				setLoading(false);
			}
			getComments();
		}, []
	);
	if (loading) {
		return <div 
		style={
			{
				width: "100%",
				height: "100vh",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}
		}>

			<div
				style={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
				}}>
				<LoadingDots />
			</div>
	</div>
	}

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
						idea={idea}
						ideaId={ideaId}
					/>
				) : null}
				{allComments?.map((comment, index) => (
					<Comment
						key={index}
						comment={comment}
						colorTheme={colorTheme}
					/>
				))}
			</CommentsContainer>
		</Container>
	);
};

export default CommentsList;
