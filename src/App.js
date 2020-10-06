import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import Form from "./components/Form";
import TodoList from "./components/TodoList";

function useLocalStorageState(key, initialValue) {
  const [storedValue, setStoreValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valuetoStore =
        value instanceof Function ? value(storedValue) : value;
      setStoreValue(valuetoStore);
      localStorage.setItem(key, JSON.stringify(valuetoStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

function App() {
  const [todos, setTodos] = useLocalStorageState("todos", []);
  const [filter, setFilter] = useState("all");

  const filterTodos = useCallback(
    (todos) => {
      if (todos === null || todos === undefined)
        throw new TypeError("Todos must be an Array or Object");
      const isArray = todos instanceof Array;
      let newTodos;

      switch (filter) {
        case "completed":
          if (isArray) {
            newTodos = [...todos].map((item) => {
              item.shouldRender = item.completed;
              return item;
            });
          } else {
            newTodos = { ...todos };
            newTodos.shouldRender = newTodos.completed;
          }
          break;
        case "uncompleted":
          if (isArray) {
            newTodos = [...todos].map((item) => {
              item.shouldRender = !item.completed;
              return item;
            });
          } else {
            newTodos = { ...todos };
            newTodos.shouldRender = !newTodos.completed;
          }
          break;
        default:
        case "all":
          if (isArray) {
            newTodos = [...todos].map((item) => {
              item.shouldRender = true;
              return item;
            });
          } else {
            newTodos = { ...todos };
            newTodos.shouldRender = true;
          }
          break;
      }
      return newTodos;
    },
    [filter]
  );

  useEffect(() => {
    setTodos((prevState) => filterTodos([...prevState]));
  }, [filter, filterTodos]);

  const onSubmitHandler = (newTodo) => {
    setTodos((prevState) => [...prevState, filterTodos(newTodo)]);
  };

  const onCompleteHandler = (id) => {
    setTodos((prevState) =>
      [...prevState].map((item) => {
        if (item.id === id) {
          item.completed = true;
          return filterTodos(item);
        }
        return item;
      })
    );
  };

  const onDeleteHandler = (id) => {
    setTodos((prevState) => [...prevState].filter((val) => val.id !== id));
  };

  const changeFilterHandler = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <div className="App">
      <header>
        <h1>Fitzy's Todo List</h1>
      </header>
      <Form onSubmit={onSubmitHandler} onChangeFilter={changeFilterHandler} />
      <TodoList
        todos={todos}
        onComplete={onCompleteHandler}
        onDelete={onDeleteHandler}
      />
    </div>
  );
}

export default App;
