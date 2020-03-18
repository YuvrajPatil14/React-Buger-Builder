import axios from 'axios';

const instance = axios.create({
    baseURL:"https://react-b-builder.firebaseio.com/"
});

export default instance;