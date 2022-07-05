import axios from 'axios';

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_HOST,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
});

export default client;
