// // import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodoId, setCurrentTodoId] = useState(null);
  const [newText, setNewText] = useState("");

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([...todos, { text: input, id: Date.now(), isDone: false }]);
    setInput("");
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleDone = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const updateTodo = () => {
    setTodos(
      todos.map((todo) =>
        todo.id === currentTodoId ? { ...todo, text: newText } : todo
      )
    );
    setIsEditing(false);
    setCurrentTodoId(null);
    setNewText("");
  };

  const clearTodos = () => {
    setTodos([]);
  };

  const startEdit = (id, text) => {
    setIsEditing(true);
    setCurrentTodoId(id);
    setNewText(text);
  };

  return (
    <div className="container todo-container">
      <h1 className="text-center my-4">To-Do List</h1>
      <div className="mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task"
          />
          <button className="btn btn-primary" onClick={addTodo}>
            Add
          </button>
        </div>
      </div>
      <ul className="list-group">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {isEditing && currentTodoId === todo.id ? (
              <input
                type="text"
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                className="form-control"
              />
            ) : (
              <span
                className={todo.isDone ? "text-decoration-line-through" : ""}
              >
                {todo.text}
              </span>
            )}
            <div>
              <button
                className="btn btn-success btn-sm me-2"
                onClick={() => toggleDone(todo.id)}
              >
                {todo.isDone ? "Undo" : "Done"}
              </button>
              {isEditing && currentTodoId === todo.id ? (
                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={updateTodo}
                >
                  Save
                </button>
              ) : (
                <button
                  className="btn btn-secondary btn-sm me-2"
                  onClick={() => startEdit(todo.id, todo.text)}
                >
                  Edit
                </button>
              )}
              {todo.isDone && (
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => removeTodo(todo.id)}
                >
                  Delete
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
      <button className="btn btn-danger mt-3" onClick={clearTodos}>
        Clear All Todos
      </button>
    </div>
  );
};
export default App;
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
