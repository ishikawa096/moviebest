import applyCaseMiddleware from 'axios-case-converter';
import axios from 'axios';

// const httpAdapter = require('axios/lib/adapters/http');
// axios.defaults.adapter = httpAdapter;

const options = {
  ignoreHeaders: true,
};

const client = applyCaseMiddleware(
  axios.create({
    baseURL: 'http://localhost:3001/api/v1',
  }),
  options
);

export default client;
