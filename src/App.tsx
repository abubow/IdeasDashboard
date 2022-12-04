import "./App.css";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import { UserAuthProvider } from "./contexts/authContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { NavbarProvider } from "./contexts/navbarContext";
import Users from "./pages/Users";
import ProtectedAuthRoute from "./components/ProtectedAuthRoute";

const App: React.FC = () => {
	const [loggedIn, setLoggedIn] = useState(false);

	return (
		<div className="App">
			<UserAuthProvider>
				<NavbarProvider>
					<Routes>
						<Route
							path="/"
							element={<LogIn />}
						/>
						<Route
							path="/login"
							element={<LogIn />}
						/>
						<Route
							path="/signup"
							element={<SignUp />}
						/>
						<Route
							path="/home"
							element={
								<ProtectedRoute destination="/">
									<Dashboard
										loggedIn={loggedIn}
										setLoggedIn={setLoggedIn}
									/>
								</ProtectedRoute>
							}
						/>
            <Route
              path="/users"
              element={
                <ProtectedAuthRoute destination="/">
                  <Users/>
                </ProtectedAuthRoute>
              }
            />
					</Routes>
				</NavbarProvider>
			</UserAuthProvider>
			{/*Dashboard loggedIn={loggedIn} setLoggedIn={setLoggedIn} />*/}
			{/* <LogIn /> */}
		</div>
	);
};

export default App;
