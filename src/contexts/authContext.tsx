// authentication context made using firebase and context api
import { createContext, useContext, useEffect, useState } from "react";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	updateProfile,
	onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "../firebase-config";
import styled, { keyframes } from "styled-components";
import { UserDetailsTypes } from "../constants/types";
import { collection, getDocs, query} from "firebase/firestore"
import {where} from "firebase/firestore";
import { useTheme } from "./themeContext";
export const userAuthContext = createContext({});

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

type Props = {
	children: JSX.Element;
};
export function UserAuthProvider({ children }: Props) {
	const [user, setUser] = useState({});
	const [loading, setLoading] = useState(true);
	const [userDetails, setUserDetails] = useState<UserDetailsTypes | null>(null);
	const [userDetailsId, setUserDetailsId] = useState("");
	const userInfoCollectionRef = collection(db, "UserInfo");
	function logIn(email: string, password: string) {
		return signInWithEmailAndPassword(auth, email, password);
	}
	function logOut() {
		return signOut(auth);
	}
	function signUp(email: string, password: string) {
		return createUserWithEmailAndPassword(auth, email, password);
	}
	async function getUserDetails() {
		//get user details from firestore where UserId === user.uid
		const queryA = query(userInfoCollectionRef, where("UserId", "==", auth?.currentUser?.uid));
		const querySnapshot = await getDocs(queryA);
		querySnapshot.forEach((doc) => {
			setUserDetails(doc.data() as UserDetailsTypes);
			setUserDetailsId(doc.id);
			console.table(doc.data());
		});
		return userDetails;
	}
	useEffect(() => {
		setLoading(true);
		onAuthStateChanged(auth, (userC) => {
			if (userC!==null) {
				setUser(userC);
				getUserDetails();
			} else {
				setUser({});
			}
			setLoading(false);
		});
	}, []);
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
		<userAuthContext.Provider value={{ signUp, logIn, logOut, user, userDetails, userDetailsId }}>
			{children}
		</userAuthContext.Provider>
	);
}

export default function useUserAuth() {
	return useContext(userAuthContext);
}
