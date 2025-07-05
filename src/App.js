import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [job, setJob] = useState("");
  const [name, setName] = useState("");
  const [Edit, setEdit] = useState([]);

  const handleChangeInput = (e) => {
    setJob(e.target.value);
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  //info = {id,name,job}
  const handleSubmit = () => {
    // console.log(todos);

    if (job.trim() === "" || name.trim() === "") return;

    if (Edit == "") {
      setTodos([
        ...todos,
        {
          id: Math.floor(Math.random() * 100 + 1) - new Date().getFullYear(),
          name: name,
          job: job,
        },
      ]);
    } else {
      // console.log(todos);
      let todoEdit = todos;
      todoEdit.map((item) => {
        if (item.id === Edit.id) {
          item.name = name;
          item.job = job;
        }
      });

      setTodos(todoEdit);
    }
    setEdit("");
    setJob("");
    setName("");
  };

  // id: Math.floor(Math.random() * 100 + 1),

  const handleEditTodo = (id) => {
    setEdit({ isEdit: true, id: id });
    let todoEdit = todos;
    todoEdit.map((item) => {
      if (item.id === id) {
        setJob(item.job);
        setName(item.name);
      }
    });
  };

  const handleDelete = (id) => {
    console.log(id);
    let todosclone = todos;
    todosclone = todosclone.filter((item) => item.id !== id);
    setTodos(todosclone);
  };
  return (
    <div style={{ margin: "40px" }}>
      <h1> Todo List</h1>
      <input
        type="text"
        value={name}
        placeholder="Tên :"
        onChange={(e) => {
          handleChangeName(e);
        }}
      />

      <input
        type="text"
        value={job}
        placeholder="Thêm việc cần làm..."
        onChange={(e) => {
          handleChangeInput(e);
        }}
      />
      <button onClick={handleSubmit}>{Edit == "" ? "Thêm" : "Cập nhật"}</button>

      <ul>
        {todos.map((item) => (
          <li key={item.id}>
            <span style={{ cursor: "pointer" }}>{item.name} :</span>
            <span style={{ cursor: "pointer" }}>{item.job}</span>
            <button
              style={{ marginLeft: "10px" }}
              onClick={() => {
                handleEditTodo(item.id);
              }}
            >
              ✏️ Sửa
            </button>
            <button
              style={{ marginLeft: "10px" }}
              onClick={() => handleDelete(item.id)}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
