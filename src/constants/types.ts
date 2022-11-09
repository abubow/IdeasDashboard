import { DocumentReference } from "firebase/firestore";

export interface newIdeaTypes {
	AuthorId: string | null;
	Cons: string[] | null;
	Description: string;
	Evaluation: any[] | null;
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
	Attachments:  number| null;
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