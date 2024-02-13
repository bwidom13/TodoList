import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function EditTodo(props) {
  const [todoContent, setTodoContent] = useState(props.todoInfo.oldContent);
  const [dueDate, setDueDate] = useState((props.todoInfo.oldDueDate));
  const headers = {    
    Authorization : `Bearer ${window.localStorage.getItem("token")}`
  };

  function putTodo(id){
     axios.put(`${process.env.REACT_APP_BACKEND_BASE_URL}/data-api/todos/${id}`,
     {
      content: todoContent,
      dueDate: dueDate,
      completed: props.todoInfo.completed
     },{ headers }).then(()=>{
      props.closeFunction();
      props.updateTodos();
     })
  }

  return (
    <div className="z-1 position-absolute start-50 top-50 translate-middle bg-secondary" style={{height:"300px", width:"500px"}}>
      <div className="d-flex flex-row-reverse align-content-center">
        <div className="h5 p-1 col-md-12 bg-primary" style={{height:"30px"}}>        
        <div className="d-flex flex-row justify-content-center">
            <div className="text-center flex-fill">
              Edit Todo         
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
            value={todoContent}
            onChange={(e) => setTodoContent(e.target.value)}></textarea>
          </div>
        </div>   
      </div>

      <div className="d-flex flex-row align-items-center justify-content-center mt-3" style={{height:"70px"}}>
        <div className="col-md-9" style={{height:"50px"}}>
          <div className="d-flex justify-content-center align-items-center">
            <label className="me-3 text-warning h3" htmlFor='dueDate'>Due Date:</label>
            <input className="bg-info opacity-50" id="dueDate" type="datetime-local"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}/>          
          </div>
        </div>   
      </div>

      <div className="d-flex flex-row align-items-center justify-content-center">
        <div className="btn btn-primary" onClick={() => putTodo(props.todoInfo.id)}>Edit Todo</div>

      </div>


    </div>
  )
}
