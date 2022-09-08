import AsyncCreatableSelect from 'react-select/async-creatable'
import type { CreateMovieParams, MovieSelectOption, TmdbMovieData } from 'interfaces/interface'
import { toastWarn } from 'lib/toast'
import { useState } from 'react'
import { formatCreateLabel, FormatOptionLabel, placeholder, Input, Control, ValueContainer, movieFormStyles, formTheme } from './movieSelectStyles'
import CloseButton from 'components/commons/closeButton'
import React from 'react'
import { getTmdbSearch } from 'lib/fetcher'

export interface Props {
  movie: CreateMovieParams
  onChange: (newValue: MovieSelectOption, index: number) => void
  index: number
  cap: number
  clear: (i: number) => void
}

const MovieSelect = React.memo(({ movie, onChange, index, cap, clear }: Props) => {
  const [update, setUpdate] = useState(false)

  const searchMovie = async (inputValue: string): Promise<Array<MovieSelectOption | null>> => {
    const res = await getTmdbSearch(inputValue)
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

  const onError = (option: MovieSelectOption) => {
    option.posterPath = ''
    setUpdate(!update)
  }

  const value: MovieSelectOption | null = movie.title.trim()
    ? {
        label: movie.title,
        value: movie.title,
        posterPath: movie.tmdbImage,
        tmdbId: movie.tmdbId,
      }
    : null

  const formatOptionLabel = (option: MovieSelectOption | any) => <FormatOptionLabel option={option} onError={() => onError(option)} />

  if (index + 1 > cap) {
    return <></>
  } else {
    return (
      <div className='relative'>
        <CloseButton onClick={() => clear(index)} srOnly='消去' />
        <label htmlFor={`movie-${index}`}>
          <strong className='bg-white border-gray-300 border border-b-white  rounded-t-lg  text-gray-500 py-1 px-5 sm:px-7 md:px-10 text-center'>{index + 1}</strong>
        </label>
        <AsyncCreatableSelect
          name={`movie-${index}`}
          inputId={`movie-${index}`}
          value={value}
          loadOptions={searchMovie}
          onChange={(newValue: MovieSelectOption | any) => onChange(newValue, index)}
          placeholder={placeholder}
          formatOptionLabel={formatOptionLabel}
          formatCreateLabel={formatCreateLabel}
          noOptionsMessage={() => null}
          blurInputOnSelect={true}
          maxMenuHeight={400}
          components={{ Input, Control, ValueContainer }}
          styles={movieFormStyles}
          theme={formTheme}
        />
      </div>
    )
  }
})

MovieSelect.displayName = 'MovieSelect'

export default MovieSelect
