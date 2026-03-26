import React from 'react';
import { FaTrashAlt, FaCheck } from "react-icons/fa";





const ExpandablePageCard = ({page,isExpanded,onToggle,onDeleteTask,getTimeAgo,toggleTask,
selectedTasks,toggleAllTasks,handleDone, removingTaskId, handleDoneSelected
}) => {
  
  
  
    const tasks = (page.todoList || []).filter(task => task.active !== false);
    const selectedCount = tasks.filter(task => selectedTasks[task.id]).length;


    

  return (
    <div className="bg-gray-100 p-3 rounded-xl shadow-sm ">

      {/* Header */}
      <div className="bg-slate-300 px-5 rounded-xl shadow-md flex justify-between items-center gap-4 
      py-2 hover:bg-slate-400 hover:shadow-md transition-all duration-100 w-90 md:w-full">

        {/* Title + Counter */}
        <label className="flex items-center cursor-pointer"> 
          <input 
          type='checkbox'
          checked={page.todoList.every(task => selectedTasks[task.id])}
          onChange={()=> toggleAllTasks(page)}
          className="hidden " /> 

          <div className={`w-6 h-6 border rounded-sm flex items-centerjustify-center
            ${page.todoList.every(task => selectedTasks[task.id])
              ?"bg-green-500 border-green-500"
              :"border-gray-400 bg-white"
            }`}>

              {page.todoList.every(task => selectedTasks[task.id]) &&(
                <svg
                className='w-9 h-6 text-white'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='3'
                strokeLinecap='round'
                strokeLinejoin='round'
                >
                  <polyline points='20 6 9 17 4 12' /> 
                </svg>
              )}
            </div>
          </label>

        <div className="bg-white px-5 py-3 rounded-xl shadow-md grid mr-70
          grid-cols-[auto_2fr_auto]  items-center gap-2 ">
         
          <h2 className="text-lg font-semibold truncate min-w-0 text-slate-800">
            {page.title || page.name}
          </h2>

          {/* Task Counter Badge */}
          <span className="bg-emerald-700 text-white text-xs px-3 py-1 rounded-full">
            {tasks.length}
          </span>
        </div>
        
        {/* {selectedCount > 1 && (           //appears and dissapears
         <button
         onClick={() => handleDoneSelected(page)}
          className="absolute rounded-lg px-1 py-1 text-white ml-74
           bg-blue-800">Done All </button>)} */}
        

        {/* Toggle Button */}
        <button
          onClick={onToggle}
          className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition 
          md:mx-0 -ml-40"
        >
          {/* Plus */}
          <svg
            className={`w-5 h-5 ${isExpanded ? "hidden" : "block"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M12 4v16m8-8H4" />
          </svg>

          {/* Minus */}
          <svg
            className={`w-5 h-5 ${isExpanded ? "block" : "hidden"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M4 12h16" />
          </svg>
        </button>
      </div>

      {/* Animated Task List */}
      <div className="mt- space-y-3 overflow-hidden w-90 md:w-full ">
        {isExpanded && tasks.length > 0 ? (
          tasks.map((task, index) => (
            <div
              key={task.id}
              className={`bg-gray-200 p-4 rounded-lg shadow-sm md:grid items-center gap-4
                md:grid-cols-[auto_1fr_150px_100px_auto] flex items-center justify-between
              ${isExpanded
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-4"}`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <label className="flex items-center cursor-pointer">
              <input 
              type='checkbox'
              checked={!!selectedTasks[task.id]}
              onChange={()=> toggleTask(page.id, task.id)}
              className="hidden" /> 

              <div className={`w-6 h-6 border rounded-sm flex items-centerjustify-center
            ${!!selectedTasks[task.id]
              ?"bg-green-500 border-green-500"
              :"border-gray-400 bg-white"
            }`}>

              {!!selectedTasks[task.id] &&(
                <svg
                className='w-9 h-6 text-white'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='3'
                strokeLinecap='round'
                strokeLinejoin='round'
                >
                  <polyline points='20 6 9 17 4 12' /> 
                </svg>
              )}
            </div>
          </label>

              <h3 className="text-sm text-slate-600 font-medium ">{task.task}</h3>

                <span className="text-sm text-gray-500 px-0  bg-white rounded-lg py-1 
                whitespace-nowrap text-center">
                 {getTimeAgo(task.activatedAt)}
                </span>
                
                {selectedTasks[task.id]?(
                  <button 
                  onClick={() => handleDone(task, page.id)}
                  className='bg-blue-700 text-white rounded-lg '>
                    Done!
                  </button>
                ) : (
                <button className=' flex items-center gap-1  rounded-lg  border-2 px-1 cursor-none
                border-solid border-green-400 bg-white text-green-900 box-border 
                pointer-events-none  ' 
                disabled> <span>Activated</span> <FaCheck /></button>
                )}


              <button
                onClick={() => onDeleteTask(page.id, task.id)}
                className="text-red-500 hover:text-red-700 md:mx-0 "
              >
                <FaTrashAlt />
              </button>
            </div>
          ))
        ) : (
          isExpanded && (
            <div className={`bg-gray-200 p-4 rounded-lg shadow-md text-gray-500 text-center
                  transform transition-all duration-500 ease-out
                  ${isExpanded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}
                `}>
              No tasks yet.
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ExpandablePageCard;