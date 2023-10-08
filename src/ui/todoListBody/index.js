import "./style.css";

export default function todoBody() {
  const content = document.querySelector("#content");
  const div = document.createElement("div");

  div.classList.add("todo-list");

  content.appendChild(div);
}
