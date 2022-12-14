import { Timestamp } from "firebase/firestore";

export interface EvaluationT {
	Evaluation: string;
	EvaluatorId: string;
	Score: number;
	TotalScore: number;
}
export interface newIdeaTypes {
	AuthorId: string | null;
	Cons: string[] | null;
	Description: string;
	Evaluation: EvaluationT | null;
	Pros: string[] | null;
	ROI: any[] | null;
	Stage: string;
	StageStatus: boolean;
	TeamId: string | null;
	Title: string;
	Comments: any[] | null;
}
export interface newIdeaSummaryTypes {
	Title: string;
	Comments: number | null;
	IdeaOutline: string;
	StageStatus: boolean;
	Stage: string;
}

export interface IdeaTypes extends newIdeaTypes {
	id: string;
}

export interface IdeaSummaryTypes extends newIdeaSummaryTypes {
	id: string;
}

export type UserDetailsTypes = {
	Admin: boolean;
	DefaultMode: string;
	FirstName: string;
	LastName: string;
	UserID: string;
	pfpPath: string;
};
export type CommentSummaryTypes = {
	body: string;
	PostDate: Timestamp;
	AuthorId: string;
};
export interface CommentT {
	id: number;
	username: string;
	avatar: string;
	date: string;
	body: string;
}
export interface ROICommentT extends CommentT {
	ROI: number;
}
export interface ROICommentSummaryT {
	body: string;
	PostDate: Timestamp;
	AuthorId: string;
	ROI: number;
}
