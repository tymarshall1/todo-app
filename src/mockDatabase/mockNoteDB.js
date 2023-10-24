import Note from "../modules/note.js";

class NoteDB {
  #noteDB = [
    new Note(
      "test",
      "test description hey look this is a note hey look this is a note hey look this is a note hey look this is a note "
    ),
    new Note("LOOK!", "hey look this is a note"),
    new Note(
      "yada yada",
      "blah blahblah blahblah blahblah blahblah blahs bahhhhh booooyaa blahhh blacchhhh"
    ),
    new Note(
      "another test note",
      "This is a test to see the length fo the noteThis is a test to see the length fo the noteen the windocan I make the grid-template-rows expand in order to enclose the te"
    ),
    new Note(
      "Okay going good",
      "today i ran a 5k and it was the greatest thing ive ever accompplished in life. I cant believe this is really true"
    ),
    new Note(
      "yay",
      "hen the windocan I make the grid-template-rows expand in order to enclose the text? I hen the windocan I make the grid-template-rows expand in order to enclose the text? I already tried setting it to auto but it just follows the proportions of the image."
    ),
    new Note("okay yes another", "test description"),
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
