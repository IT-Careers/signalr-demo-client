const hideElements = () => {
    document.getElementById('chat-wrapper').style.display = 'none';
    document.getElementById('login-wrapper').style.display = 'none';
    document.getElementById('register-form').style.display = 'none';
}

const displayChatWrapper = () => {
    document.getElementById('chat-wrapper').style.display = 'block';

    getAllMessages()
        .then(messages => {
            messages.forEach(message => {
                const h1 = document.createElement("h1");
                h1.textContent = `[${message.username}]: ${message.content}`;
                document.getElementById('messages').appendChild(h1);
            })
        })
}

const displayLoginWrapper = () => {
    document.getElementById('login-wrapper').style.display = 'block';
}

document.getElementById('login-redirect-button').addEventListener('click', () => {
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
});

document.getElementById('register-redirect-button').addEventListener('click', () => {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'block';
});

document.getElementById('login-button').addEventListener('click', () => {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    fetch(constants.baseUrl + '/Users/Login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
    })
        .then(res => res.json())
        .then(json => {
            localStorage.setItem('token', json.token);
            config.loginToken = localStorage.getItem('token');
            hideElements()
            displayChatWrapper();
            attemptChatLogin();
        });
});

document.getElementById('register-button').addEventListener('click', () => {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;

    fetch(constants.baseUrl + '/Users/Register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password, confirmPassword})
    })
        .then(res => res.json())
        .then(json => console.log('success!'));
});


hideElements();

if(localStorage.getItem('token')) {
    displayChatWrapper();
    attemptChatLogin();
} else {
    displayLoginWrapper();
}
