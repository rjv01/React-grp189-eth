import { useState } from 'react';
import './App.css';
import Homepage from './components/homepage/homepage';
import Login from './components/login/login';
import Register from './components/register/register';
import Profile from './components/profileEdit/profileEdit';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [user, setLoginUser] = useState({});

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={user && user._id ? <Homepage setLoginUser={setLoginUser} /> : <Login setLoginUser={setLoginUser} />} />
          <Route path="/login" element={<Login setLoginUser={setLoginUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={user && user._id ? <Profile setLoginUser={setLoginUser} /> : <Login setLoginUser={setLoginUser}/>}/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;



/*
import { useState } from 'react';
import './App.css';
import Homepage from './components/homepage/homepage';
import Login from './components/login/login';
import Register from './components/register/register';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';

function App() {
  const [ user , setLoginUser ] = useState({})
  return (
    <div className="App">
      <Router>
        <Routes>
              <Route path="/" element={user && user._id ? <Homepage setLoginUser={setLoginUser} /> : <Login />} />
              <Route path="/login" element={<Login setLoginUser={setLoginUser} />} />
              <Route path="/register" element={<Register />} />
      </Routes>
      </Router>
    </div>
  );
}

export default App;
*/