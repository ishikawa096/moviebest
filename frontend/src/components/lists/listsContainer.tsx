import { List, Theme, User } from 'interfaces/interface'
import ListCard from './listCard'
import { InView } from 'react-intersection-observer'

const ListsContainer = ({ lists }: { lists: Array<List & { user: User; theme: Theme }> }) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-9 px-2 grid-flow-row-dense'>
      {lists.map((list) => (
        <InView triggerOnce={true} rootMargin='-100px' key={list.id}>
          {({ inView, ref }) => {
            return (
              <div ref={ref} className={`min-h-[300px] ${inView ? 'motion-safe:animate-fade' : ''} `}>
                {inView ? <ListCard user={list.user} movies={list.movies} theme={list.theme} /> : undefined}
              </div>
            )
          }}
        </InView>
      ))}
    </div>
  )
}

export default ListsContainer
