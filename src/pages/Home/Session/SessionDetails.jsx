import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import BookingModal from "../../../components/Modal/BookingModal";
import toast from "react-hot-toast";

const SessionDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  // const location = useLocation();
  const [processing, setProcessing] = useState(false);
  //payment and booking releted
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  const {
    data: session = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["session", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/session/${id}`);
      return data;
    },
  });


  //console.log(session);
  const {
    registration_start_date,
    registration_end_date,
    title,
    description,
    tutor_name,
    average_rating,
    class_start_time,
    class_end_date,
    session_duration,
    registration_fee,
    reviews,
  } = session;
  // console.log(image);

  const closeModal = () => {
    setIsOpen(false);
  };

  const bookingInfo = {
    ...session,
    price: registration_fee,
    student: {
      name: user?.displayName,
      email: user?.email,
      image: user?.photoURL,
    },
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    //1. create payment info obj
    const paymentInfo = {
      ...bookingInfo,
      sessionId: bookingInfo._id,
      transactionId: null,
      date: new Date(),
    };
    delete paymentInfo._id;
    console.log(paymentInfo);

    try {
      //2. save payment info in booking collection(db)
      const { data } = await axiosSecure.post("/booking", paymentInfo);
      console.log(data);

      //3. changed room status to booked in db
      const { data: updateStatus } = await axiosSecure.patch(
        `/session/status/${bookingInfo?._id}`,
        { status: true }
      );
      console.log(updateStatus);

      //update ui
      refetch();
      toast.success("Room Booked Sucessfully!!");
      navigate("/dashboard/myBooking");
    } catch (err) {
      console.log(err);
    }
    setProcessing(false);
  };

  if (isLoading || processing) return <LoadingSpinner />;

  return (
    <div className="px-28 mt-6">
      <Helmet>
        <title>StayVision || Details</title>
      </Helmet>
      <div className="flex flex-col md:flex-row justify-around gap-5  items-center min-h-[calc(100vh-306px)] md:max-w-screen-xl mx-auto ">
        {/* Job Details */}
        <div className="flex-1  px-4 py-7 bg-white rounded-md shadow-md md:min-h-[350px]">
          <div className="flex items-center justify-between">
            <span className="text-sm font-light text-gray-800 ">
              Registration start: {registration_start_date}
            </span>
            <span className="text-sm font-light text-gray-800 ">
              Registration end: {registration_end_date}
            </span>
          </div>
          <span className="px-4 py-1 text-xs text-blue-800 uppercase bg-blue-200 rounded-full ">
            Status:{" "}
            <button>
              {new Date(registration_end_date) > new Date()
                ? "Ongoing"
                : "Closed"}
            </button>
          </span>
          <div>
            <h1 className="mt-2 text-3xl font-semibold text-gray-800 ">
              {title}
            </h1>

            <p className="mt-2 text-lg text-gray-600 ">{description}...</p>
            <p className="mt-6 text-sm font-bold text-gray-600 ">
              Tutor Details:
            </p>
            <div className="flex items-center gap-5">
              <div>
                <p className="mt-2 text-sm  text-gray-600 ">
                  Name: {tutor_name}.
                </p>
                <p className="mt-2 text-sm  text-gray-600 ">
                  Email: jhankar@mahbub.com
                </p>
                <p className="mt-2 text-sm  text-gray-600 ">
                  Average rating: {average_rating}
                </p>
              </div>
              <div className="rounded-full object-cover overflow-hidden w-14 h-14">
                <img src="" alt="" />
              </div>
            </div>
            <div className="flex justify-between">
              <p className="mt-3 text-md font-bold text-gray-600 ">
                Class start time: {class_start_time}
              </p>
              <p className="mt-3 text-md font-bold text-gray-600 ">
                Class start time: {class_end_date}
              </p>
            </div>
            <div>
              <p>
                Session Duration: <b>{session_duration}</b>
              </p>
              <p>
                Student Reviews: <b>{reviews?.rating}</b>
              </p>
            </div>
            <p className="mt-6 text-lg font-bold text-gray-600 ">
              Fee: ${registration_fee}
            </p>

            {registration_fee <= 0 ? (
              <button
                onClick={(e) => handleSubmit(e)}
                //disabled={room?.booked === true}
                className={`px-4 py-2 font-bold text-white rounded ${
                  registration_start_date &&
                  registration_end_date &&
                  new Date(registration_start_date) <= new Date() &&
                  new Date(registration_end_date) >= new Date()
                    ? "bg-blue-500 hover:bg-blue-700"
                    : "bg-gray-500 cursor-not-allowed"
                }`}
                disabled={
                  new Date(registration_start_date) > new Date() ||
                  new Date(registration_end_date) < new Date() ||
                  session?.booked === true
                }
              >
                {new Date(registration_start_date) <= new Date() &&
                new Date(registration_end_date) >= new Date()
                  ? session?.booked === false || session?.booked === undefined
                    ? "Book Now"
                    : "Already Booked"
                  : "Registration Closed"}
              </button>
            ) : (
              <button
                onClick={() => setIsOpen(true)}
                //disabled={room?.booked === true}
                className={`px-4 py-2 font-bold text-white rounded ${
                  registration_start_date &&
                  registration_end_date &&
                  new Date(registration_start_date) <= new Date() &&
                  new Date(registration_end_date) >= new Date()
                    ? "bg-blue-500 hover:bg-blue-700"
                    : "bg-gray-500 cursor-not-allowed"
                }`}
                disabled={
                  new Date(registration_start_date) > new Date() ||
                  new Date(registration_end_date) < new Date() ||
                  session?.booked === true
                }
              >
                {new Date(registration_start_date) <= new Date() &&
                new Date(registration_end_date) >= new Date()
                  ? session?.booked === false || session?.booked === undefined
                    ? "Book Now"
                    : "Already Booked"
                  : "Registration Closed"}
              </button>
            )}

            {/* "Book Now" */}
            {/* Modal for payment */}
            <BookingModal
              refetch={refetch}
              isOpen={isOpen}
              closeModal={closeModal}
              bookingInfo={{
                ...session,
                price: registration_fee,
                student: {
                  name: user?.displayName,
                  email: user?.email,
                  image: user?.photoURL,
                },
              }}
            ></BookingModal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionDetails;
