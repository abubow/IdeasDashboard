import styled from "styled-components";
import useOptionSelected from "../contexts/optionsContext";
import { useTheme } from "../contexts/themeContext";
// importing prop types to make sure the props are the right type
interface Props {
	colorTheme: string;
	color: string;
}
const Container = styled.div<Props>`
	position: fixed;
	top: 0;
	left: 4vw;
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-direction: column;
	min-height: 100vh;
	width: 20vw;
	transition: all 0.5s ease;
	background-color: ${(props) =>
		props.colorTheme === "light" ? "#fff" : props.color};
	color: ${(props) => (props.colorTheme === "light" ? "#000" : "#fff")};
	box-shadow: ${(props) =>
		props.colorTheme === "light"
			? "0 0 50px 0 rgba(0, 0, 0, 0.1)"
			: "none"};
	z-index: 1;
`;
const Heading = styled.h1`
	font-style: normal;
	font-weight: 700;
	font-size: 30px;
	width: 100%;
	padding: 10% 0 0 8%;
	margin-bottom: 0.5rem;
`;
const UnorderedList = styled.ul`
	list-style: none;
	margin: 0;
	width: 100%;
	padding: 0 8%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
`;
const OptionsContent = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-direction: column;
	width: 100%;
	margin-top: 3.5rem;
`;
const Option = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-between;
	align-item: center;
	&:hover {
		cursor: pointer;
	}
`;
const OptionLi = styled.li`
	width: 100%;
	padding: 0.1rem 0;
	transition: all 0.3s ease;
`;
const SubOptions = styled.ul`
	list-style: none;
	margin: 0 0 0 1rem;
	padding: 10px 0 0 0;
	opacity: 0.5;
	li {
		margin: 0.5rem 0;
	}
`;
interface ToggleProps {
	colorTheme: string;
}
const ToggleSwitch = styled.div<ToggleProps>`
	width: 80%;
	min-height: 4vh;
	max-height: 5vh;
	border-radius: 22px;
	background-color: ${(props) =>
		props.colorTheme === "light"
			? "rgba(28, 29, 34, 0.1)"
			: "rgba(255, 255, 255, 0.05)"};
	box-shadow: 0 0 50px 0 rgba(0, 0, 0, 0.1);
	padding: 2vh 1vw;
	margin-bottom: 1rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	transition: all 0.5s ease;
`;
const SwitchLabel = styled.label`
	margin: 0 2vw;
	transition: all 0.5s ease;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const SwitchBall = styled.div<ToggleProps>`
	width: 7.5vw;
	min-height: 3.8vh;
	max-height: 4.5vh;
	border-radius: 22px;
	background-color: ${(props) =>
		props.colorTheme === "light" ? "#fff" : "rgba(255, 255, 255, 0.05)"};
	transition: all 0.5s ease;
	padding: 1vh 1vw;
	margin-left: ${(props) => (props.colorTheme === "light" ? "-2%" : "35%")};
	box-shadow: 0 0 50px 0 rgba(0, 0, 0, 0.1);
	position: absolute;
	z-index: 0;
