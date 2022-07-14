import { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import client from 'lib/api/client'
import { List, Theme } from 'interfaces/interface'

interface Props {
  onSave: (formData: { list: { comment: string, numbered: boolean, themeId: number, movies: Array<{ title: string, position: number }> } }) => void
}

const ListForm = ({ onSave }: Props) => {
  const router = useRouter()
  const title = router.query.title
  const cap = parseInt(router.query.cap as string)
  const themeId = parseInt(router.query.themeId as string)

  const defaultsMovies = [...Array(cap)]
    .fill(null)
    .map((_, i) => (
      { title: '', position: i }
    ))

  const defaultsList = {
    comment: '',
    numbered: false,
    themeId: themeId,
    movies: [{ title: '', position: 0 }],
  }

  const initialMoviesState = [...defaultsMovies]
  const initialListState = { ...defaultsList }
  const [movies, setMovies] = useState(initialMoviesState)
  const [list, setList] = useState(initialListState)

  useEffect(() => {
    if (!router.isReady) return
    setMovies(initialMoviesState)
    setList(initialListState)
  }, [router])

  const handleInputChange = (e: { target: HTMLInputElement }) => {
    const { target } = e
    const { name } = target
    const value = target.value
    setList({ ...list, [name]: value, movies: movies })
  }

  const handleInputMovieChange = (e: { target: HTMLInputElement }, i: number) => {
    const { target } = e
    const value = target.value
    const currMovie = { title: value, position: i }
    setMovies(movies.map((movie) => (movie.position === i ? currMovie : movie)))
    setList({ ...list, movies: movies })
  }

  const handleCheckBoxChange = () => {
    if (list.numbered) {
      setList({ ...list, movies: movies, numbered: false })
    } else {
      setList({ ...list, movies: movies, numbered: true })
    }
  }

  const renderErrors = (errors: { comment?: string }) => {
    const errorMessages = Object.values(errors).join('')
    // error(errorMessages)
  }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    const formData = { list }
    // const errors = validateList(list)
    // if (!isEmptyObject(errors)) {
    //   renderErrors(errors)
    // } else {
    onSave(formData)
    // setListData(initialListState)
    // }
  }

  // if (id && !list.id) return <listNotFound />

  return (
    <>
      <h1># {title}</h1>
      <form className='listForm' onSubmit={handleSubmit} name='listForm'>
        <div className='listFormInner'>
            {[...Array(cap)].fill(null).map((_, i) => (
              <div className='listFormItem' key={i}>
                <label htmlFor='movie'>
                  <strong>映画{movies[i].position + 1}:</strong>
                  <input type='text' name='title' className='movieInput w-full' onChange={(e) => handleInputMovieChange(e, i)} value={movies[i].title} placeholder='映画タイトルを入力' />
                </label>
              </div>
            ))
            }
          <div className='listFormItem'>
            <label htmlFor='comment'>
              <strong>コメント:</strong>
              <input type='text' id='comment' name='comment' className='listInput w-full' onChange={handleInputChange} value={list.comment} placeholder='コメントを入力' />
            </label>
          </div>
          <div className='listFormItem'>
            <label htmlFor='numbered'>
              <strong>順位付きリスト</strong>
              <input type='checkbox' id='numbered' name='numbered' className='listInput' onChange={handleCheckBoxChange} checked={list.numbered} />
            </label>
          </div>
          <input type='hidden' id='themeId' name='themeId' />
        </div>
        <div className='form-actions'>
          <button type='submit' color='blue'>
            保存
          </button>
        </div>
      </form>
    </>
  )
}

export default ListForm
