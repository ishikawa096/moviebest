import { List, Theme, User } from "interfaces/interface"
import ListCard from "./listCard"

const ListsContainer = ({ lists }: { lists: Array<List &{ user: User, theme: Theme }> }) => (      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-9 px-2 grid-flow-row-dense'>
        {lists.map((list) => (
          <div key={list.id}>
            <ListCard user={list.user} movies={list.movies} theme={list.theme} />
          </div>
        ))}
</div>
)

export default ListsContainer
