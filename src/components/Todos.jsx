import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTodo as deleteTodoAction, toggleComplete, updateTodo } from "../features/todo/todoSlice";

function TodoItem({ todo }) {
  const dispatch = useDispatch();
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.text);

  const toggleCompleted = () => {
    dispatch(toggleComplete({ id: todo.id }));
  };

  const editTodo = () => {
    setIsTodoEditable(true);
  };

  const saveTodo = () => {
    dispatch(updateTodo({ id: todo.id, newText: todoMsg }));
    setIsTodoEditable(false);
  };

  const deleteTodo = () => {
    dispatch(deleteTodoAction({ id: todo.id }));
  };

  return (
    <>
    <div
      className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
        todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
      }`}
    >
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={todo.completed}
        onChange={toggleCompleted}
      />
      <input
        type="text"
        className={`border outline-none w-full bg-transparent rounded-lg ${
          isTodoEditable ? "border-black/10 px-2" : "border-transparent"
        } ${todo.completed ? "line-through" : ""}`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
      />
      {/* Edit, Save Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
        onClick={() => {
          if (todo.completed) return;

          if (isTodoEditable) {
            saveTodo();
          } else {
            editTodo();
          }
        }}
        disabled={todo.completed}
      >
        {isTodoEditable ? "📁" : "✏️"}
      </button>
      {/* Delete Todo Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
        onClick={deleteTodo}
      >
        ❌
      </button>
    </div>
    <div style={{ height: '1rem' }}></div>
    </>
  );
}

function Todos() {
  const todos = useSelector((state) => state.todos);

  return (
    <>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </>
  );
}

export default Todos;
