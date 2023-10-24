import Note from "../modules/note.js";

class NoteDB {
  #noteDB = [
    new Note("Short Note", "This is a brief note."),
    new Note(
      "Medium-Length Note",
      "This note has a moderate amount of content. It provides some details about a topic."
    ),
    new Note(
      "Longer Note with More Details",
      "This is a more detailed note that contains additional information. It might describe an event, a project, or a plan in a comprehensive manner."
    ),
    new Note(
      "Very Long Note with Extensive Content",
      "This note is quite lengthy and contains a substantial amount of text. It could be used for journaling, documenting a complex topic, or recording a series of thoughts."
    ),
    new Note(
      "Another Medium-Length Note",
      "Here's another note with a moderate length. It provides information without being too lengthy."
    ),
    new Note(
      "List of Tasks",
      "1. Finish the report\n2. Call the client\n3. Prepare presentation slides\n4. Buy groceries for dinner"
    ),
    new Note(
      "Simple Reminder",
      "Don't forget to water the plants and check the mailbox today."
    ),
  ];

  createNote(title, description) {
    this.#noteDB.push(new Note(title, description));
  }

  readAllNotes() {
    return this.#noteDB;
  }

  deleteNote(noteTitle) {
    let noteIndex = this.#noteDB.findIndex((note) => {
      return note.title === noteTitle;
    });

    this.#noteDB.splice(noteIndex, 1);
  }

  updateNote(oldNote, newNote) {
    const noteIndex = this.#noteDB.findIndex((note) => {
      return note.title === oldNote.title;
    });
    this.#noteDB[noteIndex] = newNote;
  }
}

const noteDB = new NoteDB();

export { noteDB };
