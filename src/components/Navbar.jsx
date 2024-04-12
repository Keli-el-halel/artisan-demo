import React, { useState } from "react";
import '../App.css';
import profileImg from '../assets/profile.png'

function Navbar({setShowThis, showThis}) {
  
    return (
      <div className="row w-100 px-5" style={{height: "100px", backgroundColor:"black", color:"#fff"}}>
        <div className="col-6 my-auto font-weight-normal" onClick={() => { localStorage.getItem('user') ? setShowThis('Dashboard') : setShowThis('Welcome')}} style={{fontSize: "20px", cursor: 'pointer'}}>Artisan App</div>

        <div className="col-6 my-auto d-flex justify-content-end" style={{fontSize: "20px"}}>
            {!localStorage.getItem('user') && <a className={showThis == 'Login' ? "navbarLinks navbarLinkActive" : "navbarLinks"} onClick={() => setShowThis('Login')}>Login</a>}
            {!localStorage.getItem('user') && <a className={showThis == 'Sign Up' ? "navbarLinks navbarLinkActive" : "navbarLinks"} onClick={() => setShowThis('Sign Up')}>Sign Up</a>}
            {localStorage.getItem('user') &&
              <div className="d-flex">
                <span className="navbarLinks my-auto">{JSON.parse(localStorage.getItem('user')).username}</span>
                <img src={profileImg} style={{width:"50px", borderRadius: '50%'}} />
                <i className="fas fa-sign-out-alt my-auto ms-3" onClick={() => { setShowThis('Welcome'); localStorage.removeItem('user')} } style={{color: "#fff", cursor: "pointer"}}></i>         
              </div>
          }

        </div>

      </div>
    );
  }
  
  export default Navbar;