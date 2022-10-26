import './App.css'
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import { Route, Routes} from 'react-router-dom';
import { useState } from 'react';
import { UserAuthProvider } from './contexts/authContext';
import ProtectedRoute from './components/ProtectedRoute';

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="App">
        <UserAuthProvider>
          <Routes>
              <Route path="/" element={<LogIn />} />
              <Route path="/login" element={
                  <LogIn />
              } />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/home" element={
                <ProtectedRoute destination="/">
                  <Dashboard loggedIn={loggedIn} setLoggedIn={setLoggedIn}  />
                </ProtectedRoute>
              } />
          </Routes>
        </UserAuthProvider>
      {/*Dashboard loggedIn={loggedIn} setLoggedIn={setLoggedIn} />*/}
      {/* <LogIn /> */}
    </div>
  );
}

export default App
