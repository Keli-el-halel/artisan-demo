import React, {useState} from "react";
import { fetchFromStorage, saveInStorage, showAlert, showToast } from "../utils";

function Login ({setShowThis}){

    // const [uname, setUname] = useState('');
    const [uemail, setUemail] = useState('');
    const [upass, setUpass] = useState('');

    function logIn(){
        console.log('uname', uemail);
        console.log('upass', upass);
        let users = fetchFromStorage('users');
        if (users) {
            users = JSON.parse(users);
            let userfound = users.find(user => user.email == uemail && user.password == upass);
            if (userfound) {
                showToast('Welcome back ' + userfound.username);
                saveInStorage('user', JSON.stringify(userfound));
                setShowThis('Dashboard');
            }
            else{
                showToast('Incorrect username or password');
            }
        }
        else{
            showToast('User does not exist');
        }
    }

    return (
        <div className="row m-auto mt-5">
            <div className="col-4 m-auto">
                <h4>Login To Artisan App</h4>
                {/* <input className="form-control my-3" value={uname} onChange={(e) => setUname(e.target.value)} placeholder="Username" type="text" /> */}
                <input className="form-control my-3" value={uemail} onChange={(e) => setUemail(e.target.value)} placeholder="Email" type="email" />
                <input className="form-control my-3" value={upass} onChange={(e) => setUpass(e.target.value)} placeholder="Password" type="password" />
                <div className="row w-100 m-auto">
                    <button className="btn btn-primary mx-auto w-25" onClick={() => logIn()} >Login</button>
                </div>
            </div>
        </div>
    )
}

export default Login;