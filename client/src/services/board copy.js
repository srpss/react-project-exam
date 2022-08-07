//const axios = require('axios');
import * as request from "./requester";
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
export const create =  (data) => {
   

    return  fetch(`${baseUrl}/boards`,{method:"post",mode: 'cors',headers: {'Content-Type': 'application/json' },body:JSON.stringify(data)})
       .then(res => res.json())
};

export const login =  (data) => {
    return  fetch(`${baseUrl}/api/auth/signin`,{method:"post",mode: 'cors',headers: {'Content-Type': 'application/json' },body:JSON.stringify(data)})
       .then(res => res.json())
};

export const register =  (data) => {
    return  fetch(`${baseUrl}/api/auth/signup`,{method:"post",mode: 'cors',headers: {'Content-Type': 'application/json' },body:JSON.stringify(data)})
       .then(res => res.json())
};