import "./style.css";
import { todoBody, removeTodosFromScreen } from "../todoListBody/index.js";
import { optionCurrentlySelected } from "../sidebar/index.js";
import exit from "../assets/xBtn.svg";

export default function addFormContainer(todoDB) {
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
  formbody.appendChild(addTodoFormBody(todoDB));

  formContainer.appendChild(formHeader);
  formContainer.appendChild(formbody);
  return formContainer;
}

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
        selectedValue,
        "none"
      );
    }

    optionCurrentlySelected(document.querySelector("#allTasks"));
    removeTodosFromScreen();
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
