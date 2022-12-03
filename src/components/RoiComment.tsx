import styled from "styled-components"
import { ROICommentT } from "../constants/types";

interface Props {
    colorTheme: string;
}

const CommentContainer = styled.div<Props>`
    background: ${props => props.colorTheme === 'light' ? 'rgba(28,29,34, 0.05)' : 'rgba(255, 255, 255, 0.1)'};
    backdrop-filter: blur(10px);
    border-radius: 10px;
    padding: 1vh 1vw;
    margin: 1vh 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    max-width: 60vw;
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
                color: ${props => props.colorTheme === 'light' ? '#000' : '#fff'};
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
                color: ${props => props.colorTheme === 'light' ? '#000' : '#fff'};
            }
        }
    }
    .comment-body {
        margin-top: 0.5vh;
        font-size: 0.8rem;
        font-weight: 400;
        color: ${props => props.colorTheme === 'light' ? '#000' : '#fff'};
    }
`
interface CommentProps extends Props {
    comment: ROICommentT
}
const Comment = ({ colorTheme, comment }: CommentProps) => {
  return (
    <CommentContainer colorTheme={colorTheme}>
      <div className="comment-header">
        <div className="comment-header-left">
          <img className="comment-avatar" src={comment.avatar} alt="" />
          <p className="comment-username">{comment.username}</p>
        </div>
        <div className="comment-header-right">
          <p className="comment-date" >{comment.date}</p>
          <p className="comment-date" style={{color:"red"}}>{comment.ROI}</p>
        </div>
      </div>
      <p className="comment-body">{comment.body}</p>
    </CommentContainer>
  );
}

export default Comment;