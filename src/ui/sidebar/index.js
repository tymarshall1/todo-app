import "./style.css";
import addTodoSVG from "../assets/addtodo.svg";

export default function sidebar() {
  const content = document.querySelector("#content");
  const sidebarContainer = document.createElement("div");

  sidebarContainer.classList.add("sidebar");

  const todosList = todos();
  const projectList = projects();
  const notesOption = notes();
  const addtodoOption = addTodo();

  sidebarContainer.appendChild(todosList);
  sidebarContainer.appendChild(projectList);
  sidebarContainer.appendChild(notesOption);
  sidebarContainer.appendChild(addtodoOption);

  content.appendChild(sidebarContainer);
}

const todos = () => {
  const todos = document.createElement("ul");
  const todayTasks = document.createElement("li");
  const weeklyTasks = document.createElement("li");
  const monthlyTasks = document.createElement("li");

  todos.classList.add("todos");

  todayTasks.textContent = "Today";
  weeklyTasks.textContent = "Week";
  monthlyTasks.textContent = "Month";

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

  projects.appendChild(placeholderProject);

  return projects;
};

const notes = () => {
  const notes = document.createElement("ul");
  const notesPlaceholder = document.createElement("li");

  notes.classList.add("notes");

  notes.textContent = "Notes";
  notesPlaceholder.textContent = "Note One";

  notes.appendChild(notesPlaceholder);
  return notes;
};

const addTodo = () => {
  const addtodoBtn = document.createElement("img");
  addtodoBtn.src = addTodoSVG;
  addtodoBtn.addEventListener("click", () => {});
  addtodoBtn.classList.add("addtodobtn");
  return addtodoBtn;
};
