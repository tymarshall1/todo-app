import "./style.css";
import edit from "../assets/editBtn.svg";
import deleteButton from "../assets/deleteBtn.svg";
import exit from "../assets/xBtn.svg";
import expand from "../assets/expand.svg";
import Todo from "../../modules/todo.js";
import {
  weekFromToday,
  monthFromToday,
  todaysTasks,
} from "../../util/todoDates.js";
import { clearBodyOnNavChange } from "../sidebar/index.js";
import { projectBody } from "../projectsListBody/index.js";
import projectDB from "../../index.js";

function todoBody(filteredTodos, todoDB) {
  const content = document.querySelector("#content");
  const div = document.createElement("div");

  div.classList.add("todo-list");

  if (filteredTodos.length === 0) {
    const emptyMsg = emptyTodoBody();
    div.appendChild(emptyMsg);
  }

  filteredTodos.forEach((todo) => {
    div.append(todoItem(todo, todoDB));
  });

  content.appendChild(div);
}

const todoItem = (todo, todoDB) => {
  const todoContainer = document.createElement("div");
  const titleContainer = document.createElement("div");
  const todoCheckbox = document.createElement("input");
  const todoTitle = document.createElement("label");
  const todoDate = document.createElement("label");
  const todoBtns = document.createElement("div");
  const deleteBtn = document.createElement("img");
  const expandBtn = document.createElement("img");

  todoDate.htmlFor = todo.title;
  todoTitle.htmlFor = todo.title;
  todoCheckbox.id = todo.title;

  todoDate.id = "todoDate";

  todoCheckbox.type = "checkbox";
  todoTitle.textContent = todo.title;
  todoDate.textContent = `${
    todo.dueDate.getMonth() + 1
  }/${todo.dueDate.getDate()}/${todo.dueDate.getFullYear()}`;

  expandBtn.src = expand;
  deleteBtn.src = deleteButton;
  lineThroughTodo(todo, todoContainer, todoTitle, todoDate, todoCheckbox);

  deleteBtn.addEventListener("click", () => {
    if (document.querySelector(".navlink-clicked").textContent === "Projects") {
      document.getElementById(todo.title).parentElement.parentElement.remove();
      todoDB.deleteTodo(todo.title);
      return;
    }
    todoDB.deleteTodo(todo.title);
    clearBodyOnNavChange();
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

  expandBtn.addEventListener("click", () => {
    todoItemModal(todo, todoDB);
  });

  expandBtn.classList.add("todo-btn");
  deleteBtn.classList.add("todo-btn");
  todoTitle.classList.add("todo-title");
  todoContainer.classList.add("todo-item");
  titleContainer.classList.add("todo-title-container");
  setPriorityBorder(todo.priority, todoContainer);

  todoBtns.appendChild(expandBtn);
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

const todoItemModal = (todo, todoDB) => {
  const todoCard = document.createElement("dialog");
  document.querySelector("#content").appendChild(todoCard);

  const todoCardContainer = document.createElement("div");
  const todoCardHeader = document.createElement("div");
  const todoCardHeaderTitle = document.createElement("div");
  const todoCardBody = document.createElement("div");
  const cardHeaderText = document.createElement("h1");
  const cardEditBtn = document.createElement("img");
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

  todoCardHeaderTitle.classList.add("todo-card-title-container");
  cardEditBtn.classList.add("card-edit-btn");
  todoCard.classList.add("todo-modal");
  todoCardContainer.classList.add("todo-modal-container");
  todoCardHeader.classList.add("todo-item-header");
  todoCardBody.classList.add("todo-item-body");
  cardExit.classList.add("card-exit-btn");

  cardHeaderText.textContent = todo.title;

  cardEditBtn.id = "cardEdit";
  cardBodyTitleContainer.id = "cardBodyTitleContainer";
  cardBodyDateContainer.id = "cardBodyDateContainer";
  cardBodyDescContainer.id = "cardBodyDescContainer";
  cardBodyPrioContainer.id = "cardBodyPrioContainer";
  cardBodyProjContainer.id = "cardBodyProjContainer";
  cardBodyCompletedContainer.id = "cardBodyCompletedContainer";

  cardEditBtn.src = edit;
  cardExit.src = exit;

  cardBodyTitle.textContent = "Title: ";
  cardBodyDate.textContent = "Due Date: ";
  cardBodyDesc.textContent = "Description: ";
  cardBodyprio.textContent = "Priority: ";
  cardBodyProj.textContent = "Project: ";
  cardBodyCompleted.textContent = "Completed: ";

  cardBodyTitleP.textContent = todo.title;
  cardBodyDateP.textContent = `${
    todo.dueDate.getMonth() + 1
  }/${todo.dueDate.getDate()}/${todo.dueDate.getFullYear()}`;
  cardBodyDescP.textContent = todo.description;
  cardBodyprioP.textContent = todo.priority;
  cardBodyProjP.textContent = todo.project;
  cardBodyCompletedP.textContent = todo.completed;

  cardEditBtn.addEventListener("click", () => handleEditBtnClick(todo, todoDB));

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

  todoCardHeaderTitle.appendChild(cardHeaderText);
  todoCardHeaderTitle.appendChild(cardEditBtn);

  todoCardHeader.appendChild(todoCardHeaderTitle);
  todoCardHeader.appendChild(cardExit);
  todoCardContainer.appendChild(todoCardHeader);
  todoCardContainer.appendChild(todoCardBody);
  todoCard.appendChild(todoCardContainer);

  todoCard.showModal();
};

const clearModalsOnClose = (modalSelected) => {
  const cardModals = document.querySelectorAll(".todo-modal");
  cardModals.forEach((modal) => modal.remove());
  modalSelected.close();
};

const handleEditBtnClick = (todo, todoDB) => {
  const cardEditTitle = document.createElement("input");
  const cardEditDate = document.createElement("input");
  const cardEditDesc = document.createElement("textarea");
  const cardEditPriority = document.createElement("select");
  const cardEditProject = document.createElement("select");
  const cardEditCompleted = document.createElement("select");
  const selectPrioLow = document.createElement("option");
  const selectPrioMed = document.createElement("option");
  const selectPrioLowHigh = document.createElement("option");
  const selectCompleteTrue = document.createElement("option");
  const selectCompleteFalse = document.createElement("option");
  const updateBtn = document.createElement("button");
  const closeBtn = document.createElement("button");
  const underline = document.createElement("hr");

  document.querySelectorAll(".todo-body-item > p").forEach((tag) => {
    tag.remove();
  });

  closeBtn.addEventListener("click", () =>
    clearModalsOnClose(document.querySelector(".todo-modal"))
  );

  updateBtn.addEventListener("click", () => handleUpdateBtnClick(todoDB, todo));

  const allProjects = projectDB.readAllProjects();
  allProjects.forEach((project) => {
    const singleProj = document.createElement("option");
    singleProj.htmlFor = "project";
    singleProj.value = project.title;
    singleProj.textContent = project.title;
    singleProj.id = project.title;
    cardEditProject.appendChild(singleProj);
  });

  closeBtn.classList.add("update-form-button");
  updateBtn.classList.add("update-form-button");

  updateBtn.textContent = "Update To-do";
  closeBtn.textContent = "Cancel";

  cardEditPriority.name = "priority";
  cardEditPriority.id = "priority";

  cardEditCompleted.name = "completed";
  cardEditCompleted.id = "completed";

  selectPrioLow.value = "low";
  selectPrioMed.value = "medium";
  selectPrioLowHigh.value = "high";

  selectCompleteTrue.value = true;
  selectCompleteFalse.value = false;

  selectCompleteTrue.textContent = "True";
  selectCompleteFalse.textContent = "False";

  cardEditTitle.value = todo.title;
  cardEditDate.defaultValue = `${todo.dueDate.getFullYear()}-${
    todo.dueDate.getMonth() + 1
  }-${todo.dueDate.getDate()}`;
  cardEditDesc.value = todo.description;
  cardEditProject.value = todo.project;

  if (todo.priority === "low") {
    selectPrioLow.selected = true;
  } else if (todo.priority === "medium") {
    selectPrioMed.selected = true;
  } else {
    selectPrioLowHigh.selected = true;
  }

  todo.completed === "true" || todo.completed === true
    ? (selectCompleteTrue.selected = true)
    : (selectCompleteFalse.selected = true);

  selectPrioLow.textContent = "Low";
  selectPrioMed.textContent = "Medium";
  selectPrioLowHigh.textContent = "High";

  cardEditTitle.type = "text";
  cardEditDate.type = "date";

  document.querySelector("#cardEdit").remove();

  cardEditPriority.appendChild(selectPrioLow);
  cardEditPriority.appendChild(selectPrioMed);
  cardEditPriority.appendChild(selectPrioLowHigh);

  cardEditCompleted.appendChild(selectCompleteTrue);
  cardEditCompleted.appendChild(selectCompleteFalse);

  document.querySelector("#cardBodyTitleContainer").appendChild(cardEditTitle);
  document.querySelector("#cardBodyDateContainer").appendChild(cardEditDate);
  document.querySelector("#cardBodyDescContainer").appendChild(cardEditDesc);
  document
    .querySelector("#cardBodyPrioContainer")
    .appendChild(cardEditPriority);
  document.querySelector("#cardBodyProjContainer").appendChild(cardEditProject);
  document
    .querySelector("#cardBodyCompletedContainer")
    .appendChild(cardEditCompleted);

  const todoCardBody = document.querySelector(".todo-item-body");
  todoCardBody.appendChild(underline);
  todoCardBody.appendChild(updateBtn);
  todoCardBody.appendChild(closeBtn);
  cardEditTitle.focus();
};

const handleUpdateBtnClick = (todoDB, todo) => {
  const cardEditTitle = document.querySelector(
    "#cardBodyTitleContainer > input"
  );

  const cardEditDesc = document.querySelector(
    "#cardBodyDescContainer > textarea"
  );
  const cardEditDate = document.querySelector("#cardBodyDateContainer > input");
  const cardEditPriority = document.querySelector(
    "#cardBodyPrioContainer > select"
  );
  const cardEditProject = document.querySelector(
    "#cardBodyProjContainer > select"
  );
  const cardEditCompleted = document.querySelector(
    "#cardBodyCompletedContainer > select"
  );
  if (cardEditTitle.value === "") {
    cardEditTitle.value = "No Title Set";
  }
  if (cardEditDesc.value === "") {
    cardEditDesc.value = "No Description Set";
  }

  const editedTodo = new Todo(
    cardEditTitle.value,
    cardEditDesc.value,
    new Date(`${cardEditDate.value} 00:00:00`),
    cardEditPriority.value,
    cardEditProject.value
  );
  todoDB.updateTodo(todo, editedTodo);
  todoDB.markTodoComplete(cardEditTitle.value, cardEditCompleted.value);

  if (document.querySelector(".navlink-clicked").textContent === "Projects") {
    const oldTodoInp = document.getElementById(todo.title);
    document.querySelectorAll(".single-project").forEach((detail) => {
      if (detail.firstChild.textContent === editedTodo.project) {
        detail.appendChild(todoItem(editedTodo, todoDB));
        oldTodoInp.parentElement.parentElement.remove();
      }
    });

    clearModalsOnClose(document.querySelector(".todo-modal"));
    return;
  }
  clearModalsOnClose(document.querySelector(".todo-modal"));
  clearBodyOnNavChange();
  redrawlTodosAfterDelete(todoDB);
};

const lineThroughTodo = (
  todo,
  todoContainer,
  todoTitle,
  todoDate,
  todoCheckbox
) => {
  const result = todo.completed == "true";
  if (result === true || todo.completed === true) {
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

const emptyTodoBody = () => {
  const container = document.createElement("div");
  const headerText = document.createElement("h1");
  const paraText = document.createElement("p");

  headerText.textContent = "Wow, Looks Like You Have Nothing To Do!";
  paraText.textContent = "Congratulations! Go ahead and sit back and relax!";

  container.classList.add("empty-todo-container");

  container.appendChild(headerText);
  container.appendChild(paraText);
  return container;
};

export { todoBody, todoItem };
