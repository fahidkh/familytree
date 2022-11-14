import React, { useState } from 'react'
import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Login from './Login';
import Feed from './Feed';

function App() {

  const [verified, setVerified] = useState(false);

  function handleChange(newValue) {
    setVerified(newValue);
  }

  return (
    <div className="app">
      {!localStorage.getItem("verified") && !verified  ? (
        <Login onChange={handleChange}/>
      ) : (
        <>
        <Header active="home" />
        <div className="app__body">
        <Sidebar />
        <Feed />
        </div>
        </>
      )}
      </div>
  );
}

export default App;
