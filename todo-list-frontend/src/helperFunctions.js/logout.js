import axios from "axios";

export default function logout() {
    window.location.assign(process.env.REACT_APP_AUTH_SERVER_BASE_URL+"/logout")
        axios.post(process.env.REACT_APP_AUTH_SERVER_BASE_URL+"/oauth2/revoke",{
            "token":window.localStorage.getItem("token")
        },{
            headers:{
                Authorization:`Basic ${process.env.REACT_APP_AUTHORIZATION}`
            }
        })
        window.localStorage.removeItem("token");
        window.localStorage.setItem("loggedIn", false);
}