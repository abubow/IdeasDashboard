import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import RemoveAdmins, { AddAdmins } from "../components/ModifyUsers";
import SettingsPopup from "../components/SettingsPopup";
import UsersContainer from "../components/UsersContainer";
import useUserAuth from "../contexts/authContext";
import useOptionSelected from "../contexts/optionsContext";
import { useTheme } from "../contexts/themeContext";
import { db } from "../firebase-config";
interface Props {
	colorTheme: string;
}
const Container = styled.div<Props>`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	min-height: 100vh;
	width: 100%;
	margin-left: 24vw;
	flex-direction: column;
	background-color: ${(props) =>
		props.colorTheme === "light" ? "#fff" : "#2A2B2F"};
	color: ${(props) => (props.colorTheme === "light" ? "#000" : "#fff")};
`;
const TopBar = styled.div<Props>`
	width: 100%;
	height: 20vh;
	background-color: ${(props) =>
		props.colorTheme === "light" ? "#fff" : props.color};
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 1vw;
	margin-bottom: 1vh;
`;

const ProfileContainer = styled.div<Props>`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	width: 20vw;
	height: 100%;
	background-color: ${(props) =>
		props.colorTheme === "light" ? "#fff" : props.color};
	color: ${(props) => (props.colorTheme === "light" ? "#000" : "#fff")};
	padding-right: 1vw;
`;

const Username = styled.div<Props>`
	font-size: 1rem;
	font-weight: 400;
	color: ${(props) =>
		props.colorTheme === "light"
			? "rgba(0,0,0,0.5)"
			: "rgba(255,255,255,0.5)"};
	padding-right: 1vw;
`;

const Profile = styled.img<Props>`
	width: 3.6rem;
	height: 3.6rem;
	border-radius: 50%;
	background-color: #000;
	border: 1px solid
		${(props) =>
			props.colorTheme === "light"
				? "rgba(255,255,255,0.5)"
				: "rgba(0,0,0,0.5)"};
	object-fit: cover;
	cursor: pointer;
`;
const Title = styled.div<Props>`
	font-size: 1.7rem;
	font-weight: 600;
	color: ${(props) => (props.colorTheme === "light" ? "#000" : "#fff")};
	padding-left: 1vw;
	margin-top: 1vh;
	width: 100%;
	margin: 4vh 0 5vh 1vw;
`;
const Users = () => {
	const { colorTheme } = useTheme();
	const auth: any = useUserAuth();
	const options: any = useOptionSelected();
	const userInfosRef = collection(db, "UserInfo");
	const [users, setUsers] = useState<any>([]);
	const [settingsOpen, setSettingsOpen] = useState(false);

	const getAllUsers = async () => {
		const querySnapshot = await getDocs(userInfosRef);
		const users = querySnapshot.docs.map((doc) => doc.data());
		setUsers(users);
	};
	useEffect(() => {
		getAllUsers();
        console.log(options.optionSelected)
	}, []);
    useEffect(() => {
        console.log(options.optionSelected)
    }, [options.optionSelected])
	if (!auth.userDetails.Admin) {
		return <Navigate to="/" />;
	}
	return (
		<Container colorTheme={colorTheme}>
			<TopBar colorTheme={colorTheme}>
				<Title colorTheme={colorTheme}>
					Welcome Back, {auth.user?.displayName.split(" ")[0]} 👋
				</Title>
				<ProfileContainer colorTheme={colorTheme}>
					<Username colorTheme={colorTheme}>
						{auth.user?.displayName}
					</Username>
					<Profile
						src={auth.user?.photoURL}
						colorTheme={colorTheme}
						onClick={() => setSettingsOpen(true)}
					/>
				</ProfileContainer>
				{settingsOpen ? (
					<SettingsPopup
						colorTheme={colorTheme}
						setSettingsOpen={setSettingsOpen}
					/>
				) : null}
			</TopBar>
			{options.optionSelected === "All Users" ? (
				<UsersContainer users={users} />
			) : 
            options.optionSelected === "Admins" ? (
                <UsersContainer users={users.filter((user: any) => user.Admin)} />
            ) : options.optionSelected === "Students" ? ( 
                <UsersContainer users={users.filter((user: any) => !user.Admin)} />
            ) : options.optionSelected === "Add Admin" ? (
                <AddAdmins users={users.filter((user: any) => !user.Admin)} />
            ) : options.optionSelected === "Remove Admin" ? (
                <RemoveAdmins users={users.filter((user: any) => user.Admin)} />
            ) : null}
		</Container>
	);
};

export default Users;
