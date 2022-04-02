const getAllMessages = () => {
    return fetch(constants.baseUrl + '/Messages')
        .then(res => res.json());
}
