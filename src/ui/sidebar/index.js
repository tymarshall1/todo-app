import "./style.css";
import addTodoSVG from "../assets/addtodo.svg";
import { todoBody } from "../todoListBody/index.js";
import addFormContainer from "../formModal/index.js";
import {
  weekFromToday,
  monthFromToday,
  todaysTasks,
} from "../../util/todoDates.js";
import { projectBody } from "../projectsListBody/index.js";
import { noteBody } from "../noteBody/index.js";

function sidebar(todoDB, projectDB) {
  const content = document.querySelector("#content");
  const sidebarContainer = document.createElement("div");

  sidebarContainer.classList.add("sidebar");

  const todosList = todosNav(todoDB);
  const projectList = projects(projectDB, todoDB);
  const notesOption = notes();
  const addtodoOption = addTodoIcon(todoDB, projectDB);

  sidebarContainer.appendChild(todosList);
  sidebarContainer.appendChild(projectList);
  sidebarContainer.appendChild(notesOption);
  sidebarContainer.appendChild(addtodoOption);

  content.appendChild(sidebarContainer);
}

const todosNav = (todoDB) => {
  const todos = document.createElement("ul");
  const allTasks = document.createElement("li");
  const todayTasks = document.createElement("li");
  const weeklyTasks = document.createElement("li");
  const monthlyTasks = document.createElement("li");

  todos.classList.add("todos");

  allTasks.id = "allTasks";

  allTasks.textContent = "All";
  todayTasks.textContent = "Today";
  weeklyTasks.textContent = "Week";
  monthlyTasks.textContent = "Month";

  allTasks.addEventListener("click", () => {
    optionCurrentlySelected(allTasks);
    clearBodyOnNavChange();
    todoBody(todoDB.readAllTodos(), todoDB);
  });

  todayTasks.addEventListener("click", () => {
    const filteredTodos = todaysTasks(todoDB);
    optionCurrentlySelected(todayTasks);
    clearBodyOnNavChange();
    todoBody(filteredTodos, todoDB);
  });

  weeklyTasks.addEventListener("click", () => {
    const filteredTodos = weekFromToday(todoDB);
    optionCurrentlySelected(weeklyTasks);
    clearBodyOnNavChange();
    todoBody(filteredTodos, todoDB);
  });

  monthlyTasks.addEventListener("click", () => {
    const filteredTodos = monthFromToday(todoDB);
    optionCurrentlySelected(monthlyTasks);
    clearBodyOnNavChange();
    todoBody(filteredTodos, todoDB);
  });

  todos.appendChild(allTasks);
  todos.appendChild(todayTasks);
  todos.appendChild(weeklyTasks);
  todos.appendChild(monthlyTasks);

  return todos;
};

const projects = (projectDB, todoDB) => {
  const projects = document.createElement("ul");

  projects.classList.add("projects");

  projects.textContent = "Projects";

  projects.addEventListener("click", () => {
    optionCurrentlySelected(projects);
    clearBodyOnNavChange();
    projectBody(projectDB, todoDB);
  });

  return projects;
};

const notes = () => {
  const notes = document.createElement("ul");

  notes.classList.add("notes");

  notes.textContent = "Notes";

  notes.addEventListener("click", () => {
    optionCurrentlySelected(notes);
    clearBodyOnNavChange();
    noteBody();
  });

  return notes;
};

const addTodoIcon = (todoDB, projectDB) => {
  const addtodoBtn = document.createElement("img");
  const dialog = document.createElement("dialog");

  document.querySelector("#content").appendChild(dialog);

  dialog.appendChild(addFormContainer(todoDB, projectDB));
  dialog.id = "add-todo-dialog";

  addtodoBtn.src = addTodoSVG;
  addtodoBtn.classList.add("addtodobtn");
  addtodoBtn.addEventListener("click", () => {
    dialog.showModal();
  });

  return addtodoBtn;
};

const optionCurrentlySelected = (navItemClicked) => {
  navItemClicked.classList.add("navlink-clicked");
  const navLinks = document.querySelectorAll(".sidebar ul > li");
  const navLinkUls = document.querySelectorAll(".sidebar ul");
  navLinks.forEach((navlink) => {
    if (navlink != navItemClicked) navlink.classList.remove("navlink-clicked");
  });

  navLinkUls.forEach((navlinkUl) => {
    if (navlinkUl != navItemClicked)
      navlinkUl.classList.remove("navlink-clicked");
  });
};

function clearBodyOnNavChange() {
  const todoBody = document.querySelectorAll(".todo-list");
  const projectBody = document.querySelectorAll(".project-container");
  const noteBody = document.querySelectorAll(".note-container");

  todoBody.forEach((todoList) => {
    todoList.remove();
  });

  projectBody.forEach((project) => {
    project.remove();
  });

  noteBody.forEach((note) => {
    note.remove();
  });
}

export { sidebar, optionCurrentlySelected, clearBodyOnNavChange };
