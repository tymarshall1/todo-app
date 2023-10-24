import Todo from "../modules/todo.js";

export default class TodoDB {
  #todoDB = [
    new Todo(
      "Complete Project Report",
      "Finish the project report and submit it to the supervisor.",
      new Date("10/25/2023 14:30:00"),
      "high",
      "none"
    ),
    new Todo(
      "Grocery Shopping",
      "Buy groceries for the week, including fruits, vegetables, and milk.",
      new Date("10/28/2023 10:00:00"),
      "medium",
      "none"
    ),
    new Todo(
      "Gym Workout",
      "Hit the gym for a workout session. Focus on cardio and strength training.",
      new Date("10/29/2023 16:00:00"),
      "high",
      "Gym"
    ),
    new Todo(
      "Read a Book",
      "Spend time reading 'The Great Gatsby' by F. Scott Fitzgerald.",
      new Date("10/30/2023 19:00:00"),
      "medium",
      "Reading"
    ),
    new Todo(
      "Plan Weekend Getaway",
      "Research and plan a weekend trip to a nearby tourist destination.",
      new Date("10/28/2023 00:00:00"),
      "low",
      "Travel"
    ),
    new Todo(
      "Attend Web Development Workshop",
      "Participate in a web development workshop to learn new skills.",
      new Date("10/25/2023 13:00:00"),
      "medium",
      "Learning"
    ),
    new Todo(
      "Write a Blog Post",
      "Create and publish a blog post on a topic of interest.",
      new Date("11/15/2023 18:30:00"),
      "high",
      "Blogging"
    ),
    new Todo(
      "Practice Coding",
      "Spend time practicing coding problems and algorithms.",
      new Date("11/16/2023 15:00:00"),
      "medium",
      "Coding"
    ),
    new Todo(
      "Visit Art Gallery",
      "Explore the local art gallery and appreciate the artwork.",
      new Date("11/17/2023 11:00:00"),
      "low",
      "Art"
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
    this.#todoDB[todoIndex] = newTodo;
  }

  markTodoComplete(todoTitle, status) {
    const todoIndex = this.#todoDB.findIndex((todo) => {
      return todo.title === todoTitle;
    });
    this.#todoDB[todoIndex].completed = status;
  }

  deleteTodo(todoTitle) {
    const todoIndex = this.#todoDB.findIndex((todo) => {
      return todo.title === todoTitle;
    });
    this.#todoDB.splice(todoIndex, 1);
  }
}
