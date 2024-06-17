import { useState } from "react";
import { FaCheck, FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import "../CSS/TodoList.css";
import TodoTypes from "../todo";
import TodoService from "../TodoService";
import TodoForm from "./TodoForm";

const TodoList = () => {
  const [todos, setTodos] = useState<TodoTypes[]>(TodoService.getTodos);
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editedTodoText, setEditedTodoText] = useState<string>("");

  // function for handling edit actions
  const handleEditStart = (id: number, text: string) => {
    setEditingTodoId(id);
    setEditedTodoText(text);
  };

  const handleEditCancel = () => {
    setEditingTodoId(null);
    setEditedTodoText("");
  };

  const handleEditSave = (id: number) => {
    if (editedTodoText.trim() !== "") {
      const updateTodo = TodoService.updateTodo({
        id,
        text: editedTodoText,
        completed: false,
      });
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? updateTodo : todo))
      );
      setEditingTodoId(null);
      setEditedTodoText("");
    }
  };

  // function to delete todo
  const handleDeleteTodo = (id: number) => {
    TodoService.deleteTodo(id);
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="todoContainer">
      <TodoForm setTodos={setTodos} />
      <div className="todos">
        {todos.map((todo) => (
          <div className="items" key={todo.id}>
            {editingTodoId == todo.id ? (
              <div className="editText">
                <input
                  type="text"
                  value={editedTodoText}
                  onChange={(e) => setEditedTodoText(e.target.value)}
                  autoFocus={true}
                />
                <button
                  onClick={() => handleEditSave(todo.id)}
                  className="fa-check-btn"
                >
                  <FaCheck className="fa-check" />
                </button>
                <button
                  onClick={() => handleEditCancel()}
                  className="fa-cancel-btn"
                >
                  <RxCross2 className="fa-cancel" />
                </button>
              </div>
            ) : (
              <div className="editBtn">
                <span>{todo.text}</span>
                <button
                  onClick={() => handleEditStart(todo.id, todo.text)}
                  className="fa-edit-btn"
                >
                  <FaEdit className="fa-edit" />
                </button>
              </div>
            )}

            <button
              onClick={() => handleDeleteTodo(todo.id)}
              className="fa-delete-btn"
            >
              <RiDeleteBin5Fill className="fa-delete" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
