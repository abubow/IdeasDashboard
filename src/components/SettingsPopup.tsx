import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useTheme } from "../contexts/themeContext";
import ToggleSwitch from "./ToggleSwitch";
import { auth, db, storage } from "../firebase-config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { updateProfile } from "firebase/auth";
import useUserAuth from "../contexts/authContext";
import {
	collection,
	doc,
	getDocs,
	query,
	setDoc,
	updateDoc,
	where,
} from "firebase/firestore";
const Container = styled.form`
	position: fixed;
	top: 0;
	left: 0;
	min-width: 100vw;
	min-height: 100vh;
	background-color: rgba(0, 0, 0, 0.05);
	backdrop-filter: blur(20px);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 100;
`;
interface Props {
	colorTheme: string;
}
const Crate = styled.div<Props>`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-direction: column;
	transition: all 0.5s ease;
	background-color: ${(props) =>
		props.colorTheme === "light"
			? "rgba(255, 255, 255, 0.5)"
			: "rgba(0, 0, 0, 0.5)"};
	backdrop-filter: blur(35px);
	-webkit-backdrop-filter: blur(85px);
	box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
	color: ${(props) => (props.colorTheme === "light" ? "black" : "white")};
	width: 40vw !important;
	height: 70vh !important;
	border-radius: 12px;
	border: 1px solid
		${(props) =>
			props.colorTheme === "light"
				? "rgba(255, 255, 255, 0.5)"
				: "rgba(0, 0, 0, 0.5)"};
	@media (max-width: 768px) {
		width: 80vw !important;
		height: 80vh !important;
	}
	@media (max-width: 480px) {
		width: 90vw !important;
		height: 90vh !important;
	}
`;

const ProfileContainer = styled.div<Props>`
	display: flex;
	justify-content: flex-Start;
	align-items: center;
	flex-direction: column;
	width: 100%;
	height: 50%;
	color: ${(props) => (props.colorTheme === "light" ? "#000" : "#fff")};
	padding-top: 6vh;
	margin-bottom: 2vh;
	gap: 3vh;
`;

const Username = styled.div<Props>`
	font-size: 1rem;
	font-weight: 400;
	color: ${(props) =>
		props.colorTheme === "light"
			? "rgba(0,0,0,0.5)"
			: "rgba(255,255,255,0.5)"};
	padding-right: 1vw;
	text-align: center;
	width: 100%;
`;

const ImageContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 1vh 1vw;
	position: relative;
`;

const Profile = styled.img<Props>`
	width: 8rem;
	height: 8rem;
	border-radius: 50%;
	background-color: #000;
	border: 2px solid
		${(props) =>
			props.colorTheme === "light"
				? "rgba(255, 255, 255, 0.8)"
				: "rgba(0, 0, 0, 0.8)"};
`;

const ButtonCrate = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	width: 100%;
	height: 10vh;
	gap: 0.5vw;
	margin: 0 4vw 1vh 0;
`;
const Button = styled.button<Props>`
	width: 5rem;
	height: 2rem;
	color: ${(props) => (props.colorTheme === "light" ? "black" : "white")};
	border: none;
	outline: none;
	background: ${(props) =>
		props.colorTheme === "light" ? "white" : "#292B31"};
	border-radius: 8px;
	opacity: 0.8;
	box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
	transition: all 0.5s ease;
	z-index: 100;
`;

const Options = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-direction: column;
	width: 100%;
	height: 60%;
	gap: 1vh;
	margin-top: 2vh;
`;
const Option = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 50%;
	margin: 1vh 0;
	@media (max-width: 768px) {
		width: 80%;
		margin: 0.5vh 0;
	}
`;
const OptionText = styled.div<Props>`
	font-size: 1rem;
	font-weight: 400;
	color: ${(props) =>
		props.colorTheme === "light"
			? "rgba(0,0,0,0.5)"
			: "rgba(255,255,255,0.5)"};
	padding-right: 1vw;
	@media (max-width: 768px) {
		padding-right: 0.5vw;
	}
	display: flex;
	justify-content: flex-start;
	align-items: center;
`;
const ClickableSvg = styled.svg`
	cursor: pointer;
	border-radius: 50%;
	background-color: rgba(0, 0, 0, 0.05);
	padding: 0.75vh;
	min-width: 2rem;
	min-height: 2rem;
	transition: all 0.5s ease;
	margin-left: 0.5vw;
	&:hover {
		background-color: rgba(0, 0, 0, 0.1);
	}
	@media (max-width: 768px) {
		min-width: 1.8rem;
		min-height: 1.8rem;
	}
`;

