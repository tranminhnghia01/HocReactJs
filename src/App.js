import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  List,
  Row,
  Select,
  Space,
  Typography,
} from "antd";

const { Title, Text } = Typography;
// import "bootstrap/dist/css/bootstrap.min.css";

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
    <Col>
      <Title level={1}>📝 Danh sách công việc</Title>

      <Row gutter={[8, 8]}>
        {/* Input Name */}
        <Col span="6">
          <Input
            type="text"
            value={name}
            placeholder="Tên :"
            onChange={(e) => {
              handleChangeName(e);
            }}
          />
        </Col>

        {/* Input Job */}

        <Col span="6">
          <Input
            type="text"
            value={job}
            placeholder="Thêm việc cần làm..."
            onChange={(e) => {
              handleChangeInput(e);
            }}
          />
        </Col>

        {/* Input Date Time */}
        <Col span="6">
          <Input
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
          />
        </Col>

        {/* Input select Option */}

        <Col span="6">
          <Select
            style={{ width: "50%" }}
            value={category}
            defaultValue={"study"}
            onChange={(value) => setCategory(value)}
            options={[
              { value: "study", label: "Học tập" },
              { value: "word", label: "Công việc" },
              { value: "other", label: "Khác" },
            ]}
          />
        </Col>

        <Col span="6">
          <Input
            type="text"
            value={note}
            placeholder="Thêm ghi chú..."
            onChange={(e) => setNote(e.target.value)}
          />
        </Col>
      </Row>
      <Row gutter={[8, 8]} style={{ marginTop: "8px" }}>
        <Col span="6">
          <Button
            color="primary"
            variant="solid"
            style={{ width: "30%", marginRight: "10px" }}
            onClick={handleSubmit}
          >
            {Edit.isEdit ? "Cập nhật" : "Thêm"}
          </Button>
          <Button
            color="danger"
            variant="solid"
            style={{ width: "30%" }}
            onClick={() => handleDeleteAll()}
          >
            ❌ Xóa hết
          </Button>
        </Col>
      </Row>

      <Divider orientation="left">Danh sách</Divider>
      <List
        // header={<div>Header</div>}
        // footer={<div>Footer</div>}
        // bordered
        dataSource={todos
          .slice()
          .sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime))}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <Space style={{ justifyContent: "space-between", width: "100%" }}>
              <Title level={4}> 👤 Họ tên: {item.name} </Title>

              <Text>Nghề nghiệp :{item.job}</Text>
              <Text>Ghi chú về :{item.category || "Trống"}</Text>
              <Text>Nội dung :{item.note || "Không có ghi chú"}</Text>
              <Text type="secondary">
                📅
                {item.dateTime
                  ? new Date(item.dateTime).toLocaleString()
                  : "Trống"}
              </Text>
            </Space>
            <Button
              color="pink"
              variant="outline"
              onClick={() => handleEditTodo(item.id)}
            >
              ✏️ Sửa
            </Button>
            <Button danger onClick={() => handleDelete(item.id)}>
              ❌ Xóa
            </Button>
          </List.Item>
        )}
      />
      {/* <ul className="list-group">
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
      </ul> */}
    </Col>
  );
}

export default App;
