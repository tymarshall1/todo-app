import "./style.css";
import { todoBody } from "../todoListBody/index.js";
import { optionCurrentlySelected } from "../sidebar/index.js";
import exit from "../assets/xBtn.svg";
import { clearBodyOnNavChange } from "../sidebar/index.js";
import { projectBody } from "../projectsListBody/index.js";
import { noteDB } from "../../mockDatabase/mockNoteDB.js";
import { noteBody } from "../noteBody/index.js";

export default function addFormContainer(todoDB, projectDB) {
  const formContainer = document.createElement("div");
  const formHeader = document.createElement("div");
  const formHeaderText = document.createElement("h1");
  const formbody = document.createElement("div");
  const elementToAdd = document.createElement("ul");
  const todo = document.createElement("li");
  const project = document.createElement("li");
  const note = document.createElement("li");
  const exitBtn = document.createElement("img");

  exitBtn.src = exit;
  exitBtn.addEventListener("click", () => {
    document.querySelector("#add-todo-dialog").close();
  });

  formHeaderText.textContent = "Add a New...";
  todo.textContent = "To-do";
  project.textContent = "Project";
  note.textContent = "Note";

  exitBtn.classList.add("form-exit-btn");
  formbody.classList.add("form-body");
  elementToAdd.classList.add("element-to-add");
  formContainer.classList.add("add-todo-form");
  formHeader.classList.add("form-header");

  elementToAdd.appendChild(todo);
  elementToAdd.appendChild(project);
  elementToAdd.appendChild(note);

  formHeader.appendChild(formHeaderText);
  formHeader.appendChild(exitBtn);

  formbody.appendChild(elementToAdd);
  formbody.appendChild(addTodoFormBody(todoDB, projectDB));

  todo.classList.add("form-selected");
  todo.addEventListener("click", (e) => {
    toggleFormSelected(todo, project, note, e);
    document.querySelector("form").remove();
    formbody.appendChild(addTodoFormBody(todoDB, projectDB));
  });

  project.addEventListener("click", (e) => {
    toggleFormSelected(todo, project, note, e);
    document.querySelector("form").remove();
    formbody.appendChild(addProjectForm(projectDB, todoDB));
  });

  note.addEventListener("click", (e) => {
    toggleFormSelected(todo, project, note, e);
    document.querySelector("form").remove();
    formbody.appendChild(addNoteForm());
  });

  formContainer.appendChild(formHeader);
  formContainer.appendChild(formbody);
  return formContainer;
}

const toggleFormSelected = (todo, project, note, e) => {
  switch (e.target.textContent) {
    case "To-do":
      todo.classList.add("form-selected");
      project.classList.remove("form-selected");
      note.classList.remove("form-selected");
      break;
    case "Project":
      todo.classList.remove("form-selected");
      project.classList.add("form-selected");
      note.classList.remove("form-selected");
      break;
    case "Note":
      todo.classList.remove("form-selected");
      project.classList.remove("form-selected");
      note.classList.add("form-selected");
      break;
  }
};

const addTodoFormBody = (todoDB, projectDB) => {
  const titleInp = document.createElement("input");
  const descriptioninp = document.createElement("textarea");
  const submitForm = document.createElement("button");

  const dateLabel = document.createElement("label");
  const datepick = document.createElement("input");
  const form = document.createElement("form");
  const projectSelect = document.createElement("select");
  const projectSelectLabel = document.createElement("label");

  const projectDiv = document.createElement("div");
  const dateInfo = document.createElement("div");
  const dateDiv = document.createElement("div");

  const priorityFieldset = document.createElement("fieldset");
  const priorityLabelLow = document.createElement("label");
  const priorityRadioLow = document.createElement("input");
  const priorityLabelMed = document.createElement("label");
  const priorityRadioMed = document.createElement("input");
  const priorityLabelHigh = document.createElement("label");
  const priorityRadioHigh = document.createElement("input");

  priorityLabelLow.addEventListener("click", (e) => priorityMarker(e));
  priorityLabelMed.addEventListener("click", (e) => priorityMarker(e));
  priorityLabelHigh.addEventListener("click", (e) => priorityMarker(e));

  projectSelectLabel.textContent = "Project";
  const projects = projectDB.readAllProjects();
  projects.forEach((project) => {
    const singleProj = document.createElement("option");
    singleProj.htmlFor = "project";
    singleProj.value = project.title;
    singleProj.textContent = project.title;
    singleProj.id = project.title;
    projectSelect.appendChild(singleProj);
  });

  form.id = "addTodo";
  submitForm.type = "submit";
  submitForm.setAttribute("form", "addTodo");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const radioButtons = priorityFieldset.querySelectorAll(
      'input[type="radio"][name="priority"]:checked'
    );

    if (radioButtons.length > 0) {
      const selectedValue = radioButtons[0].value;
      todoDB.createTodo(
        titleInp.value,
        descriptioninp.value,
        new Date(`${datepick.value} 00:00:00`),
        selectedValue,
        projectSelect.value
      );
    }

    optionCurrentlySelected(document.querySelector("#allTasks"));
    clearBodyOnNavChange();
    todoBody(todoDB.readAllTodos(), todoDB);
    document.querySelector("#add-todo-dialog").close();
    priorityStartPosition();
    form.reset();
  });

  titleInp.required = true;
  descriptioninp.required = true;
  datepick.required = true;
  priorityRadioLow.checked = true;
  priorityLabelLow.classList.add("low-prio-clicked");

  datepick.type = "date";
  titleInp.type = "text";
  priorityRadioLow.type = "radio";
  priorityRadioMed.type = "radio";
  priorityRadioHigh.type = "radio";

  dateLabel.htmlFor = "dueDate";
  priorityLabelLow.htmlFor = "priorityLow";
  priorityLabelMed.htmlFor = "priorityMed";
  priorityLabelHigh.htmlFor = "priorityHigh";

  priorityRadioLow.value = "low";
  priorityRadioMed.value = "medium";
  priorityRadioHigh.value = "high";

  priorityRadioLow.id = "priorityLow";
  priorityRadioLow.name = "priority";
  priorityRadioMed.id = "priorityMed";
  priorityRadioMed.name = "priority";
  priorityRadioHigh.id = "priorityHigh";
  priorityRadioHigh.name = "priority";

  datepick.id = "dueDate";
  datepick.name = "dueDate";
  titleInp.id = "title";
  titleInp.name = "title";
  descriptioninp.id = "description";
  descriptioninp.name = "description";

  dateLabel.textContent = "Due Date";
  titleInp.placeholder = "Title";
  descriptioninp.placeholder = "Enter description of a to-do";
  submitForm.textContent = "Add To-do";
  priorityLabelLow.textContent = "Low Priority";
  priorityLabelMed.textContent = "Medium Priority";
  priorityLabelHigh.textContent = "High Priority";

  form.classList.add("all-form-body");
  submitForm.classList.add("submit-form-btn");
  dateDiv.classList.add("date-container");
  priorityFieldset.classList.add("priority-container");
  priorityLabelLow.classList.add("low-prio");
  priorityLabelMed.classList.add("med-prio");
  priorityLabelHigh.classList.add("high-prio");

  priorityFieldset.appendChild(priorityRadioLow);
  priorityFieldset.appendChild(priorityLabelLow);
  priorityFieldset.appendChild(priorityRadioMed);
  priorityFieldset.appendChild(priorityLabelMed);
  priorityFieldset.appendChild(priorityRadioHigh);
  priorityFieldset.appendChild(priorityLabelHigh);

  dateInfo.appendChild(dateLabel);
  dateInfo.appendChild(datepick);

  projectDiv.appendChild(projectSelectLabel);
  projectDiv.appendChild(projectSelect);

  dateDiv.appendChild(dateInfo);
  dateDiv.appendChild(projectDiv);

  form.appendChild(titleInp);
  form.appendChild(descriptioninp);
  form.appendChild(dateDiv);
  form.appendChild(priorityFieldset);
  form.appendChild(submitForm);
  titleInp.focus();
  return form;
};

