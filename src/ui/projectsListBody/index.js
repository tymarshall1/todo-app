import "./style.css";
import { todoItem } from "../todoListBody/index.js";

const projectBody = (projectDB, todoDB) => {
  const content = document.querySelector("#content");
  const projectContainer = document.createElement("div");

  const allProjects = projectDB.readAllProjects();
  allProjects.forEach((proj) => {
    projectContainer.appendChild(project(proj, todoDB));
  });

  projectContainer.classList.add("project-container");

  content.appendChild(projectContainer);
};

const project = (singleProject, todoDB) => {
  const projectContainer = document.createElement("div");
  const project = document.createElement("details");
  const projectSummary = document.createElement("summary");

  const allTodos = todoDB.readAllTodos();

  projectSummary.textContent = singleProject.title;

  project.classList.add("single-project");

  project.appendChild(projectSummary);

  projectContainer.appendChild(project);
  allTodos.forEach((todo) => {
    if (singleProject.title === todo.project) {
      project.appendChild(todoItem(todo, todoDB));
    }
  });
  return project;
};

export { projectBody };
