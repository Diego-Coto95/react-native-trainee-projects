import axios from 'axios';

const movieDB = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie',
    params: {
        api_key: 'd7102923809d1c3cbd98580a0312d32a',
        language: 'en-US',
    },
});

export default movieDB;
