import AuthApi from '../../networks/auth-api';
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
    const user = await AuthApi.getUserInfo();

    // Get notesList element
    const notesListEl = document.getElementById('notesList');

    // Check if notes data is empty
    if (!notes.data.length) {
      return this._populateNotesListEmpty(notesListEl);
    }

    this._populateNotesList(notesListEl, notes, user.data.name);
  },

  _populateNotesList(containerEl, notes, user) {
    containerEl.innerHTML = '';

    const notesdata = notes.data
    notesdata.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Populate notes list with note item template
    notesdata.forEach((note) => {
      containerEl.innerHTML += `
        <div class="col-12">
          ${noteItemTemplate(note, user)}
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
