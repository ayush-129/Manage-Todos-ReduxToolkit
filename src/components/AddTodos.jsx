import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTodo, initTodos } from "../features/todo/todoSlice";

function AddTodo() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const addTodoHandler = (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      // Dispatch addTodo action
      dispatch(addTodo(input));
      // Clear input field
      setInput("");
    }
  };

  const initialState = {
    todos: [{ id: 1, text: "Keep Learning Always" }],
  };

  // LOCAL STORAGE FUNCTIONALITY
  useEffect(async () => {
    // Check if todos exist in local storage
    const todos = await JSON.parse(localStorage.getItem("todos"));
    if (todos && todos.length > 0) {
      dispatch(initTodos(todos));
    } else if (todos.length === 0) {
      dispatch(initTodos(initialState.todos));
    }
  }, [dispatch]);

  return (
    <form onSubmit={addTodoHandler} className="space-x-3 mt-12">
      <input
        type="text"
        className="bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        placeholder="Enter a Todo..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="submit"
        className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
      >
        Add
      </button>
      <div style={{ height: "1rem" }}></div>
    </form>
  );
}
export default AddTodo;
