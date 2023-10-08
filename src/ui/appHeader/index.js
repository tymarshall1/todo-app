import "./style.css";

export default function appHeader() {
  const content = document.querySelector("#content");
  const headerContainer = document.createElement("div");
  const headerText = document.createElement("h1");

  headerText.textContent = "To-do List";

  headerContainer.classList.add("app-header");

  headerContainer.appendChild(headerText);
  content.appendChild(headerContainer);
}
