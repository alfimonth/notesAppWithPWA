// import NotificationHelper from './notification-helper';

// const PushNotificationHelper = {
//     async init({ subscribeButton, unsubscribeButton }) {
//         this._subscribeButton = subscribeButton;
//         this._unsubscribeButton = unsubscribeButton;

//         await this._initialListener();
//     },

//     async _initialListener() {
//         this._subscribeButton.addEventListener('click', (event) => {
//             console.log('Adding subscription to push notification...');
//         });

//         this._unsubscribeButton.addEventListener('click', (event) => {
//             console.log('Removing subscription to push notification...');
//         });
//     },
// };

// export default PushNotificationHelper;
import PushNotificationAPI from '../networks/push-notification-api';
import NotificationHelper from './notification-helper';
import CONFIG from '../globals/config';
import { convertUrlB64ToUint8Array } from './utils';

const PushNotificationHelper = {
    async init({ subscribeButton, unsubscribeButton }) {
        this._subscribeButton = subscribeButton;
        this._unsubscribeButton = unsubscribeButton;

        await this._initialServiceWorker();
        await this._initialState();
        await this._initialListener();
    },

    async _initialServiceWorker() {
        if (!('serviceWorker' in navigator)) {
            return null;
        }

        this._registrationServiceWorker = await navigator.serviceWorker.getRegistration();

        if (!this._registrationServiceWorker) {
            this._hidePushNotificationTools();
            window.alert('Service worker is not registered yet in this browser or not supported');
        }
    },

    async _initialListener() {
        this._subscribeButton.addEventListener('click', async (event) => {
            // Request permission
            await NotificationHelper.requestPermission();
            this._subscribePushMessage(event);
        });

        this._unsubscribeButton.addEventListener('click', (event) => {
            this._unsubscribePushMessage(event);
        });
    },

    async _initialState() {
        this._showOrHiddenSubscribeButton();
    },

    async _subscribePushMessage(event) {
        event.stopPropagation();

        if (await this._anySubscriptionAvailable()) {
            window.alert('Already subscribe to push message');
            return;
        }

        if (!(await NotificationHelper.isNotificationReady())) {
            console.log("Notification isn't available");
            return;
        }

        console.log('_subscribePushMessage: Subscribing to push message...');
        let pushSubscription = null;
        try {
            // Subscribe push message
            pushSubscription = await this._registrationServiceWorker?.pushManager.subscribe(
                this._generateSubscribeOptions(),
            );

            if (!pushSubscription) {
                console.log('Failed to subscribe push message');
                return;
            }

            // Send push subscription to server for subscribe
            const response = await PushNotificationAPI.subscribe(pushSubscription.toJSON());

            window.alert(response.message);
        } catch (error) {
            console.error(error);

            // Undo subscribing push notification
            await pushSubscription?.unsubscribe();
        }

        this._showOrHiddenSubscribeButton();
    },

    async _unsubscribePushMessage(event) {
        event.stopPropagation();

        console.log('_unsubscribePushMessage: Unsubscribing to push message...');
        let pushSubscription = null;
        try {
            pushSubscription = await this._registrationServiceWorker?.pushManager.getSubscription();
            if (!pushSubscription) {
                window.alert("Haven't subscribing to push message");
                return;
            }

            // Send push subscription to server for unsubscribe
            const response = await PushNotificationAPI.unsubscribe(pushSubscription.toJSON());

            // Unsubscribe push message
            const isHasBeenUnsubscribed = await pushSubscription.unsubscribe();

            // If failed to unsubscribe push message, then subscribe again to server
            if (!isHasBeenUnsubscribed) {
                window.alert('Failed to unsubscribe push message');
                await PushNotificationAPI.subscribe(
                    CONFIG.PUSH_MSG_SUBSCRIBE_URL,
                    pushSubscription.toJSON(),
                );

                return;
            }

            window.alert(response.message);
        } catch (error) {
            console.error(error);
        }

        this._showOrHiddenSubscribeButton();
    },

    _generateSubscribeOptions() {
        return {
            userVisibleOnly: true,
            applicationServerKey: convertUrlB64ToUint8Array(CONFIG.PUSH_MSG_VAPID_PUBLIC_KEY),
        };
    },

    async _anySubscriptionAvailable() {
        const checkSubscription = await this._registrationServiceWorker?.pushManager.getSubscription();
        return Boolean(checkSubscription);
    },

    async _showOrHiddenSubscribeButton() {
        const state = (await this._anySubscriptionAvailable()) || false;

        if (state) {
            // hide subscribe button
            this._subscribeButton.classList.add('d-none');
            this._subscribeButton.classList.remove('d-inline-block');

            // show unsubscribe button
            this._unsubscribeButton.classList.add('d-inline-block');
            this._unsubscribeButton.classList.remove('d-none');
        } else {
            // show subscribe button
            this._subscribeButton.classList.add('d-inline-block');
            this._subscribeButton.classList.remove('d-none');

            // hide unsubscribe button
            this._unsubscribeButton.classList.add('d-none');
            this._unsubscribeButton.classList.remove('d-inline-block');
        }
    },

    _hidePushNotificationTools() {
        document.getElementById('pushNotificationTools').style.display = 'none';
    },
};

export default PushNotificationHelper;