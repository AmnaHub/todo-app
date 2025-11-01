import React,{useState} from 'react'
import { FaTrash, FaCheck , FaEdit, FaSave, FaTimes} from "react-icons/fa";

const TodoList = ({ todos, deleteTodo, toggleComplete,editTodo, saveTodo, cancelEdit }) => {
    const [editText, setEditText] = useState("");

    const handleEditClick = (index, currentText) => {
    setEditText(currentText);
    editTodo(index);
  };

  const handleSaveClick = (index) => {
    saveTodo(index, editText);
    setEditText("");
  };

  const handleCancelClick = (index) => {
    cancelEdit(index);
    setEditText("");
  };

  return (
    <div className="todo-list">
      {todos.map((todo, index) => (
        <div
          key={index}
          className={`todo-item d-flex justify-content-between align-items-center p-3 mb-2 rounded ${
            todo.completed ? 'bg-light completed' : 'bg-white'
          } border`}
        >

           {/* Task Content */}
          <div className="flex-grow-1">
            {todo.isEditing ? (
              <div className="d-flex align-items-center">
                <input
                  type="text"
                  className="form-control me-2"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  autoFocus
                />
                <button
                  className="btn btn-success btn-sm me-1"
                  onClick={() => handleSaveClick(index)}
                  disabled={editText.trim() === ""}
                >
                  <FaSave />
                </button>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => handleCancelClick(index)}
                >
                  <FaTimes />
                </button>
              </div>
            ) : (
              <span
                className={`todo-text ${todo.completed ? 'completed' : ''}`}
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                  color: todo.completed ? "#6c757d" : "inherit",
                  cursor: 'pointer'
                }}
                onClick={() => toggleComplete(index)}
              >
                {todo.text}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          {!todo.isEditing && (
            <div className="btn-group">
              <button
                className="btn btn-outline-success btn-sm"
                onClick={() => toggleComplete(index)}
                title={todo.completed ? "Mark as incomplete" : "Mark as complete"}
              >
                <FaCheck />
              </button>
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={() => handleEditClick(index, todo.text)}
                title="Edit task"
              >
                <FaEdit />
              </button>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => deleteTodo(index)}
                title="Delete task"
              >
                <FaTrash />
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TodoList;
