//const axios = require('axios');
import * as request from "./request";
const baseUrl = 'http://localhost:8080';


export const getAll = () => request.get(`${baseUrl}/boards`)
    
export const getMy = (_id) => request.get(`${baseUrl}/myboards/${_id}`)
    
export const getUser = (_id) => request.get(`${baseUrl}/user/${_id}`)

export const updateUser = (_id, data) => request.post(`${baseUrl}/user/${_id}`, data)

export const deleteOne = (id) => request.post(`${baseUrl}/boards/delete/${id}`)

export const getOne = (id) => request.get(`${baseUrl}/boards/${id}`)

export const create =  (data) => request.post(`${baseUrl}/boards`, data)
   
export const login =  (data) => request.post(`${baseUrl}/api/auth/signin`,data)

export const register =  (data) => request.post(`${baseUrl}/api/auth/signup`, data)

export const updatePass = (_id, data) => request.post(`${baseUrl}/user-pass/${_id}`, data)

export const updateDescription = (_id, data) => request.post(`${baseUrl}/boards/${_id}`, data)
