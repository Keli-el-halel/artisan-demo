import { useState } from "react";
import { ToastContainer, Slide } from 'react-toastify';
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import WelcomePage from "./pages/Welcome";
import SignUpPage from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";

function App() {

  const [showThis, setShowThis] = useState(localStorage.getItem('user') ? 'Dashboard' : 'Welcome');

  return (
    <div className="w-100">
      <Navbar setShowThis={setShowThis} showThis={showThis}/>
      {showThis == 'Welcome' && <WelcomePage/>}
      {showThis == 'Sign Up' && <SignUpPage/>}
      {showThis == 'Login' && <Login setShowThis={setShowThis}/>}
      {showThis == 'Dashboard' && <Dashboard/>}
      <ToastContainer hideProgressBar transition={Slide} />
    </div>
  );
}

export default App;
