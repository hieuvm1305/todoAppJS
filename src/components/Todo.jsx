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
    if (todo.title !== "") {
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
  //Hiện còn phần search Todo, phần đổi màu
  //Search Item
  const itemSearch = (data) => {
    let searchResult;
    if (
      data.title !== "" &&
      data.timeStart === "" &&
      data.timeEnd === "" &&
      data.status === ""
    ) {
      searchResult = todos.filter((item) =>
        item.title.toLowerCase().includes(data.title.toLowerCase())
      );
    } else if (
      data.title === "" &&
      data.timeStart !== "" &&
      data.timeEnd !== "" &&
      data.status === ""
    ) {
      let deadlineStart = new Date(data.timeStart);
      let deadlineEnd = new Date(data.timeEnd);
      searchResult = todos.filter((item) => {
        return (
          new Date(item.time) >= deadlineStart &&
          new Date(item.time) <= deadlineEnd
        );
      });
    } else if (
      data.title === "" &&
      data.timeStart === "" &&
      data.timeEnd === "" &&
      data.status !== ""
    ) {
      searchResult = todos.filter((item) => item.status === data.status);
    } else {
      let deadlineStart = new Date(data.timeStart);
      let deadlineEnd = new Date(data.timeEnd);
      searchResult = todos.filter((item) => {
        return (
          item.title.toLowerCase().includes(data.title.toLowerCase()) &&
          new Date(item.time) > deadlineStart &&
          new Date(item.time) < deadlineEnd &&
          item.status === data.status
        );
      });
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
    <div className="max-w-4xl mx-auto mt-7 border border-black rounded">
      <h3 className="text-2xl text-center mb-5 font-bold">Simple Todo App</h3>
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
