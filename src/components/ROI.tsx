import { User } from "firebase/auth";
import styled from "styled-components";
import CommentsList from "./RoiCommentList";
const Container = styled.div`
	width: 100%;
	height: 100%;
	margin: 0;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	gap: 1vh;
	overflow: auto;
	&::-webkit-scrollbar {
		width: 0.5rem;
	}
	&::-webkit-scrollbar-track {
		background: transparent;
	}
	&::-webkit-scrollbar-thumb {
		background: rgba(0, 0, 0, 0.2);
		border-radius: 0.5rem;
	}
`;
const ROIsContainer = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
	margin: 0.5vh 2vw;
`;
const ROIc = styled.div`
	width: 100%;
	height: 100%;
	margin: 0;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	gap: 1vw;
`;
const Pfp = styled.img`
	width: 2vw;
	height: 2vw;
	border-radius: 50%;
`;
const Name = styled.h1`
	font-size: 1.5rem;
	font-weight: 400;
`;
interface ROIProps {
	ROIarray: any[] | null;
}
const ROI = ({ ROIarray }: ROIProps) => {
	return (
		<Container>
			<h2>ROI</h2>
			<CommentsList />
		</Container>
	);
};

export default ROI;
