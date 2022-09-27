import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import ListTodo from "./ListTodo";
import SearchTodo from "./SearchTodo";
function Todo() {
  const [todos, setTodos] = useState([]);
  const [editItem, seteditItem] = useState(); //lay item can chinh sua
  const [searchRes, setsearchRes] = useState(null);
  useEffect(() => {
    let todoList = JSON.parse(localStorage.getItem("todo"));
    if (todoList !== null) {
      setTodos(todoList);
    }
  }, []);
  //Them todo
  const addTodo = (todo) => {
    if (todo.title && todo.time) {
      if (todo.status === "") {
        todo.status = "ToDo";
      }
      setTodos([todo, ...todos]);
      localStorage.setItem("todo", JSON.stringify([todo, ...todos]));
    }
  };

  //Xoa todo
  const removeTodo = (id) => {
    const newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
    localStorage.setItem("todo", JSON.stringify([...newTodos]));
  };

  //lay item can update và setstate
  const updateTodo = (id) => {
    let res = todos.find((item) => item.id === id);
    seteditItem(res);
  };

  //update item luu local storage và set item can update = null;
  const handleUpdate = (data) => {
    let updateArr = [...todos];
    //khai báo một mảng tạm = todos, thay đổi phần tử trong mảng và set lại todo;
    updateArr.forEach((item) => {
      if (item.id === data.id) {
        item.title = data.title;
        item.time = data.time;
        item.status = data.status;
      }
    });
    setTodos(updateArr);
    localStorage.setItem("todo", JSON.stringify(todos));
    seteditItem(null);
  };

  //Search Item
  const itemSearch = (data) => {
    let searchResult = [...todos];
    //search by title
    if (data.title) {
      searchResult = searchResult.filter((item) =>
        item.title.toLowerCase().includes(data.title.toLowerCase())
      );
    }
    //search by time
    if (data.timeStart && data.timeEnd) {
      searchResult = searchResult.filter(
        (item) =>
          new Date(item.time).getTime() > new Date(data.timeStart).getTime() &&
          new Date(item.time).getTime() < new Date(data.timeEnd).getTime()
      );
    } else if (data.timeStart || data.timeEnd) {
      if (data.timeStart) {
        searchResult = searchResult.filter(
          (item) =>
            new Date(item.time).getTime() > new Date(data.timeStart).getTime()
        );
      } else {
        searchResult = searchResult.filter(
          (item) =>
            new Date(item.time).getTime() < new Date(data.timeEnd).getTime()
        );
      }
    }

    //filter by status
    if (data.status) {
      searchResult = searchResult.filter((item) => item.status === data.status);
    }

    setsearchRes(searchResult);
  };
  //bỏ không search nữa
  const handleCancel = (data) => {
    if (data) {
      setsearchRes(null);
    }
  };
  return (
    <div className="max-w-4xl mx-auto mt-7 border border-black rounded-2xl p-4 bg-slate-400">
      <h3 className="text-2xl text-center mb-5 font-bold text-white">
        Simple Todo App
      </h3>
      <TodoForm onSubmit={addTodo} edit={editItem} onUpdate={handleUpdate} />
      <br />
      <SearchTodo
        todo={todos}
        searchItem={itemSearch}
        handleCancel={handleCancel}
      />
      <br />
      <ListTodo
        todos={todos}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
        searchRes={searchRes}
      />
      <br />
    </div>
  );
}

export default Todo;
