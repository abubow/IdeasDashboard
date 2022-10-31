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
}

export interface IdeaTypes extends newIdeaTypes {
	id: string;
}
