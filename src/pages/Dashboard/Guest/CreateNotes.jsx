import { useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const CreateNotes = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const navigate = useNavigate();

  const handleNotes = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;

    console.log(description, title);
    const noteItems = {
      title,
      description,
      email: user?.email,
      name: user?.displayName,
    };

    axiosSecure
      .post("/notes", noteItems)
      .then((res) => {
        console.log(res.data);

        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${title} added successfully`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          title: `${error.message}`,
          text: "Please login to add to the cart?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Log In",
        }).then((result) => {
          if (result.isConfirmed) {
            //send the user to login page
            navigate("/dashboard/createNotes");
          }
        });
      });
  };

  return (
    <>
      <button
        className="text-center font-bold btn text-xl text-purple-800 w-full"
        onClick={openModal}
      >
        Create Another Notes
      </button>
      <div
        className={`fixed inset-0 z-10 overflow-y-auto ${
          isModalOpen ? "block" : "hidden"
        }`}
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div
            className={`relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle
            ${
              isModalOpen
                ? "transition duration-300 ease-out translate-y-0 opacity-100 sm:scale-100"
                : "transition duration-150 ease-in translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
            }
          `}
          >
            <h3
              className="text-4xl text-center bg-gradient-to-r from-green-700 to-violet-800 bg-clip-text text-transparent font-bold"
              id="modal-title"
            >
              Write Your Notes
            </h3>
            <p className="mt-2 text-sm text-center text-gray-500">
              Feel free to keep notes here. <br />
              Your note will be secure.
            </p>
            <form className="mt-4" onSubmit={handleNotes}>
              <label htmlFor="emails-list" className="text-sm text-gray-700">
                User Email:
              </label>
              <label className="block mt-3">
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={user?.email}
                  disabled
                  className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md "
                />
              </label>

              <label className="block mt-3">
                Title
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="title"
                  className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                />
              </label>
              <label className="block mt-3">
                Description
                <textarea
                  placeholder="Write in details"
                  name="description"
                  id="description"
                  cols="6"
                  rows="4"
                  className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                ></textarea>
              </label>

              <div className="mt-4 sm:flex sm:items-center sm:-mx-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="w-full px-4 py-2  font-medium    text-white bg-gradient-to-l from-purple-700 to-green-800 border  rounded-md sm:w-1/2 sm:mx-2 "
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className=" py-2  w-[70%] text-white bg-gradient-to-l from-green-700 to-purple-800 px-2 rounded-md"
                >
                  Save Note
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div>
        your create note here looding soon..............
      </div>
    </>
  );
};

export default CreateNotes;
