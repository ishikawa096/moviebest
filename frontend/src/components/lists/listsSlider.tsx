import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import { List, Theme, User } from 'interfaces/interface'
import ListCard from './listCard'

interface Props {
  lists: Array<List & { theme: Theme; user: User }>
}

const ListsSlider = ({ lists }: Props) => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    centerMode: true,
    speed: 2000,
    autoplaySpeed: 2000,
    centerPadding: '35%',
    slidesToShow: 1,
    slidesToScroll: 1,
    cssEase: 'linear',
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          centerPadding: '30%',
        },
      },
      {
        breakpoint: 1000,
        settings: {
          centerPadding: '20%',
        },
      },
      {
        breakpoint: 768,
        settings: {
          centerPadding: '15%',
        },
      },
      {
        breakpoint: 585,
        settings: {
          centerMode: false,
        },
      },
    ],
  }
  return (
    <>
      <div className='overflow-hidden w-full'>
        <Slider {...settings} className='relative'>
          {lists.map((list) => (
            // <div key={list.id} className=''>
            <ListCard key={list.id} user={list.user} movies={list.movies} theme={list.theme} />
            // </div>
          ))}
        </Slider>
      </div>
    </>
  )
}
export default ListsSlider
