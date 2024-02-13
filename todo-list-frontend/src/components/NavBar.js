import React, { useEffect, useState } from 'react'
import Home from '../pages/Home'
import { Link, Outlet } from 'react-router-dom'
import Registration from '../pages/Registration'
import TodoList from './TodoList'
import login from '../helperFunctions.js/login'
import logout from '../helperFunctions.js/logout'
import { FaSearch } from 'react-icons/fa'
import SearchTodos from '../pages/SearchTodos'
import axios from 'axios'

export default function NavBar() {
    const [username, setUsername] = useState("");
    const [showAccountOptions, setShowAccountOptions] = useState(false);
    
    const [showCancelPane, setShowCancelPane] = useState(false);

    const headers = {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`
    };

    function getUsername() {
        if (window.localStorage.getItem("token") !== null) {
            axios.get(process.env.REACT_APP_BACKEND_BASE_URL+"/user/username", { headers }).then((res) => {
                setUsername(res.data);
            })
        }
    }
    function derenderAccountOptions() {
        setShowAccountOptions(false);
        setShowCancelPane(false);
      }

    useEffect(() => {
        getUsername();
    }, [])

    return (
        <div className='h-100' style={{ height: "100%" }}>
            {showCancelPane && 
                <div className="position-absolute start-50 top-50 translate-middle z-2" style={{height:"1000px", width:"1500px"}} onClick={derenderAccountOptions}>                
            </div>}
            <div id="page" className={"h-100"} >
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">                    
                            {window.localStorage.getItem("loggedIn") === "true" &&
                            <div className='btn ms-auto btn-secondary' onClick={() => { 
                                setShowAccountOptions(true); 
                                setShowCancelPane(true);
                                }}>{username}</div>}
                            {showAccountOptions && <div id="logout"className='text-center border border-dark rounded z-3' style={{ width: "100px",height:"", position:"fixed", top:'50px', right:"5px" }}
                            onClick={logout}
                            >
                                Logout                                
                            </div>}                        
                    </div>
                </nav>
                <Outlet />
            </div>
        </div>
    )
}
