import NotesApi from '../../../networks/notes-api';

const Create = {
  async render() {
    return `
      <div class="content">
        <h1>Buat Note Baru</h1>

        <div class="row justify-content-start">
          <div class="col-12 col-sm-10 col-md-8 col-xl-6">
            <form id="createNoteForm">
              <div class="mb-3">
                <label for="titleNote" class="form-label">Judul</label>
                <input type="text" class="form-control" id="titleNote">
              </div>
              <div class="mb-3">
                <label for="bodyNote" class="form-label">Catatan</label>
                <textarea class="form-control" id="bodyNote" rows="3"></textarea>
              </div>

              <div class="mb-3 text-end">
                <button class="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
  },

  async afterRender() {
    console.log('create page');

    this._initialListener();
  },

  _initialListener() {
    const createNoteForm = document.getElementById('createNoteForm');
    createNoteForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      try {
        const note = this._getNoteFormData();
        const response = await NotesApi.store(note);

        window.alert(response.message);
        window.location.hash = '#/dashboard';
      } catch (error) {
        console.error(error);
      }
    });
  },

  _getNoteFormData() {
    const titleNote = document.getElementById('titleNote');
    const bodyNote = document.getElementById('bodyNote');

    return {
      title: titleNote.value,
      body: bodyNote.value,
    };
  },
};

export default Create;
