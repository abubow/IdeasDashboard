import styled from "styled-components";
import Navbar from "../components/Navbar";
import Options from "../components/Options";
import { useState, useContext } from "react";
import DisplayPanel from "../components/DisplayPanel";
import IdeaPopUp from "../components/IdeaPopUp";
import { OptionsSelectedProvider } from "../contexts/optionsContext";
import { AllIdeasProvider } from "../contexts/ideasContext";
import { ColorContext, ThemeProvider } from "../contexts/themeContext";
import { AllIdeasSummariesProvider } from "../contexts/allIdeaSumContext";
import { DndProvider } from "react-dnd/dist/core";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useNavbar } from "../contexts/navbarContext";
import Users from "./Users";

interface Props {
	color: string;
}
const Container = styled.div<Props>`
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
	min-height: 100vh;
	width: 100%;
	background-color: ${(props) => props.color};
`;

interface PropsF {
	loggedIn: boolean;
	setLoggedIn: (loggedIn: boolean) => void;
}
const Dashboard = (props: PropsF) => {
	const colors = {
		backgroundColor: "#2A2B2F",
		navbar: "#1C1D22",
		options: "#222327",
	};
	const OptionsContent = {
		title: "Ideas Panel",
		options: [
			{
				name: "Ideas",
				subOptions: [
					"Ideas Timeline",
					"All Ideas",
					"Post New Idea",
					"Initial Stage",
					"In Progress",
				],
			},
			{
				name: "Approved",
				subOptions: ["Approved Ideas", "Done"],
			},
		],
	};
	const UsersOptions = {
		title: "Users Panel",
		options: [
			{
				name: "Users",
				subOptions: ["All Users", "Admins", "Students"],
			},
			{
				name: "Modify",
				subOptions: ["Add Admin", "Remove Admin"],
			},
		],
	};
	const { colorTheme, setColorTheme } = useContext(ColorContext);
	const navbar: any = useNavbar();
	return (
		<DndProvider backend={HTML5Backend}>
			<ThemeProvider>
				<OptionsSelectedProvider>
					<Container
						color={
							colorTheme === "light"
								? "#fff"
								: colors.backgroundColor
						}>
						<Navbar color={colors.navbar} />
						<>
							{navbar.navbar === "Ideas" && (
								<>
									<Options
										color={colors.options}
										content={OptionsContent}
									/>
									<AllIdeasSummariesProvider>
										<DisplayPanel />
									</AllIdeasSummariesProvider>
								</>
							)}
							{navbar.navbar === "Users" && (
								<>
									<Options
										color={colors.options}
										content={UsersOptions}
									/>
									<Users />
								</>
							)}
						</>
					</Container>
				</OptionsSelectedProvider>
			</ThemeProvider>
		</DndProvider>
	);
};

export default Dashboard;
