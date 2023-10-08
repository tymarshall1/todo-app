import "./style.css";

export default function sidebar() {
  const content = document.querySelector("#content");
  const div = document.createElement("div");

  div.classList.add("sidebar");

  content.appendChild(div);
}
