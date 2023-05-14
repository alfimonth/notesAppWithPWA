import { isMobileOrTabletDevice } from './utils';
const CameraHelper = {
    width: 0,
    height: 0,

    streaming: false,

    async init({ containerCamera, videoCamera, canvasCamera }) {
        this._cameraContainer = containerCamera;

        this._videoCameraEl = videoCamera;
        this._canvasCameraEl = canvasCamera;

        // get width and height of camera container element to set canvas and video element size
        this.width = this._cameraContainer.clientWidth;
        this.height = this._cameraContainer.clientHeight;

        this._stream = await this.getCameraStream();
        this._initialListener();
    },

    openCamera() {
        try {
            this._videoCameraEl.srcObject = this._stream;
            this._videoCameraEl.play();
        } catch (error) {
            console.error(`An error occurred: ${error}`);
        }
    },

    closeCamera() {
        try {
            this._videoCameraEl.pause();
            this._videoCameraEl.removeAttribute('src');
            this._videoCameraEl.load();
            this._stream.getTracks()[0].stop();
        } catch (error) {
            console.error(`An error occurred: ${error}`);
        }
    },

    _initialListener() {
        this._videoCameraEl.addEventListener('canplay', (event) => {
            if (this.streaming) return;

            // Set photo width and height
            this._videoCameraEl.setAttribute('width', '100%');
            this._videoCameraEl.setAttribute('height', '100%');
            this._canvasCameraEl.setAttribute('width', '100%');
            this._canvasCameraEl.setAttribute('height', '100%');

            this.streaming = true;
        });
    },

    isMediaDevicesAvailable() {
        return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    },

    async getCameraStream() {
        if (!this.isMediaDevicesAvailable()) return;

        let facingMode = 'user';
        if (isMobileOrTabletDevice()) {
            facingMode = { exact: 'environment' };
        }


        return await navigator.mediaDevices.getUserMedia({
            // video: true,
            video: { facingMode },
            audio: false,
        });
    },

    getBlankPhoto() {
        const context = this._canvasCameraEl.getContext('2d');
        context.fillStyle = '#AAA';
        context.fillRect(0, 0, this._canvasCameraEl.width, this._canvasCameraEl.height);

        return this._canvasCameraEl.toDataURL('image/png');
    },

    takePicture() {
        this.width = this._cameraContainer.clientWidth;
        this.height = this._cameraContainer.clientHeight;

        const context = this._canvasCameraEl.getContext('2d');

        if (this.width && this.height) {
            console.log('takePicture: Taking picture...');

            this._canvasCameraEl.width = this.width;
            this._canvasCameraEl.height = this.height;
            context.drawImage(this._videoCameraEl, 0, 0, this.width, this.height);

            const data = this._canvasCameraEl.toDataURL('image/png');

            this.streaming = false;
            return data;
        }
    },
};

export default CameraHelper;