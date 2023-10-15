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
      "clean tractor",
      "have to get the clothes washed today",
      new Date("10/10/2023 00:00:00"),
      "high",
      "none"
    ),
    new Todo(
      "clean wash",
      "have to get the clothes washed today",
      new Date("10/19/2023 00:00:00"),
      "medium",
      "none"
    ),
    new Todo(
      "clean bed",
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

  updateTodo(oldTodo, newTodo) {
    const todoIndex = this.#todoDB.findIndex((todo) => {
      return todo.title === oldTodo.title;
    });

    console.log(todoIndex);
  }

  markTodoComplete(todoTitle, status) {
    const todoIndex = this.#todoDB.findIndex((todo) => {
      return todo.title === todoTitle;
    });
    this.#todoDB[todoIndex].completed = status;
    // console.log(this.#todoDB[todoIndex]);
  }

  deleteTodo(todoTitle) {
    const todoIndex = this.#todoDB.findIndex((todo) => {
      return todo.title === todoTitle;
    });

    this.#todoDB[todoIndex] = this.#todoDB[this.#todoDB.length - 1];
    this.#todoDB.pop();
  }
}
