import BookmarkNotesIdb from '../../data/bookmark-notes-idb';
import {
    bookmarkNoteItemTemplate,
    createNoteListEmptyTemplate,
    createRemoveBookmarkButtonTemplate,
} from '../templates/template-creator';

const Bookmark = {
    async render() {
        return `
      <div class="content">
        <h2>Your Bookmark Notes</h2>

        <div id="notesList" class="mt-2 row justify-content-center gy-4"></div>
      </div>
    `;
    },

    async afterRender() {
        console.log('bookmark page');

        this._initialData();
    },

    async _initialData() {
        const notes = await BookmarkNotesIdb.getAllBookmarkedNotes();
        const notesListEl = document.getElementById('notesList');

        // Check if notes data is empty
        if (!notes.length) {
            return this._populateNotesListEmpty(notesListEl);
        }

        this._displayNotes(notesListEl, notes);
    },

    _displayNotes(containerEl, notes) {
        containerEl.innerHTML = '';

        notes.forEach((note) => {
            const bookmarkButton = createRemoveBookmarkButtonTemplate(note.id);

            containerEl.innerHTML += `
        <div class="col-12">
          ${bookmarkNoteItemTemplate(note, bookmarkButton)}
        </div>
      `;
        });

        // Add event listener to remove bookmark button for each note item
        containerEl.querySelectorAll(`#removeBookmarkButton`).forEach((el) => {
            el.addEventListener('click', async (event) => {
                const noteId = event.target.dataset.id;

                try {
                    await BookmarkNotesIdb.deleteBookmark(noteId);

                    this._initialData();
                } catch (error) {
                    console.error('Something wrong when deleting bookmark note from IndexedDB');
                    console.error(error);
                }
            });
        });

    },

    _populateNotesListEmpty(containerEl) {
        containerEl.innerHTML = createNoteListEmptyTemplate();
    },
};

export default Bookmark;