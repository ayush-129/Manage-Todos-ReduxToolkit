import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todos: [{ id: 1, text: "Keep Learning Always" }],
};
export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        id: nanoid(),
        text: action.payload,
        completed: false,
      };
      state.todos.push(todo);
      localStorage.setItem("todos", JSON.stringify(state.todos)); // Save todos to local storage
    },
    updateTodo: (state, action) => {
      const { id, newText } = action.payload;
      state.todos = state.todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      );
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    toggleComplete: (state, action) => {
      const { id } = action.payload;
      const todoToToggle = state.todos.find((todo) => todo.id === id);
      if (todoToToggle) {
        todoToToggle.completed = !todoToToggle.completed; // Toggle completed property
      }
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },

    initTodos: (state, action) => {
      state.todos = action.payload;
    },
  },
});
export const {addTodo, updateTodo,deleteTodo,toggleComplete,initTodos} = todoSlice.actions

export default todoSlice.reducer
