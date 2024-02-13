import React, { useEffect } from 'react';
import login from '../helperFunctions.js/login';

export default function Home() {

  return (
    <div className='w-100 h-100 d-flex flex-column align-items-center' style={{ backgroundColor:"#BBBBBB"}}>
      <div style={{fontSize:"64px"}} className='titleFont'>
        Todo List
      </div>
      <div className='d-flex flex-column center w-50 h-50 border border-dark mt-4' style={{fontSize:"24px"}}>
        <div>
          Click <a href='/Register'><span className='badge bg-primary'>Here</span></a> To Register
        </div>
        <div className='text-center mt-3'>
          Already Have An Account? Click <span className='badge bg-primary'
          onClick={login}
          style={{cursor:"pointer"}}>Here</span> To Login.
        </div>

      </div>
      
    </div>
  )
}
