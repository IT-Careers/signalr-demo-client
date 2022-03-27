const getAllMessages = () => {
    return fetch('https://localhost:7116/Messages')
        .then(res => res.json());
}
