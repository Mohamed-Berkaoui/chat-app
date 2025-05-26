import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Navigate, Route, Routes } from "react-router";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import { useContext, useEffect } from "react";
import { themeStore } from "./context/themeContext";
import { ToastContainer } from "react-toastify";
import { userStore } from "./context/UserContext";


function App() {
  const {theme}=useContext(themeStore)
  const {user}=useContext(userStore)

  return (
    <div data-theme={theme}>
      <ToastContainer/>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/register" element={<Register />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/chat" element={true?<Chat/>:<Navigate to="/"></Navigate>}/>

      </Routes>
      <Footer />
    </div>
  );
}

export default App;
