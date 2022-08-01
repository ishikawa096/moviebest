// import axios from 'axios'
// import applyCaseMiddleware from 'axios-case-converter'
// import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

// const LANG = 'ja'
// const tmdbSearchBaseURL = `https://api.themoviedb.org/3/search/movie?language=${LANG}&`

// export const tmdbClient = applyCaseMiddleware(
//   axios.create({
//     baseURL: tmdbSearchBaseURL,
//     headers: {
//       Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
//     },
//   }),
//   { ignoreHeaders: true }
// )

// export const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
//       if (req.query.query) {
//         const query = req.query.query
//         try {
//           const response = await tmdbClient.get(`query=${query}`)
//           if (response.status === 200) {
//             res.status(200).json(response.data)
//           } else {
//             res.status(response.status).end()
//           }
//         } catch (err) {
//           res.status(500).json(err)
//         }
//   }
// }

// export default handler
