import  { React,useState,useEffect } from 'react';
import '../App.css';
import { FaPen, FaTrashAlt, FaCheck, FaSearch } from 'react-icons/fa';
//import { Input } from 'postcss';

const Today = ({editId,setEditId,searchQuery,setSearchQuery,filteredTasks,
  editText,setEditText,pages,setPages,currentPage, setCurrentPage,editId2,setEditId2,deletePage,
   editText2, setEditText2,currentPageData,addNewPage, highlightMatch}) => {

  //

const todoList = currentPageData?.todoList || []; 


    const handleEditClick2 = (title) =>{
  setEditId2(title.id);
  setEditText2(title.title);
 };


 const handleSave2 = ()=> {
  if (!editText2.trim()) return;

    setPages(
    pages.map((page) =>
      page.id === currentPage
        ? { ...page, title: editText2.trim() }
        : page
    )
  );

    
    setEditId2(null);
    setEditText2("");
  };
   
 //
    // const addNewPage = ()=> {
    //   const newPage = { 
    //           id: pages.length + 1,
    //           name: `Page ${pages.length + 1}`,
    //           tasks:[],
    //   };
    //   setPages([...pages, newPage]);
    //   setCurrentPage(newPage.id);
    // };
    

// const updatePageContent = (id, newContent) => {
//   setPages(
//     pages.map((page)=>
//     page.id === id ? {...page, content: newContent} : page
//     )
//   )
// };

//    //

 const handleEditClick = (task) =>{
  setEditId(task.id);
  setEditText(task.task);
 };

 const handleSave = ()=> {
  if (!editText.trim()) return;

 setPages(      
  pages.map(page =>        
    page.id === currentPage         
     ? {              
      ...page,              
      todoList: page.todoList.map(task =>               
         task.id === editId                 
          ? {...task, task: editText.trim()}                  
          : task             
         )            
        }          
        : page      
      )    
    );
  
  
  setEditId(null);
  setEditText("");
  // setPendingList(updatedList);
 };


 
//  const handleCancel = ()=> {
//   setEditId(null);
//   setEditText("");
//  };



 const deleteTask = (id) => {
    const confirmDelete = window.confirm("Do you want to delete this task?");

   if (confirmDelete) {

   setPages( 
           pages.map(page =>
           page.id === currentPage            
           ? {                
            ...page,                
            todoList: page.todoList.filter(task => task.id !== id)              
          }            
          : page        
        )      
      );    
    }  
  };


 const activateTask = (task) => {
  setPages(
    pages.map(page =>
      page.id === currentPage
        ? {
            ...page,
            todoList: page.todoList.map(t =>
              t.id === task.id ? { ...t, active: true, activatedAt: Date.now() } : t
            )
          }
        : page
    )
  );
};

const searchTask = (task) => {
  
const element = document.getElementById(`section-${task.id}`);

if (element) {
  element.scrollIntoView({
    behavior: 'auto',
    block:'start'
  })
}


  setSearchQuery('');
}

const [isMobile, setIsMobile] =useState(window.innerWidth <768);

useEffect(() => {
  const handleResize = ()=> setIsMobile(window.innerWidth < 768);
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);


  
  return (
    <div>
      
      <div className='relative container'>
  
      <div className=' below mt-25 mx-5 md:mx-28 md:mt-12 py-5 max-h-96 overflow-y-auto
       md:border-emerald-500 rounded-r-lg md:border-1-4 md:border rounded-lg shadow'>

         <div className='search absolute -top-32 md:-top-37 right-0
            z-50'>
            <div className='relative  '>

              <span className='absolute left-1 top-1/3 -translate-y-1/2 text-gray-400'>
                <FaSearch className='cursor-pointer text-gray-500' />
              </span>
                <input type='text'
                value={searchQuery}
                onChange={(e) =>setSearchQuery(e.target.value)}
                placeholder='search tasks ...'
                className=' w-full !pl-5 pr-5 py-2 border-2 border-gray-300 rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-blue-400 text-center'
                />

                {searchQuery && (
                  <button
                  onClick={()=> setSearchQuery("")}
                  className='absolute right-4 top-1/3 -translate-y-1/2 text-gray-400 
                  hover:text-gray-600'
                  > X </button>
                )}
            </div>

          
                  
                  {searchQuery && (
                    <p className='text-sm text-white mb-16 bg-zinc-400 px-1 rounded-sm -mt-30 
                    absolute '>
                      Found {filteredTasks?.length || 0} result(s) for "{searchQuery}"
                    </p>
                  )}


                  {searchQuery &&(
                <div className='border-2 border-gray-300 rounded-lg right-10 left-0 absolute query
                p-4 max-h-60 overflow-y-auto bg-gray-50  mr-1 mx-auto max-w-5xl w-100 md:w-150'>
                  {filteredTasks?.length === 0 ?(
                    <p  className='text-center text-gray-500 '>
                      No tasks matching "{searchQuery}"
                    </p>
                  ):(
                    <ol className='space-y-3 font-md md:w-full '>
                      {filteredTasks?.map((task) =>(
                        <li key={task.id} 
                         onClick={()=> searchTask(task)}
                        className='flex justify-between items-center p-3 border-emerald-500
                        border-1-4 rounded border hover:shadow-md transition-shadow '>



                          {editId === task.id ? 
            ( <span className='m-0 h-12'> 
            <input type="text" value={editText} onChange={(e)=>
              setEditText(e.target.value)} onKeyDown={(e)=>{
                if (e.key === "Enter") handleSave();}} 
                className='border px-2  rounded w-1/2 ' autoFocus /></span>
            ) :(
                            <span className='flex-1 text-sm md:text-xl'>
                             {highlightMatch(task.task, searchQuery)}
                            </span>
                      )}


                            <div className='flex gap-2 ml-4'>
                              
                              


                <span className='task-date md:py-2 md:px-6 bg-white rounded-lg text-center text-sm
               px-2 py-1 md:text-xl -mr-2 mt-2'>
                {new Date(task.id).toLocaleDateString()}                        
                </span>

                             <div className="mx-5 mt-2 -mr-1 ">

  {task.status === "completed" ? (
      <div className=''>
    <button
      className="flex items-center gap-1 rounded-lg px-2 border-2
      border-blue-400 bg-white text-blue-700 cursor-default"
      disabled
    >
      <span>Completed</span>
      <span className='hidden! lg:inline-block!'>
      {!isMobile && <FaCheck />} </span>
    </button>
    </div>
  ) : task.active ? (
      <div>
    <button
      className="flex items-center gap-1 rounded-lg px-2 border-2
      border-green-400 bg-white text-green-900 cursor-default"
      disabled
    >
      <span>Activated</span>
      <FaCheck />
    </button>
      </div>
  ) : (
      <div>
    <button
      onClick={() => activateTask(task)}
      className="bg-white text-red-600 border-2 border-red-800
      rounded-lg px-2 cursor-pointer hover:bg-red-50"
    >
      Inactive
    </button>
      </div>
  )}

</div>

                  <div className='hidden! md:block!'>
              {editId === task.id ? (
              <>
              <button onClick={handleSave} className='bg-blue-400 text-white px-3 flex-1
               rounded-lg'>Save</button>
              </>
              ) : (
                    <>
                              <button onClick={()=> handleEditClick(task)} 
                              className='text-blue-500 hover:text-blue-700 p-2'
                              title="Edit task"
                                >
                                  <FaPen />
                              </button>

                              <button onClick={()=> deleteTask(task.id)} 
                              className='text-red-500 hover:text-red-700 p-2'
                              title="Delete task"
                                >
                                   <FaTrashAlt />
                              </button>
                              </>
                              )}
                              </div>
                            </div>
                        </li>
                      ))}
                    </ol>
                  
                  )}
                </div>
                )}
            </div>
  
      <div className='absolute title  -mt-16 md:-mt-44 md:-ml-25 flex items-center justify-center'>

        <div className="flex items-center gap-2">
  {editId2 === currentPage ? (
    <>
      <input
        type="text"
        value={editText2}
        onChange={(e) => setEditText2(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSave2();
        }}
        className="border px-2 rounded "
        autoFocus
      />
      <button
        onClick={handleSave2}
        className="rounded-lg bg-black text-white px-2 mb-8 save1"
      >
        Save
      </button>
    </>
  ) : (
    <>
      <h1 className="md:border-2 md:border-blue-400 rounded-lg w-50 md:w-84 px-2 py-2">
        {currentPageData?.title}
      </h1>

      <button
        onClick={() => {
          setEditId2(currentPage);
          setEditText2(currentPageData?.title);
        }}
        className="rounded-md bg-zinc-700 text-white px-2"
      >
        Edit
      </button>
    </>
  )}
</div>
        
  </div> 


 <div className='below2 px-4 md:px-32  md:hidden'>
      <div className='head2 text-slate-500 font-bold md:uppercase tracking-wider md:text-xs flex 
      justify-between gap-4 md:flex-none'>
        {/* <h2 className=''>No.</h2> */}
        <h2 className='md:mr-48'>Tasks</h2>
        <h2 className='md:ml-15'>Status</h2>
        <h2 className='md:ml-26'>Actions</h2>
        </div>
        <hr className='md:w-150 mx-auto' />
    </div>
  
        
        <ol className='tasktop md:px-12 grid grid-cols-1 md:block
         '>
          {/* {if you want to add another auto no. put: task, index} only */}
          
          {todoList.length > 0 ? (
          todoList.map((task)=>(
            <li key={task.id}
            id={`section-${task.id}`}
            className='bg-slate-200 rounded-lg hover:bg-slate-100 transition-colors border-b
            border-slate-100 '
            >
                <div className='li-con  '>

            {/* <span>{index + 1}</span> */}

            {editId === task.id ? 
            ( <span className='-ml-25 md:m-0 h-12  absolute md:relative intask'> 
            <input type="text" value={editText} onChange={(e)=>
              setEditText(e.target.value)} 
              onKeyDown={(e)=>{
                if (e.key === "Enter") handleSave();}} 
                className='border px-2  rounded md:w-1/2 md:-ml-12' autoFocus /></span>
            ) : (
              <span className='task-text flex-[0_0_150px] md:flex-[0_0_300px] font-medium
              bg-white text-justify rounded-lg p-2 text-sm md:text-lg text-emerald-700 
              md:-ml-12 -ml-23'>  {task.task} </span>
            )}

            <div className='w-full ml-4 md:ml-32'>
              <span className='task-date py-1 px-1 md:px-6 bg-white rounded-lg text-center 
              text-sm text-slate-400'>
                {new Date(task.id).toLocaleDateString()}                        
                </span>                      
                </div>


            <div className='btntask flex  justify-center -ml-3 '>
            {task.status === "completed" ? (

  <div className=' mx-5'>
    <button
      className='cbtn flex items-center gap-1 rounded-lg px-2 border-2 
      border-blue-400 bg-white text-blue-700'
      disabled
    >
      <span>Completed</span>
      <div className='check'>
      <FaCheck  />
        </div>                          
    </button>
  </div>

) : task.active ? (

  <div className='mx-5'>
    <button
      className='flex items-center gap-1 rounded-lg px-2 border-2 
      border-green-400 bg-white text-green-900'
      disabled
    >
      <span>Activated</span>
     <div className='check'>
      <FaCheck  />
        </div>
    </button>
  </div>

) : (

  <div className=' mx-5'>
    <button
      onClick={() => activateTask(task)}
      className='bg-white text-red-600 border-2 border-red-800 
      rounded-lg px-2'
    >
      Inactive
    </button>
  </div>

)}

             {editId === task.id ? (
              <>
              <button onClick={handleSave} className='saveb bg-blue-400 text-white px-3 flex-1
               rounded-lg'>Save</button>
              </>
             
              
             ) : (
              <>
               <button className='md: flex-1 -ml-3 md:mr-5' 
               onClick={()=> handleEditClick(task)} ><FaPen /></button>

              <button className='deltask flex-1' 
              onClick={()=>deleteTask(task.id)}><FaTrashAlt /></button>
              </>
             )}

             
             </div>

               </div>
            </li>
              
          
        ))
      ): (
        <p className='text-center text-gray-500 py-4'>no tasks yet</p>
        )} 
          </ol>       

           
      </div> 



        <div className='flex py-8 ml-3 items-center space-x-4'>
         
            <div className='mt-2 space-x-3'>
                {pages.map((page, index) =>(
                  <button
                  key={page.id}
                  onClick={()=> setCurrentPage(page.id)}
                  onContextMenu={(e)=> {
                    e.preventDefault();
                    deletePage(page.id);
                  }}
                  className={`text-xs font-semibold px-3 py-2 rounded-full
                     ${currentPage === page.id
                    ? "bg-blue-600 text-white"
                    :"bg-gray-200 text-gray-700"
                   } hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 
                   focus:ring-blue-400 transition-colors duration-300`}>


                   <span className="flex items-center gap-2">
                     <span> page <span></span> {index + 1}</span>

                     {page.todoList.length > 0 && (
                    <span className="bg-green-500 text-white text-xs font-semibold px-2 py-0.5 
                    rounded-full">
                       {page.todoList.length}</span>
                       )}
                     </span>
                    
                     </button>
                ))}
            </div>


              <div className='w-45'>
          <button onClick={addNewPage} className='px-1 mx-3 py- mt-2 text-blue-600
           bg-white border-2 border-blue-600 rounded-lg shadow-md hover:bg-blue-100 
           focus:outline-none focus:ring-2 focus:ring-blue400 focus:ring-offset-2
            transition-colors duration-300'
           >
           + New Page</button>
                </div>

          <div>
        </div>
        
  </div>


 
       

       
        </div>

    </div>
  );
};

export default Today;