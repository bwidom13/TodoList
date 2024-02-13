import React, { useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

export default function GetAccessTokenPage() {
    useEffect(() => {
        let url = window.location.toString();
        let code = url.split("code=")[1];

        axios.post(`${process.env.REACT_APP_AUTH_SERVER_BASE_URL}/oauth2/token`,
            {
                "grant_type":"authorization_code",
                "redirect_uri":`${process.env.REACT_APP_REDIRECT_URI}/getAccessTokenPage`,
                "code":`${code}`
            },
            {
                headers:{
                    "Content-Type":"application/x-www-form-urlencoded",
                    Authorization:`Basic ${process.env.REACT_APP_AUTHORIZATION}`
                }
            }
        ).then((res) => {           
            window.localStorage.setItem("token", res.data.access_token);
            window.localStorage.setItem("loggedIn", true);
            window.location.assign("/TodoList");
            
        }).catch((err) => {
            console.log(err);
        })
    })
    return (
        <>
            <div></div>            
        </>
    )
}