const Input = styled.input<Props>`
	border: 1px solid
		${(props) =>
			props.colorTheme === "light"
				? "rgba(0,0,0,0.1)"
				: "rgba(255,255,255,0.2)"};
	border-radius: 8px;
	outline: none;
	background: transparent;
	color: ${(props) => (props.colorTheme === "light" ? "black" : "white")};
	font-size: 1rem;
	font-weight: 400;
	padding: 0.5vh 0.5vw;
	@media (max-width: 768px) {
		font-size: 0.8rem;
	}
`;
const DefaultText = styled.span<Props>`
	width: 100%;
	height: 100%;
	font-size: 1rem;
	font-weight: 400;
	padding: 0.5vh 0.5vw;
	color: ${(props) =>
		props.colorTheme === "light"
			? "rgba(0,0,0,0.5)"
			: "rgba(255,255,255,0.5)"};
	@media (max-width: 768px) {
		font-size: 0.8rem;
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
	box-shadow: 9984px 0 0 0 #9880ff, 9999px 0 0 0 #9880ff,
		10014px 0 0 0 #9880ff;
	animation: ${dotCarousel} 1.5s infinite linear;
`;
const SettingsPopup = ({ colorTheme, setSettingsOpen }: any) => {
	const [darkTheme, setDarkTheme] = useState<boolean>(colorTheme === "dark");
	const { setColorTheme } = useTheme();
	const [newUserName, setNewUserName] = useState<string>("username");
	const [newFirstName, setNewFirstName] = useState<string>("firstname");
	const [newLastName, setNewLastName] = useState<string>("lastname");
	const [image, setImage] = useState<any | null>(null);
	const [imageUrl, setImageUrl] = useState<string>("");
	const { user, userDetails }: any = useUserAuth();
	const [loading, setLoading] = useState<boolean>(false);
	useEffect(() => {
		setNewUserName(user.username);
		setNewFirstName(userDetails.FirstName);
		setNewLastName(userDetails.LastName);
		setImageUrl(user.photoURL);
		setDarkTheme(colorTheme === "dark");
	}, []);
	useEffect(() => {
		if (darkTheme) {
			setColorTheme("dark");
		} else {
			setColorTheme("light");
		}
	}, [darkTheme]);
	useEffect(() => {
		if (user) {
			setNewUserName(user.displayName);
		}
	}, [user]);
	const [editing, setEditing] = useState([false, false, false]);
	const closeHandler = () => {
		setSettingsOpen(false);
	};
	const userInfoCollectionRef = collection(db, "UserInfo");
	const uploadImage = async () => {
		if (!!image) {
			const imageName: string = v4() + image.name;
			const imageRef = ref(storage, `UserProfilePictures/${imageName}`);
			await uploadBytes(imageRef, image).then((snapshot) => {
				console.log("Uploaded a blob or file!");
				//print the download url
				getDownloadURL(imageRef).then((url) => {
					setImageUrl(url);
					console.log(imageUrl);
					//set the image url to the user
					if (auth.currentUser) {
						updateProfile(auth.currentUser, {
							photoURL: url,
						}).then(() => {
							console.log("updated profile");
						});
					}
					//set the image url to the database
				});
			});
		}
	};
	const updateProfileDetails = async () => {
		if (auth.currentUser) {
			try {
				await uploadImage();
				await updateProfile(auth.currentUser, {
					displayName:
						newUserName !== "" ? newUserName : user.displayName,
					photoURL: imageUrl !== "" ? imageUrl : user.photoURL,
				}).then(async () => {
					console.log("updated profile");
					//update the user info collection
					// find document where UserId == auth.currentUser.uid
					const queryA = query(
						userInfoCollectionRef,
						where("UserId", "==", auth?.currentUser?.uid)
					);
					const querySnapshot = await getDocs(queryA);
					querySnapshot.forEach(async (doci) => {
						// doc.data() is never undefined for query doc snapshots
						console.log(doci.id, " => ", doci.data());
						//update the document
						console.log("document ref ", doci.id.trim());
						console.log("image url ", imageUrl);
						const docRef = doc(db, "UserInfo", doci.id.trim());
						await updateDoc(docRef, {
							Admin: userDetails?.Admin,
							DefaultMode: darkTheme ? "dark" : "light",
							FirstName:
								newFirstName !== ""
									? newFirstName
									: doci.data().FirstName,
							LastName:
								newLastName !== ""
									? newLastName
									: doci.data().LastName,
							pfpPath:
								imageUrl !== ""
									? imageUrl.trim()
									: doci.data().pfpPath.trim(),
							UserId: doci.data().UserId.trim(),
						}).catch((err) => {
							console.log(
								"profile updated",
								{
									FirstName:
										newFirstName !== ""
											? newFirstName
											: doci.data().FirstName,
									LastName:
										newLastName !== ""
											? newLastName
											: doci.data().LastName,
									pfpPath:
										imageUrl !== ""
											? imageUrl.trim()
											: doci.data().pfpPath.trim(),
									ppfpPath: user.photoURL,
									UserId: doci.data().UserId.trim(),
									Amin: userDetails?.Admin,
								},
								err
							);
						});
					});
				});
				window.location.reload();
			} catch (err) {
				console.log(err);
			}
		}
	};
	const onSubmit = async (e: any) => {
		e.preventDefault();
		setLoading(true);
		await updateProfileDetails().then(() => {
			closeHandler();
		});
		setLoading(false);
	};
	return (
		<Container onSubmit={onSubmit}>
			<Crate colorTheme={colorTheme}>
				<ProfileContainer
					colorTheme={colorTheme}
					color="#000">
					<ImageContainer>
						<Profile
							src={imageUrl}
							colorTheme={colorTheme}
						/>
						<input
							type="file"
							id="file"
							onChange={(e) => {
								if (e.target) {
									setImage(
										(e.target as HTMLInputElement).files![0]
									);
									console.log(
										(e.target as HTMLInputElement).files![0]
									);
								}
							}}
							style={{ display: "none" }}
						/>
						<ClickableSvg
							width="16"
							height="16"
							viewBox="0 0 16 12"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							style={{
								position: "absolute",
								bottom: "1vh",
								right: "1vw",
								zIndex: 1,
								backgroundColor:
									colorTheme === "light"
										? "rgba(255,255,255,0.9)"
										: "rgba(0,0,0,0.8)",
								color: colorTheme === "light" ? "#000" : "#fff",
							}}
							onClick={() =>
								document.getElementById("file")?.click()
							}>
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M1.14286 9.42858V4.28572C1.14286 3.83106 1.32347 3.39503 1.64496 3.07354C1.96645 2.75204 2.40249 2.57143 2.85715 2.57143H4.57143L6.35343 0.857147H9.71343L11.3591 2.57143H13.1429C13.5975 2.57143 14.0336 2.75204 14.355 3.07354C14.6765 3.39503 14.8571 3.83106 14.8571 4.28572V9.42858C14.8571 9.88323 14.6765 10.3193 14.355 10.6408C14.0336 10.9622 13.5975 11.1429 13.1429 11.1429H2.85715C2.40249 11.1429 1.96645 10.9622 1.64496 10.6408C1.32347 10.3193 1.14286 9.88323 1.14286 9.42858Z"
								stroke={
									colorTheme !== "light" ? "#fff" : "#1A1831"
								}
								strokeWidth="0.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M10.5714 6.85715C10.5714 6.17516 10.3005 5.52111 9.81828 5.03887C9.33604 4.55664 8.68199 4.28572 8 4.28572C7.31802 4.28572 6.66396 4.55664 6.18173 5.03887C5.69949 5.52111 5.42857 6.17516 5.42857 6.85715C5.42857 7.53913 5.69949 8.19319 6.18173 8.67542C6.66396 9.15766 7.31802 9.42858 8 9.42858C8.68199 9.42858 9.33604 9.15766 9.81828 8.67542C10.3005 8.19319 10.5714 7.53913 10.5714 6.85715Z"
								stroke={
									colorTheme !== "light" ? "#fff" : "#1A1831"
								}
								strokeWidth="1"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</ClickableSvg>
					</ImageContainer>
					<Username colorTheme={colorTheme}>
						{editing[0] ? (
							<Input
								colorTheme={colorTheme}
								type="text"
								value={newUserName}
								onChange={(e) => setNewUserName(e.target.value)}
							/>
						) : (
							<DefaultText colorTheme={colorTheme}>
								{newUserName}
							</DefaultText>
						)}
						<ClickableSvg
							viewBox="0 0 12 12"
							fill="none"
							width="16"
							height="16"
							onClick={() => {
								setEditing([
									!editing[0],
									editing[1],
									editing[2],
								]);
							}}
							style={{
								zIndex: 1,
								backgroundColor:
									colorTheme === "light"
										? "rgba(255,255,255,0.9)"
										: "rgba(0,0,0,0.8)",
								color: colorTheme === "light" ? "#000" : "#fff",
							}}
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M9.49771 3.2093L10.2059 3.91755M10.5599 1.43869C10.6994 1.57819 10.8101 1.74381 10.8856 1.92609C10.9611 2.10838 11 2.30375 11 2.50106C11 2.69837 10.9611 2.89374 10.8856 3.07603C10.8101 3.25831 10.6994 3.42393 10.5599 3.56343L3.83257 10.2918L1 11L1.70814 8.20668L8.43833 1.44153C8.7036 1.17492 9.05941 1.01783 9.43511 1.00143C9.81082 0.985026 10.179 1.11052 10.4664 1.35299L10.5599 1.43869Z"
								stroke={
									colorTheme === "light" ? "#1A1831" : "#fff"
								}
								strokeWidth="1"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</ClickableSvg>
					</Username>
				</ProfileContainer>
				<Options>
					<Option>
						<OptionText colorTheme={colorTheme}>
							First Name:
						</OptionText>
						<OptionText colorTheme={colorTheme}>
							{editing[1] ? (
								<Input
									colorTheme={colorTheme}
									type="text"
									value={newFirstName}
									onChange={(e) =>
										setNewFirstName(e.target.value)
									}
								/>
							) : (
								<DefaultText colorTheme={colorTheme}>
									{newFirstName}
								</DefaultText>
							)}
							<ClickableSvg
								viewBox="0 0 12 12"
								width="16"
								height="16"
								fill="none"
								onClick={() => {
									setEditing([
										editing[0],
										!editing[1],
										editing[2],
									]);
								}}
								style={{
									zIndex: 1,
									backgroundColor:
										colorTheme === "light"
											? "rgba(255,255,255,0.9)"
											: "rgba(0,0,0,0.8)",
									color:
										colorTheme === "light"
											? "#000"
											: "#fff",
								}}
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M9.49771 3.2093L10.2059 3.91755M10.5599 1.43869C10.6994 1.57819 10.8101 1.74381 10.8856 1.92609C10.9611 2.10838 11 2.30375 11 2.50106C11 2.69837 10.9611 2.89374 10.8856 3.07603C10.8101 3.25831 10.6994 3.42393 10.5599 3.56343L3.83257 10.2918L1 11L1.70814 8.20668L8.43833 1.44153C8.7036 1.17492 9.05941 1.01783 9.43511 1.00143C9.81082 0.985026 10.179 1.11052 10.4664 1.35299L10.5599 1.43869Z"
									stroke={
										colorTheme === "light"
											? "#1A1831"
											: "#fff"
									}
									strokeWidth="1"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</ClickableSvg>
						</OptionText>
					</Option>
					<Option>
						<OptionText colorTheme={colorTheme}>
							Last Name:
						</OptionText>
						<OptionText colorTheme={colorTheme}>
							{editing[2] ? (
								<Input
									colorTheme={colorTheme}
									type="text"
									value={newLastName}
									onChange={(e) =>
										setNewLastName(e.target.value)
									}
								/>
							) : (
								<DefaultText colorTheme={colorTheme}>
									{newLastName}
								</DefaultText>
							)}
							<ClickableSvg
								viewBox="0 0 12 12"
								width="16"
								height="16"
								fill="none"
								onClick={() => {
									setEditing([
										editing[0],
										editing[1],
										!editing[2],
									]);
								}}
								style={{
									zIndex: 1,
									backgroundColor:
										colorTheme === "light"
											? "rgba(255,255,255,0.9)"
											: "rgba(0,0,0,0.8)",
									color:
										colorTheme === "light"
											? "#000"
											: "#fff",
								}}
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M9.49771 3.2093L10.2059 3.91755M10.5599 1.43869C10.6994 1.57819 10.8101 1.74381 10.8856 1.92609C10.9611 2.10838 11 2.30375 11 2.50106C11 2.69837 10.9611 2.89374 10.8856 3.07603C10.8101 3.25831 10.6994 3.42393 10.5599 3.56343L3.83257 10.2918L1 11L1.70814 8.20668L8.43833 1.44153C8.7036 1.17492 9.05941 1.01783 9.43511 1.00143C9.81082 0.985026 10.179 1.11052 10.4664 1.35299L10.5599 1.43869Z"
									stroke={
										colorTheme === "light"
											? "#1A1831"
											: "#fff"
									}
									strokeWidth="1"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</ClickableSvg>
						</OptionText>
					</Option>
					<Option>
						<OptionText colorTheme={colorTheme}>
							Dark Mode as Default
						</OptionText>
						<ToggleSwitch
							colorTheme={colorTheme}
							isToggleOn={darkTheme}
							setIsToggleOn={setDarkTheme}
						/>
					</Option>
				</Options>
				{loading ? (
					<LoadingDots
						style={{
							marginTop: "1rem",
							marginBottom: "10vh",
						}}
					/>
				) : (
					<ButtonCrate>
						<Button colorTheme={colorTheme}>Save</Button>
						<Button
							colorTheme={colorTheme}
							onClick={closeHandler}>
							Cancel
						</Button>
					</ButtonCrate>
				)}
			</Crate>
		</Container>
	);
};

export default SettingsPopup;
