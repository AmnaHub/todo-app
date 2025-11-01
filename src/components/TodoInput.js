import React, { useState } from 'react'

function TodoInput({addTask, darkMode}) {
    const [task, setTask]= useState("");

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(task.trim()==="")return;
        addTask(task);
        setTask("");
    };

  return (
   <form onSubmit={handleSubmit} className="mb-4">
<div className="input-group">
  <input type="text" 
  className={`form-control ${darkMode ? 'bg-dark text-white border-secondary' : ''}`}
  placeholder="Enter a new task...."
  value={task} 
onChange={(e) =>setTask(e.target.value)}/>

  <button className="btn btn-primary" 
  type="submit"
  disabled={task.trim()=== ""}>
    Add Task 
    </button>
    </div>
   </form>
  );
}
export default TodoInput;