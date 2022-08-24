import { List, Movie, Theme, User } from 'interfaces/interface'

export const movieMock: Movie = { id: 1, listId: 1, title: 'MOVIE', position: 0, tmdbId: 1, tmdbImage: '', createdAt: new Date(), updatedAt: new Date() }

export const moviesMock: Array<Movie> = [movieMock, { ...movieMock, id: 2, title: 'MOVIE2' }, { ...movieMock, id: 3, title: 'MOVIE3' }, { ...movieMock, id: 4, title: 'MOVIE4' }, { ...movieMock, id: 5, title: 'MOVIE5' }]

export const themeMock: Theme = { id: 1, title: 'THEME', capacity: 5, createdAt: new Date(), updatedAt: new Date() }

export const userMock: User = { id: 1, name: 'USER', email: 'user@example.com', uid: 'user@example.com', provider: 'email', allowPasswordChange: false, createdAt: new Date(), updatedAt: new Date() }

export const listMock: List = { id: 1, comment: 'COMMENT TEXT', themeId: 1, userId: 1, createdAt: new Date(), updatedAt: new Date(), movies: moviesMock }
