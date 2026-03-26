import './App.css';
import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link, NavLink} from "react-router-dom";
import Today from './Component/Today';
import Pending from './Component/Pending';
import Completed from './Component/Completed';
import Navbar from './Component/Navbar';
import Footer from './Component/Footer';
import { useState, useRef, useEffect } from 'react'; 



function App() {
//
  const [pages, setPages] = useState(() => {    
    const saved = localStorage.getItem("pages");   
     return saved ? JSON.parse(saved) : [      
      {        
      id: 1,        
      name: "Page 1",          // button label
      title: "Today's Task",   // editable title
      todoList: [],        
      }    
    ];  
  });



  const [currentPage, setCurrentPage] = useState(() => {
  const saved = localStorage.getItem("currentPage");
  if (saved) return JSON.parse(saved);

  const savedPages = localStorage.getItem("pages");
  if (savedPages) {
    const parsed = JSON.parse(savedPages);
    return parsed[0]?.id;
  }

  return 1;
});



useEffect(() => {    
  localStorage.setItem("pages", JSON.stringify(pages));  
}, [pages]);


useEffect(() => {
  setSearchQuery("");
}, [currentPage]);

const [completedTasks, setCompletedTasks] = useState(() => {
  const saved = localStorage.getItem("completedTasks");
  return saved ? JSON.parse(saved) : [];
});

useEffect(() => {
  localStorage.setItem(
    "completedTasks",
    JSON.stringify(completedTasks)
  );
}, [completedTasks]);


 const currentPageData =
  pages.find(p => p.id === currentPage) || pages[0];

//
 
  const [todoList, setTodoList] = useState(()=> {
    const saved = localStorage.getItem("todoList");
    return saved ? JSON.parse(saved) : [
       {id: 1, name: "Page 1",todoList: [], }
    ];
  });

  
  
 
 

  // const [pendingList, setPendingList] = useState(() =>{
  //   const saved = localStorage.getItem("pendingList");
  //   return saved ? JSON.parse(saved) : []; 
  // });

//  useEffect(() => {    
//   localStorage.setItem("pendingList", JSON.stringify(pendingList));  
// }, [pendingList]);

  //

   const [currentTask, setCurrentTask] = useState("");

  const [errorMsg, setErrorMsg] = useState(false);
  const inputTask = useRef(null);

  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const [editId2, setEditId2] = useState(null);
  const [editText2, setEditText2] = useState("");

//new now
 
 
 
 const [searchQuery, setSearchQuery] = useState("");


  const addTask = ()=> {
    if (!currentTask.trim() ) {
  setErrorMsg(true);
  return;}

   const newTask = {   
       id: Date.now(),   
           task: currentTask.trim(),    
              status: "inactive" ,
            active: false    };   // 
  setPages(
    pages.map((page)=>
    page.id === currentPage
    ? {
    ...page,
      
     todoList: [...page.todoList, newTask]
     
     }
    :page
    )
  );
  inputTask.current.value = "";
  

    setCurrentTask("");
    setErrorMsg(false);
  }

 
  //  const addNewPage = ()=> {
  //    const newPageId = Date.now();
  // const pageNumber = pages.length + 1;

  // const newPage = {
  //   id: newPageId,
  //   //name: `Page ${pageNumber}`,   // stays fixed
  //   name: "Page",
  //   title: "Enter Your Title", // editable header
  //   todoList: []
  // };
  //      setPages([...pages, newPage]);
  //   setCurrentPage(newPageId);
  //     setCurrentTask("");     //serves as inputValue
  //     setSearchQuery("");
  //   };

const addNewPage = () => {
  const newPage = {
    id: crypto.randomUUID(),   // better than Date.now()
    title: "Enter Your Title",
    todoList: []
  };

  setPages(prev => [...prev, newPage]);
  setCurrentPage(newPage.id);
};
 
 

 const filteredTasks = currentPageData?.todoList.filter((todoList)=>
    todoList.task.toLowerCase().includes(searchQuery.toLowerCase())
);

 
// const deletePage = (id)=> {
//   if (pages.length === 1){
//     alert("You cannot delete the last remaining page");
//     return;
//   }
//   const confirmed = window.confirm(
//     `Are you sure you want to delete ${pages.find(p => p.id === id)?.name}?`
//   );
//   if (!confirmed) return;

//   setPages((prevPages) =>{
//      const filtered = prevPages.filter((page) => page.id !== id);

//     // 🔥 Renumber remaining pages
//     const renumbered = filtered.map((page, index) => ({
//       ...page,
//       name: `Page ${index + 1}`
//     }));
//       if (currentPage === id) {
//       setCurrentPage(renumbered[0]?.id);
//     }
//     return renumbered;
//   });
// };

const deletePage = (id) => {

  // 🚫 Prevent deleting the last remaining page
  if (pages.length === 1) {
    alert("You cannot delete the last remaining page.");
    return;
  }

  // ❓ Ask for confirmation
  const confirmDelete = window.confirm("Do you want to delete this page?");

  if (!confirmDelete) return;

  // 🗑 Remove page
  const updatedPages = pages.filter(page => page.id !== id);

  setPages(updatedPages);

  // 🔄 If the deleted page was the current one,
  // switch to the first available page
  if (currentPage === id) {
    setCurrentPage(updatedPages[0].id);
  }
};
 
 
 

  function highlightMatch(text, query) {    
    if (!query) return text;    
    const regex = new RegExp(`(${query})`, "gi");    
    const parts = text.split(regex);    
    return (      
    <span>        
      {parts.map((part, index) =>           
      part.toLowerCase() === query.toLowerCase() ? (            
      <mark key={index} className='bg-yellow-300'>              
      {part}            
      </mark>          
      ) : (            
      <span key={index}>{part}</span>          
    )        
  )}      
  </span>    
  );  
}

//const [completedTasks, setCompletedTasks] = useState([]);

//   const moveToCompleted = (tasks) => {
//   setCompletedTasks(prev => [...prev, ...tasks]);

//   setPages(prevPages =>
//     prevPages.map(page => ({
//       ...page,
//       todoList: page.todoList.filter(
//         task => !tasks.some(t => t.id === task.id)
//       )
//     }))
//   );
// };

const moveToCompleted = (tasks) => {
  const completedAt = Date.now();

  // 1️⃣ Update pages (THIS is what removes it from Pending)
  setPages(prevPages =>
    prevPages.map(page => ({
      ...page,
      todoList: page.todoList.map(task =>
        tasks.some(t => t.id === task.id)
          ? {
              ...task,
              status: "completed",
              active: false,       // 👈 removes from pending
              completedAt
            }
          : task
      )
    }))
  );

  // 2️⃣ Add to completedTasks array (for Completed component rendering)
  const tasksWithMeta = tasks.map(task => ({
    ...task,
    status: "completed",
    pageTitle: currentPageData.title,
    completedAt
  }));

  setCompletedTasks(prev => [...prev, ...tasksWithMeta]);
};






  return(
    <div className="min-h-screen flex flex-col bg-slate-100">
      
      <div className="min-h-screen flex flex-col">
      <BrowserRouter>
       <Navbar
       setCurrentTask={setCurrentTask}
       
       currentTask={currentTask}
       inputTask={inputTask}
       errorMsg={errorMsg}
       setErrorMsg={setErrorMsg}
       addTask={addTask}
       currentPageName={currentPageData?.title}
       
       />

      

        <Routes>
        <Route path='/' element={<Today
        highlightMatch={highlightMatch}
          // todoList={currentPageData?.todoList || []} // Pass the current todo list      
       deletePage={deletePage}
        
       
        editId={editId}
        setEditId={setEditId}
        editText={editText}
        setEditText={setEditText}
        currentPage={currentPage}
       setCurrentPage={setCurrentPage}
       pages={pages}
       setPages={setPages}
       editId2={editId2}
       setEditId2={setEditId2}
       editText2={editText2}
       setEditText2={setEditText2}
      
       currentPageData={currentPageData}
       addNewPage={addNewPage}
       filteredTasks={filteredTasks}
       searchQuery={searchQuery}
       setSearchQuery={setSearchQuery}
       
        />}  />

        <Route path='/Pending' element={<Pending
        
        
        pages={pages}
        setPages={setPages}
        currentPageData={currentPageData}
        moveToCompleted={moveToCompleted}
        
        
        />} />
        <Route path='/Completed' element={<Completed
        
        
        
        setCompletedTasks={setCompletedTasks}
        pages={pages}
        setPages={setPages}
        />}  />
      </Routes>

      <Footer
      
      />

      </BrowserRouter>
          </div>

    </div>
  )
}
export default App