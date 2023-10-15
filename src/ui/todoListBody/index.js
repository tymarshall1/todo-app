import "./style.css";
import edit from "../assets/editBtn.svg";
import deleteButton from "../assets/deleteBtn.svg";
import exit from "../assets/xBtn.svg";
// import Todo from "../../modules/todo.js";
import {
  weekFromToday,
  monthFromToday,
  todaysTasks,
} from "../../util/todoDates.js";

function todoBody(filteredTodos, todoDB) {
  const content = document.querySelector("#content");
  const div = document.createElement("div");

  div.classList.add("todo-list");

  filteredTodos.forEach((todo) => {
    div.append(todoItem(todo, todoDB));
  });

  content.appendChild(div);
}

const todoItem = (todo, todoDB) => {
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
  lineThroughTodo(todo, todoContainer, todoTitle, todoDate, todoCheckbox);

  deleteBtn.addEventListener("click", () => {
    todoDB.deleteTodo(todo.title);
    removeTodosFromScreen();
    redrawlTodosAfterDelete(todoDB);
  });

  todoCheckbox.addEventListener("input", () => {
    if (todoCheckbox.checked) {
      todoDB.markTodoComplete(todo.title, true);
      lineThroughTodo(todo, todoContainer, todoTitle, todoDate, todoCheckbox);
      return;
    }
    todoDB.markTodoComplete(todo.title, false);
    lineThroughTodo(todo, todoContainer, todoTitle, todoDate, todoCheckbox);
  });

  todoContainer.addEventListener("click", () => {
    // todoItemModal(todo);
  });

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

const redrawlTodosAfterDelete = (todoDB) => {
  const linkClicked = document.querySelector(".navlink-clicked");

  switch (linkClicked.textContent) {
    case "All":
      todoBody(todoDB.readAllTodos(), todoDB);
      break;
    case "Today":
      todoBody(todaysTasks(todoDB), todoDB);
      break;
    case "Week":
      todoBody(weekFromToday(todoDB), todoDB);
      break;
    case "Month":
      todoBody(monthFromToday(todoDB), todoDB);
      break;
  }
};

const setPriorityBorder = (priority, todoContainer) => {
  switch (priority) {
    case "low":
      todoContainer.classList.add("low-prio-border");
      break;

    case "medium":
      todoContainer.classList.add("med-prio-border");
      break;

    case "high":
      todoContainer.classList.add("high-prio-border");
      break;
  }
};

const todoItemModal = (todo) => {
  const todoCard = document.createElement("dialog");
  document.querySelector("#content").appendChild(todoCard);

  const todoCardContainer = document.createElement("div");
  const todoCardHeader = document.createElement("div");
  const todoCardBody = document.createElement("div");
  const cardHeaderText = document.createElement("h1");
  const cardExit = document.createElement("img");

  const underline = document.createElement("hr");
  const underline1 = document.createElement("hr");
  const underline2 = document.createElement("hr");
  const underline3 = document.createElement("hr");
  const underline4 = document.createElement("hr");

  const cardBodyTitleContainer = document.createElement("div");
  const cardBodyDateContainer = document.createElement("div");
  const cardBodyDescContainer = document.createElement("div");
  const cardBodyPrioContainer = document.createElement("div");
  const cardBodyProjContainer = document.createElement("div");
  const cardBodyCompletedContainer = document.createElement("div");

  const cardBodyTitle = document.createElement("h2");
  const cardBodyDate = document.createElement("h2");
  const cardBodyDesc = document.createElement("h2");
  const cardBodyprio = document.createElement("h2");
  const cardBodyProj = document.createElement("h2");
  const cardBodyCompleted = document.createElement("h2");

  const cardBodyTitleP = document.createElement("p");
  const cardBodyDateP = document.createElement("p");
  const cardBodyDescP = document.createElement("p");
  const cardBodyprioP = document.createElement("p");
  const cardBodyProjP = document.createElement("p");
  const cardBodyCompletedP = document.createElement("p");

  cardBodyTitleContainer.classList.add("todo-body-item");
  cardBodyDateContainer.classList.add("todo-body-item");
  cardBodyDescContainer.classList.add("todo-body-item");
  cardBodyPrioContainer.classList.add("todo-body-item");
  cardBodyProjContainer.classList.add("todo-body-item");
  cardBodyCompletedContainer.classList.add("todo-body-item");

  todoCard.classList.add("todo-modal");
  todoCardContainer.classList.add("todo-modal-container");
  todoCardHeader.classList.add("todo-item-header");
  todoCardBody.classList.add("todo-item-body");
  cardExit.classList.add("card-exit-btn");

  cardHeaderText.textContent = todo.title;

  cardExit.src = exit;

  cardBodyTitle.textContent = "Title: ";
  cardBodyDate.textContent = "Due Date: ";
  cardBodyDesc.textContent = "Description: ";
  cardBodyprio.textContent = "Priority: ";
  cardBodyProj.textContent = "Project: ";
  cardBodyCompleted.textContent = "Completed: ";

  cardBodyTitleP.textContent = todo.title;
  cardBodyDateP.textContent = todo.dueDate;
  cardBodyDescP.textContent = todo.description;
  cardBodyprioP.textContent = todo.priority;
  cardBodyProjP.textContent = todo.project;
  cardBodyCompletedP.textContent = todo.completed;

  window.addEventListener("keypress", () => clearModalsOnClose(todoCard));
  cardExit.addEventListener("click", () => {
    clearModalsOnClose(todoCard);
  });

  cardBodyTitleContainer.appendChild(cardBodyTitle);
  cardBodyTitleContainer.appendChild(cardBodyTitleP);

  cardBodyDateContainer.appendChild(cardBodyDate);
  cardBodyDateContainer.appendChild(cardBodyDateP);

  cardBodyDescContainer.appendChild(cardBodyDesc);
  cardBodyDescContainer.appendChild(cardBodyDescP);

  cardBodyPrioContainer.appendChild(cardBodyprio);
  cardBodyPrioContainer.appendChild(cardBodyprioP);

  cardBodyProjContainer.appendChild(cardBodyProj);
  cardBodyProjContainer.appendChild(cardBodyProjP);

  cardBodyCompletedContainer.appendChild(cardBodyCompleted);
  cardBodyCompletedContainer.appendChild(cardBodyCompletedP);

  todoCardBody.appendChild(cardBodyTitleContainer);
  todoCardBody.appendChild(underline);
  todoCardBody.appendChild(cardBodyDateContainer);
  todoCardBody.appendChild(underline1);
  todoCardBody.appendChild(cardBodyDescContainer);
  todoCardBody.appendChild(underline2);
  todoCardBody.appendChild(cardBodyPrioContainer);
  todoCardBody.appendChild(underline3);
  todoCardBody.appendChild(cardBodyProjContainer);
  todoCardBody.appendChild(underline4);
  todoCardBody.appendChild(cardBodyCompletedContainer);

  todoCardHeader.appendChild(cardHeaderText);
  todoCardHeader.appendChild(cardExit);
  todoCardContainer.appendChild(todoCardHeader);
  todoCardContainer.appendChild(todoCardBody);
  todoCard.appendChild(todoCardContainer);

  todoCard.showModal();
};

function removeTodosFromScreen() {
  const todoBody = document.querySelectorAll(".todo-list");
  todoBody.forEach((todoList) => {
    todoList.remove();
  });
}

const clearModalsOnClose = (modalSelected) => {
  const cardModals = document.querySelectorAll(".todo-modal");
  cardModals.forEach((modal) => modal.remove());
  modalSelected.close();
};

const lineThroughTodo = (
  todo,
  todoContainer,
  todoTitle,
  todoDate,
  todoCheckbox
) => {
  if (todo.completed === true) {
    todoContainer.style.opacity = 0.5;
    todoTitle.style.textDecoration = "line-through";
    todoDate.style.textDecoration = "line-through";
    todoCheckbox.checked = true;
  } else {
    todoContainer.style.opacity = 1;
    todoTitle.style.textDecoration = "none";
    todoDate.style.textDecoration = "none";
  }
};

export { todoBody, removeTodosFromScreen };
