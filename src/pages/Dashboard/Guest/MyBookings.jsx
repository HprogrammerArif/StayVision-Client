import { Helmet } from "react-helmet-async";
import useCart from "../../../hooks/useCart";
import BookingCard from "./BookingCard";

const MyBookings = () => {
  const [cart] = useCart();
  // console.log(cart);

  return (
    <>
      <Helmet>
        <title>My Bookings</title>
      </Helmet>
      <h2 className="text-4xl">Total Order: {cart.length} </h2>

      <div className="pt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10">
        {cart.map((item) => (
          <BookingCard key={item._id} room={item}></BookingCard>
        ))}
      </div>
    </>
  );
};

export default MyBookings;
