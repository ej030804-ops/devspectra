import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import StartProject from "./pages/StartProject";

import "./styles/main.css";

const API_URL = 
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : process.env.REACT_APP_API_URL || "https://devspectra-svvi.onrender.com";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuth(token === "admin123");
    
    fetch(`${API_URL}/`)
      .then(res => res.text())
      .then(data => console.log(data))
      .catch(err => console.log("Backend not running"));
  }, []);


  return (
    <BrowserRouter>
      <Navbar />

      <div className="pt-20 md:pt-24">
        <Routes>
          {/* 🌍 PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/start" element={<StartProject />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={isAuth ? <Admin /> : <Navigate to="/login" />} />

          {/* 🔒 PROTECTED ROUTE */}
          {/* ❌ UNKNOWN ROUTES */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
