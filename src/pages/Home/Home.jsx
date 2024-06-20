import { Helmet } from 'react-helmet-async'
import Carousel from './Banner/Carousel'
import Rooms from './Session/Rooms'

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
    </div>
  )
}

export default Home
