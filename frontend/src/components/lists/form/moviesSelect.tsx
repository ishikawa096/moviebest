import type { CreateMovieParams, MovieSelectOption } from 'interfaces/interface'
import axios from 'axios'
import AsyncCreatableSelect from 'react-select/async-creatable'
import { toastWarn } from 'lib/toast'
import { useState } from 'react'
import { formatCreateLabel, FormatOptionLabel, placeholder, Input, Control, ValueContainer, movieFormStyles, formTheme } from './movieSelectStyles'
import CloseButton from '../../commons/closeButton'

const MAX_CAP = 10

interface Props {
  movies: Array<CreateMovieParams>
  cap: number
  onChange: (newValue: MovieSelectOption, i: number) => void
  clear: (i: number) => void
}

interface TmdbMovieData {
  title: string
  posterPath: string
  id: number
}

const MoviesSelect = ({ movies, cap, onChange, clear }: Props) => {
  const [update, setUpdate] = useState(false)

  const searchMovie = async (inputValue: string) => {
    const res = await axios.get('/api/v1/tmdb/search', { params: { keyword: inputValue } })
    if (res.status === 200) {
      const results = res.data.results
      const movies = results.map((m: TmdbMovieData) => ({
        label: m.title,
        value: m.title,
        posterPath: m.posterPath ? m.posterPath : '',
        tmdbId: m.id,
      }))
      return movies
    } else {
      toastWarn('検索できませんでした')
      return []
    }
  }

  const defaultValue = (i: number) => {
    const value = movies[i].title
      ? {
          label: movies[i].title,
          value: movies[i].title,
          posterPath: movies[i].tmdbImage,
          tmdbId: movies[i].tmdbId,
        }
      : null
    return value
  }

  const onError = (option: MovieSelectOption) => {
    option.posterPath = ''
    setUpdate(!update)
  }

  return (
    <>
      {[...Array(MAX_CAP)].fill(null).map((_, i) => (
        <div key={i} className={`${i + 1 > cap ? 'hidden' : 'block'} relative`}>
          <CloseButton onClick={() => clear(i)} srOnly='clear' />
          <label htmlFor='movie'>
            <strong className='bg-white border-gray-300 border border-b-white  rounded-t-lg  text-gray-500 py-1 px-5 sm:px-7 md:px-10 text-center'>{movies[i].position + 1}</strong>
            <AsyncCreatableSelect
              value={movies[i].title.trim() ? { label: movies[i].title, value: movies[i].title, posterPath: movies[i].tmdbImage, tmdbId: movies[i].tmdbId } : null}
              loadOptions={searchMovie}
              onChange={(newValue: any) => onChange(newValue, i)}
              placeholder={placeholder}
              defaultValue={defaultValue(i)}
              formatOptionLabel={(option: MovieSelectOption | any) => <FormatOptionLabel option={option} onError={() => onError(option)} />}
              formatCreateLabel={formatCreateLabel}
              noOptionsMessage={() => null}
              blurInputOnSelect={true}
              maxMenuHeight={400}
              components={{ Input, Control, ValueContainer }}
              styles={movieFormStyles}
              theme={formTheme}
            />
          </label>
        </div>
      ))}
    </>
  )
}

export default MoviesSelect
