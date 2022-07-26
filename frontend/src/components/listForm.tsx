import type { createListParams, Theme } from 'interfaces/interface'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { isEmptyObject } from 'lib/helpers'
import { validateList } from 'lib/validates'

interface Props {
  onSave: (formData: { list: createListParams }) => void
  theme: Theme
}

const ListForm = ({ onSave, theme }: Props) => {
  const router = useRouter()
  const title = theme.title
  const cap = theme.capacity
  const themeId = theme.id

  const [formErrors, setFormErrors] = useState<{} | { title: string }>({})

  const defaultsMovies = [...Array(cap)].fill(null).map((_, i) => ({ title: '', position: i }))
  const initialMovies = [...defaultsMovies]

  const defaultsList = {
    comment: '',
    numbered: false,
    themeId: themeId,
    movies: initialMovies,
  }
  const initialListState = { ...defaultsList }
  const [list, setList] = useState(initialListState)

  useEffect(() => {
    if (!router.isReady) return
    setList(initialListState)
  }, [router])

  const handleInputChange = (e: { target: HTMLInputElement }) => {
    const { target } = e
    const { name } = target
    const value = target.value
    setList({ ...list, [name]: value })
  }

  const handleInputMovieChange = (e: { target: HTMLInputElement }, i: number) => {
    const { target } = e
    const value = target.value
    const newMovie = { title: value, position: i }
    const newMovies = list.movies.map((m) => (m.position === i ? newMovie : m))
    setList({ ...list, movies: newMovies })
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
      setList(initialListState)
    }
  }

  // if (!theme.id) return <p>theme not found</p>
  // if (id && !list.id) return <listNotFound />

  return (
    <>
      <h1 className='text-6xl'># {title}</h1>
      {renderErrors()}
      <form className='listForm' onSubmit={handleSubmit} name='listForm'>
        <div className='listFormInner'>
          {[...Array(cap)].fill(null).map((_, i) => (
            <div className='listFormItem' key={i}>
              <label htmlFor='movie'>
                <strong>映画{list.movies[i].position + 1}:</strong>
                <input type='text' name='title' className='w-full' onChange={(e) => handleInputMovieChange(e, i)} value={list.movies[i].title} placeholder='映画タイトルを入力' />
              </label>
            </div>
          ))}
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
