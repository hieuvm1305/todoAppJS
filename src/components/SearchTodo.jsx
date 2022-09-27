import React, { useState } from "react";

function SearchTodo(props) {
  const [searchTitle, setsearchTitle] = useState("");
  const [timeStart, settimeStart] = useState("");
  const [timeEnd, settimeEnd] = useState("");
  const [statusSearch, setstatusSearch] = useState("");
  const changeSearchTitle = (e) => {
    setsearchTitle(e.target.value);
  };
  const changeTimeStart = (e) => {
    settimeStart(e.target.value);
  };
  const changeTimeEnd = (e) => {
    settimeEnd(e.target.value);
  };
  const changeSearchStatus = (e) => {
    setstatusSearch(e.target.value);
  };
  const searchHandle = () => {
    let itemSearch = {
      title: searchTitle,
      timeStart: timeStart,
      timeEnd: timeEnd,
      status: statusSearch,
    };
    props.searchItem(itemSearch);
    // setsearchTitle("");
    // setstatusSearch("");
    // settimeStart("");
    // settimeEnd("");
    return;
  };
  const handleCancel = () => {
    setsearchTitle("");
    setstatusSearch("");
    settimeStart("");
    settimeEnd("");
    props.handleCancel(true);
  };
  return (
    <div className="px-2">
      <div className="grid grid-cols-5 gap-4 mb-2">
        <div className="col-span-2">
          <label>Search input</label>
          <input
            type="text"
            className="shadow border rounded w-full h-10 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            onChange={changeSearchTitle}
            value={searchTitle}
            placeholder="Search Input"
          ></input>
        </div>
        <div className="col-span-1">
          <label>Time start</label>
          <input
            type="date"
            className="shadow border rounded w-full h-10  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={changeTimeStart}
            value={timeStart}
          ></input>
        </div>
        <div className="col-span-1">
          <label htmlFor="">Time End</label>
          <input
            type="date"
            className="shadow border rounded w-full h-10  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={changeTimeEnd}
            value={timeEnd}
          ></input>
        </div>
        <div className="col-span-1">
          <label>Status</label>
          <select
            className="shadow  border rounded w-full h-10 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={changeSearchStatus}
            value={statusSearch}
          >
            <option>--Status--</option>
            <option>ToDo</option>
            <option>Done</option>
            <option>In Process</option>
          </select>
        </div>
      </div>
      <div className="mb-1">
        <button
          className="bg-orange-300 hover:bg-amber-100 text-blue-500 font-bold py-2 px-4 rounded mr-1"
          onClick={searchHandle}
        >
          Search
        </button>
        <button
          className="bg-violet-400 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default SearchTodo;
