import axios from 'axios';
import React, { useState } from 'react'
import SuccessfulRegister from '../components/messages/SuccessfulRegister';

export default function Registration() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [showSuccessRegister, setShowSuccessRegister] = useState(false);
    const [showErrorRegister, setShowErrorRegister] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    function register() {
            if(username.length < 7 || password.length < 7){
                setErrorMessage("Username and password must be over 6 characters");
                setShowErrorRegister(true);
            }else{
                axios.post(process.env.REACT_APP_BACKEND_BASE_URL + "/user/register", {
                    "username": username,
                    "password": password
                }).then((res) => {
                    if (res.status === 200) {
                        setShowSuccessRegister(true);
                    } else {
                        console.log(res.data);
                    }
                }).catch((err)=>{
                    setErrorMessage("Username already taken, pleast choose another.")
                    setShowErrorRegister(true);
                })
            }
    }

    return (
        <>
            <div className='w-100 h-100 center d-flex' style={{backgroundColor:"#BBBBBB"}}>
                {showSuccessRegister &&
                    <SuccessfulRegister setShowSuccessRegister={setShowSuccessRegister} />}
                <div className="d-flex flex-row center start-50 top-50 translate-middle position-absolute w-75">
                    <div className="d-flex flex-column align-items-center border col-md-8 text-center w-100" style={{ height: "300px", borderRadius: "5%" }}>
                        <h1 className="text-dark mt-2">Create New Account</h1>
                        <div className="d-flex flex-row justify-content-center align-items-center mt-4">
                            <span className="text-dark me-3">
                                <label className="h3" htmlFor="username">Username:</label>
                            </span>
                            <div className="bg-primary">
                                <input className="" id="username" type='text' onChange={(e) => setUsername(e.target.value)} required />
                            </div>
                        </div>
                        <div className="d-flex flex-row justify-content-center align-items-center mt-4">
                            <span className="text-dark me-3">
                                <label className="h3" htmlFor="password">Password:</label>
                            </span>
                            <div className="bg-primary">
                                <input className="" id="password" type='password' onChange={(e) => setPassword(e.target.value)} />
                            </div>
                        </div>
                        <div className="d-flex flex-row justify-content-center align-items-center mt-4">
                            <input type="submit" value="Register" onClick={register} />
                        </div>
                        {showErrorRegister && <div className="fst-italic mt-3" style={{color:"#EE0000"}}>
                            {errorMessage}
                        </div>}
                    </div>
                </div>
            </div>
        </>
    )
}
