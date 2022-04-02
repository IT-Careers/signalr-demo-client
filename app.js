const config = {
    loginToken: localStorage.getItem('token'),
    username: ''
};

const attemptChatLogin = () => {
    if (config.loginToken) {
        config.username = JSON.parse(atob(localStorage.token.split('.')[1])).Username;
        const connection = new signalR.HubConnectionBuilder()
            .withUrl(constants.baseUrl + '/chat')
            .configureLogging(signalR.LogLevel.Information)
            .build();

        async function start() {
            try {
                await connection.start();
                console.log('SignalR Connected.');
            } catch (err) {
                console.log(err);
                setTimeout(start, 5000);
            }
        }

        connection.onclose(async () => {
            await start();
        });

        connection.on('ReceiveMessage', (message) => {
            const h1 = document.createElement('h1');
            h1.textContent = `${message}`;
            document.getElementById('messages').appendChild(h1);
        });

        document.getElementById('send-button').addEventListener('click', async () => {
            const message = document.getElementById('message').value;

            if (message) {
                await connection.invoke('SendMessage', config.username, message);
                document.getElementById('message').value = '';
            }
        });

        start();
    }
};
