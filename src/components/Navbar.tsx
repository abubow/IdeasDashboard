import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useUserAuth } from "../contexts/authContext";

interface Props {
	color: string;
}
const Container = styled.div<Props>`
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	min-height: 100vh;
	width: 4vw;
	background-color: ${(props) => props.color};
	z-index: 2;
`;
const Icon = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%;
	padding: 0.85rem;
	cursor: pointer;
	opacity: 0.5;
	transition: all 0.4s ease-in-out;
	margin-bottom: 1rem;
	&:hover {
		background-color: rgba(255, 255, 255, 0.1);
		opacity: 1;
	}
`;
const Logo = styled.div`
	display: flex;
	justify-content: center;
	align-items: flex-start;
	width: 100%;
	flex: 1;
	margin: 2rem 0;
`;
const IconsCrate = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-direction: column;
	width: 100%;
	flex: 10;
`;
const LogOutCrate = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	flex: 1;
	flex-direction: column;
`;
const Navbar = ({ color }: Props) => {
	const {logOut}:any = useUserAuth();
	const navigate = useNavigate();
	const handleLogOut = () => {
		logOut();
		navigate('/');
	}
	return (
		<Container color={color}>
			<Logo>
				<svg
					width="24"
					height="26"
					viewBox="0 0 24 26"
					fill="none"
					xmlns="http://www.w3.org/2000/svg">
					<path
						d="M24 8.88887L14 4V5.46663L22.5 9.62219L14 13.7777V26L24 21.1111V8.88887Z"
						fill="white"
					/>
					<path
						d="M0 17.1111L10 22V20.5334L1.49996 16.3778L10 12.2222V-7.62939e-06L0 4.88887V17.1111Z"
						fill="white"
					/>
				</svg>
			</Logo>
			<IconsCrate>
				<Icon>
					<svg
						width="18"
						height="20"
						viewBox="0 0 18 20"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M9 2.66666C6.97496 2.66666 5.33333 4.30828 5.33333 6.33333C5.33333 8.35837 6.97496 9.99999 9 9.99999C11.025 9.99999 12.6667 8.35837 12.6667 6.33333C12.6667 4.30828 11.025 2.66666 9 2.66666ZM3.5 6.33333C3.5 3.29576 5.96243 0.833328 9 0.833328C12.0376 0.833328 14.5 3.29576 14.5 6.33333C14.5 9.37089 12.0376 11.8333 9 11.8333C5.96243 11.8333 3.5 9.37089 3.5 6.33333ZM5.33333 15.5C3.81455 15.5 2.58333 16.7312 2.58333 18.25C2.58333 18.7563 2.17293 19.1667 1.66667 19.1667C1.16041 19.1667 0.75 18.7563 0.75 18.25C0.75 15.7187 2.80203 13.6667 5.33333 13.6667H12.6667C15.198 13.6667 17.25 15.7187 17.25 18.25C17.25 18.7563 16.8396 19.1667 16.3333 19.1667C15.8271 19.1667 15.4167 18.7563 15.4167 18.25C15.4167 16.7312 14.1854 15.5 12.6667 15.5H5.33333Z"
							fill="white"
						/>
					</svg>
				</Icon>
				<Icon>
					<svg
						width="18"
						height="18"
						viewBox="0 0 18 18"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M0.75 2.58333C0.75 1.57081 1.57081 0.75 2.58333 0.75H6.25C7.26252 0.75 8.08333 1.57081 8.08333 2.58333V6.25C8.08333 7.26252 7.26252 8.08333 6.25 8.08333H2.58333C1.57081 8.08333 0.75 7.26252 0.75 6.25V2.58333ZM6.25 2.58333H2.58333V6.25H6.25V2.58333ZM9.91667 2.58333C9.91667 1.57081 10.7375 0.75 11.75 0.75H15.4167C16.4292 0.75 17.25 1.57081 17.25 2.58333V6.25C17.25 7.26252 16.4292 8.08333 15.4167 8.08333H11.75C10.7375 8.08333 9.91667 7.26252 9.91667 6.25V2.58333ZM15.4167 2.58333H11.75V6.25H15.4167V2.58333ZM0.75 11.75C0.75 10.7375 1.57081 9.91667 2.58333 9.91667H6.25C7.26252 9.91667 8.08333 10.7375 8.08333 11.75V15.4167C8.08333 16.4292 7.26252 17.25 6.25 17.25H2.58333C1.57081 17.25 0.75 16.4292 0.75 15.4167V11.75ZM6.25 11.75H2.58333V15.4167H6.25V11.75ZM9.91667 11.75C9.91667 10.7375 10.7375 9.91667 11.75 9.91667H15.4167C16.4292 9.91667 17.25 10.7375 17.25 11.75V15.4167C17.25 16.4292 16.4292 17.25 15.4167 17.25H11.75C10.7375 17.25 9.91667 16.4292 9.91667 15.4167V11.75ZM15.4167 11.75H11.75V15.4167H15.4167V11.75Z"
							fill="white"
						/>
					</svg>
				</Icon>
				<Icon>
					<svg
						width="18"
						height="19"
						viewBox="0 0 18 19"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M6.25 0.833344C6.75626 0.833344 7.16667 1.24375 7.16667 1.75001V2.66668H10.8333V1.75001C10.8333 1.24375 11.2437 0.833344 11.75 0.833344C12.2563 0.833344 12.6667 1.24375 12.6667 1.75001V2.66668H15.4167C16.4292 2.66668 17.25 3.48749 17.25 4.50001V16.4167C17.25 17.4292 16.4292 18.25 15.4167 18.25H2.58333C1.57081 18.25 0.75 17.4292 0.75 16.4167V4.50001C0.75 3.48749 1.57081 2.66668 2.58333 2.66668H5.33333V1.75001C5.33333 1.24375 5.74374 0.833344 6.25 0.833344ZM5.33333 4.50001H2.58333V7.25001H15.4167V4.50001H12.6667V5.41668C12.6667 5.92294 12.2563 6.33334 11.75 6.33334C11.2437 6.33334 10.8333 5.92294 10.8333 5.41668V4.50001H7.16667V5.41668C7.16667 5.92294 6.75626 6.33334 6.25 6.33334C5.74374 6.33334 5.33333 5.92294 5.33333 5.41668V4.50001ZM15.4167 9.08334H2.58333V16.4167H15.4167V9.08334Z"
							fill="white"
						/>
					</svg>
				</Icon>
				<Icon>
					<svg
						width="18"
						height="18"
						viewBox="0 0 18 18"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M0.75 2.58333C0.75 1.57081 1.57081 0.75 2.58333 0.75H15.4167C16.4292 0.75 17.25 1.57081 17.25 2.58333V15.4167C17.25 16.4292 16.4292 17.25 15.4167 17.25H2.58333C1.57081 17.25 0.75 16.4292 0.75 15.4167V2.58333ZM15.4167 2.58333H2.58333V15.4167H15.4167V2.58333ZM9 4.41667C9.50626 4.41667 9.91667 4.82707 9.91667 5.33333V12.6667C9.91667 13.1729 9.50626 13.5833 9 13.5833C8.49374 13.5833 8.08333 13.1729 8.08333 12.6667V5.33333C8.08333 4.82707 8.49374 4.41667 9 4.41667ZM12.6667 6.25C13.1729 6.25 13.5833 6.66041 13.5833 7.16667V12.6667C13.5833 13.1729 13.1729 13.5833 12.6667 13.5833C12.1604 13.5833 11.75 13.1729 11.75 12.6667V7.16667C11.75 6.66041 12.1604 6.25 12.6667 6.25ZM5.33333 8.08333C5.83959 8.08333 6.25 8.49374 6.25 9V12.6667C6.25 13.1729 5.83959 13.5833 5.33333 13.5833C4.82707 13.5833 4.41667 13.1729 4.41667 12.6667V9C4.41667 8.49374 4.82707 8.08333 5.33333 8.08333Z"
							fill="white"
						/>
					</svg>
				</Icon>
				<Icon>
					<svg
						width="20"
						height="19"
						viewBox="0 0 20 19"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M9.08333 2.66668C7.05825 2.66668 5.41667 4.30829 5.41667 6.33334C5.41667 6.36306 5.4171 6.39409 5.41787 6.42706C5.42784 6.85334 5.14257 7.2302 4.72959 7.33632C3.54278 7.64129 2.66667 8.71953 2.66667 10C2.66667 11.5188 3.89791 12.75 5.41667 12.75H6.33333C6.83959 12.75 7.25 13.1604 7.25 13.6667C7.25 14.1729 6.83959 14.5833 6.33333 14.5833H5.41667C2.8854 14.5833 0.833332 12.5313 0.833332 10C0.833332 8.10935 1.97752 6.48776 3.61015 5.78676C3.88451 3.0058 6.23017 0.833344 9.08333 0.833344C11.1216 0.833344 12.8993 1.9419 13.8491 3.58631C16.8023 3.68255 19.1667 6.10683 19.1667 9.08334C19.1667 12.1209 16.7043 14.5833 13.6667 14.5833C13.1604 14.5833 12.75 14.1729 12.75 13.6667C12.75 13.1604 13.1604 12.75 13.6667 12.75C15.6917 12.75 17.3333 11.1084 17.3333 9.08334C17.3333 7.05829 15.6917 5.41668 13.6667 5.41668C13.5652 5.41668 13.465 5.42077 13.3658 5.42879C12.9745 5.46046 12.6065 5.23939 12.4506 4.87905C11.8868 3.57577 10.5902 2.66668 9.08333 2.66668ZM9.35182 7.5185C9.7098 7.16052 10.2902 7.16052 10.6482 7.5185L12.4815 9.35183C12.8395 9.70981 12.8395 10.2902 12.4815 10.6482C12.1235 11.0062 11.5431 11.0062 11.1852 10.6482L10.9167 10.3797V17.3333C10.9167 17.8396 10.5063 18.25 10 18.25C9.49374 18.25 9.08333 17.8396 9.08333 17.3333V10.3797L8.81485 10.6482C8.45687 11.0062 7.87646 11.0062 7.51848 10.6482C7.1605 10.2902 7.1605 9.70981 7.51848 9.35183L9.35182 7.5185Z"
							fill="white"
						/>
					</svg>
				</Icon>
				<Icon>
					<svg
						width="20"
						height="18"
						viewBox="0 0 20 18"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M6.96012 0.79704C7.14828 0.73432 7.35171 0.73432 7.53987 0.79704L12.75 2.53375L16.7536 1.19922C17.9407 0.803507 19.1667 1.68712 19.1667 2.93847V13.8393C19.1667 14.6284 18.6617 15.329 17.9131 15.5786L13.0399 17.203C12.8517 17.2657 12.6483 17.2657 12.4601 17.203L7.25 15.4663L3.24642 16.8008C2.05928 17.1965 0.833332 16.3129 0.833332 15.0615V4.1607C0.833332 3.37157 1.33829 2.67099 2.08691 2.42144L6.96012 0.79704ZM8.16667 13.8393L11.8333 15.0615V4.1607L8.16667 2.93847V13.8393ZM6.33333 2.93847L2.66667 4.1607V15.0615L6.33333 13.8393V2.93847ZM13.6667 4.1607V15.0615L17.3333 13.8393V2.93847L13.6667 4.1607Z"
							fill="white"
						/>
					</svg>
				</Icon>
			</IconsCrate>
			<LogOutCrate>
				<Icon>
					<svg
						width="16"
						height="18"
						viewBox="0 0 16 18"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M5.25 2.58333C4.74374 2.58333 4.33333 2.99374 4.33333 3.5C4.33333 4.00626 4.74374 4.41667 5.25 4.41667C5.75626 4.41667 6.16667 4.00626 6.16667 3.5C6.16667 2.99374 5.75626 2.58333 5.25 2.58333ZM2.65648 2.58333C3.034 1.51524 4.05263 0.75 5.25 0.75C6.44737 0.75 7.466 1.51524 7.84352 2.58333H14.4167C14.9229 2.58333 15.3333 2.99374 15.3333 3.5C15.3333 4.00626 14.9229 4.41667 14.4167 4.41667H7.84352C7.466 5.48476 6.44737 6.25 5.25 6.25C4.05263 6.25 3.034 5.48476 2.65648 4.41667H1.58333C1.07707 4.41667 0.666668 4.00626 0.666668 3.5C0.666668 2.99374 1.07707 2.58333 1.58333 2.58333H2.65648ZM10.75 8.08333C10.2437 8.08333 9.83333 8.49374 9.83333 9C9.83333 9.50626 10.2437 9.91667 10.75 9.91667C11.2563 9.91667 11.6667 9.50626 11.6667 9C11.6667 8.49374 11.2563 8.08333 10.75 8.08333ZM8.15648 8.08333C8.534 7.01524 9.55263 6.25 10.75 6.25C11.9474 6.25 12.966 7.01524 13.3435 8.08333H14.4167C14.9229 8.08333 15.3333 8.49374 15.3333 9C15.3333 9.50626 14.9229 9.91667 14.4167 9.91667H13.3435C12.966 10.9848 11.9474 11.75 10.75 11.75C9.55263 11.75 8.534 10.9848 8.15648 9.91667H1.58333C1.07707 9.91667 0.666668 9.50626 0.666668 9C0.666668 8.49374 1.07707 8.08333 1.58333 8.08333H8.15648ZM5.25 13.5833C4.74374 13.5833 4.33333 13.9937 4.33333 14.5C4.33333 15.0063 4.74374 15.4167 5.25 15.4167C5.75626 15.4167 6.16667 15.0063 6.16667 14.5C6.16667 13.9937 5.75626 13.5833 5.25 13.5833ZM2.65648 13.5833C3.034 12.5152 4.05263 11.75 5.25 11.75C6.44737 11.75 7.466 12.5152 7.84352 13.5833H14.4167C14.9229 13.5833 15.3333 13.9937 15.3333 14.5C15.3333 15.0063 14.9229 15.4167 14.4167 15.4167H7.84352C7.466 16.4848 6.44737 17.25 5.25 17.25C4.05263 17.25 3.034 16.4848 2.65648 15.4167H1.58333C1.07707 15.4167 0.666668 15.0063 0.666668 14.5C0.666668 13.9937 1.07707 13.5833 1.58333 13.5833H2.65648Z"
							fill="white"
						/>
					</svg>
				</Icon>
				<Icon onClick={handleLogOut}>
					<svg
						width="22"
						height="22"
						viewBox="0 0 22 22"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M10.0833 18.3333C10.0833 17.8271 9.67293 17.4167 9.16667 17.4167H4.58333V4.58333H9.16667C9.67293 4.58333 10.0833 4.17293 10.0833 3.66667C10.0833 3.1604 9.67293 2.75 9.16667 2.75H4.58333C3.57081 2.75 2.75 3.57081 2.75 4.58333V17.4167C2.75 18.4292 3.57081 19.25 4.58333 19.25H9.16667C9.67293 19.25 10.0833 18.8396 10.0833 18.3333Z"
							fill="white"
						/>
						<path
							d="M19.9041 11.6422C19.9891 11.5557 20.0534 11.4565 20.0971 11.3509C20.1416 11.2436 20.1663 11.126 20.1667 11.0027L20.1667 11L20.1667 10.9973C20.166 10.7636 20.0765 10.5301 19.8982 10.3518L16.2315 6.68515C15.8735 6.32717 15.2931 6.32717 14.9352 6.68515C14.5772 7.04313 14.5772 7.62353 14.9352 7.98151L17.037 10.0833H8.25C7.74374 10.0833 7.33333 10.4937 7.33333 11C7.33333 11.5063 7.74374 11.9167 8.25 11.9167H17.037L14.9352 14.0185C14.5772 14.3765 14.5772 14.9569 14.9352 15.3148C15.2931 15.6728 15.8735 15.6728 16.2315 15.3148L19.8975 11.6488L19.9041 11.6422Z"
							fill="white"
						/>
					</svg>
				</Icon>
			</LogOutCrate>
		</Container>
	);
};

export default Navbar;
