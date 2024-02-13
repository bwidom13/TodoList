import React from 'react';
import login from '../../helperFunctions.js/login';

export default function SuccessfulRegister({ setShowSuccessRegister }) {
    return (
        <div className='d-flex flex-column align-items-center bg-success z-1 rounded shadow' style={{ position: "absolute", width: "40%", height: "35%" }}>
            <div className='d-flex w-100 justify-content-end'>
                <button type="button" className="btn-close" aria-label="Close" onClick={() =>{
                    setShowSuccessRegister(false);
                }}></button>
            </div>
            <div className='mt-4 fst-italic text-center' style={{fontSize:"24px", color:"white"}}>
                Account successfully created.
            </div>
            <div className='mt-4 fst-italic text-center' style={{fontSize:"24px", color:"white"}}>
                Click the link below to login.
            </div>
            <div className='btn btn-primary mt-4' onClick={login}>Sign in</div>            
        </div>
    )
}
