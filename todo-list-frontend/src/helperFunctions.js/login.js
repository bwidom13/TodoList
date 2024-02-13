export default function login(){
    if(window.localStorage.getItem("token") === null){                    
        window.location.assign(process.env.REACT_APP_AUTH_SERVER_BASE_URL+`/oauth2/authorize?response_type=code&client_id=todo-app-client&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}/getAccessTokenPage&scope=getTodos+updateTodos+deleteTodos+addTodos`);
    }else{
        window.location.assign("/TodoList");
    }
}