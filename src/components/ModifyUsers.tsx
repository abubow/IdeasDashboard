import {
	collection,
	doc,
	getDocs,
	query,
	updateDoc,
	where,
} from "firebase/firestore";
import React, { useState } from "react";
import styled from "styled-components";
import { UserDetailsTypes } from "../constants/types";
import { useTheme } from "../contexts/themeContext";
import { db } from "../firebase-config";

interface Props {
	colorTheme: string;
}
const Container = styled.div<Props>`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	gap: 1vh;
	width: 100%;
	height: 100%;
	margin: 0;
	overflow: auto;
	&::--webkit-scrollbar {
		width: 0.5rem;
	}
	&::--webkit-scrollbar-track {
		background: transparent;
	}
	&::--webkit-scrollbar-thumb {
		background: rgba(0, 0, 0, 0.2);
		border-radius: 0.5rem;
	}
`;
const UserCard = styled.div<Props>`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 1vw;
	width: 65vw;
	margin: 0.5vh 2vw;
	background-color: ${(props) =>
		props.colorTheme === "light" ? "#fff" : "rgba(255, 255, 255, 0.02)"};
	border: ${(props) =>
		props.colorTheme === "light"
			? "2px solid rgba(28,29,34, 0.08)"
			: "none"};
	border-radius: 0.5rem;
	padding: 0.5rem;
	box-shadow: ${(props) =>
		props.colorTheme === "light"
			? "none"
			: "0 0 0.5rem rgba(255, 255, 255, 0.01)"};
`;
const Pfp = styled.img`
	width: 2vw;
	height: 2vw;
	border-radius: 50%;
`;
const Name = styled.h1<Props>`
	font-size: 1.5rem;
	font-weight: 400;
	color: ${(props) =>
		props.colorTheme === "light" ? "rgba(28,29,34, 0.8)" : "#fff"};
`;
const IsAdmin = styled.button<Props>`
	color: ${(props) =>
		props.colorTheme === "light" ? "rgba(28,29,34, 0.8)" : "#fff"};
	font-size: 0.8rem;
	font-weight: 400;
	padding: 0.5rem;
	border: none;
	border-radius: 0.5rem;
	cursor: pointer;
	outline: none;
	background-color: ${(props) =>
		props.colorTheme === "light"
			? "rgba(255, 0, 0, 0.1)"
			: "rgba(255, 0, 0, 0.2)"};
	&:hover {
		background-color: ${(props) =>
			props.colorTheme === "light"
				? "rgba(255, 0, 0, 0.2)"
				: "rgba(255, 0, 0, 0.3)"};
	}
`;
interface UsersContainerProps {
	users: UserDetailsTypes[];
}
const RemoveAdmins = ({ users }: UsersContainerProps) => {
	const { colorTheme } = useTheme();
	const userInfoRef = collection(db, "UserInfo");

	const removeAdmin = async (user: UserDetailsTypes) => {
		// update user in db
		const userQuery = query(
			userInfoRef,
			where("UserId", "==", user.UserID)
		);
		const userDoc = await getDocs(userQuery);
		const userDocId = userDoc.docs[0].id;
		await updateDoc(doc(db, "UserInfo", userDocId), {
			IsAdmin: false,
		});
	};
	return (
		<Container colorTheme={colorTheme}>
			{users.map((user) => (
				<UserCard colorTheme={colorTheme}>
					<div
						style={{
							display: "flex",
							gap: "1vw",
							alignItems: "center",
							width: "100%",
						}}>
						<Pfp src={user.pfpPath} />
						<Name colorTheme={colorTheme}>
							{user.FirstName + " " + user.LastName}
						</Name>
					</div>
					{user.Admin && (
						<IsAdmin
							colorTheme={colorTheme}
							onClick={() => removeAdmin(user)}>
							Remove Admin
						</IsAdmin>
					)}
				</UserCard>
			))}
		</Container>
	);
};

export default RemoveAdmins;

export const AddAdmins = ({ users }: UsersContainerProps) => {
	const { colorTheme } = useTheme();
	const userInfoRef = collection(db, "UserInfo");
    const [loading, setLoading] = useState(false);
	const addAdmin = async (user: UserDetailsTypes) => {
		// update user in db
        setLoading(true);
		const userQuery = query(
			userInfoRef,
			where("UserId", "==", user?.UserID)
		);
		const userDoc = await getDocs(userQuery);
		if (!userDoc.empty) {
			const userDocId = userDoc.docs[0].id;
			await updateDoc(doc(db, "UserInfo", userDocId), {
				IsAdmin: true,
			});
            setLoading(false);
		}
	};
	return (
		<Container colorTheme={colorTheme}>
			{users.map((user) => (
				<UserCard colorTheme={colorTheme}>
					<div
						style={{
							display: "flex",
							gap: "1vw",
							alignItems: "center",
							width: "100%",
						}}>
						<Pfp src={user.pfpPath} />
						<Name colorTheme={colorTheme}>
							{user.FirstName + " " + user.LastName}
						</Name>
					</div>
					{!user.Admin && (
						<IsAdmin
							colorTheme={colorTheme}
							onClick={() => addAdmin(user)}
							style={{
								backgroundColor:
									colorTheme === "light"
										? "rgba(0, 255, 0, 0.1)"
										: "rgba(0, 255, 0, 0.2)",
							}}>
							Add Admin
						</IsAdmin>
					)}
				</UserCard>
			))}
		</Container>
	);
};
