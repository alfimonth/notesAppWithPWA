import NotesApi from '../../../networks/notes-api';
import CameraHelper from '../../../utils/camera-helper';
import { recognizePictureWithVision } from '../../../utils/utils';
import { Modal } from 'bootstrap';

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
                <div class="mt-2">
                  <button type="button" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#cameraModal">
                    Get Text from Camera
                  </button>
                </div>
              </div>

              <div class="mb-3 text-end">
                <button class="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Modal -->
      <div 
        class="modal fade" id="cameraModal" 
        data-bs-backdrop="static" data-bs-keyboard="false" 
        tabindex="-1" aria-labelledby="cameraModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-xl modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="cameraModalLabel">Get Text from Camera</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="w-100" id="cameraContainer">
                <p>Camera:</p>
                <video id="videoCamera">Video stream not available.</video>
                <div id="cameraTools" class="d-flex justify-content-center mt-2">
                  <button type="button" id="takePictureBtn" class="btn btn-light">Take Picture</button>
                </div>
              </div>
              <canvas id="canvasCamera" class="d-none"></canvas>

              <div id="outputCameraContainer">
                <p>Output:</p>
                <img id="photoOutput" alt="The screen capture will appear in this box." width="100%" height="100%" />
                <div id="outputTools" class="d-flex justify-content-center mt-2">
                  <button type="button" id="getTextFromPictureBtn" class="btn btn-light">Get Text</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  async afterRender() {
    console.log('create page');

    // Camera
    this._cameraContainer = document.getElementById('cameraContainer');
    this._videoEl = document.getElementById('videoCamera');
    this._canvasEl = document.getElementById('canvasCamera');

    this._cameraModalEl = document.getElementById('cameraModal');
    this._cameraModal = new Modal(this._cameraModalEl, {
      backdrop: 'static',
    });
    this._photoOutput = document.getElementById('photoOutput');
    this._picture = null;

    // Form
    this._titleNote = document.getElementById('titleNote');
    this._bodyNote = document.getElementById('bodyNote');

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

    this._cameraModalEl.addEventListener('shown.bs.modal', async (event) => {
      await CameraHelper.init({
        containerCamera: this._cameraContainer,
        videoCamera: this._videoEl,
        canvasCamera: this._canvasEl,
      });

      CameraHelper.openCamera();
      this._photoOutput.src = CameraHelper.getBlankPhoto();
    });

    this._cameraModalEl.addEventListener('hidden.bs.modal', async (event) => {
      CameraHelper.closeCamera();
    });

    const takePictureBtn = document.getElementById('takePictureBtn');
    takePictureBtn.addEventListener('click', async (event) => {
      this._photoOutput.src = this._picture = CameraHelper.takePicture();
    });

    const getTextFromPictureBtn = document.getElementById('getTextFromPictureBtn');
    getTextFromPictureBtn.addEventListener('click', async (event) => {
      if (this._picture) {

        const base64 = this._picture.substring("data:image/png;base64,".length);
        console.log(base64);
        // const response = await recognizePictureWithVision({ photo: this._picture });
        // this._bodyNote.value = response;
        const { text } = await recognizePictureWithVision({ base64Image: base64 });
        this._bodyNote.value = text;
        this._cameraModal.hide();
      }
    });
  },



  _getNoteFormData() {
    // const titleNote = document.getElementById('titleNote');
    // const bodyNote = document.getElementById('bodyNote');

    // return {
    //   title: titleNote.value,
    //   body: bodyNote.value,
    // };
    return {
      title: this._titleNote.value,
      body: this._bodyNote.value,
    };

  },
};

export default Create;
