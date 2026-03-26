import React, { useState, useEffect,useRef,useMemo, useCallback } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import ExpandablePageCard from "./ExpandablePageCard";
import { useFetchers } from 'react-router-dom';
import ConfirmModal from './ConfirmModal';


const Pending = ({pages,setPages,currentPageData, completedTasks, moveToCompleted}) => {
  

  const [selectedTasks, setSelectedTasks]= useState({});

  const selectedCount = Object.values(selectedTasks).filter(Boolean).length;

  const toggleTask = (pageId, taskId) =>{
    setSelectedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const toggleAllTasks=(page) => {
    const allSelected = page.todoList.every(task=> selectedTasks[task.id]);

    const updatedSelections = {...selectedTasks};
    page.todoList.forEach(task => {
      updatedSelections[task.id] = !allSelected;
    });
    setSelectedTasks(updatedSelections);
  };

    // just now const [isExpanded, setIsExpanded] = useState(false);
      //const childCards = currentPageData?.todoList?.filter(task => !task.active) || [];

const pendingPages = useMemo(()=> {
  return pages

  .map(page => ({
    ...page,
    todoList: page.todoList.filter(task => task.active === true)
  }))
  .filter(page => page.todoList.length > 0);
}, [pages]);
  //

const [expandedPages, setExpandedPages] = useState([]);

  // Toggle single page
  const togglePage = (pageId) => {
    setExpandedPages(prev =>
      prev.includes(pageId)
        ? prev.filter(id => id !== pageId)
        : [...prev, pageId]
    );
  };

  // Expand all
  const expandAll = () => {
    setExpandedPages(pages.map(page => page.id));
  };

  // Collapse all
  const collapseAll = () => {
    setExpandedPages([]);
  };

  const handleDelete = useCallback(() => {

    const hasSelectedTasks = Object.values(selectedTasks).some(Boolean);
    
    if (!hasSelectedTasks) return;

    const confirmDelete = window.confirm(
      "Do you want to deactivate selected item(s)?"
    );
    if (!confirmDelete) return;

     setPages(prevPages =>
            prevPages.map(page => ({
                ...page,
                todoList: page.todoList.map(task =>
                    selectedTasks[task.id]
                        ? { ...task, active: false, activatedAt: null }
                        : task
                )
            }))
        );

    setSelectedTasks({});
          
  }, [selectedTasks, setPages])

  const deleteTask =(pageId, taskId)=> {
        const confirmDelete = window.confirm("Do you want to deactivate this task?");
       
        if (!confirmDelete) return;

       // Update pendingList to remove the task
        setPages(prevPages =>
    prevPages.map(page =>
      page.id === pageId
        ? {
            ...page,
            todoList: page.todoList.map(task =>
              task.id === taskId
                ? { ...task, active: false, activatedAt: null }
                : task
            )
          }
        : page
    )
  );
};


  //


 const [now, setNow] = useState(Date.now());

 useEffect(()=>{
    const interval = setInterval(() => {
       setNow(Date.now()); 
    }, 1000);
    return ()=> clearInterval(interval);
 }, []);

 const getTimeAgo = (activatedAt) => {
    if (!activatedAt) return "";
    const seconds = Math.floor((now - activatedAt) / 1000);

  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  if (seconds < 2592000) return `${Math.floor(seconds / 604800)}w ago`;

    return `${Math.floor(seconds/ 2592000)}mo ago`;

    };
   

const [titleSearch, setTitleSearch] = useState("");
const [filteredTitles, setFilteredTitles] = useState([]);

useEffect(()=> {
  if (!titleSearch.trim()) {
    setFilteredTitles([]);
    return
  }
  const matches = pendingPages.filter(page =>
    page.title.toLowerCase().includes(titleSearch.toLowerCase())
  );

  setFilteredTitles(matches);

}, [titleSearch, pendingPages]);


const pageRefs = useRef({});
//       localStorage.setItem("pendingList", JSON.stringify(pendingList));
//     }, [pendingList]);

const handleTitleClick = (page) => {

  if (!expandedPages.includes(page.id)){
    setExpandedPages(prev => [...prev, page.id]);
  }


pageRefs.current[page.id]?.scrollIntoView({
  behavior:"smooth",
  block: "start"
});

setTitleSearch("");
setFilteredTitles([]);

}

const deleteRef = useRef(handleDelete);
useEffect (()=> {
  deleteRef.current = handleDelete;
}, [handleDelete]);

useEffect(()=> {
    const handleKeyDown = (e) => {
      if (e.key === "Delete" && document.activeElement.tagName !== "INPUT")  {
        
          deleteRef.current();
        
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return ()=> 
      window.removeEventListener("keydown",handleKeyDown);
    
  },[]);

  const [removingTaskId, setRemovingTaskId] = useState([]);
  
//   const handleDone = (task) => {
//   setRemovingTaskId([task.id]);

//   setTimeout(() => {
//     moveToCompleted([task]);
//   }, 300);
// };

const handleDone = (task) => {
  setActiveTask({ ...task}); // Store the task to be processed
  setIsModalOpen(true); // Open the sexy prompt
};

// 3. Create the actual confirmation function
// const confirmDone = () => {
//   if (!activeTask) return;

//   setRemovingTaskId([activeTask.id]);

//   setTimeout(() => {

//     // 🔹 Update the task inside pages
//     setPages(prev =>
//   prev.map(page =>
//     page.id === activeTask.pageId   // 👈 IMPORTANT
//       ? {
//           ...page,
//           todoList: page.todoList.map(task =>
//             task.id === activeTask.id
//               ? { ...task, status: "completed", active: false }
//               : task
//           )
//         }
//       : page
//   )
// );

//     // 🔹 Optional (if you still use this)
//     moveToCompleted([activeTask]);

//     setIsModalOpen(false);
//     setActiveTask(null);

//   }, 300);
// };

const confirmDone = () => {
  if (!activeTask) return;

  setPages(prev =>
    prev.map(page => ({
      ...page,
      todoList: page.todoList.map(task =>
        task.id === activeTask.id
          ? { ...task, status: "completed", active: false }
          : task
      )
    }))
  );

  setRemovingTaskId([activeTask.id]);

  setTimeout(() => {
    moveToCompleted([activeTask]); 
    setIsModalOpen(false);
    setActiveTask(null);
  }, 300);
};


const handleDoneAllSelectedPagesTasks = () => {
  const selectedTaskIds = Object.keys(selectedTasks)
    .filter(id => selectedTasks[id]);

  if (selectedTaskIds.length === 0) return;

  setActiveTask2('bulk');
  setIsModalOpen(true);

}

  const confirmBulkDone = () => {

  const selectedTaskIds = Object.keys(selectedTasks)
    .filter(id => selectedTasks[id]);

  const tasksToMove = pages
    .flatMap(page => page.todoList)
    .filter(task => selectedTasks[task.id]);

  setRemovingTaskId(selectedTaskIds.map(id => Number(id)));

  setTimeout(() => {

  setPages(prev =>
    prev.map(page => ({
      ...page,
      todoList: page.todoList.map(task =>
        selectedTasks[task.id]
          ? { ...task, status: "completed", active: false }
          : task
      )
    }))
  );

  setSelectedTasks({});
  setRemovingTaskId([]);
  setIsModalOpen(false);

}, 300);
  }

//   setTimeout(() => {
//     moveToCompleted(tasksToMove);
//     setSelectedTasks({});
//     setRemovingTaskId([]);
//     setIsModalOpen(false);
//   }, 300);
// };


const [isModalOpen, setIsModalOpen] = useState(false);
const [activeTask, setActiveTask] = useState(null);
const [activeTask2, setActiveTask2] = useState(null);




  return (
    <div className='min-h-screen ' >

      <div className='relative container'>
      <div className=' below topp '> 

    <aside className='hidden lg:block fixed inset-y-0 left-0 text-white p-4 
     overflow-y-auto bg-transparent z-[100] pointer-event-auto'>

      <div className='h-58 mt-50 rounded-lg  space-x-4 text-slate-500 
      text-s tracking-wider justify-center items-center font-semibold backdrop-blur-md
      bg-white/5 border border-white/10 shadow-lg hover:bg-white/60 transition-all duration-300
      px-3 py-2 hover:border-white group'
      ><h2 className='text-center '>Special Buttons</h2>
      

  <div className='flex flex-col gap-3 mt-3 items-center '>      
      
      <div className='space-y-3 flex flex-col gap-1 items-center'>
     <button
            onClick={expandAll}
            className="px-3 py-1  bg-green-500 text-white rounded-lg hover:bg-green-600
             transition-all"
          >
            Expand All
          </button> 

          <button
            onClick={collapseAll}
            className="px-2 py-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
          >
            Collapse All
          </button>
        </div>

    <div className={`flex gap-3 transition-all duration-500 ease-in-out ml-
    ${
      // Object.values(selectedTasks).some(Boolean)
      selectedCount > 1
        ? "opacity-100 translate-y-0"
        : "opacity-0 -translate-y-2 pointer-events-none"

    }`}>
      
        <h3>Delete all:</h3>
        <button 
        onClick={handleDelete}
        className="px-3 py-2 bg-red-500 text-white rounded-lg cursor-pointer 
        hover:bg-red-600 active:scale-95 transition-transform"
        >
         <FaTrashAlt size={14} />
        </button>
        
      </div>

           <div className={`flex gap-3 transition-all duration-500 ease-in-out mt-1.5 -ml-1 mb-3
               ${
               selectedCount > 1 
                 ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-2 pointer-events-none"

               }`}>
                    Finished all: ({selectedCount})
                  <button 
                  onClick={handleDoneAllSelectedPagesTasks}
                  className='bg-blue-700 text-white rounded-lg px-2 py-1-ml- cursor-pointer
                  hover:bg-blue-800 activ:scale-95 transition-transform '>
                    Done!
                  </button>
              </div>

      </div>

      </div>
    </aside>

      <div className=" -top-42 md:-top-25 right-0   z-50 absolute">
        <input type='text'
        value={titleSearch}
        onChange={(e)=> setTitleSearch(e.target.value)} 
        placeholder="search titles..."
        className="w-full px-4 py-2 border rounded-lg focus:outline-none bg-slate-50
         border-slate-200 focus:ring-2 focus:ring-blue-400 placeholder:text-slate-400
         focus:bg-white" /> 
      

      {filteredTitles.length > 0 && (
        <div className="bg-white border rounded-lg mt-2 shadow mr-30">
          {filteredTitles.map(page => (
            <div
            key={page.id}
            onClick={()=> handleTitleClick(page)}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {page.title}
            </div>
          ))}
        </div>
      )}
</div>

        {/*  */}


    <div className='flex flex-col items-center justify-center md:mb-12 pend '>

            <div className="py-2 bg-gray-100 flex p-2 md:w-full 
            md:max-w-3xl md:h-auto m-4 ">
      
     

      <div className="flex gap-2 lg:ml-125 doneall ">

         <div className={` lg:hidden flex flex-col-1 gap-2 transition-all duration-500
          ease-in-out 
          
               ${
               selectedCount > 1 
                 ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-2 pointer-events-none"

               }`}>
                    <span className="-ml-7 "> ({selectedCount})</span>
                  <button 
                  onClick={handleDoneAllSelectedPagesTasks}
                  className='bg-blue-700 text-white rounded-lg px-2 py-0 cursor-pointer
                  hover:bg-blue-800 activ:scale-95 transition-transform '>
                    Done!
                  </button>
              </div>

           {/* {Object.values(selectedTasks).some(Boolean) && ( */}
           {selectedCount > 1 && (
        <button 
        onClick={handleDelete}
        // onKeyDown={(e)=>{
        //         if (e.key === "Delete") {deleteAllSelected();}}}
        //         autoFocus
        className="px-3 py-2 bg-red-500 text-white rounded-lg"
        
        >
         <FaTrashAlt size={14} />
        </button>
      )}

          <button
            onClick={expandAll}
            className="px-2 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            Expand All
          </button>

          <button
            onClick={collapseAll}
            className="px-3 py-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
          >
            Collapse All
          </button>
        </div>

      </div>

      {/* Pages */}
      <div className="  justify-center items-center bg-white border-slate-100 rounded-2xl 
      shadow-sm hover:shadow-md transition-shadow group pending">
         {pendingPages.map(page => (
          <div className="space-y-6 w-full md:max-w-2xl h-auto mt-4 w-15"
          key={page.id}
          ref={el => (pageRefs.current[page.id] = el)}>
        <ExpandablePageCard
          
            page={page}
            isExpanded={expandedPages.includes(page.id)}
            onToggle={() => togglePage(page.id)}
            onDeleteTask={deleteTask}
            getTimeAgo={getTimeAgo}
            selectedTasks={selectedTasks}
            toggleTask={toggleTask}
            toggleAllTasks={toggleAllTasks}
             handleDone={handleDone}
             removingTaskId={removingTaskId}
            // handleDoneSelected={handleDoneSelected}
            
          />
        
      </div>
      ))}
      </div>
</div>

  <>
    {/* Your existing JSX */}
    <ConfirmModal 
      isOpen={isModalOpen} 
      onConfirm={activeTask2 === 'bulk' ? confirmBulkDone : confirmDone}
      title={activeTask2 === 'bulk' ? "Complete all Selected?" : "Complete Task?" } 
      message={activeTask2 === 'bulk'
        ? "Are you sure you want to mark all selected tasks as done?"
        : `Are you sure you want to move "${activeTask?.title || "this task"}" to completed?`
      }
      onCancel={() => setIsModalOpen(false)} 
      // taskName={activeTask?.title || "this task"}
    />
  </>


    </div>
    </div>
    </div>
  );
};

export default Pending;