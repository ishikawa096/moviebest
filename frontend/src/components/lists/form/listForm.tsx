import type { CreateListParams, List, MovieSelectOption, Theme, User } from 'interfaces/interface'
import { useState, useCallback } from 'react'
import { isEmptyObject } from 'lib/helpers'
import { validateList } from 'lib/validates'
import SubmitButton from 'components/commons/submitButton'
import { toastWarn } from 'lib/toast'
import RenderErrors from 'components/renderErrors'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHashtag } from '@fortawesome/free-solid-svg-icons'
import CommentArea from './commentArea'
import MovieSelect from './movieSelect'

const MAX_CAP = 10

interface Props {
  onSave: (formData: { list: CreateListParams }) => void
  theme: Theme
  listProp?: List & { user: User; theme: Theme }
}

const ListForm = ({ onSave, theme, listProp }: Props) => {
  const title = theme.title
  const cap = theme.capacity
  const themeId = theme.id
  const [isSending, setIsSending] = useState(false)

  const [formErrors, setFormErrors] = useState<{ [K in keyof CreateListParams]?: string }>({})

  const defaultMovieParams = (i: number) => ({
    title: '',
    position: i,
    tmdbId: 0,
    tmdbImage: '',
  })
  const EmptyMovies = [...Array(MAX_CAP)].fill(null).map((_, i) => defaultMovieParams(i))
  const defaultsMovies = listProp ? EmptyMovies.map((m, i) => (listProp.movies[i] ? listProp.movies[i] : m)) : EmptyMovies
  const initialMovies = [...defaultsMovies]

  const defaultsList = listProp ? { ...listProp, movies: initialMovies } : { movies: initialMovies }
  const initialListState = { ...defaultsList }
  const [list, setList] = useState(initialListState)
  const [comment, setComment] = useState(listProp ? listProp.comment : '')

  const handleClear = useCallback(
    (i: number) => {
      const newMovies = list.movies.map((m) => (m.position === i ? defaultMovieParams(i) : m))
      setList({ ...list, movies: newMovies })
    },
    [list]
  )

  const handleMovieSelect = (newValue: MovieSelectOption, i: number) => {
    if (newValue.label.trim()) {
      const newMovie = {
        title: newValue.label,
        position: i,
        tmdbId: newValue.tmdbId,
        tmdbImage: newValue.posterPath,
      }
      const newMovies = list.movies.map((m) => (m.position === i ? newMovie : m))
      setList({ ...list, movies: newMovies })
    } else {
      handleClear(i)
    }
  }

  const handleCommentChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setComment(value)
  }, [])

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setIsSending(true)
    const submitList = { ...list, comment: comment, themeId: themeId }
    const movies = submitList.movies.slice(0, cap)
    submitList.movies = movies

    const errors = validateList(submitList)
    setFormErrors(errors)
    if (isEmptyObject(errors)) {
      const formData = { list: submitList }
      onSave(formData)
    } else {
      toastWarn('項目にエラーがあります')
      setIsSending(false)
    }
  }

  return (
    <div className='w-full mb-5 md:mb-20 px-3 sm:px-8 lg:px-20'>
      <form className='flex flex-col items-center bg-white rounded-lg'>
        <div className='flex flex-col px-3 py-5 mb-3 md:mb-10'>
          <span className='text-base md:text-lg text-gray-700'>お題</span>
          <h2 className='text-3xl md:text-5xl lg:text-6xl px-2 py-1 italic underline decoration-orange-500 w-full rounded-lg'>
            <FontAwesomeIcon icon={faHashtag} size='xs' className='px-1' />
            {title}
          </h2>
        </div>

        <div className='mb-10 flex flex-row flex-wrap justify-center gap-2 md:gap-6 lg:gap-8'>
          {[...Array(MAX_CAP)].fill(null).map((_, i) => (
            <MovieSelect key={'movie-select-' + i} movie={list.movies[i]} onChange={(newValue, i) => handleMovieSelect(newValue, i)} clear={(i) => handleClear(i)} index={i} cap={cap} />
          ))}
          {formErrors.movies ? <RenderErrors error={formErrors.movies} /> : undefined}
        </div>

        <div className='w-full mb-10 px-5 md:px-20 lg:px-30'>
          <CommentArea comment={comment} onChange={handleCommentChange} formError={formErrors.comment} />
        </div>

        <div className='w-full p-4 px-10 items-center text-center'>
          <SubmitButton onClick={handleSubmit} disabled={list.movies.slice(0, cap).every((m) => m.title) ? false : true} isSending={isSending} title={listProp ? '確定' : '作成'} />
        </div>
      </form>
    </div>
  )
}

export default ListForm
