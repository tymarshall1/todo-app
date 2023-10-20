import Project from "../modules/project.js";

export default class ProjectDB {
  #projectDB = [
    new Project("Gym", false),
    new Project("Odin Project", false),
    new Project("none", false),
  ];

  createProject(title) {
    this.#projectDB.push(new Project(title));
  }

  readAllProjects() {
    return this.#projectDB;
  }

  updateProject(projectTitle) {}

  deleteProject(projectTitle) {}
}
