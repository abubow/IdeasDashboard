import './App.css'
import LogIn from './pages/LogIn';
import Dashboard from './pages/Dashboard';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { useState } from 'react';

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="App">
      {/* <Router>
        <Route exact path="/">
          <LogIn loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        </Route>
        <Route path="/dashboard">
          <Dashboard loggedIn={loggedIn} />
        </Route>
      </Router> */}
      <Dashboard loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
    </div>
  );
}

export default App
