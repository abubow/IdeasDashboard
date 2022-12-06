import { User } from "firebase/auth";
import styled from "styled-components";
import ROICommentsList from "./RoiCommentList";
import { IdeaTypes } from "../constants/types";
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
interface ROIProps {
	ROIarray: Array<string> | null;
	idea: IdeaTypes;
	ideaId: string;
}
const ROI = ({ ROIarray, idea, ideaId }: ROIProps) => {
	return (
		<Container>
			<ROICommentsList
				ideaCommentsList={ROIarray}
				idea={idea}
				ideaId={ideaId}
			/>
		</Container>
	);
};

export default ROI;
