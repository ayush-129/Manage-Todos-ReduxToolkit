import "./App.css";
import AddTodo from "./components/AddTodos";
import Todos from "./components/Todos";

function App() {
  return (
    <div className="mx-auto max-w-md sm:max-w-xl lg:max-w-2xl">
      <h1 className="text-3xl font-bold text-center mt-8">
        Manage Your To-Dos
      </h1>
      <AddTodo />
      <Todos />
    </div>
  );
}

export default App;
