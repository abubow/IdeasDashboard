import { addDoc, arrayUnion, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { useState } from "react";
import styled from "styled-components";
import { IdeaTypes } from "../constants/types";
import useUserAuth from "../contexts/authContext";
import { db } from "../firebase-config";

interface Props {
	colorTheme: string;
}
const CommentContainer = styled.form<Props>`
    background: ${(props) =>
		props.colorTheme === "light"
			? "rgba(28,29,34, 0.005)"
			: "rgba(255, 255, 255, 0.01)"};
    backdrop-filter: blur(10px);
    border-radius: 10px;
    padding: 1vh 1vw;
    margin: 1vh 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
	font-size: 0.8rem;
	font-weight: 400;
	resize: none;
	font-family: 'Exo 2', sans-serif;
    width: 100%;
    @media (max-width: 768px) {
        width: 100%;
    }
    .comment-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        @media (max-width: 768px) {
            flex-direction: column;
            align-items: flex-start;
            gap: 1vh;
        }
        .comment-header-left {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            @media (max-width: 768px) {
                gap: 1vw;
            }
            .comment-avatar {
                width: 2.5vw;
                height: 2.5vw;
                border-radius: 50%;
                margin-right: 0.5vw;
                @media (max-width: 768px) {
                    width: 5vw;
                    height: 5vw;
                }
            }
            .comment-username {
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
        .comment-header-right {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            gap: 0.5vw;
            .comment-date {
                font-size: 0.8rem;
                font-weight: 400;
                color: ${(props) =>
					props.colorTheme === "light" ? "#000" : "#fff"};
            }
        }
    }
    .comment-body {
        margin-top: 0.5vh;
        font-size: 0.8rem;
        font-weight: 400;
        width: 100%;
        color: ${(props) => (props.colorTheme === "light" ? "#000" : "#fff")};
        .comment-textarea {
            width: 100%;
            height: 5vh;
            border: none;
            background: transparent;
            color: ${(props) =>
				props.colorTheme === "light" ? "#000" : "#fff"};
            font-size: 0.8rem;
            font-weight: 400;
            resize: none;
            font-family: "Roboto", sans-serif;
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
interface CommentFormProps extends Props {
	setCommentOpen: React.Dispatch<React.SetStateAction<boolean>>;
    idea: IdeaTypes;
    ideaId: string;
}
const CommentForm = ({
	colorTheme = "light",
	setCommentOpen,
    idea,
    ideaId,
}: CommentFormProps) => {
    
    const { user, userDetails }:any = useUserAuth();
    const [comment, setComment] = useState('');

    const commentsRef = collection(db, 'Comments');
    const userInfoRef = collection(db, 'UserInfo');
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (idea==null){
            return;
        }
        // getting userinfo For current user
        const queryI = query(userInfoRef, where('UserId', '==', user?.uid));
        const querySnapshot = await getDocs(queryI);
        const commentPost = {
            body: comment,
            PostDate: new Date(),
            AuthorId: querySnapshot.docs[0].id,
        }
        const ret = await addDoc(commentsRef, commentPost);
        // updating the comments reference array in the idea
        const ideaRef = collection(db, 'Ideas');
        const ideaDoc = doc(ideaRef, ideaId);
        const newCommentsArray = [];
        newCommentsArray.push(ret.id);
        idea?.Comments?.forEach((commentId: string) => {
            newCommentsArray.push(commentId);
        });
        for (let i = 0; i < newCommentsArray.length; i++) {
            console.log(newCommentsArray[i]);
        }
        await updateDoc(ideaDoc, {
            Comments: arrayUnion(...newCommentsArray),
        });
        // updating the comments reference number in the IdeaSummary
        const ideaSummaryRef = collection(db, 'IdeaSummary');
        const ideaQuery = query(ideaSummaryRef, where('IdeaOutline', '==', ideaId));
        const ideaSummarySnapshot = await getDocs(ideaQuery);
        const ideaSummaryDoc = doc(ideaSummaryRef, ideaSummarySnapshot.docs[0].id);
        await updateDoc(ideaSummaryDoc, {
            Comments: newCommentsArray.length,
        });
        setCommentOpen(false);
    }
	return (
		<CommentContainer colorTheme={colorTheme} onSubmit={handleSubmit}>
			<div className="comment-header">
				<div className="comment-header-left">
					<img
						className="comment-avatar"
						src={user?.photoURL}
						alt="avatar"
					/>
					<p className="comment-username">
                        {user?.displayName}
                    </p>
				</div>
				<div className="comment-header-right">
					<p className="comment-date">
                        {new Date().toLocaleDateString()}
                    </p>
				</div>
			</div>
			<div className="comment-body">
				<textarea
					className="comment-textarea"
					placeholder="Write a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
				/>
				<ButtonCrate>
					<Button
						type="submit"
						colorTheme={colorTheme}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							style={{
								width: "1.5vw",
								height: "1.5vw",
								color: colorTheme === "light" ? "#000" : "#fff",
							}}>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
							/>
						</svg>
					</Button>
					<Button
						type="button"
						colorTheme={colorTheme}
						onClick={() => setCommentOpen(false)}>
						Close
					</Button>
				</ButtonCrate>
			</div>
		</CommentContainer>
	);
};

export default CommentForm;
