import { collection, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { CommentSummaryTypes, IdeaTypes, ROICommentSummaryT, ROICommentT, UserDetailsTypes } from "../constants/types";
import { useTheme } from "../contexts/themeContext";
import { db } from "../firebase-config";
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

interface interfaceProps {
	ideaCommentsList: Array<string> | null;
	idea: IdeaTypes;
	ideaId: string;
}

const ROICommentsList = ({ ideaCommentsList, idea, ideaId }: interfaceProps) => {
	const [allComments, setAllComments] = useState<ROICommentT[]|null>();
	const [commentOpen, setCommentOpen] = useState(false);
	const [loading, setLoading] = useState(true);
	
	const commentsCollectionRef = collection(db, "RoiComments");
	const userDetailsCollectionRef = collection(db, "UserInfo");
	useEffect(
		() => {
			const getComments = async () => {
				setLoading(true);
				const commentsArray: ROICommentT[] = [];
				ideaCommentsList?.forEach(async (commentId) => {
					if (commentId === "") {
						return;
					}
					const commentDoc = doc(commentsCollectionRef, commentId);
					const commentData = await getDoc(commentDoc);
					const comment= commentData.data() as ROICommentSummaryT;
					// get user details from authorId
					const userDetailsDoc = doc(userDetailsCollectionRef, comment.AuthorId);
					const userDetailsData = await getDoc(userDetailsDoc);
					const userDetails = userDetailsData.data() as UserDetailsTypes;
					//console.table( userDetails ? userDetails : "undefined user" + comment.AuthorId);
					const commentObj: ROICommentT = {
						id: parseInt(commentId),
						username: userDetails?.FirstName + " " + userDetails?.LastName,
						avatar: userDetails?.pfpPath,
						body: comment?.body,
						// convert timestamp to date
						date: comment?.PostDate.toDate().toDateString(),	
						ROI: comment?.ROI,
					};
					commentsArray.push(commentObj);
				});
				setAllComments(commentsArray);
				setLoading(false);
			}
			getComments();
		}, []
	);
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
						idea={idea}
						ideaId={ideaId}
					/>
				) : null}
				{allComments?.map((comment) => (
					<Comment
						key={comment?.id}
						comment={comment}
						colorTheme={colorTheme}
					/>
				))}
			</CommentsContainer>
		</Container>
	);
};

export default ROICommentsList;
