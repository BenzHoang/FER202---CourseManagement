import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Course from './pages/Course';
import Contact from './pages/Contact';
import Login from "./pages/Login";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <ToastContainer position="top-right" autoClose={2000} />
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/course" element={<Course />}></Route>
                <Route path="/contact" element={<Contact />}></Route>
                <Route path="/login" element={<Login />}></Route>
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
