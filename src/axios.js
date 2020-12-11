import axios from 'axios';

const instance = axios.create({
    // The API (cloud function) url
    baseURL: 'http://localhost:5001/challenge-clone/us-central1/api'
});


export default instance;