const addProjectForm = (projectDB, todoDB) => {
  const form = document.createElement("form");
  const projectName = document.createElement("input");
  const submitBtn = document.createElement("button");

  projectName.placeholder = "Name For Project";
  projectName.type = "text";
  projectName.required = true;
  projectName.htmlFor = "title";
  projectName.id = `projectTitle`;

  form.id = "addProject";

  submitBtn.type = "submit";
  submitBtn.textContent = "Create Project";
  submitBtn.setAttribute("form", "addProject");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    projectDB.createProject(projectName.value);

    optionCurrentlySelected(document.querySelector(".projects"));
    clearBodyOnNavChange();
    projectBody(projectDB, todoDB);

    document.querySelector("#add-todo-dialog").close();
    form.reset();
  });

  form.classList.add("all-form-body");
  submitBtn.classList.add("submit-form-btn");

  form.appendChild(projectName);
  form.appendChild(submitBtn);
  return form;
};

const addNoteForm = () => {
  const form = document.createElement("form");
  form.classList.add("all-form-body");
  form.id = "addNoteForm";

  const titleInp = document.createElement("input");
  titleInp.placeholder = "Title For Note";
  titleInp.htmlFor = "title";
  titleInp.type = "text";
  titleInp.required = true;

  const descInp = document.createElement("textarea");
  descInp.placeholder = "Enter Description For Note";
  descInp.htmlFor = "decription";
  descInp.required = true;

  const submitBtn = document.createElement("button");
  submitBtn.textContent = "Create Note";
  submitBtn.classList.add("submit-form-btn");
  submitBtn.type = "submit";
  submitBtn.setAttribute("form", "addNoteForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    optionCurrentlySelected(document.querySelector(".notes"));
    clearBodyOnNavChange();
    noteDB.createNote(titleInp.value, descInp.value);
    noteBody();
    document.querySelector("#add-todo-dialog").close();
    form.reset();
  });

  form.appendChild(titleInp);
  form.appendChild(descInp);
  form.appendChild(submitBtn);
  titleInp.focus();
  return form;
};

const priorityStartPosition = () => {
  const prioLow = document.querySelector(".low-prio");
  const prioMed = document.querySelector(".med-prio");
  const prioHigh = document.querySelector(".high-prio");

  prioLow.classList.add("low-prio-clicked");
  prioMed.classList.remove("med-prio-clicked");
  prioHigh.classList.remove("high-prio-clicked");
};

const priorityMarker = (e) => {
  const prioLow = document.querySelector(".low-prio");
  const prioMed = document.querySelector(".med-prio");
  const prioHigh = document.querySelector(".high-prio");
  switch (e.target.htmlFor) {
    case "priorityLow":
      prioLow.classList.add("low-prio-clicked");
      prioMed.classList.remove("med-prio-clicked");
      prioHigh.classList.remove("high-prio-clicked");
      break;
    case "priorityMed":
      prioLow.classList.remove("low-prio-clicked");
      prioMed.classList.add("med-prio-clicked");
      prioHigh.classList.remove("high-prio-clicked");
      break;
    case "priorityHigh":
      prioLow.classList.remove("low-prio-clicked");
      prioMed.classList.remove("med-prio-clicked");
      prioHigh.classList.add("high-prio-clicked");
      break;
  }
};
