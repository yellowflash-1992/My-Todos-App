import {React, useEffect, useState, useRef, useMemo} from 'react';
import '../App.css';
import { FaTrashAlt } from 'react-icons/fa';

const Completed = ({tasks = [], pages = [],setPages }) => {

   const completedPages = useMemo(() => {
  return pages
    .map(page => ({
      ...page,
      todoList: page.todoList.filter(task => task.status === "completed")
    }))
    .filter(page => page.todoList.length > 0);
}, [pages]);
//

  const [titleSearch, setTitleSearch] =useState('');


const [filteredTitles, setFilteredTitles] = useState([]);

  useEffect(()=> {
    if (!titleSearch.trim()) {
      setFilteredTitles([]);
      return
    }
    const matches = completedPages.filter(page =>
      page.title.toLowerCase().includes(titleSearch.toLowerCase())
    );
  
    setFilteredTitles(matches);
  
  }, [titleSearch, completedPages]);

//   const filteredTitles =pages.filter((page) =>
//   page.title.toLowerCase().includes(titleSearch.toLowerCase())
// );

//const pageRefs = useRef({});

const [selectedTitles, setSelectedTitles] = useState([]);

// const handleSelectTitle = (pageId) => {
//   setSelectedTitles(prev =>
//     prev.includes(pageId)
//       ? prev.filter(id => id !== pageId)   // uncheck
//       : [...prev, pageId]                  // check
//   );
// };

const handleSelectTitle = (id) => {
  setSelectedTitles(prev =>
    prev.includes(id)
      ? prev.filter(tid => tid !== id)
      : [...prev, id]
  );
};

//const handleDeleteAll = (pageId) => {
//   setSelectedTitles(prev =>
//     prev.includes(pageId)
//       ? prev.filter(id => id !== pageId)
//       : [...prev, pageId]
//   );
// };


//


const handleTitleClick = (page) => {
  
const element = document.getElementById(`section-${page.id}`);

if (element) {
  element.scrollIntoView({
    behavior: 'auto',
    block:'start'
  })
}


  setTitleSearch('');
}


// const handleDeleteSelected = () => {
//   const confirmDelete = window.confirm(
//     "Delete all selected titles and their tasks?"
//   );

//   if (!confirmDelete) return;

//   setPages(prev =>
//     prev.filter(page => !selectedTitles.includes(page.id))
//   );

//   setSelectedTitles([]); // clear selection after delete
// };



const handleSelectAll = () => {
  if (selectedTitles.length > 1) {
    setSelectedTitles([]); // unselect all
  } else {
    setSelectedTitles(completedPages.map(page => page.id));
  }
};

const handleDeleteSelected = () => {
  if (selectedTitles.length <=1) return;

  const confirmDelete = window.confirm(
    "Delete all selected titles and their tasks?"
  );

  if (!confirmDelete) return;

  setPages(prev =>
    prev.filter(page => !selectedTitles.includes(page.id))
  );

  setSelectedTitles([]);
};

const handleDeleteSingle = (pageId) => {
  const confirmDelete = window.confirm(
    "Delete this title and all its tasks?"
  );

  if (!confirmDelete) return;

  setPages(prev =>
    prev.filter(page => page.id !== pageId)
  );

  setSelectedTitles(prev =>
    prev.filter(id => id !== pageId)
  );
};

  return (
    <div >

        <div className='relative container '>

              <div className='below ' >

     <div className="absolute -top-32 md:-top-30 right-0   z-50 search ">
        <input type='text'
        value={titleSearch}
        onChange={(e)=> setTitleSearch(e.target.value)} 
        placeholder="search titles..."
        className="w-full px-4 py-2 border rounded-lg focus:outline-none placeholder:text-slate-400
        focus:ring-2 focus:ring-blue-400 border-slate-200 outline-none text-slate-700
        transition-all duration-700" /> 
      

      {filteredTitles.length > 0 && (
        <div className="bg-white border rounded-lg border-emerald-600 shadow mr- w-64">
          {filteredTitles.map(page => (
            <div
            key={page.id}
            onClick={()=> handleTitleClick(page)}
            className="px-2 py-2 hover:bg-gray-100 cursor-pointer  "
            >
              {page.title}
            </div>
          ))}
        </div>
      )}
</div>

<div className="grid grid-cols-[2fr_1fr] w-[60%] ml-40 items-center mt-5 taskstart ">
  <div className='flex gap-2'>
  <div
    onClick={handleSelectAll}
    className={`w-6 h-6 border-2 rounded flex flex-col cursor-pointer
      ${selectedTitles.length === completedPages.length && completedPages.length > 0
        ? "bg-green-600 border-green-600"
        : "bg-white border-gray-400"
      }`}
  >
    {selectedTitles.length === completedPages.length && completedPages.length > 0 && (
      <svg
        className="w-5 h-5 text-white"
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    )}
</div>
     <div className=''>
      <span className=''>Select All</span></div>
  </div>
 

<div className=' justify-self-end'>
  <button
  onClick={handleDeleteSelected}
  disabled={selectedTitles.length <= 1}
  className={`${selectedTitles.length > 1 ? `bg-red-600 text-white px-2 py-1 rounded` :
    `disabled:opacity-50 bg-red-600 text-white px-2 py-1 rounded`}`}
>
  Page Delete
</button>
</div>
</div>

  {/* <button
    onClick={handleDeleteSelected}
    disabled={selectedTitles.length === 0}
    className="bg-red-600 text-white px-4 py-2 rounded disabled:opacity-50"
  >
    Delete Selected
  </button> */}




          {completedPages.map(page => (
            <div key={page.id}
            id={`section-${page.id}`}
            className="flex flex-col gap-3 md:w-full md:max-w-4xl p-6 md:ml-30 w-96 comptask
             hover:shadow-md rounded-xl bg-teal-50/50 backdrop-blur-sm hover:bg-opacity-100 
             transition-all duration-200 border-teal-200 text-stone-800 border shadow-sm
              mb-10 mt-4">

              {/* MAIN CARD - Title */}
              <div className="grid grid-cols-[1.5fr_1fr_1fr_0.5fr] items-center w-full
                bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                
                          <div className="flex items-center gap-2">
             <div
  onClick={() => handleSelectTitle(page.id)}
  className={`w-6 h-6 border-2 rounded flex items-center justify-center cursor-pointer
    ${selectedTitles.includes(page.id) ? "bg-green-600 border-green-600" 
    : "bg-white border-gray-400"}`}
>
  {selectedTitles.includes(page.id) && (
    <svg
      className="w-4 h-4 text-white"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )}
</div>
              <span className="font-bold text-gray-800">
                {page.title}
              </span>
            </div>
                            <span className='text-gray-400 text-xs -mr-8 justify-self-end '>
                  <p>(Date Completed)</p></span>

                  <span className='text-gray-400 text-xs justify-self-end mr-10'><p>(status)</p></span>

                <span className="text-sm font-semibold text-red-600 text-right uppercase 
                flex justify-end">
                  <button 
                   onClick={() => handleDeleteSingle(page.id)}
                  className='hover:underline'>Delete all</button>
                </span>
              </div>

              {/* TASKS */}
              <div className="flex flex-col gap-2 w-4/5 ml-auto ">

                {page.todoList.map(task => (
                  <div
                    key={task.id}
                    className="grid grid-cols-[1.5fr_1fr_1fr_0.5fr] items-center 
                      bg-gray-50 border border-gray-100 w-full
                      rounded-md p-3 shadow-xs opacity-90"
                  >
                    <span className="text-sm font-medium text-gray-700">
                      {task.task}
                    </span>

                    <span className="text-sm text-gray-500 text- italic text-center">
                  {new Date().toLocaleDateString()}
              </span>

                    <span className="text-xs text-blue-500 text-center uppercase ">
                      Completed
                    </span>

                

                    {/* Delete Task Only */}
                    <div className='flex justify-end'>
                  <button
            onClick={() => {
              const confirmDelete = window.confirm("Delete permanently?");
              if (!confirmDelete) return;

              setPages(prev =>
                prev.map(p =>
                  p.id === page.id
                    ? {
                        ...p,
                        todoList: p.todoList.filter(t => t.id !== task.id)
                      }
                    : p
                )
              );
            }}
            className="text-red-500 hover:text-red-700 h-5 w-5"
          >
            <FaTrashAlt />
          </button>
          </div>
                  </div>
                ))}

              </div>
            </div>
          ))}  



  </div>

  {completedPages.length === 0 && (
        <p className="text-gray-400 text-sm text-center">
          No completed tasks yet.
        </p>
      )}
    </div>
</div>
      
  );
};

export default Completed;