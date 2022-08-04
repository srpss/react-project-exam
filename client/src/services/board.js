//const axios = require('axios');
const baseUrl = 'http://localhost:8080';

export const getAll = () => {
    return fetch(`${baseUrl}/boards`)
        .then(res => res.json())
};
