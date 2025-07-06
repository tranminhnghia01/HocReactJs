import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState(() => {
    const todostarts = localStorage.getItem("todos");
    return todostarts ? JSON.parse(todostarts) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const [job, setJob] = useState("");
  const [name, setName] = useState("");
  const [Edit, setEdit] = useState({ isEdit: false, id: null });

  const handleChangeInput = (e) => {
    setJob(e.target.value);
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  //info = {id,name,job}
  const handleSubmit = () => {
    if (job.trim() === "" || name.trim() === "") {
      alert("Vui lòng nhập đầu đủ thông tin");
      return;
    }
    let UpdateTodos = [];
    if (Edit.isEdit == false) {
      const newTodo = {
        id: Math.floor(Math.random() * 100 + 1) + "-" + new Date().getTime(),
        name: name,
        job: job,
      };

      UpdateTodos = [...todos, newTodo];
    } else {
      UpdateTodos = [...todos];
      for (let i = 0; i < UpdateTodos.length; i++) {
        if (UpdateTodos[i].id === Edit.id) {
          UpdateTodos[i] = { ...UpdateTodos[i], name: name, job: job };
          // UpdateTodos[i].name = name;
          // UpdateTodos[i].job = job;
          break;
        }
      }
    }
    setTodos(UpdateTodos);

    setEdit({ isEdit: false, id: null });
    setJob("");
    setName("");
    // localStorage.setItem("todos", JSON.stringify(UpdateTodos));
  };

  const handleEditTodo = (id) => {
    setEdit({ isEdit: true, id: id });
    let todoEdit = todos;
    console.log(todoEdit);

    for (let i = 0; i < todoEdit.length; i++) {
      if (todoEdit[i].id === id) {
        setJob(todoEdit[i].job);
        setName(todoEdit[i].name);
        break;
      }
    }
  };

  const handleDelete = (id) => {
    console.log(id);
    let todosclone = todos;
    todosclone = todosclone.filter((item) => item.id !== id);
    setTodos(todosclone);
    // localStorage.setItem("todos", JSON.stringify(todosclone));
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
      <button onClick={handleSubmit}>
        {Edit.isEdit ? "Cập nhật" : "Thêm"}
      </button>

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
