import { List, Theme, User } from 'interfaces/interface'
import ListCard from './listCard'
import { InView } from 'react-intersection-observer'
import ScrollButton from 'components/commons/scrollButton'
import { useCallback, useEffect, useState } from 'react'

interface Props {
  lists: Array<List & { user: User; theme: Theme }>
}

const ListsContainer = ({ lists }: Props) => {
  const listsData = useCallback(() => lists.map((l) => ({ ...l, isDeleted: false })), [lists])
  const [listsState, setListsState] = useState(listsData)
  const [update, setUpdate] = useState(false)

  useEffect(() => {
    setListsState(listsData)
  }, [listsData])

  const setDelete = useCallback(
    (id: number) => {
      setListsState(listsState.map((l) => (l.id === id ? { ...l, isDeleted: true } : l)))
      setUpdate(!update)
    },
    [listsState, update]
  )

  return (
    <>
      {listsState.length ? (
        <div className='md:px-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-9 grid-flow-row-dense'>
          {listsState.map((list) =>
            list.isDeleted ? null : (
              <InView triggerOnce={true} rootMargin='-100px' key={'list-card-' + list.id}>
                {({ inView, ref }) => (
                  <div ref={ref} className={`min-h-[300px] ${inView ? 'motion-safe:animate-fade' : ''}`}>
                    {inView ? <ListCard user={list.user} movies={list.movies} theme={list.theme} onDelete={() => setDelete(list.id)} /> : null}
                  </div>
                )}
              </InView>
            )
          )}
          <ScrollButton />
        </div>
      ) : (
        <div className='flex justify-center text-gray-400 px-5 py-20'>
          <span className='w-full max-w-xl bg-white rounded-lg p-10 text-center'>まだ投稿がありません</span>
        </div>
      )}
    </>
  )
}

export default ListsContainer
