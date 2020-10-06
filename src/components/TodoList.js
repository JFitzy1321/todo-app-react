import React from "react";
import Todo from "./Todo";

const TodoList = ({ todos, onComplete, onDelete }) => {
  return (
    <div className="todo-container">
      <ul className="todo-list">
        {todos
          .filter((item) => item.shouldRender)
          .map((item, i) => (
            <Todo
              key={i}
              onComplete={onComplete}
              onDelete={onDelete}
              {...item}
            />
          ))}
      </ul>
    </div>
  );
};

export default TodoList;
