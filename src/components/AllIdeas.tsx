import { Key, useEffect, useState } from "react";
import styled from "styled-components";
import { IdeaSummaryTypes } from "../constants/types";
import { useAllIdeasSummaries } from "../contexts/allIdeaSumContext";
import { useAllIdeas } from "../contexts/ideasContext";
import Mini_Idea from "./Mini_Idea";
interface Props {
    colorTheme: string;
}
const Container = styled.div<Props>`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    background-color: ${props => props.colorTheme === 'light' ? '#fff' : '#24262C'};
    min-width: 50vw;
    max-width: 70vw;
    margin: 0 0.3vw;
    border: ${props => props.colorTheme === 'light' ? '2px dashed rgb(28,29,34, 0.08)' : 'none'};
    border-radius: 10px;
    padding: 1vh 1vw;
    overflow-y: auto;
`;
const Title = styled.div<Props>`
    font-size: 0.8rem;
    font-weight: 400;
    color: ${props => props.colorTheme === 'light' ? 'rgba(28,29,34, 0.5)': 'rgba(255, 255, 255, 0.5)'};
    padding-left: 1vw;
    margin: 1vh 0 1vh 0.2vw;
    align-self: flex-start;
`;
const IdeaContainer = styled.div`
    display: flex;
    justify-content: flex-center;
    align-items: center;
    gap: 1vh 1vw;
    flex-wrap: wrap;
    border-radius: 10px;
    padding-left: 1vw;
`;

interface IdeaTypes {
    AuthorId: string | null; Cons: string[] | null; Description: string; Evaluation: any[] | null; Pros: string[] | null; ROI: any[] | null; Stage: string; StageStatus: boolean; TeamId: string | null; Title: string; id: string; 
}
const AllIdeas = ({colorTheme}: Props) => {
    const allIdeaSummaries : any = useAllIdeasSummaries();
    return (
        <Container colorTheme={colorTheme}>
            <Title colorTheme={colorTheme}>
                All Ideas ({allIdeaSummaries? allIdeaSummaries.length : 0})
            </Title>
            <IdeaContainer>
                {
                    allIdeaSummaries.allIdeaSummaries?.map((idea : IdeaSummaryTypes , index: Key | null | undefined) => {
                        return (
                            <Mini_Idea colorTheme={colorTheme} idea={idea} key={index}/>
                        )
                    })
                }
            </IdeaContainer>
        </Container>
    )
}

export default AllIdeas
