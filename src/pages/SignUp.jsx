import React, {useState} from "react";
import { fetchFromStorage, saveInStorage, showToast } from "../utils";
import { v4 as uuidv4 } from 'uuid';

function SignUpPage (){

    const [uname, setUname] = useState('');
    const [uemail, setUemail] = useState('');
    const [upass, setUpass] = useState('');
    const [uType, setUtype] = useState('Customer');
    const [uJob, setUjob] = useState('');

    function signUp(){
        let users = fetchFromStorage('users');

        if (users) {
            users = JSON.parse(users);
            let duplicate = false;
            users.forEach(element => {
                if (element.email == uemail) {
                    duplicate = true;
                }
            });                
            if (duplicate) {
                showToast('Email already exists');
                return;            
            }
        }
        else{
            users = [];
        }

        users.push({
            id: uType == 'Customer' ? 'customer-' + uuidv4().substring(0,5) : 'artisan-' + uuidv4().substring(0,5),
            username: uname,
            email: uemail,
            password: upass,
            user_type: uType,
            job: uJob
        })
        saveInStorage('users', JSON.stringify(users));
        showToast('User Saved');
        setUname('');
        setUemail('');
        setUpass('');
        setUtype('Customer');
        setUjob('');
    }

    return (
        <div className="row m-auto mt-5">
            <div className="col-4 m-auto">
                <h4>Sign Up To Artisan App</h4>
                
                <input className="form-control my-3" value={uname} onChange={(e) => setUname(e.target.value)} placeholder="Username" type="text" />
                <input className="form-control my-3" value={uemail} onChange={(e) => setUemail(e.target.value)} placeholder="Email" type="email" />
                <input className="form-control my-3" value={upass} onChange={(e) => setUpass(e.target.value)} placeholder="Password" type="password" />
                
                <div className="btn-group btn-group-toggle mx-auto mb-3 d-flex justify-content-center" data-toggle="buttons">
                    <label className="btn btn-outline-primary">
                        <input type="radio" name="options" id="option1" onClick={() => setUtype('Customer')} readOnly checked={uType == 'Customer'}/> Customer
                    </label>
                    <label className="btn btn-outline-primary">
                        <input type="radio" name="options" id="option2" onClick={() => setUtype('Artisan')} readOnly checked={uType == 'Artisan'}/> Artisan
                    </label>
                </div>
                
                { uType == 'Artisan' && <input className="form-control my-3" value={uJob} onChange={(e) => setUjob(e.target.value)} placeholder="Job" type="text" />}

                <div className="row w-100 m-auto">
                    <button className="btn btn-primary mx-auto w-25" onClick={() => signUp()} >Sign Up</button>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage;