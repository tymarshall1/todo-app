import "./style.css";
import addTodoSVG from "../assets/addtodo.svg";
import todoBody from "../todoListBody/index.js";

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

const addFormContainer = (todoDB) => {
  const formContainer = document.createElement("div");
  const formHeader = document.createElement("div");
  const formHeaderText = document.createElement("h1");
  const formbody = document.createElement("div");
  const elementToAdd = document.createElement("ul");
  const todo = document.createElement("li");
  const project = document.createElement("li");
  const note = document.createElement("li");

  formHeaderText.textContent = "Add a New...";
  todo.textContent = "To-do";
  project.textContent = "Project";
  note.textContent = "Note";

  formbody.classList.add("form-body");
  elementToAdd.classList.add("element-to-add");
  formContainer.classList.add("add-todo-form");
  formHeader.classList.add("form-header");

  elementToAdd.appendChild(todo);
  elementToAdd.appendChild(project);
  elementToAdd.appendChild(note);

  formHeader.appendChild(formHeaderText);

  formbody.appendChild(elementToAdd);
  formbody.appendChild(addTodoFormBody(todoDB));

  formContainer.appendChild(formHeader);
  formContainer.appendChild(formbody);
  return formContainer;
};

const addTodoFormBody = (todoDB) => {
  const titleInp = document.createElement("input");
  const descriptioninp = document.createElement("textarea");
  const submitForm = document.createElement("button");
  const dateDiv = document.createElement("div");
  const dateLabel = document.createElement("label");
  const datepick = document.createElement("input");
  const form = document.createElement("form");

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
        selectedValue
      );
    }

    removeTodosFromScreen();
    todoBody(todoDB.readAllTodos());
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

  priorityRadioLow.value = "lowPriority";
  priorityRadioMed.value = "medPriority";
  priorityRadioHigh.value = "highPriority";

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
  submitForm.textContent = "Submit";
  priorityLabelLow.textContent = "Low Priority";
  priorityLabelMed.textContent = "Medium Priority";
  priorityLabelHigh.textContent = "High Priority";

  form.classList.add("todo-form-body");
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

  dateDiv.appendChild(dateLabel);
  dateDiv.appendChild(datepick);

  form.appendChild(titleInp);
  form.appendChild(descriptioninp);
  form.appendChild(dateDiv);
  form.appendChild(priorityFieldset);
  form.appendChild(submitForm);

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

const addProjectFormBody = () => {};
const addNoteFormBody = () => {};

const removeTodosFromScreen = () => {
  const todoBody = document.querySelectorAll(".todo-list");
  todoBody.forEach((todoList) => {
    todoList.remove();
  });
};
