import "./style.css";
import addTodoSVG from "../assets/addtodo.svg";
import { todoBody, removeTodosFromScreen } from "../todoListBody/index.js";
import addFormContainer from "../formModal/index.js";

export default function sidebar(todoDB) {
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

  allTasks.textContent = "All";
  todayTasks.textContent = "Today";
  weeklyTasks.textContent = "Week";
  monthlyTasks.textContent = "Month";

  allTasks.addEventListener("click", () => {
    removeTodosFromScreen();
    todoBody(todoDB.readAllTodos());
  });

  todayTasks.addEventListener("click", () => {
    const currentDate = new Date(); // Get the current date and time
    currentDate.setHours(0, 0, 0, 0); // Set the time to midnight

    const filteredTodos = todoDB.readAllTodos().filter((todo) => {
      const todoDate = new Date(todo.dueDate);
      todoDate.setHours(0, 0, 0, 0); // Set the time of each todo to midnight
      return todoDate.getTime() === currentDate.getTime();
    });
    removeTodosFromScreen();
    todoBody(filteredTodos);
  });

  weeklyTasks.addEventListener("click", () => {});
  monthlyTasks.addEventListener("click", () => {});

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
