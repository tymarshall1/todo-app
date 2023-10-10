import "./style.css";
import edit from "../assets/editBtn.svg";
import deleteButton from "../assets/deleteBtn.svg";

export default function todoBody() {
  const content = document.querySelector("#content");
  const div = document.createElement("div");

  div.classList.add("todo-list");

  const item = todoItem("xxx");

  div.appendChild(item);
  content.appendChild(div);
}

const todoItem = (todo) => {
  const todoContainer = document.createElement("div");
  const titleContainer = document.createElement("div");
  const todoCheckbox = document.createElement("input");
  const todoTitle = document.createElement("h2");
  const todoBtns = document.createElement("div");
  const deleteBtn = document.createElement("img");
  const editBtn = document.createElement("img");

  todoCheckbox.type = "checkbox";
  // todoTitle.textContent = todo.title;
  todoTitle.textContent = todo;
  editBtn.src = edit;
  deleteBtn.src = deleteButton;

  todoContainer.classList.add("todo-item");
  // todoBtns.classList.add("");
  titleContainer.classList.add("todo-title-container");

  todoBtns.appendChild(editBtn);
  todoBtns.appendChild(deleteBtn);
  titleContainer.appendChild(todoCheckbox);
  titleContainer.appendChild(todoTitle);
  todoContainer.appendChild(titleContainer);
  todoContainer.appendChild(todoBtns);
  return todoContainer;
};
