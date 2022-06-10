import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import HomePage from './components/homePage/HomePage';
import BookPage from './components/bookPage/BookPage';
import AccessTokenProvider, { AccessTokenContext } from './contexts/accessTokenContext';
import LoginProvider, { LoginContext } from './contexts/loginContext';
import ShoppingCartPage from './components/shoppingCart/ShoppingCartPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <LoginProvider>
  <AccessTokenProvider>
  <BrowserRouter>
    <Routes>
      {/* <Route path='/' element = {<App/>}/> */}
      <Route path = '/' element={<HomePage/>}/>
      <Route path = 'bookPage' element={<BookPage/>}/>
      <Route path = 'shoppingCart' element={<ShoppingCartPage/>}/>
    </Routes>
  </BrowserRouter>
  </AccessTokenProvider>
  </LoginProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
