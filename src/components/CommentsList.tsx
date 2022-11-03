import styled from "styled-components";
import Comment from "./Comment";

interface Props {
	colorTheme: string;
}
const Container = styled.div`
	width: 100%;
	height: 100%;
    margin: 0;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	gap: 1vh;
	overflow: auto;
`;

const CommentsList = ({ colorTheme }: Props) => {
	const allComments = [
		{
			id: 1,
			username: "John Doe",
			avatar: "https://i.pravatar.cc/150?img=1",
			date: "1/1/2021",
			body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
		},
		{
			id: 2,
			username: "Jane Doe",
			avatar: "https://i.pravatar.cc/150?img=2",
			date: "1/1/2021",
			body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
		},
		{
			id: 3,
			username: "Jack Doe",
			avatar: "https://i.pravatar.cc/150?img=3",
			date: "1/1/2021",
			body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
		},
		{
			id: 4,
			username: "Jill Doe",
			avatar: "https://i.pravatar.cc/150?img=4",
			date: "1/1/2021",
			body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
		},
		{
			id: 5,
			username: "Jim Doe",
			avatar: "https://i.pravatar.cc/150?img=5",
			date: "1/1/2021",
			body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
		},
		{
			id: 6,
			username: "Jenny Doe",
			avatar: "https://i.pravatar.cc/150?img=6",
			date: "1/1/2021",
			body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
		},
		{
			id: 7,
			username: "Jax Doe",
			avatar: "https://i.pravatar.cc/150?img=7",
			date: "1/1/2021",
			body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
		},
		{
			id: 8,
			username: "Jon Doe",
			avatar: "https://i.pravatar.cc/150?img=8",
			date: "1/1/2021",
			body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
		},
	];
	return (
        <Container>
            {allComments.map((comment) => (
                <Comment key={comment.id} comment={comment} colorTheme={colorTheme} />
            ))}
        </Container>
    );
};

export default CommentsList;
