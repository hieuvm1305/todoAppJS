import React from "react";
import { useState, useRef, useEffect } from "react";

function TodoForm(props) {
  // const [input, setinput] = useState(props.edit ? props.edit : {});
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("");
  
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current?.focus();
  });
  useEffect(() => {
    if (props.edit) {
      setTitle(props.edit.title);
      setDeadline(props.edit.time);
      setStatus(props.edit.status);
    }
  }, [props.edit]);

  const changeTitle = (e) => {
    setTitle(e.target.value);
  };
  const changeDeadline = (e) => {
    setDeadline(e.target.value);
  };
  const changeStatus = (e) => {
    setStatus(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let newTodo = {
      id: Math.round(Math.random() * 10000),
      title: title,
      time: deadline,
      status: status,
    };
    props.onSubmit(newTodo);
    setTitle("");
    setDeadline("");
    setStatus("");
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    let newUpdate = {
      id: props.edit.id,
      title: title,
      time: deadline,
      status: status,
    }
    props.onUpdate(newUpdate);
    setTitle("");
    setDeadline("");
    setStatus("");
  }
  //update đã thành công việc bind dữ liệu lên để sửa, còn chức năng sửa

  return (
    <div>
      <div>
        {props.edit ? (
          <div>
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-2 ">
                <input
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Input Todo"
                  ref={inputRef}
                  onChange={changeTitle}
                  value={title}
                />
              </div>
              <div className="col-span-1">
                <input
                  type="date"
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={changeDeadline}
                  value={deadline}
                />
              </div>
              <div className="col-span-1">
                <select
                  className="shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={changeStatus}
                  value={status}
                >
                  <option>--Status--</option>
                  <option>ToDo</option>
                  <option>Done</option>
                  <option>Inprocess</option>
                </select>
              </div>
            </div>
            <div>
              <button
                className="bg-sky-500 hover:bg-sky-700 rounded leading-tight py-2 px-3 mt-2 text-white font-bold"
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-2 ">
                <input
                  class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Input Todo"
                  ref={inputRef}
                  onChange={changeTitle}
                  value={title}
                />
              </div>
              <div className="col-span-1">
                <input
                  type="date"
                  class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={changeDeadline}
                  value={deadline}
                />
              </div>
              <div className="col-span-1">
                <select
                  className="shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={changeStatus}
                  value={status}
                >
                  <option>--Status--</option>
                  <option>ToDo</option>
                  <option>Done</option>
                  <option>Inprocess</option>
                </select>
              </div>
            </div>
            <div>
              <button
                className="bg-sky-500 hover:bg-sky-700 rounded leading-tight py-2 px-3 mt-2 text-white font-bold"
                onClick={handleSubmit}
              >
                Add ToDo
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TodoForm;
