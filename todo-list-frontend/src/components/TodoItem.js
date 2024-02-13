import React, { useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import EditTodo from '../pages/EditTodo';
import axios from 'axios';

export default function TodoItem({ item, updateFunction }) {
  const [showEditTodo, setShowEditTodo] = useState(false);
  const [editTodoInfo, setEditTodoInfo] = useState({}); 

  const headers = {    
    Authorization : `Bearer ${window.localStorage.getItem("token")}`
  };

  function editTodo(){
    setEditTodoInfo({
      id:item.id,
      oldContent:item.content,
      oldDueDate:item.dueDate,
      completed:item.completed
    }      
    );
    setShowEditTodo(true);
  }

  function deleteTodo(id){
    axios.delete(`${process.env.REACT_APP_BACKEND_BASE_URL}/data-api/todos/${id}`,{ headers })
    .then(() => { 
      updateFunction();
      window.location = window.location.href; 
    });
  }

  return (
    <div>
      {showEditTodo && <EditTodo closeFunction={() => {
        setShowEditTodo(false);                
      }} updateTodos = {() => updateFunction()} todoInfo = { editTodoInfo } />} 
      <div className="border border-primary m-3" key={item.id}>
        {!(item.completed) && <div className="h3">
          <input title="Mark As Complete" className="" type="checkbox" style={{ height: "20px", width: "20px" }}
             /> {item.content}
        </div>
        }
        {item.completed && <div className="h3">
          <input title="Mark As Complete" className="" type="checkbox" style={{ height: "20px", width: "20px" }}
             checked /> <span className='text-decoration-line-through text-danger fst-italic'>
            {item.content}
          </span>
        </div>
        }

        <div className="h6 mx-2 text-end">
          <i>Due Date: {item.dueDate}</i>
        </div>

        <div className="d-flex flex-row">
          <div className="d-flex flex-row bg-primary col-md-2 mx-2 justify-content-center opacity-75 rounded" title="Edit" style={{ height: "25px", fontSize: "16px", cursor: "pointer" }}
            onClick = {() => editTodo(item.id)}
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
    </div>
  )
}

