import axios from 'axios';

const instance = axios.create({
   baseURL: 'https://lifedrop-backend-orz5.onrender.com/api', 
});

export default instance;