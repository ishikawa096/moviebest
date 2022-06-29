import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:3001/api/v1',
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
});

export default client;
