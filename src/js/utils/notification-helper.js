const NotificationHelper = {
    isNotificationSupported() {
        return 'Notification' in window;
    },

    isNotificationPermissionGranted() {
        return Notification.permission === 'granted';
    },

    async requestPermission() {
        const status = await Notification.requestPermission();

        if (status === 'denied') {
            window.alert('Notification permission has been denied');
        }

        if (status === 'default') {
            window.alert('Notification permission has been closed');
        }
    },

    async isNotificationReady() {
        if (!this.isNotificationSupported()) {
            window.alert('Notification not supported in this browser');
            return false;
        }

        if (!this.isNotificationPermissionGranted()) {
            window.alert('User did not granted the notification permission yet');

            const status = Notification.permission;
            if (status === 'denied') {
                window.alert(
                    "User didn't give the notification permission. Another word, notification has been denied by user. If you want to enable it, you can change the notification permission on your browser setting",
                );
                return false;
            }

            if (status === 'default') {
                window.alert(
                    'The notification permission has been ignored by user. If you want to enable it, you can change the notification permission on your browser setting',
                );
                return false;
            }
        }

        return true;
    },
};

export default NotificationHelper;
