import styled from "styled-components";
import TimelineBar from "./TimelineBar";
const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: space-evenly;
    width: 95%;
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
                        <TimelineBar colorTheme={colorTheme} title={bar.title} ideas={bar.ideas} key={index} />
                    )
                })
            }
        </Container>
    )
}

export default Timeline
