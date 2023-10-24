import Project from "../modules/project.js";

export default class ProjectDB {
  #projectDB = [
    new Project("none", false),
    new Project("Gym", false),
    new Project("Reading", false),
    new Project("Travel", false),
    new Project("Learning", false),
    new Project("Blogging", false),
    new Project("Coding", false),
    new Project("Art", false),
  ];

  createProject(title, status) {
    this.#projectDB.push(new Project(title, status));
  }

  readAllProjects() {
    return this.#projectDB;
  }

  updateProject(projectTitle) {}

  deleteProject(projectTitle) {}
}
