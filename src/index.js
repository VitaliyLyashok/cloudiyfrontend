import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import SignIn from './components/sign-in/sign-in';
import SignUp from './components/sign-up/sign-up'; 
import SharingPoint from './components/sharingPoint';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <Routes >
          <Route path="/" element={<SignIn />}/> 
          <Route path="/SignUp" element={<SignUp />}/>
          <Route path="/Home/*" element={<App/>} />
          <Route exact path='/SharingPoint'  element={<SharingPoint/>}/> 
        </Routes>
    </BrowserRouter>
)
