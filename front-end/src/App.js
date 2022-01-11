import "./App.css";
import React, { useState, useEffect, useContext } from "react";
import MenuDrawer from "./components/menuDrawer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Users from "./pages/Users";
import Books from "./pages/Books";
import BooksCkeckOutCheckIn from "./pages/BooksCheckOutCheckIn";
import FlashMessage from "./components/flashMessage";
import { MessageContext } from "./context/messageContext";

export default function App() {
  return (

     
      <Router>
         <FlashMessage/>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/users" element={<Users />} />
          <Route path="/books" element={<Books />} />
          <Route path="/bookscheckincheckout" element={<BooksCkeckOutCheckIn />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>

  );
}



function NotFound() {
  return (
    <div>
      <h2>404 klaida</h2>
    </div>
  );
}
