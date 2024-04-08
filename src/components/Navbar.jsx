import React, { useState } from "react";
import '../App.css';

function Navbar({setShowThis, showThis}) {
  
    return (
      <div className="row w-100 px-5" style={{height: "100px", backgroundColor:"black", color:"#fff"}}>
        <div className="col-6 my-auto font-weight-normal" onClick={() => setShowThis('Welcome')} style={{fontSize: "20px", cursor: 'pointer'}}>Artisan App</div>

        <div className="col-6 my-auto d-flex justify-content-end" style={{fontSize: "20px"}}>
            {!sessionStorage.getItem('user') && <a className={showThis == 'Login' ? "navbarLinks navbarLinkActive" : "navbarLinks"} onClick={() => setShowThis('Login')}>Login</a>}
            {!sessionStorage.getItem('user') && <a className={showThis == 'Sign Up' ? "navbarLinks navbarLinkActive" : "navbarLinks"} onClick={() => setShowThis('Sign Up')}>Sign Up</a>}
            {sessionStorage.getItem('user') && <a className="navbarLinks" onClick={() => { setShowThis('Welcome'); sessionStorage.removeItem('user')} }>Logout</a>}
        </div>

      </div>
    );
  }
  
  export default Navbar;