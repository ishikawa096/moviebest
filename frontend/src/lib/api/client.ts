import axios from 'axios'

const client = axios.create({
  baseURL: process.browser ? process.env.NEXT_PUBLIC_BACKEND_BROWSER_HOST : process.env.NEXT_PUBLIC_BACKEND_HOST,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default client
