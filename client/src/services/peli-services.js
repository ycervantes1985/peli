import axios from 'axios';

export const createPeli = (peli) => {
    const newPeli = axios.post('http://localhost:8000/api/peli', peli);
    return newPeli;
}

export const getAllPelis = () => axios.get('http://localhost:8000/api/peli');

export const deletePeli = (id) => axios.delete(`http://localhost:8000/api/peli/${id}`);

export const updatePeli = (id, travel) => axios.put(`http://localhost:8000/api/peli/${id}`, travel);

export const getPeli = (id) => axios.get(`http://localhost:8000/api/peli/${id}`);

export const addCommentToPeli = (id, review) => axios.post(`http://localhost:8000/api/peli/review/${id}`, review);