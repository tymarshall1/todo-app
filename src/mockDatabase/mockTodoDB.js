import Todo from "../modules/todo.js";

export default class TodoDB {
  #todoDB = [
    new Todo(
      "wash dishes",
      "have to get the dishes done today",
      "10/7/2023",
      "high",
      "none"
    ),
  ];

  createTodo(title, description, dueDate, priority, project) {
    this.#todoDB.push(new Todo(title, description, dueDate, priority, project));
  }

  readAllTodos() {
    return this.#todoDB;
  }

  updateTodo(todoTitle) {}

  deleteTodo(todoTitle) {}
}
