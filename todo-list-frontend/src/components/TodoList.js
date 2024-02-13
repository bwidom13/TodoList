import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaEdit, FaPlusCircle } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import AddTodo from '../pages/AddTodo';
import EditTodo from '../pages/EditTodo';
import TodoItem from './TodoItem';
import SearchTodos from '../pages/SearchTodos';

export default function TodoList() {

  const [todos, setTodos] = useState([]);
  const [showAddTodo, setShowAddTodo] = useState(false);
  const [showEditTodo, setShowEditTodo] = useState(false);
  const [editTodoInfo, setEditTodoInfo] = useState({});
  const [render, setRender] = useState(false);

  const [showSearchPage, setShowSearchPage] = useState(false);
  const [backgroundOpacity, setBackgroundOpacity] = useState("100");
  const [inert, setInert] = useState(false);
  const [showCancelPane, setShowCancelPane] = useState(false);

  function renderSearchPage() {
    setBackgroundOpacity("50");
    setShowSearchPage(true);
    setInert("true");
    setShowCancelPane(true);
  }

  function derenderSearchPage() {
    setInert(false);
    setBackgroundOpacity("100");
    setShowSearchPage(false);
    setShowCancelPane(false);
  }

  const [getTodosInfo, setGetTodosInfo] = useState({
    sort: "dueDate",
    showCompleted: true
  });

  const headers = {
    Authorization: `Bearer ${window.localStorage.getItem("token")}`
  };


  function getTodos() {
    axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/todos?sort=${getTodosInfo.sort}&includeCompleted=${getTodosInfo.showCompleted}`, { headers })
      .then(res => {
        setTodos([...res.data]);
      }).catch((err)=>{
        if(err.response.status === 401){
          window.localStorage.setItem("loggedIn", false);
          window.localStorage.removeItem("token");
          window.location.assign("/");

        }
      })
  }

  useEffect(() => {
    getTodos();    
  }, [render]);

  function markAsComplete(id, completed) {
    
    let compl;
    if(completed === "complete"){
      axios.patch(`${process.env.REACT_APP_BACKEND_BASE_URL}/data-api/todos/${id}`,
      {
        completed: true
      }, { headers }).then(() => getTodos())
    }else{
      axios.patch(`${process.env.REACT_APP_BACKEND_BASE_URL}/data-api/todos/${id}`,
      {
        completed: false
      }, { headers }).then(() => getTodos())

    }

    
  //   axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/data-api/todos/${id}`, { headers }).then(
  //     (res) => {
  //       compl = res.data.completed
  //     }
  //   ).then(() => {
  //     axios.patch(`${process.env.REACT_APP_BACKEND_BASE_URL}/data-api/todos/${id}`,
  //       {
  //         completed: !compl
  //       }, { headers }).then(() => getTodos())
  //   });
  }

  function deleteTodo(id) {
    axios.delete(`${process.env.REACT_APP_BACKEND_BASE_URL}/data-api/todos/${id}`, { headers })
      .then(() => getTodos());
  }

  function editTodo(id, content, dueDate, completed) {
    setEditTodoInfo({
      id: id,
      oldContent: content,
      oldDueDate: dueDate,
      completed: completed
    })
    setShowEditTodo(true);
  }

  function sortByHandler(sort) {
    getTodosInfo.sort = sort;
    getTodos();
  }

  function showCompletedHandler(val) {
    getTodosInfo.showCompleted = !getTodosInfo.showCompleted
    getTodos();
  }

  return (
    <>
      {showSearchPage && <SearchTodos />}
      {showCancelPane && 
            <div className="position-absolute start-50 top-50 translate-middle z-2" style={{height:"1000px", width:"1500px"}} onClick={derenderSearchPage}>                
            </div>}
      {showAddTodo && <AddTodo closeFunction={() => {
        setShowAddTodo(false);
      }} updateTodos={() => getTodos()} />}
      {showEditTodo && <EditTodo closeFunction={() => {
        setShowEditTodo(false);
      }} updateTodos={() => getTodos()} todoInfo={editTodoInfo} />}
      <div className={"rounded border position-absolute start-50 top-50 translate-middle mt-2 opacity-" + backgroundOpacity} style={{ width: "80%", height: "500px", overflowY: "auto" }} inert={inert ? "inert" : undefined}>
        <div className="d-flex opacity-70 align-items-center text-white" style={{ height: "50px", backgroundColor: "#999999" }}>
          <div title="Add Todo" className="rounded bg-primary col-md-1 text-center ms-2" style={{ height: "30px", cursor: "pointer" }}
            onClick={() => setShowAddTodo(true)}
          >
            <FaPlusCircle />
          </div>
          <div style={{ width: "55%" }}>
            <form className="d-flex justify-content-center" role="search">
              <input className="form-control ms-3" type="search" placeholder="Search Todos" aria-label="Search" style={{ width: "70%" }} onFocus={renderSearchPage}/>
            </form>
          </div>
          <div className='d-flex mx-auto align-items-center justify-content-end' style={{ width: "30%" }}>
            <div className='text-center me-2' style={{width:"23%"}}>
              Show Completed:
            </div>
            <div className="d-flex form-switch center " style={{width:"4%"}}>
              <input className="form-check-input " type="checkbox" role="switch" id="flexSwitchCheckChecked" defaultChecked
                onChange={(e) => showCompletedHandler(e.target.checked)} />
            </div>
            <div className='text-center ms-4' style={{width:"20%"}}>
              Sort By:
            </div>
            <div className='ms-2'>
              <select className='form-select bg-primary rounded' aria-label='Sort' onChange={(e) => sortByHandler(e.target.value)}
                style={{ color: "white" }}>
                <option value="dueDate" defaultChecked>Due Date</option>
                <option value="dateCreated" >Date Created</option>
              </select>
            </div>
          </div>

        </div>
        {todos.length > 0 &&
          todos.map((item,i) => {
            let bg = i%2 === 1 ? "#BBBBBB" : "#EEEEEE";
            let d = new Date(item.dueDate);            
            let arr = d.toLocaleTimeString().split(":");
            let hourString = arr[0];
            let minuteString= ((d.getMinutes() < 10) ? "0" : "") + d.getMinutes();
            let hourNumber = Number.parseInt(hourString);
            let amOrPm;
            if(hourNumber > 12){
              hourNumber -=12;
              amOrPm = "PM";
            }else{
              amOrPm = "AM";
            }
            let date = d.toLocaleDateString() + " " + hourNumber + ":" + minuteString + " " + amOrPm;          
            
            return (
              <div className="rounded px-1" key={item.id} style={{backgroundColor:bg}}>
                {!(item.completed) && <div className="h3">
                  <input title="Mark As Complete" className="me-2" type="checkbox" style={{ height: "20px", width: "20px" }}
                    onChange={() => {                                            
                      markAsComplete(item.id, "complete");
                      }} /> 
                      <span>{item.content}</span>
                </div>
                }
                {item.completed && <div className="h3">
                  <input title="Mark As Complete" className="me-1" type="checkbox" style={{ height: "20px", width: "20px" }}
                    onChange={() => {                      
                      markAsComplete(item.id, "notComplete")}} checked /> <span className="text-decoration-line-through text-danger fst-italic">
                    {item.content}
                  </span>
                </div>
                }

                <div className="h6 mx-2 text-end">
                  {item.dueDate !== null && <i>Due Date: {date}</i>}
                </div>

                <div className="d-flex flex-row">
                  <div className="d-flex flex-row bg-primary col-md-2 mx-2 justify-content-center opacity-75 rounded" title="Edit" style={{ height: "25px", fontSize: "16px", cursor: "pointer" }}
                    onClick={() => editTodo(item.id, item.content, item.dueDate, item.completed)}
                  >
                    <FaEdit className="align-self-center" style={{ title: "Edit" }} />
                  </div>
                  <div className="d-flex flex-row bg-secondary col-md-2 mx-2 justify-content-center opacity-75 rounded" title="Delete" style={{ height: "25px", fontSize: "16px", cursor: "pointer" }}
                    onClick={() => deleteTodo(item.id)}>
                    <FaTrash className="align-self-center" />
                  </div>
                </div>
                <br />
              </div>
            )
          })
        }
        {todos.length === 0 &&
          <div className="m-4 h4">
            No Todos yet...
          </div>
        }
      </div>
    </>
  )
}
