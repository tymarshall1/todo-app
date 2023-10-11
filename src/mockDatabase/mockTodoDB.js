import Todo from "../modules/todo.js";

export default class TodoDB {
  #todoDB = [
    new Todo(
      "wash dishes",
      "have to get the dishes done today",
      new Date("10/14/2023 00:00:00"),
      "high",
      "none"
    ),
    new Todo(
      "clean clothes",
      "have to get the clothes washed today",
      new Date("10/10/2023 00:00:00"),
      "high",
      "none"
    ),
    new Todo(
      "clean clothes",
      "have to get the clothes washed today",
      new Date("10/19/2023 00:00:00"),
      "medium",
      "none"
    ),
    new Todo(
      "clean clothes",
      "have to get the clothes washed today",
      new Date("10/18/2023 00:00:00"),
      "low",
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
