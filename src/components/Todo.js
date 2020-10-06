import React from "react";

const Todo = ({ text, id, completed, onComplete, onDelete }) => {
  return (
    <div className="todo">
      <li className={`todo-item ${completed ? "completed" : ""}`}>{text}</li>
      <button className="complete-btn" onClick={() => onComplete(id)}>
        <i className="fas fa-check" />
      </button>
      <button className="trash-btn" onClick={() => onDelete(id)}>
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
};

export default Todo;
