import { createContext, useContext, useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { IdeaTypes } from "../constants/types";

export const AllIdeasContext = createContext({});
type Props = {
    children: JSX.Element,
};
export function AllIdeasProvider({ children }: Props) {
    const [allIdeas, setAllIdeas] = useState<[IdeaTypes]>([{
        AuthorId: null,
        Cons: null,
        Description: '',
        Evaluation: null,
        Pros: null,
        ROI: null,
        Stage: '',
        StageStatus: false,
        TeamId: null,
        Title: '',
        id: '',
    }]);
    const ideasCollectionRef = collection(db, 'Ideas');
    useEffect(
        () => {
            const getIdeas = async () => {
                const ideas = await getDocs(ideasCollectionRef);
                const ideaObj : any = ideas.docs.map((doc)=>{return {...doc.data(), id: doc.id}});
                setAllIdeas(ideaObj);
                console.log(ideaObj);
            }
            getIdeas();
        }, []
    )
    return (
        <AllIdeasContext.Provider value={{ allIdeas, setAllIdeas }}>
            {children}
        </AllIdeasContext.Provider>
    );
}

export function useAllIdeas() {
    return useContext(AllIdeasContext);
}