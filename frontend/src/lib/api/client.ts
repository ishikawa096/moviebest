import axios from 'axios'

const client = axios.create({
  baseURL: typeof window !== "undefined" ? process.env.NEXT_PUBLIC_BACKEND_BROWSER_HOST : process.env.NEXT_PUBLIC_BACKEND_HOST,
})

export default client
