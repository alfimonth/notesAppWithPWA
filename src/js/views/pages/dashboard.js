import NotesApi from '../../networks/notes-api';
import { createNoteListEmptyTemplate, noteItemTemplate } from '../templates/template-creator';

const Dashboard = {
  async render() {
    return `
      <div class="content">
        <h1>Dasbor</h1>

        <div id="notesList" class="mt-2 row justify-content-center gy-4"></div>
      </div>
    `;
  },

  async afterRender() {
    console.log('dashboard page');

    this._initialData();
  },

  async _initialData() {
    // Get all notes data from API
    const notes = await NotesApi.getAll();

    // Get notesList element
    const notesListEl = document.getElementById('notesList');

    // Check if notes data is empty
    if (!notes.data.length) {
      return this._populateNotesListEmpty(notesListEl);
    }

    this._populateNotesList(notesListEl, notes);
  },

  _populateNotesList(containerEl, notes) {
    containerEl.innerHTML = '';

    // Populate notes list with note item template
    notes.data.forEach((note) => {
      containerEl.innerHTML += `
        <div class="col-12">
          ${noteItemTemplate(note)}
        </div>
      `;
    });

    // Add event listener to delete button for each note item
    containerEl.querySelectorAll(`#deleteNoteButton`).forEach((el) => {
      el.addEventListener('click', async (event) => {
        const noteId = event.target.dataset.id;

        try {
          const response = await NotesApi.destroy(noteId);

          window.alert(response.message);
          this._initialData();
        } catch (error) {
          console.log(error);
        }
      });
    });
  },

  _populateNotesListEmpty(containerEl) {
    containerEl.innerHTML = createNoteListEmptyTemplate();
  },
};

export default Dashboard;
