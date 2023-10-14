import "./style.css";
import { sidebar, optionCurrentlySelected } from "./ui/sidebar/index.js";
import appHeader from "./ui/appHeader/index.js";
import { todoBody } from "./ui/todoListBody/index.js";
import TodoDB from "./mockDatabase/mockTodoDB.js";

const todoDB = new TodoDB();

window.addEventListener("load", () => {
  optionCurrentlySelected(document.querySelector("#allTasks"));
  todoBody(todoDB.readAllTodos(), todoDB);
});

sidebar(todoDB);
appHeader();
