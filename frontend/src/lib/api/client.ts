import applyCaseMiddleware from 'axios-case-converter'
import axios from 'axios'

const client = applyCaseMiddleware(
  axios.create({
    baseURL: typeof window !== 'undefined' ? process.env.NEXT_PUBLIC_BACKEND_BROWSER_HOST : process.env.NEXT_PUBLIC_BACKEND_HOST,
  }),
  { ignoreHeaders: true }
)

export default client
