//const axios = require('axios');
const baseUrl = 'http://localhost:8080';

export const getAll = () => {
    return fetch(`${baseUrl}/boards`)
        .then(res => res.json())
};
export const deleteOne = (id) => {
    return fetch(`${baseUrl}/boards/delete/${id}`,{method:"post"})
        .then(res => console.log(res.json()))
        
};
export const getOne = (id) => {
    return fetch(`${baseUrl}/boards/${id}`)
        .then(res => res.json())
};