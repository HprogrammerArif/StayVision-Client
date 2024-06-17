import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Card = ({ room }) => {
  return (
    <Link
      to={`/job/${room._id}`}
      className="w-full max-w-sm px-4 py-3 bg-white rounded-md shadow-md hover:scale-[1.05] transition-all"
    >
      <div className="flex mt-1 items-center justify-between">
        <span className="px-3 py-1 text-sm text-blue-800 uppercase bg-blue-200 rounded-full ">
          <button>
            {new Date(room?.registrationEndTime) > new Date()
              ? "Ongoing"
              : "Closed"}
          </button>
        </span>
        
      </div>

      <div>
        <h1 className="mt-2 text-lg font-semibold text-gray-800 ">
          {room.title.substring(0, 70)}
        </h1>

        <p title={room.description} className="mt-2 text-sm text-gray-600 ">
          {room.description.substring(0, 70)}.........
        </p>
        
        <div className="mt-2 text-sm text-gray-600 ">
            <Link to={`/food/${room._id}`}>
            <button className="px-2 py-1 text-white bg-gradient-to-r from-green-700 to-violet-800">
              Read More
            </button>
            </Link>
            </div>
        
      </div>
    </Link>
  );
};

Card.propTypes = {
  room: PropTypes.object,
};

export default Card;

{
  /* <button>
            {new Date(room?.registrationEndTime) > new Date()
              ? "Ongoing"
              : "Closed"}
          </button> */
}
