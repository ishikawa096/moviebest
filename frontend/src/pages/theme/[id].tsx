import type { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import { NextPageContext } from 'next'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import client from 'lib/api/client'
import { List, Theme } from 'interfaces/interface'
import axios from 'axios'
import { render } from '@testing-library/react'
import { list } from 'postcss'

interface Props {
  lists: Array<{ id: number; type: string; attributes: List }>
  theme: Theme
}

const ThemePage = (props: Props) => {
  const lists = props.lists
    .map((list) => list.attributes)
    .map((list) => {
      return {
        id: list.id,
        comment: list.comment,
        numbered: list.numbered,
        movies: list.movies
      }
    })
  const theme = props.theme
  //   const router = useRouter()
  //   const { id } = router.query

  //   const [themeData, setThemeData] = useState<Theme | []>([])
  //   const [listsData, setListsData] = useState([])

  //   useEffect(() => {
  //     if (!router.isReady) return

  //     const fetchLists = async () => {
  //       const response = await client.get('/list', {
  //       params: {
  //         themeId: id,
  //       }
  //       })
  //       if (response.status === 200) {
  //         const lists = response.data
  //         console.log(lists)
  //         setListsData(lists)
  //       }
  //     }

  //     const fetchThemeTitle = async () => {
  //       const response = await client.get(`/theme/${id}`)
  //       if (response.status === 200) {
  //         const data = response.data.data.attributes
  //         setThemeData(data)
  //         console.log(data)
  //         return data.title
  //       }
  //     }

  //     fetchThemeTitle()
  //     fetchLists()
  //   }, [id])

  //   const renderTitle = (theme: Theme) => {
  //     return (
  //       <h1>theme.title</h1>
  //     )
  //   }

  return (
    <div>
      <h1>お題タイトル: #{theme.title}</h1>
      <Link href={{
        pathname: '/list/new',
        query: { themeId: theme.id, title: theme.title, cap: theme.capacity },
      }}>
        <a>このお題で新規作成</a>
      </Link>
      <div>
        {lists.map((list) => (
          <div key={list.id}>
            {list.movies?.map((movie) => (
              <div key={movie.id}>{movie.title}</div>))}
            <p>{list.comment}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id
  const themeRes = await client.get(`/theme/${id}`)
  const theme = themeRes.data.data.attributes

  const listsRes = await client.get('/list', {
    params: {
      themeId: theme.id,
    },
  })
  const lists = listsRes.data.data

  return { props: { theme: theme, lists: lists } }
}

export default ThemePage
