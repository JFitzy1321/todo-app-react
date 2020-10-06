import React, { createRef } from "react";

const Form = ({ onSubmit, onChangeFilter }) => {
  const inputRef = createRef();

  const buttonClickHandler = (e) => {
    e.preventDefault();
    onSubmit({
      text: inputRef.current.value,
      completed: false,
      id: Math.random() * 100,
      shouldRender: true,
    });
    inputRef.current.value = "";
  };

  const onSelectChangeHandler = (e) => {
    onChangeFilter(e.target.value);
  };

  return (
    <form>
      <input ref={inputRef} type="text" className="todo-list" />
      <button
        className="todo-button"
        type="submit"
        onClick={buttonClickHandler}
      >
        <i className="fas fa-plus-square"></i>
      </button>
      <div className="select">
        <select
          onChange={onSelectChangeHandler}
          name="todos"
          className="filter-todo"
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
        </select>
      </div>
    </form>
  );
};

export default Form;
