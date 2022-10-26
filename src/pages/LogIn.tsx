import styled, {keyframes} from "styled-components";
import { motion } from "framer-motion";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import { Link, useNavigate } from "react-router-dom";
import useUserAuth from "../contexts/authContext";
const Container = styled.div`
	display: grid;
	place-items: center;
	min-height: 100vh;
	width: 100%;
	background-color: #24262c;
`;
const Crate = styled.div`
	min-width: 80vw;
	max-width: 85vw;
	min-height: 85vh;
	background-color: #1c1d22;
	border-radius: 12px;
	box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
	display: flex;
	overflow: hidden;
	flex-direction: row;
	@media (max-width: 768px) {
		flex-direction: column;
		min-height: 70vh;
	}
`;
const Image = styled.img`
	flex: 3;
	max-width: 65%;
	min-height: 100%;
	object-fit: cover;
	@media (max-width: 768px) {
		display: none;
	}
`;
const Form = styled.form`
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 0 2rem;
	@media (max-width: 768px) {
		padding: 0 1rem;
		min-width: 80vw;
	}
`;
const Title = styled.h1`
	font-size: 2.5rem;
	font-weight: 500;
	color: #fff;
	margin-bottom: 1rem;
	min-width: 315px;
	padding: 1rem 0;
	@media (max-width: 768px) {
		min-width: 0;
		padding: 0;
	}
`;
const Input = styled.input`
	outline: none;
	height: 50px;
	min-width: 315px;
	background: #292b31;
	opacity: 0.5;
	box-shadow: inset 0px 4px 10px rgba(0, 0, 0, 0.25);
	border-radius: 10px;
	border: none;
	margin-bottom: 1.5rem;
	padding: 0 1rem;
	color: #fff;
	::placeholder {
		font-size: 1rem;
		font-weight: 700;
		font-spacing: 0.1rem;
		color: #fff;
	}
	@media (max-width: 768px) {
		min-width: 100%;
	}
`;
const Button = styled(motion.button)`
	width: 315px;
	height: 50px;
	border: none;
	background: #292b31;
	border-radius: 10px;
	cursor: pointer;
	opacity: 0.8;
	margin-top: 0.5rem;
	filter: drop-shadow(0px 4px 20px rgba(0, 0, 0, 0.25));
	font-size: 1rem;
	font-weight: 700;
	color: white;
    display: flex;
    justify-content: center;
    align-items: center;
	&:hover {
		opacity: 1;
		background: #292c31;
	}
	@media (max-width: 768px) {
		width: 100%;
	}
`;
const BottomText = styled.p`
	font-size: 1rem;
	font-weight: 400;
	color: #fff;
	margin-top: 0.8rem;
	opacity: 0.8;
`;
const BottomLink = styled(Link)`
	color: #fff;
	font-weight: 500;
	text-decoration: none;
	&:hover {
		text-decoration: underline;
	}
`;
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
	box-shadow: 9984px 0 0 0 #9880ff, 9999px 0 0 0 #9880ff, 10014px 0 0 0 #9880ff;
	animation: ${dotCarousel} 1.5s infinite linear;
`;  
const ErrorText = styled.p`
	color: #ff0000;
	font-size: 0.8rem;
	font-weight: 400;
	margin-top: 0.5rem;
`;
const LogIn = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const { logIn } : any = useUserAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError("");
		setLoading(true);
		try {
			await logIn(email, password);
			setLoading(false);
			navigate("/home");
		} catch (err: any) {
			setLoading(false);
			setError(err.message.replace("Firebase: ", ""));
		}
	};

	return (
		<Container>
			<Crate>
				<Form onSubmit={handleSubmit}>
					<Title>Sign In</Title>
					<Input
						type="text"
						placeholder="email"
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Input
						type="password"
						placeholder="Password"
						onChange={(e) => setPassword(e.target.value)}
					/>
					{error ? <ErrorText>{error}</ErrorText> : null}
					<Button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						type="submit">
						{
							loading ? <LoadingDots /> : "Sign In"
						}
					</Button>
					<BottomText>
						Don't have an account? <BottomLink to="/signup">Sign Up</BottomLink>
					</BottomText>
				</Form>
				<Image
					src="https://i.ibb.co/wJpbGzW/johannes-plenio-fm-Tde1-Fe23-A-unsplash-1.jpg"
					alt="Ideas Background"
					loading="lazy"
				/>
			</Crate>
		</Container>
	);
};

export default LogIn;
