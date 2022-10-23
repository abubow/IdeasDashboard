import styled from "styled-components";
import TimelineBar from "./TimelineBar";
const Container = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    gap: 1%;
    width: 100%;
    min-width: 90%;
    overflow: auto;
    &::-webkit-scrollbar-track
    {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.1);
        -webkit-border-radius: 10%;
        background-color: rgba(255, 255, 255, 0.05);
    }

    &::-webkit-scrollbar
    {
        width: 6px;
        background-color: rgba(255, 255, 255, 0.05);
        -webkit-border-radius: 10%;
    }

    &::-webkit-scrollbar-thumb
    {
        background-color: rgba(0, 0, 0, 0.2);
        -webkit-border-radius: 10%;

    }
`;

interface Props {
    colorTheme: string;
}
const Timeline = ({colorTheme}: Props) => {
    const TimelineBars = [
        {
            title: 'Thought',
            ideas: [
                {
                    title: 'Idea 1',
                    done: false,
                    attachments: 0,
                    comments: 0
                },
                {
                    title: 'Idea 2',
                    done: true,
                    attachments: 10,
                    comments: 4
                },
                {
                    title: 'Idea 3',
                    done: false,
                    attachments: 0,
                    comments: 0
                },
                {
                    title: 'Idea 4',
                    done: true,
                    attachments: 0,
                    comments: 0
                },
                {
                    title: 'Idea 4',
                    done: true,
                    attachments: 0,
                    comments: 0
                }
            ]
        },
        {
            title: 'Brainstormed',
            ideas: [
                {
                    title: 'Idea 1',
                    done: false,
                    attachments: 0,
                    comments: 0
                },
                {
                    title: 'Idea 2',
                    done: true,
                    attachments: 10,
                    comments: 4
                },
                {
                    title: 'Idea 3',
                    done: false,
                    attachments: 0,
                    comments: 0
                },
                {
                    title: 'Idea 4',
                    done: true,
                    attachments: 0,
                    comments: 0
                }
            ]
        },
        {
            title: 'Evaluated',
            ideas: [
                {
                    title: 'Idea 1',
                    done: false,
                    attachments: 0,
                    comments: 0
                },
                {
                    title: 'Idea 2',
                    done: true,
                    attachments: 10,
                    comments: 4
                },
                {
                    title: 'Idea 3',
                    done: false,
                    attachments: 0,
                    comments: 0
                },
                {
                    title: 'Idea 4',
                    done: true,
                    attachments: 0,
                    comments: 0
                }
            ]
        },
        {
            title: 'ROI Identified',
            ideas: [
                {
                    title: 'Idea 1',
                    done: false,
                    attachments: 0,
                    comments: 0
                },
                {
                    title: 'Idea 2',
                    done: true,
                    attachments: 10,
                    comments: 8
                },
            ]
        }
    ]

    return (
        <Container>
            {
                TimelineBars.map((bar, index) => {
                    return (
                        <div>
                            <TimelineBar colorTheme={colorTheme} title={bar.title} ideas={bar.ideas} key={index}/>
                        </div>
                    )
                })
            }
        </Container>
    )
}

export default Timeline
