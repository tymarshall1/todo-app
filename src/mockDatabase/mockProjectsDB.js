import Project from "../modules/project.js";

export default class ProjectDB {
  #projectDB = [new Project("Gym")];

  createProject(title) {
    this.#projectDB.push(new Project(title));
  }

  readAllProjects() {
    return this.#projectDB;
  }

  updateProject(projectTitle) {}

  deleteProject(projectTitle) {}
}
