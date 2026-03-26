import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../App.css';


const Navbar = ({setTodoList, todoList, currentTask, inputTask, setCurrentTask, 
  setErrorMsg, errorMsg, setCurrentPageId,addTask}) => {
 



// useEffect(() => {
//   localStorage.setItem("todoList", JSON.stringify(todoList));
// }, [todoList]);
  

//   const addTask = ()=> {
//     if (!currentTask.trim()) {
//   setErrorMsg(true);
//   return;
// }


  //   setTodoList([...todoList, {id: Date.now(), task:currentTask.trim(), active: false}]);
  //   inputTask.current.value = "";
  //   setCurrentTask("");
  //   setErrorMsg(false);
  // }
    
    

  return (
    <div className=''>
      <div className='flex flex-col w-full items-center'>
        <div className='Top w-full flex flex-col items-center bg-slate-900 rounded-3xl 
        border border-slate-800 shadow-2xl' >
           
      <h1 className='head1 text-center font-bold  bg-linear-to-r
      from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-5'>My Todo List</h1>
      
      <div className='input flex  '>
      <input type="text" name="task" id="task1" 
     
     placeholder={errorMsg ? "Please enter a task!" : 'Task...'} 
      className={`w-full px-5 py-4 bg-slate-800 rounded-2xl text-white placeholder:bg-slate-100
        outline-none ring-2 transition-all ${errorMsg ? 'ring-rose-500 animate-pulse input-error' 
          : 'ring-slate-700 focus:ring-emerald-500'}`}
      
      
      onChange={(event)=>{
        setCurrentTask(event.target.value); setErrorMsg(false); 
      }} ref={inputTask}

      onKeyDown={(event)=>{
        if (event.keyCode==13) {
            addTask();
        }
      }}
       />

      <button className='btn1 bg-emerald-500 rounded-lg 
      hover:bg-neutral-400 hover:text-black' style={{marginTop:"3px"}}
      onClick={addTask}
      type="button"
      >Add Task</button>

      
      </div>

      
      
      </div>


        <nav className='flex justify-center w-full  p-4 mb-20 '>
      <div className='pending flex w-full max-w-md overflow-hidden text-white font-semibold '>
        <NavLink to='/' className={({isActive})=> `flex-1 text-center px-2 rounded-[5px_0_0_5px]
        py-1 text-sm md:px-4 md:py-2 transition-colors hover:bg-green-600
         duration-200 bg-green-500 max-md:p-3
        md:text-base ${isActive ? "bg-green-800 text-emerald-50 font-bold": ""}`}
            // color:isActive ? "black" : "",
            //  backgroundColor:isActive ? "green" : ""
        >Today</NavLink>
        <NavLink  to='/Pending' className={({isActive})=> `flex-1 text-center px-2 py-1 
        text-sm md:px-4 md:py-2 transition-colors duration-200 hover:bg-green-600
         bg-green-500 max-md:p-3
        md:text-base ${isActive ? "bg-green-800 text-emerald-50 font-bold" :""}`}
            // color:isActive ? "black" : "",
            // backgroundColor:isActive ? "green" : ""
        >Pending</NavLink>
        <NavLink to='/Completed' className={({isActive})=>`flex-1 text-center rounded-[0_5px_5px_0] 
        px-2 py-1 text-sm transition-colors 
         duration-200 bg-green-500 max-md:p-3 hover:bg-green-600
        md:px-4 md:py-2 md:text-base ${isActive ? "bg-green-800 text-emerald-50 font-bold" :""}`}
            // color:isActive ? "black" : "",
            // backgroundColor:isActive ? "green" : ""
        >Completed</NavLink>
      </div>
      </nav>

    <div className='below px-4 md:px-32 hidden lg:block'>
      <div className='head2 text-slate-500 font-bold uppercase tracking-wider text-xs flex 
      justify-between gap-4 md:flex-none'>
        {/* <h2 className=''>No.</h2> */}
        <h2 className='md:mr-48'>Tasks</h2>
        <h2 className='md:ml-15'>Status</h2>
        <h2 className='md:ml-26'>Actions</h2>
        </div>
        <hr className='md:w-150 mx-auto' />
    </div>

{/* 
      {pages.map(page => (
        <button
        key={page.id} onClick={() => setCurrentPageId(page.id)}> {page.title} </button>
      ))} */}


     

</div>


    </div>
  );
};

export default Navbar;