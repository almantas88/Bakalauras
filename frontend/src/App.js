import "./App.css";
import React, { useState, useEffect, useContext } from "react";
import MenuDrawer from "./components/menuDrawer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Users from "./pages/Users";
import Books from "./pages/Books";
import BookManagement from "./pages/BookManagement";
import FlashMessage from "./components/flashMessage";
import { MessageContext } from "./context/messageContext";
import StudentsPage from "./pages/StudentsPage";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized"
import PasswordReset from "./pages/PasswordReset";
import BookDelays from "./pages/BookDelays";

export default function App() {
  return (

     
      <Router>
         <FlashMessage/>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/users" element={<Users />} />
          <Route path="/books" element={<Books />} />
          <Route path="/bookmanagement" element={<BookManagement />} />
          <Route path="/student" element={<StudentsPage />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/reset" element={<PasswordReset />} />
          <Route path="/bookDelay" element={<BookDelays />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>

  );
}




