import { noteDB } from "../../mockDatabase/mockNoteDB.js";
import "./style.css";
import deleteButton from "../assets/deleteBtn.svg";
import edit from "../assets/editBtn.svg";
import Note from "../../modules/note.js";

const noteBody = () => {
  const content = document.querySelector("#content");
  const noteContainer = document.createElement("div");

  const allNotes = noteDB.readAllNotes();
  console.log(allNotes);
  allNotes.forEach((note) => {
    noteContainer.appendChild(singleNote(note));
  });

  noteContainer.classList.add("note-container");

  content.appendChild(noteContainer);
};

const singleNote = (note) => {
  const container = document.createElement("div");
  const noteContentContainer = document.createElement("div");
  const noteTitle = document.createElement("h1");
  const noteDesc = document.createElement("p");

  noteTitle.textContent = note.title;
  noteDesc.textContent = note.description;

  container.classList.add("single-note");
  noteContentContainer.classList.add("note-content");

  container.appendChild(rippedNoteEffect());
  noteContentContainer.appendChild(noteTitle);
  noteContentContainer.appendChild(noteDesc);
  noteContentContainer.appendChild(noteBtns());
  container.appendChild(noteContentContainer);

  container.appendChild(rippedNoteEffect());

  return container;
};

const noteBtns = () => {
  const buttonContainer = document.createElement("div");
  const noteDeleteBtn = document.createElement("img");
  const noteEditBtn = document.createElement("img");

  buttonContainer.classList.add("note-btn-container");

  noteDeleteBtn.src = deleteButton;
  noteDeleteBtn.alt = "trash can button";
  noteDeleteBtn.id = "noteDeleteBtn";
  noteDeleteBtn.addEventListener("click", (e) => handleDeleteClick(e));

  noteEditBtn.src = edit;
  noteEditBtn.alt = "pencil edit button";
  noteEditBtn.id = "noteEditBtn";
  noteEditBtn.addEventListener("click", (e) => handleEditClick(e));

  buttonContainer.appendChild(noteEditBtn);
  buttonContainer.appendChild(noteDeleteBtn);

  return buttonContainer;
};

const handleDeleteClick = (e) => {
  const noteContent = e.target.closest(".note-content");
  const noteTitle = noteContent.firstChild.textContent;
  noteDB.deleteNote(noteTitle);
  e.target.closest(".single-note").remove();
};

const handleEditClick = (e) => {
  const noteContent = e.target.closest(".note-content");
  const noteTitle = noteContent.firstChild.textContent;
  const noteDesc = noteContent.firstChild.nextSibling.textContent;

  const container = document.createElement("div");
  container.classList.add("edit-note-container");
  container.contentEditable = true;

  const titleInp = document.createElement("textarea");
  titleInp.classList.add("title-input");
  titleInp.style.height = noteContent.firstChild + "px";
  titleInp.value = noteTitle;
  titleInp.addEventListener("input", function () {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
  });

  const descInp = document.createElement("textarea");
  descInp.value = noteDesc;
  descInp.classList.add("description-input");
  descInp.style.height = noteContent.firstChild.nextSibling.scrollHeight + "px";
  descInp.addEventListener("input", function () {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
  });

  const btnContainer = document.createElement("div");
  btnContainer.classList.add("edit-note-btn-container");

  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "Cancel";
  cancelBtn.addEventListener("click", () => {
    document.querySelector(".note-container").remove();
    noteBody();
  });

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.addEventListener("click", () => {
    const currentNote = new Note(noteTitle, noteDesc);
    const editedNote = new Note(titleInp.value, descInp.value);
    document.querySelector(".note-container").remove();
    noteDB.updateNote(currentNote, editedNote);
    noteBody();
  });

  btnContainer.appendChild(cancelBtn);
  btnContainer.appendChild(editBtn);

  container.appendChild(titleInp);
  container.appendChild(descInp);
  container.appendChild(btnContainer);

  noteContent.innerHTML = "";
  noteContent.appendChild(container);
  titleInp.focus();
};

const rippedNoteEffect = () => {
  const container = document.createElement("div");

  container.classList.add("ripped-note");

  for (let i = 0; i < 5; i++) {
    const edgesRight = document.createElement("div");
    const edgesLeft = document.createElement("div");
    edgesRight.classList.add("sharp-edge-right");
    edgesLeft.classList.add("sharp-edge-left");
    container.appendChild(edgesLeft);
    container.appendChild(edgesRight);
  }

  return container;
};

export { noteBody };
