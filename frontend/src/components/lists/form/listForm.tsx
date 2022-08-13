import type { CreateListParams, List, MovieSelectOption, Theme, User } from 'interfaces/interface'
import { useState, useEffect } from 'react'
import { isEmptyObject } from 'lib/helpers'
import { validateList } from 'lib/validates'
import MoviesSelect from './moviesSelect'
import SubmitButton from 'components/commons/submitButton'
import { toastWarn } from 'lib/toast'
import RenderErrors from 'components/renderErrors'

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

  const defaultsList = listProp
    ? { ...listProp, movies: initialMovies }
    : {
        comment: '',
        numbered: false,
        movies: initialMovies,
      }
  const initialListState = { ...defaultsList }
  const [list, setList] = useState(initialListState)

  useEffect(() => {
    setList(initialListState)
  }, [])

  const handleMovieSelect = (newValue: MovieSelectOption | any, i: number) => {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { target } = e
    const { name } = target
    const value = target.value
    setList({ ...list, [name]: value })
  }

  const handleClear = (i: number) => {
    const newMovies = list.movies.map((m) => (m.position === i ? defaultMovieParams(i) : m))
    setList({ ...list, movies: newMovies })
  }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setIsSending(true)
    const submitList = { ...list, themeId: themeId }
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
    <>
      <div className='w-full mb-20 px-3 sm:px-8 lg:px-20'>
        <form name='listForm' className='flex flex-col items-center bg-white rounded-lg'>
          <div className='flex flex-col px-3 py-5 mb-10'>
            <span className='text-lg text-gray-700'>お題</span>
            <h2 className='text-3xl md:text-5xl lg:text-6xl px-2 py-1 italic underline decoration-orange-500 w-full rounded-lg'># {title}</h2>
          </div>

          <div className='w-full'>
            <div className='mb-10 flex flex-row flex-wrap justify-center gap-4 md:gap-6 lg:gap-8'>
              <MoviesSelect movies={list.movies} cap={cap} onChange={(newValue, i) => handleMovieSelect(newValue, i)} clear={(i) => handleClear(i)} />
              {formErrors.movies ? <RenderErrors error={formErrors.movies} /> : undefined}
            </div>

            <div className='mb-10 px-5 md:px-20 lg:px-30 w-full'>
              <label htmlFor='comment' className='block mb-2 text-sm font-medium text-gray-900'>
                コメント
              </label>
              <textarea
                name='comment'
                onChange={handleInputChange}
                value={list.comment}
                id='comment'
                rows={4}
                className={`${
                  formErrors.comment ? 'border-red-300' : 'border-gray-300'
                } block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border focus:ring-sky-400 focus:border-sky-400 duration-150 ease-in-out`}
                placeholder='コメント'
              />
              {formErrors.comment ? <RenderErrors error={formErrors.comment} /> : undefined}
            </div>
          </div>

          <div className='w-full p-4 px-10 items-center text-center'>
            <SubmitButton onClick={handleSubmit} disabled={list.movies.slice(0, cap).every((m) => m.title) ? false : true} isSending={isSending} title={listProp ? '確定' : '作成'} />
          </div>
        </form>
      </div>
    </>
  )
}

export default ListForm
