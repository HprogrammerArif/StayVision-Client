import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const SessionDetails = () => {
  const { id } = useParams();
  const axiosCommon = useAxiosCommon();

  const {
    data: session = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["session", id],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/session/${id}`);
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  console.log(session);
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
status,
reviews
  } = session;
  // console.log(image);

  return (
    <div className="px-28 mt-6">
      <Helmet>
        <title>StayVision || Details</title>
      </Helmet>
      <div className='flex flex-col md:flex-row justify-around gap-5  items-center min-h-[calc(100vh-306px)] md:max-w-screen-xl mx-auto '>
      {/* Job Details */}
      <div className='flex-1  px-4 py-7 bg-white rounded-md shadow-md md:min-h-[350px]'>
        <div className='flex items-center justify-between'>
          <span className='text-sm font-light text-gray-800 '>
          Registration start: {registration_start_date}
          </span>
          <span className='text-sm font-light text-gray-800 '>

Registration end: {registration_end_date}
          </span>
        </div>
        <span className='px-4 py-1 text-xs text-blue-800 uppercase bg-blue-200 rounded-full '>
            Status: {status}
          </span>
        <div>
          <h1 className='mt-2 text-3xl font-semibold text-gray-800 '>
          {title}
          </h1>

          <p className='mt-2 text-lg text-gray-600 '>
            {description}...
          </p>
          <p className='mt-6 text-sm font-bold text-gray-600 '>
            Tutor Details:
          </p>
          <div className='flex items-center gap-5'>
            <div>
              <p className='mt-2 text-sm  text-gray-600 '>Name: {tutor_name}.</p>
              <p className='mt-2 text-sm  text-gray-600 '>
                Email: jhankar@mahbub.com
              </p>
              <p className='mt-2 text-sm  text-gray-600 '>
              Average rating: {average_rating}
              </p>
            </div>
            <div className='rounded-full object-cover overflow-hidden w-14 h-14'>
              <img src='' alt='' />
            </div>
          </div>
          <div className="flex justify-between">
          <p className='mt-3 text-md font-bold text-gray-600 '>
          Class start time: {class_start_time}
          </p>
          <p className='mt-3 text-md font-bold text-gray-600 '>
          Class start time: {class_end_date}
          </p>
          </div>
          <div>
            <p>Session Duration: <b>{session_duration}</b></p>
            <p>Student Reviews: <b>{reviews.rating}</b></p>
          </div>
          <p className='mt-6 text-lg font-bold text-gray-600 '>
            Fee: ${registration_fee}
          </p>

          <button
  className={`px-4 py-2 font-bold text-white rounded ${
    registration_start_date && registration_end_date && 
    new Date(registration_start_date) <= new Date() && new Date(registration_end_date) >= new Date() 
      ? 'bg-blue-500 hover:bg-blue-700' 
      : 'bg-gray-500 cursor-not-allowed'
  }`}
  disabled={
    !registration_start_date || 
    !registration_end_date || 
    new Date(registration_start_date) > new Date() || 
    new Date(registration_end_date) < new Date()
  }
>
  {
    registration_start_date && registration_end_date &&
    new Date(registration_start_date) <= new Date() && new Date(registration_end_date) >= new Date()
      ? 'Book Now' 
      : 'Registration Closed'
  }
</button>
        </div>
      </div>
      {/* Place A Bid Form */}
      
    </div>
    </div>
  );
};

export default SessionDetails;
