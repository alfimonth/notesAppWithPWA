import API_ENDPOINT from '../globals/api-endpoint';

const PushNotificationAPI = {
    async subscribe({ endpoint, keys }) {
        const response = await fetch(API_ENDPOINT.PUSH_MSG_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ endpoint, keys }),
        });

        return await response.json();
    },

    async unsubscribe({ endpoint, keys }) {
        const response = await fetch(API_ENDPOINT.PUSH_MSG_URL, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ endpoint, keys }),
        });

        return await response.json();
    },
};

export default PushNotificationAPI;