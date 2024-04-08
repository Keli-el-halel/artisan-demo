import { useState } from "react";
import { showAlert, showToast, returnFormattedDate, simpleSearch, delay } from "./utils";
import { ToastContainer, Slide } from 'react-toastify';
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import WelcomePage from "./pages/Welcome";
import SignUpPage from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";

function App() {

  const [showThis, setShowThis] = useState(sessionStorage.getItem('user') ? 'Dashboard' : 'Welcome');
  // const [delayTime, setDelayTime] = useState(2000);

  async function doSomething(){
    showAlert('Showing Time', returnFormattedDate(undefined, 'MM, dd, yyyy'), ()=> {showToast('Successful')}, 'Yea Close', 'Nah Revert');
  }

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
