import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { StateProvider } from './StateProvider';
import reducer, { initialState } from './reducer';
import { BrowserRouter,
        Routes,
        Route, 
    } from "react-router-dom";
import Calender from './Calender';
import Login from './Login';
import UserProfile from './UserProfile';
import Tree from './Tree';
import Familymembers from './Familymembers';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <StateProvider initialState={initialState} reducer={reducer}>      
             <BrowserRouter>
             <Routes>
                <Route path="/" element={<App />} />
                <Route path="calender" element={<Calender />} />
                <Route path="login" element={<Login />} />
                <Route path="/user-profile/:userId" element={<UserProfile />} />
                <Route path="/family-tree/" element={<Tree />} />
                <Route path="/family-members/" element={<Familymembers />} />
            </Routes>
            </BrowserRouter>
        </StateProvider> 
    </React.StrictMode>
);

