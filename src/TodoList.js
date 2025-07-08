import { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  List,
  Row,
  Select,
} from "antd";

const { Option } = Select;

const TodoList = () => {
  const categories = {
    study: "Học tập",
    work: "Công việc",
    other: "Khác",
  };
  const [editId, setEditID] = useState(null);

  const [fromListTodo] = Form.useForm();
  const [todos, setTodos] = useState(() => {
    const listStart = localStorage.getItem("todos");
    return listStart ? JSON.parse(listStart) : [];
  });

  useEffect(() => {
    const listStart = localStorage.getItem("todos");
    if (listStart) {
      return setTodos(JSON.parse(listStart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const onFinish = () => {
    const values = fromListTodo.getFieldsValue();
    let UpdateTodos = [];

    if (!editId) {
      const newTodo = {
        ...values,
        id: Math.floor(Math.random() * 100 + 1) + "-" + new Date().getTime(),
      };
      UpdateTodos = [...todos, newTodo];

      console.log(UpdateTodos);
    } else {
      UpdateTodos = [...todos];
      for (let i = 0; i < UpdateTodos.length; i++) {
        if (UpdateTodos[i].id === editId) {
          UpdateTodos[i] = {
            ...UpdateTodos[i],
            ...values,
          };
          break;
        }
      }
    }

    console.log(UpdateTodos);
    setTodos(UpdateTodos);
    setEditID(null);

    fromListTodo.resetFields();
  };
  const onFinishFailed = (errorInfo) => {
    alert("Có lỗi xảy ra vui lòng kiểm tra lại!");
  };

  const handleEditID = (id) => {
    const todo = todos.find((item) => item.id == id);
    console.log(todo);
    if (todo) {
      // form;
      fromListTodo.setFieldsValue({ ...todo, dateTime: dayjs(todo.dateTime) });
      setEditID(todo.id);
    }
  };

  const handleDelete = (id) => {
    console.log(id);
    let destroyTodo = todos;
    destroyTodo = destroyTodo.filter((item) => item.id !== id);
    setTodos(destroyTodo);
  };

  const handleDeleteAll = () => {
    const deleteAll = window.confirm("Bạn có chắc chắn muốn xóa tất cả!");
    if (deleteAll) {
      setTodos([]);
    }
  };

  return (
    <Col>
      <Form
        form={fromListTodo}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        initialValues={{ category: "study" }}
      >
        <h1>Todo List</h1>

        <Form.Item
          label="Tên của bạn"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên !" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Công việc"
          name="job"
          rules={[{ required: true, message: "nhập tên công việc!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="dateTime" label="DatePicker[showTime]">
          <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
        </Form.Item>

        <Form.Item label="Vấn đề" name="category">
          <Select
            placeholder="Select a option and change input text above"
            allowClear
          >
            <Option value="study">Học tập</Option>
            <Option value="work">Công việc</Option>
            <Option value="other">khác</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Ghi chú :" name="note">
          <Input />
        </Form.Item>
        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button danger onClick={() => handleDeleteAll()}>
            ❌ Xóa hết
          </Button>
        </Form.Item>
      </Form>
      <List
        header={<h1>📝 Danh sách công việc</h1>}
        bordered
        dataSource={todos
          .slice()
          .sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime))}
        locale={{ emptyText: "Không có công việc nào." }}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button type="link" onClick={() => handleEditID(item.id)}>
                ✏️ Sửa
              </Button>,
              <Button danger type="link" onClick={() => handleDelete(item.id)}>
                ❌ Xóa
              </Button>,
            ]}
          >
            <Card style={{ width: "100%" }}>
              <Row gutter={[20, 20]}>
                <Col span={4}>
                  <h4>👤 Họ tên: {item.name}</h4>
                </Col>
                <Col span={20}>
                  <Row>
                    <Col span={6}>
                      <p> Nghề nghiệp: {item.job}</p>
                    </Col>
                    <Col span={6}>
                      <p> Ghi chú: {categories[item.category]}</p>
                    </Col>
                    <Col span={6}>
                      <p> Nội dung: {item.note}</p>
                    </Col>
                    <Col span={6}>
                      <p>
                        📅
                        {item.dateTime
                          ? new Date(item.dateTime).toLocaleString()
                          : "Trống"}
                      </p>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          </List.Item>
        )}
      />
    </Col>
  );
};

export default TodoList;
