import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [todos, setTodos] = useState(() => {
    const todostarts = localStorage.getItem("todos");
    return todostarts ? JSON.parse(todostarts) : [];
  });

  const [job, setJob] = useState("");
  const [name, setName] = useState("");
  const [Edit, setEdit] = useState({ isEdit: false, id: null });
  const [note, setNote] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [category, setCategory] = useState("word");

  useEffect(() => {
    const todostarts = localStorage.getItem("todos");
    if (todostarts) {
      return setTodos(JSON.parse(todostarts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

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
        dateTime: dateTime,
        note: note,
        category: category,
      };

      UpdateTodos = [...todos, newTodo];
    } else {
      UpdateTodos = [...todos];
      for (let i = 0; i < UpdateTodos.length; i++) {
        if (UpdateTodos[i].id === Edit.id) {
          UpdateTodos[i] = {
            ...UpdateTodos[i],
            name: name,
            job: job,
            category: category,
            dateTime,
            note,
          };
          break;
        }
      }
    }
    setTodos(UpdateTodos);

    setEdit({ isEdit: false, id: null });
    setJob("");
    setName("");
    setCategory("hoctap");
    setNote("");
    setDateTime("");
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
        setCategory(todoEdit[i].category);
        setNote(todoEdit[i].note);
        setDateTime(todoEdit[i].dateTime);
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

  const handleDeleteAll = () => {
    const deleteAll = window.confirm("Bạn có chắc chắn muốn xóa tất cả!");
    if (deleteAll) {
      setTodos([]);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">📝 Todo List</h2>

      <div className="row g-3 mb-3">
        {/* Input Name */}
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            value={name}
            placeholder="Tên :"
            onChange={(e) => {
              handleChangeName(e);
            }}
          />
        </div>

        {/* Input Job */}

        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            value={job}
            placeholder="Thêm việc cần làm..."
            onChange={(e) => {
              handleChangeInput(e);
            }}
          />
        </div>

        {/* Input Date Time */}
        <div className="col-md-3">
          <input
            type="datetime-local"
            className="form-control"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
          />
        </div>

        {/* Input select Option */}

        <div className="col-md-2">
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="study">Học tập</option>
            <option value="work">Công việc</option>
            <option value="other">Khác</option>
          </select>
        </div>

        {/* Input ghi chú */}
        <div className="col-md-3">
          <input
            type="text"
            value={note}
            className="form-control"
            placeholder="Thêm ghi chú..."
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        <div className="col-md-2">
          <button className="btn btn-primary w-100" onClick={handleSubmit}>
            {Edit.isEdit ? "Cập nhật" : "Thêm"}
          </button>
        </div>
        <div className="col-md-2">
          <button
            className="btn btn-outline-danger w-100"
            onClick={() => handleDeleteAll()}
          >
            ❌ Xóa hết
          </button>
        </div>
      </div>
      <ul className="list-group">
        {todos
          .slice()
          .sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime))
          .map((item) => (
            <li
              key={item.id}
              className="list-group-item border-start border-4 border-primary mb-2"
            >
              <div className="d-flex justify-content-between align-items-start flex-wrap">
                <div style={{ minWidth: "250px", maxWidth: "300px" }}>
                  <h6 className="fw-bold mb-1">👤 Họ tên: {item.name}</h6>
                  <div>💼 Công việc: {item.job}</div>
                </div>

                <div style={{ minWidth: "250px" }}>
                  <div>
                    📝 Ghi chú về <strong>{item.category || "___"}</strong>:
                    <br />
                    {item.note || "Không có ghi chú"}
                  </div>
                  <div className="text-muted mt-1">
                    📅
                    {item.dateTime
                      ? new Date(item.dateTime).toLocaleString()
                      : "Trống"}
                  </div>
                </div>

                <div className="d-flex align-items-start mt-2 mt-md-0">
                  <button
                    className="btn btn-sm btn-outline-info me-2"
                    onClick={() => handleEditTodo(item.id)}
                  >
                    ✏️ Sửa
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(item.id)}
                  >
                    ❌ Xóa
                  </button>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
