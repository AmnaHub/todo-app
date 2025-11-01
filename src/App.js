import React, { useState, useEffect } from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  const [todos, setTodos] = useState( JSON.parse(localStorage.getItem("todos")) || []
  );
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])

  const addTodo = (task) => {
    if (task.trim() === "") return;
    setTodos([...todos, { text: task, completed: false, isEditing: false }]);
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const toggleComplete = (index) => {
     const updated = todos.map((todo, i) => 
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updated);
  };

  // Enable Editing
  const editTodo = (index) => {
      const updated = todos.map((todo, i) => 
      i === index ? { ...todo, isEditing: true } : { ...todo, isEditing: false }
    );
    setTodos(updated);
  };

 // Save Edited Task
  const saveTodo = (index, newText) => {
    if (newText.trim() === "") return;
    const updated = todos.map((todo, i) => 
      i === index ? { ...todo, text: newText, isEditing: false } : todo
    );
    setTodos(updated);
  };

    const cancelEdit = (index) => {
    const updated = todos.map((todo, i) => 
      i === index ? { ...todo, isEditing: false } : todo
    );
    setTodos(updated);
  };


  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow">
              <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                <h1 className="h4 mb-0">To-Do List</h1>
                <button
                  className="btn btn-light btn-sm"
                  onClick={() => setDarkMode(!darkMode)}
                >
                  {darkMode ? "☀️ Light" : "🌙 Dark"}
                </button>
              </div>
              <div className="card-body">
                <TodoInput addTask={addTodo} darkMode={darkMode} />
                <TodoList 
                  todos={todos} 
                  deleteTodo={deleteTodo}
                  toggleComplete={toggleComplete}
                  editTodo={editTodo}
                  saveTodo={saveTodo}
                  cancelEdit={cancelEdit}
                />
                {todos.length === 0 && (
                  <div className="text-center text-muted py-4">
                    <p>No tasks yet. Add one above!</p>
                  </div>
                )}
              </div>
              <div className="card-footer text-muted text-center">
                {todos.filter(todo => todo.completed).length} of {todos.length} tasks completed
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default App;
