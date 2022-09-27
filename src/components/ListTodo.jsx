import React from "react";

function ListTodo({ todos, removeTodo, updateTodo, searchRes }) {
  //set màu cho từng todo
  const backgroundColor = (time, status) => {
    const today = new Date().getTime();
    if (status === "Inprocess") {
      if (new Date(time).getTime() > today) {
        return "bg-orange-400";
      } else return "bg-red-500";
    }
    if (status === "Done") {
      return "bg-emerald-500";
    }
    return;
  };
  //render ra todo, truyen id của item cần sửa và update lên component cha
  const renderList = (data) => {
    let res = data.map((todo, index) => (
      <tr
        key={index}
        className={`border ${backgroundColor(todo.time, todo.status)}`}
      >
        <td className="text-center p-2 font-bold text-white">{todo.title}</td>
        <td className="text-center p-2 font-bold text-white">{todo.time}</td>
        <td className="text-center p-2 font-bold text-white">{todo.status}</td>
        <td className="text-center p-2 font-bold text-white">
          <button
            className="bg-purple-300 text-white font-bold py-2 px-4 rounded mr-1"
            onClick={() => updateTodo(todo.id)}
          >
            Sửa
          </button>
          <button
            className="bg-violet-500 text-white font-bold py-2 px-4 rounded"
            onClick={() => removeTodo(todo.id)}
          >
            Xóa
          </button>
        </td>
      </tr>
    ));
    return res;
  };
  return (
    <div className="px-2">
      <table className="w-full border rounded-lg">
        <thead>
          <tr>
            <th className="p-1">Title</th>
            <th className="p-1">Deadline</th>
            <th className="p-1">Status</th>
            <th className="p-1">Actions</th>
          </tr>
        </thead>
        <tbody>{searchRes ? renderList(searchRes) : renderList(todos)}</tbody>
      </table>
    </div>
  );
}

export default ListTodo;
