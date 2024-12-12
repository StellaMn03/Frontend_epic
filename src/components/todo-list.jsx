import React, { useState, useEffect } from "react";
import axios from "axios";
import { AddTodo } from "./todo-add";
import { List } from "./list";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/todos").then((response) => {
      setTodos(response.data);
    });
  }, []);

  const add = (text, description) => {
    const newTodo = { text, description, completed: false };

    axios.post("http://localhost:4000/todos", newTodo).then((response) => {
      setTodos((prev) => [...prev, response.data]);
    });
  };

  const deleteToDo = (id) => {
    axios.delete(`http://localhost:4000/todos/${id}`).then(() => {
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
      toast.success("Todo deleted!");
    });
  };

  const change = (id) => {
    const toDo = todos.find((todo) => todo.id === id);
    const updatedTodo = { ...toDo, completed: !toDo.completed };

    axios.put(`http://localhost:4000/todos/${id}`, updatedTodo).then(() => {
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
    });
  };

  return (
    <div className="flex flex-col space-y-6 p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800">Todo List</h1>
      <AddTodo onAdd={add} />
      <List items={todos} onDelete={deleteToDo} onChange={change} />
      <ToastContainer />
    </div>
  );
};
