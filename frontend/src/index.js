import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import App from './App';

import HomePage from "./components/homePage/HomePage";
import BookPage from "./components/bookPage/BookPage";
import AccessTokenProvider, {
  AccessTokenContext,
} from "./contexts/accessTokenContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AccessTokenProvider>
    <BrowserRouter>
      <Routes>
        {/* <Route path='/' element = {<App/>}/> */}
        <Route path="/" element={<HomePage />} />
        <Route path="bookPage" element={<BookPage />} />
      </Routes>
    </BrowserRouter>
  </AccessTokenProvider>
);