`;
interface PropsF {
	color: string;
	content: {
		title: string;
		options: {
			name: string;
			subOptions: string[];
		}[];
	};
}
const Options = ({ content, color }: PropsF) => {
	const { optionSelected, setOptionSelected }: any = useOptionSelected();
	const { colorTheme, setColorTheme } = useTheme();
	return (
		<Container
			colorTheme={colorTheme}
			color={color}>
			<div style={{ width: "100%" }}>
				<Heading>{content.title}</Heading>
				<OptionsContent>
					{content.options.map((option, index) => {
						return (
							<UnorderedList key={index}>
								<OptionLi
									key={index}
									onClick={() => {
										setOptionSelected(option.name);
									}}
									style={{
										opacity:
											(optionSelected === option.name) ||
											(option.subOptions.includes(
                                                optionSelected
                                            ))
												? 1
												: 0.5,
										fontWeight:
											optionSelected === option.name
												? 600
												: 400,
									}}>
									<Option>
										{option.name}
										<svg
											width="10"
											height="6"
											viewBox="0 0 10 6"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
											style={{
												transform:
													optionSelected ===
													option.name
														? "rotate(0deg)"
														: "rotate(90deg)",
											}}>
											<path
												d="M9 1L5 5L1 1"
												stroke={
													colorTheme === "light"
														? "#000"
														: "#fff"
												}
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
									</Option>
								</OptionLi>
								<SubOptions
									style={{
										opacity:
											optionSelected === option.name
												? 0.5
												: 0,
										maxHeight:
											optionSelected === option.name
												? "100%"
												: "0",
										overflow: "hidden",
									}}>
									{option.subOptions.map(
										(subOption, index) => {
											return (
												<OptionLi
													key={index}
													onClick={() => {
														setOptionSelected(
															subOption
														);
													}}>
													<Option>{subOption}</Option>
												</OptionLi>
											);
										}
									)}
								</SubOptions>
							</UnorderedList>
						);
					})}
				</OptionsContent>
			</div>
			<ToggleSwitch
				colorTheme={colorTheme}
				onClick={() =>
					setColorTheme(colorTheme === "light" ? "dark" : "light")
				}>
				<SwitchBall colorTheme={colorTheme} />
				<SwitchLabel
					style={{
						color:
							colorTheme === "light"
								? "rgba(0, 0, 0, 1)"
								: "rgba(255, 255, 255, 0.5)",
						transition: "all 0.5s ease",
						zIndex: 2,
					}}>
					<svg
						width="18"
						height="18"
						viewBox="0 0 18 18"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M9 0.666504C9.46024 0.666504 9.83334 1.0396 9.83334 1.49984V2.33317C9.83334 2.79341 9.46024 3.1665 9 3.1665C8.53977 3.1665 8.16667 2.79341 8.16667 2.33317V1.49984C8.16667 1.0396 8.53977 0.666504 9 0.666504ZM14.8926 3.10727C15.218 3.43271 15.218 3.96035 14.8926 4.28579L14.3033 4.87504C13.9779 5.20048 13.4503 5.20048 13.1248 4.87504C12.7994 4.5496 12.7994 4.02197 13.1248 3.69653L13.7141 3.10727C14.0395 2.78184 14.5672 2.78184 14.8926 3.10727ZM3.10744 3.10728C3.43288 2.78184 3.96052 2.78184 4.28595 3.10728L4.87521 3.69653C5.20065 4.02197 5.20065 4.5496 4.87521 4.87504C4.54977 5.20048 4.02214 5.20048 3.6967 4.87504L3.10744 4.28579C2.78201 3.96035 2.78201 3.43271 3.10744 3.10728ZM9 5.6665C7.15905 5.6665 5.66667 7.15889 5.66667 8.99984C5.66667 10.8408 7.15905 12.3332 9 12.3332C10.841 12.3332 12.3333 10.8408 12.3333 8.99984C12.3333 7.15889 10.841 5.6665 9 5.6665ZM4 8.99984C4 6.23841 6.23858 3.99984 9 3.99984C11.7614 3.99984 14 6.23841 14 8.99984C14 11.7613 11.7614 13.9998 9 13.9998C6.23858 13.9998 4 11.7613 4 8.99984ZM0.666672 8.99984C0.666672 8.5396 1.03977 8.1665 1.5 8.1665H2.33334C2.79358 8.1665 3.16667 8.5396 3.16667 8.99984C3.16667 9.46007 2.79358 9.83317 2.33334 9.83317H1.5C1.03977 9.83317 0.666672 9.46007 0.666672 8.99984ZM14.8333 8.99984C14.8333 8.5396 15.2064 8.1665 15.6667 8.1665H16.5C16.9602 8.1665 17.3333 8.5396 17.3333 8.99984C17.3333 9.46007 16.9602 9.83317 16.5 9.83317H15.6667C15.2064 9.83317 14.8333 9.46007 14.8333 8.99984ZM3.6967 13.1246C4.02214 12.7992 4.54977 12.7992 4.87521 13.1246C5.20065 13.4501 5.20065 13.9777 4.87521 14.3031L4.28595 14.8924C3.96052 15.2178 3.43288 15.2178 3.10744 14.8924C2.78201 14.5669 2.78201 14.0393 3.10744 13.7139L3.6967 13.1246ZM13.1248 14.3031C12.7994 13.9777 12.7994 13.4501 13.1248 13.1246C13.4503 12.7992 13.9779 12.7992 14.3033 13.1246L14.8926 13.7139C15.218 14.0393 15.218 14.5669 14.8926 14.8924C14.5672 15.2178 14.0395 15.2178 13.7141 14.8924L13.1248 14.3031ZM9 14.8332C9.46024 14.8332 9.83334 15.2063 9.83334 15.6665V16.4998C9.83334 16.9601 9.46024 17.3332 9 17.3332C8.53977 17.3332 8.16667 16.9601 8.16667 16.4998V15.6665C8.16667 15.2063 8.53977 14.8332 9 14.8332Z"
							fill={
								colorTheme === "light"
									? "rgba(0, 0, 0, 1)"
									: "rgba(255, 255, 255, 0.5)"
							}
						/>
					</svg>
					<div
						style={{
							margin: "0 0.5vw",
							fontSize: "0.8rem",
							fontWeight: 500,
							color:
								colorTheme === "light"
									? "rgba(0, 0, 0, 1)"
									: "rgba(255, 255, 255, 0.5)",
						}}>
						Light
					</div>
				</SwitchLabel>
				<SwitchLabel
					style={{
						color:
							colorTheme === "light"
								? "rgba(0, 0, 0, 0.5)"
								: "rgba(255, 255, 255, 1)",
						transition: "all 0.5s ease",
						zIndex: 2,
					}}>
					<svg
						width="20"
						height="20"
						viewBox="0 0 20 20"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M7.80064 2.7441C8.05491 2.99837 8.11741 3.38706 7.95565 3.70821C7.5339 4.54559 7.29601 5.49197 7.29601 6.49632C7.29601 9.92474 10.0753 12.704 13.5037 12.704C14.508 12.704 15.4544 12.4661 16.2918 12.0444C16.613 11.8826 17.0017 11.9451 17.2559 12.1994C17.5102 12.4536 17.5727 12.8423 17.4109 13.1635C16.1163 15.7339 13.4524 17.5 10.3744 17.5C6.02547 17.5 2.5 13.9746 2.5 9.62567C2.5 6.54767 4.26617 3.88368 6.83653 2.58909C7.15769 2.42734 7.54638 2.48983 7.80064 2.7441ZM5.68475 5.55802C4.73864 6.64786 4.16667 8.07027 4.16667 9.62567C4.16667 13.0541 6.94594 15.8334 10.3744 15.8334C11.9298 15.8334 13.3522 15.2614 14.442 14.3153C14.1342 14.3519 13.8211 14.3707 13.5037 14.3707C9.15481 14.3707 5.62934 10.8452 5.62934 6.49632C5.62934 6.17895 5.64816 5.86581 5.68475 5.55802Z"
							fill={
								colorTheme === "light"
									? "rgba(0, 0, 0, 0.5)"
									: "rgba(255, 255, 255, 1)"
							}
						/>
					</svg>
					<div
						style={{
							margin: "0 0.5vw",
							fontSize: "0.8rem",
							fontWeight: 500,
							color:
								colorTheme === "light"
									? "rgba(0, 0, 0, 0.5)"
									: "rgba(255, 255, 255, 1)",
						}}>
						Dark
					</div>
				</SwitchLabel>
			</ToggleSwitch>
		</Container>
	);
};

export default Options;
