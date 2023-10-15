const weekFromToday = (todoDB) => {
  const currentDate = new Date(); // Get the current date and time
  currentDate.setHours(0, 0, 0, 0); // Set the time to midnight
  const weekFromToday = new Date();
  weekFromToday.setHours(0, 0, 0, 0);
  weekFromToday.setDate(weekFromToday.getDate() + 7);

  const filteredTodos = todoDB.readAllTodos().filter((todo) => {
    const todoDate = new Date(todo.dueDate);
    todoDate.setHours(0, 0, 0, 0); // Set the time of each todo to midnight
    return (
      todoDate.getTime() >= currentDate.getTime() &&
      todoDate.getTime() <= weekFromToday.getTime()
    );
  });
  return filteredTodos;
};

const monthFromToday = (todoDB) => {
  const currentDate = new Date(); // Get the current date and time
  currentDate.setHours(0, 0, 0, 0); // Set the time to midnight
  const monthFromToday = new Date();
  monthFromToday.setHours(0, 0, 0, 0);
  monthFromToday.setDate(monthFromToday.getDate() + 30);

  const filteredTodos = todoDB.readAllTodos().filter((todo) => {
    const todoDate = new Date(todo.dueDate);
    todoDate.setHours(0, 0, 0, 0); // Set the time of each todo to midnight
    return (
      todoDate.getTime() >= currentDate.getTime() &&
      todoDate.getTime() <= monthFromToday.getTime()
    );
  });
  return filteredTodos;
};

const todaysTasks = (todoDB) => {
  const currentDate = new Date(); // Get the current date and time
  currentDate.setHours(0, 0, 0, 0); // Set the time to midnight

  const filteredTodos = todoDB.readAllTodos().filter((todo) => {
    const todoDate = new Date(todo.dueDate);
    todoDate.setHours(0, 0, 0, 0); // Set the time of each todo to midnight
    return todoDate.getTime() === currentDate.getTime();
  });
  return filteredTodos;
};

export { weekFromToday, monthFromToday, todaysTasks };
