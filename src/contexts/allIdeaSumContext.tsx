import { createContext, useContext, useState, useEffect } from "react";
import { db } from "../firebase-config";
import { addDoc, collection, getDoc, getDocs } from "firebase/firestore";
import { IdeaSummaryTypes } from "../constants/types";
import styled, { keyframes } from "styled-components";

export const AllIdeasSummariesContext = createContext({});
type Props = {
	children: JSX.Element;
};
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
export function AllIdeasSummariesProvider({ children }: Props) {
	const [allIdeaSummaries, setAllIdeasSummaries] = useState<
		[IdeaSummaryTypes] | null
	>(null);
	const [loading, setLoading] = useState(true);

	const ideasCollectionRef = collection(db, "IdeaSummary");
	useEffect(() => {
		const getIdeas = async () => {
			setLoading(true);
			const ideas = await getDocs(ideasCollectionRef);
			const ideaObj: any = ideas.docs.map((doc) => {
				return { ...doc.data(), id: doc.id };
			});
			setAllIdeasSummaries(ideaObj);
			setLoading(false);
		};
		getIdeas();
	}, []);

	const addIdeaSummaryToDatabase = async (idea: IdeaSummaryTypes) => {
		const ideaRef = await addDoc(ideasCollectionRef, idea);
		console.log(ideaRef);
	};
	if (loading) {
		return (
			<div
				style={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
				}}>
				<LoadingDots />
			</div>
		);
	}
	return (
		<AllIdeasSummariesContext.Provider
			value={{
				allIdeaSummaries,
				setAllIdeasSummaries,
				addIdeaSummaryToDatabase,
			}}>
			{children}
		</AllIdeasSummariesContext.Provider>
	);
}

export function useAllIdeasSummaries() {
	return useContext(AllIdeasSummariesContext);
}
