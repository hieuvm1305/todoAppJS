import React from "react";

function ListTodo({ todos, removeTodo, updateTodo, searchRes }) {
  //render ra todo, truyen id của item cần sửa và update lên component cha
  const renderList = () => {
    let res = todos.map((todo, index) => (
      <tr key={index}>
        <td className="text-center">{todo.title}</td>
        <td className="text-center">{todo.time}</td>
        <td className="text-center">{todo.status}</td>
        <td className="text-center">
          <button className="bg-purple-300 text-white font-bold py-2 px-4 rounded mr-1" onClick={()=>updateTodo(todo.id)}>
            Sửa
          </button>
          <button className="bg-red-500 text-white font-bold py-2 px-4 rounded" onClick={()=>removeTodo(todo.id)}>
            Xóa
          </button>
        </td>
      </tr>
    ));
    return res;
  };
  const renderSearchList = () => {
    let res = searchRes.map((todo, index) => (
      <tr key={index}>
        <td className="text-center">{todo.title}</td>
        <td className="text-center">{todo.time}</td>
        <td className="text-center">{todo.status}</td>
        <td className="text-center">
          <button className="bg-purple-300 text-white font-bold py-2 px-4 rounded mr-1" onClick={()=>updateTodo(todo.id)}>
            Sửa
          </button>
          <button className="bg-red-500 text-white font-bold py-2 px-4 rounded" onClick={()=>removeTodo(todo.id)}>
            Xóa
          </button>
        </td>
      </tr>
    ));
    return res;
  };
  //searchRes ? renderSearchList(searchRes): 

  return (
    <div>
      <table className="w-full border rounded">
        <thead>
          <tr>
            <th>Title</th>
            <th>Deadline</th>
            <th>status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {searchRes ? renderSearchList() : renderList()}
        </tbody>
      </table>
    </div>
  );
}

export default ListTodo;
