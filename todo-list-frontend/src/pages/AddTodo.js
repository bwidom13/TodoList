import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function AddTodo(props) {
  const [todoContent, setTodoContent] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const headers = {    
    Authorization : `Bearer ${window.localStorage.getItem("token")}`
  };

  useEffect(() => {
    document.getElementById("content").focus();
  }, []);

  function postTodo(){
    axios.post(process.env.REACT_APP_BACKEND_BASE_URL+"/addTodo",
    {
     content: todoContent,
     dueDate: dueDate,
     completed: false
    },{
     headers:{
      Authorization : `Bearer ${window.localStorage.getItem("token")}`      
     }
    }).then(()=>{
     props.closeFunction();
     props.updateTodos();
    })
  }

  return (
    <div className="z-1 position-absolute start-50 top-50 translate-middle bg-secondary rounded" style={{height:"300px", width:"500px"}}>
      <div className="d-flex flex-row align-content-center rounded">
        <div className="h5 p-1 w-100 bg-primary rounded" style={{height:"30px"}}>
          <div className="d-flex flex-row justify-content-center">
            <div className="text-center flex-fill">
              Add Todo         
            </div>
            <div style={{cursor:"pointer"}} onClick={() => props.closeFunction()}>
                X
            </div> 
          </div>
        </div>
      </div>
      
      <div className="d-flex flex-row align-items-center justify-content-center" style={{height:"100px"}}>
        <div className="col-md-12" style={{height:"50px"}}>
          <div className="d-flex justify-content-center align-items-center">
            <label className="mx-3 text-warning h3" htmlFor='content'>Todo:</label>
            <textarea className="flex-fill me-3 bg-info opacity-50" id="content" style={{resize:"none"}}
            onChange={(e) => setTodoContent(e.target.value)}></textarea>
          </div>
        </div>   
      </div>

      <div className="d-flex flex-row align-items-center justify-content-center mt-3" style={{height:"70px"}}>
        <div className="col-md-9" style={{height:"50px"}}>
          <div className="d-flex justify-content-center align-items-center">
            <label className="me-3 text-warning h3" htmlFor='dueDate'>Due Date:</label>
            <input className="bg-info opacity-50" id="dueDate" type="datetime-local"
            onChange={(e) => setDueDate(e.target.value)}/>          
          </div>
        </div>   
      </div>

      <div className="d-flex flex-row align-items-center justify-content-center">
        <div className="btn btn-primary" onClick={postTodo}>Add Todo</div>

      </div>


    </div>
  )
}
