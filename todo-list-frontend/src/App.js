import './App.css';
import TodoList from './components/TodoList';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar';
import Registration from './pages/Registration';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import GetAccessTokenPage from './pages/GetAccessTokenPage';

function App() {
  return (
    <div className='' style={{height:"95vh"}}>      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route index element={window.localStorage.getItem("loggedIn")==="true"?<TodoList /> : <Home/>}/>            
            <Route path="Register" element={<Registration />} />
            <Route path="TodoList" element={<TodoList />} />            
            <Route path="getAccessTokenPage" element={<GetAccessTokenPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
