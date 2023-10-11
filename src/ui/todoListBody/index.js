import "./style.css";
import edit from "../assets/editBtn.svg";
import deleteButton from "../assets/deleteBtn.svg";

function todoBody(filteredTodos) {
  const content = document.querySelector("#content");
  const div = document.createElement("div");

  div.classList.add("todo-list");

  filteredTodos.forEach((todo) => {
    div.append(todoItem(todo));
  });

  content.appendChild(div);
}

const todoItem = (todo) => {
  const todoContainer = document.createElement("div");
  const titleContainer = document.createElement("div");
  const todoCheckbox = document.createElement("input");
  const todoTitle = document.createElement("h2");
  const todoDate = document.createElement("p");
  const todoBtns = document.createElement("div");
  const deleteBtn = document.createElement("img");
  const editBtn = document.createElement("img");

  todoCheckbox.type = "checkbox";
  todoTitle.textContent = todo.title;
  todoDate.textContent = `${
    todo.dueDate.getMonth() + 1
  }/${todo.dueDate.getDate()}/${todo.dueDate.getFullYear()}`;

  editBtn.src = edit;
  deleteBtn.src = deleteButton;

  todoContainer.classList.add("todo-item");
  titleContainer.classList.add("todo-title-container");
  setPriorityBorder(todo.priority, todoContainer);

  todoBtns.appendChild(editBtn);
  todoBtns.appendChild(deleteBtn);
  titleContainer.appendChild(todoCheckbox);
  titleContainer.appendChild(todoTitle);
  titleContainer.appendChild(todoDate);
  todoContainer.appendChild(titleContainer);
  todoContainer.appendChild(todoBtns);
  return todoContainer;
};

const setPriorityBorder = (priority, todoContainer) => {
  switch (priority) {
    case "lowPriority":
      todoContainer.classList.add("low-prio-border");
      break;

    case "medPriority":
      todoContainer.classList.add("med-prio-border");
      break;

    case "highPriority":
      todoContainer.classList.add("high-prio-border");
      break;
  }
};

function removeTodosFromScreen() {
  const todoBody = document.querySelectorAll(".todo-list");
  todoBody.forEach((todoList) => {
    todoList.remove();
  });
}

export { todoBody, removeTodosFromScreen };
