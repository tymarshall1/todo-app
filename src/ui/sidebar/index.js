import "./style.css";
import addTodoSVG from "../assets/addtodo.svg";
import { todoBody, removeTodosFromScreen } from "../todoListBody/index.js";
import addFormContainer from "../formModal/index.js";
import {
  weekFromToday,
  monthFromToday,
  todaysTasks,
} from "../../util/todoDates.js";

function sidebar(todoDB) {
  const content = document.querySelector("#content");
  const sidebarContainer = document.createElement("div");

  sidebarContainer.classList.add("sidebar");

  const todosList = todosNav(todoDB);
  const projectList = projects();
  const notesOption = notes();
  const addtodoOption = addTodoIcon(todoDB);

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
    removeTodosFromScreen();
    todoBody(todoDB.readAllTodos(), todoDB);
  });

  todayTasks.addEventListener("click", () => {
    const filteredTodos = todaysTasks(todoDB);
    optionCurrentlySelected(todayTasks);
    removeTodosFromScreen();
    todoBody(filteredTodos, todoDB);
  });

  weeklyTasks.addEventListener("click", () => {
    const filteredTodos = weekFromToday(todoDB);
    optionCurrentlySelected(weeklyTasks);
    removeTodosFromScreen();
    todoBody(filteredTodos, todoDB);
  });

  monthlyTasks.addEventListener("click", () => {
    const filteredTodos = monthFromToday(todoDB);
    optionCurrentlySelected(monthlyTasks);
    removeTodosFromScreen();
    todoBody(filteredTodos, todoDB);
  });

  todos.appendChild(allTasks);
  todos.appendChild(todayTasks);
  todos.appendChild(weeklyTasks);
  todos.appendChild(monthlyTasks);

  return todos;
};

const projects = () => {
  const projects = document.createElement("ul");
  const placeholderProject = document.createElement("li");

  projects.classList.add("projects");

  projects.textContent = "Projects";
  placeholderProject.textContent = "Finish TOP";

  projects.addEventListener("click", () => {
    optionCurrentlySelected(projects);
  });

  projects.appendChild(placeholderProject);

  return projects;
};

const notes = () => {
  const notes = document.createElement("ul");

  notes.classList.add("notes");

  notes.textContent = "Notes";

  notes.addEventListener("click", () => {
    optionCurrentlySelected(notes);
  });

  return notes;
};

const addTodoIcon = (todoDB) => {
  const addtodoBtn = document.createElement("img");
  const dialog = document.createElement("dialog");

  document.querySelector("#content").appendChild(dialog);

  dialog.appendChild(addFormContainer(todoDB));
  dialog.id = "add-todo-dialog";

  addtodoBtn.src = addTodoSVG;
  addtodoBtn.classList.add("addtodobtn");
  addtodoBtn.addEventListener("click", () => {
    dialog.showModal();
  });

  return addtodoBtn;
};

const addProjectFormBody = () => {};
const addNoteFormBody = () => {};

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

export { sidebar, optionCurrentlySelected };
