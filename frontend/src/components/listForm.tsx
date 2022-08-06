import type { CreateListParams, List, MovieSelectOption, Theme, User } from 'interfaces/interface'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { isEmptyObject } from 'lib/helpers'
import { validateList } from 'lib/validates'
import MoviesFormItem from './moviesFormItem'

interface Props {
  onSave: (formData: { list: CreateListParams }) => void
  theme: Theme
  listProp?: List & { user: User, theme: Theme }
}

const ListForm = ({ onSave, theme, listProp }: Props) => {
  const router = useRouter()
  const title = theme.title
  const cap = theme.capacity
  const themeId = theme.id

  const [formErrors, setFormErrors] = useState<{} | { title: string }>({})

  const defaultsMovies = listProp ? listProp.movies
    : [...Array(cap)].fill(null).map((_, i) => ({ title: '', position: i}))
  const initialMovies = [...defaultsMovies]

  const defaultsList = listProp ? listProp
    : {
      comment: '',
      numbered: false,
      themeId: themeId,
      movies: initialMovies,
    }
  const initialListState = { ...defaultsList }
  const [list, setList] = useState(initialListState)

  useEffect(() => {
    if (!router.isReady) return
    if (listProp) {
      setList(listProp)
    } else {
      setList(initialListState)
    }
  }, [router])

  const handleMovieSelect = (newValue: MovieSelectOption | any, i: number) => {
    if (newValue.label) {
      const newMovie = {
        title: newValue.label,
        position: i,
        tmdbId: newValue.tmdbId,
        tmdbImage: newValue.posterPath,
      }
      const newMovies = list.movies.map((m) => (m.position === i ? newMovie : m))
      setList({ ...list, movies: newMovies })
    } else {
      const newMovie = { title: '', position: i }
      const newMovies = list.movies.map((m) => (m.position === i ? newMovie : m))
      setList({ ...list, movies: newMovies })
    }
  }
  console.log(list.movies)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e
    const { name } = target
    const value = target.value
    setList({ ...list, [name]: value })
  }

  const handleCheckBoxChange = () => {
    switch (list.numbered) {
      case true:
        setList({ ...list, numbered: false })
        break
      case false:
        setList({ ...list, numbered: true })
        break
    }
  }

  const renderErrors = () => {
    if (isEmptyObject(formErrors)) {
      return null
    }
    return (
      <div className='errors'>
        <ul>
          {Object.values(formErrors).map((formError, i) => (
            <li key={i}>{formError}</li>
          ))}
        </ul>
      </div>
    )
  }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    const errors = validateList(list)
    setFormErrors(errors)
    if (isEmptyObject(errors)) {
      const formData = { list }
      onSave(formData)
    }
  }

  return (
    <>
      <h1 className='text-6xl'># {title}</h1>
      {renderErrors()}
      <form className='listForm' onSubmit={handleSubmit} name='listForm'>
        <div className='listFormInner'>
          <div className='flex flex-row flex-wrap justify-center'>
            <MoviesFormItem movies={list.movies} cap={cap} onChange={(newValue, i) => handleMovieSelect(newValue, i)} />
          </div>
          <div className='listFormItem'>
            <label htmlFor='comment'>
              <strong>コメント:</strong>
              <input type='text' name='comment' className='w-full' onChange={handleInputChange} value={list.comment} placeholder='コメントを入力' />
            </label>
          </div>
          <div className='listFormItem'>
            <label htmlFor='numbered'>
              <strong>順位付きリスト</strong>
              <input type='checkbox' name='numbered' className='listInput' onChange={handleCheckBoxChange} checked={list.numbered} />
            </label>
          </div>
        </div>
        <div className='form-actions'>
          <button type='submit'>保存</button>
        </div>
      </form>
    </>
  )
}

export default ListForm
