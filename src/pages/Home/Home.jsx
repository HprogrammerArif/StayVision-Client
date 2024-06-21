import { Helmet } from 'react-helmet-async'
import Carousel from './Banner/Carousel'
import Rooms from './Session/Rooms'
import Tutor from './Tutor/Tutor'

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>StayVista | Vacation Homes & Condo Rentals</title>
      </Helmet>
      <Carousel></Carousel>
      {/* Categories section  */}
      {/* <Categories /> */}
      {/* Rooms section */}
      <Rooms />
      <Tutor></Tutor>
    </div>
  )
}

export default Home
