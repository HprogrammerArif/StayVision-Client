import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import Container from "../../../components/Shared/Container";
import Card from "./Card";
import Cover from "../../../components/Cover/Cover";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllSession = () => {
  const axiosSecure = useAxiosSecure();
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState("");

  // const { data: allSessions = [], isLoading } = useQuery({
  //   queryKey: ["all-sessions"],
  //   queryFn: async () => {
  //     const { data } = await axiosCommon.get(`/all-sessions`);
  //     return data;
  //   },
  // });

  const {
    data: allSessions = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-sessions"],
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/all-sessions?page=${currentPage}&size=${itemsPerPage}&filter=${filter}&sort=${sort}&search=${search}`
      );
      return data;
    },
  });

  useEffect(() => {
    const getCount = async () => {
      const { data } = await axiosSecure(
        `/all-sessions-count?filter=${filter}&search=${search}`
      );

      setCount(data.count);
    };
    getCount();
  }, [axiosSecure, filter, refetch, search]);

  // console.log(count);
  const numberOfPages = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()].map((element) => element + 1);

  //  handle pagination button
  const handlePaginationButton = (value) => {
    console.log(value);
    setCurrentPage(value);
  };

  const handleReset = () => {
    setFilter("");
    setSort("");
    setSearch("");
    setSearchText("");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchText);
  };

  console.log(search);

  if (isLoading) return <LoadingSpinner />;
  refetch();

  return (
    <Container>
      <Cover
        img="https://i.ibb.co/yNjB5ks/photo-1592417817038-d13fd7342605-q-80-w-1470-auto-format-fit-crop-ixlib-rb-4-0.jpg"
        title="Our Best Teacher Will Teach You"
        subTitle="Our Top Study Metarial is your gateway to extraordinary culinary experiences. We believe that you deserve nothing but the best, which is why we meticulously curate our selection to offer you exceptional flavors"
      ></Cover>

      <div className="container px-6 py-10 mx-auto min-h-[calc(100vh-306px)] flex flex-col justify-between">
        <div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-5 ">
            <div>
              <select
                onChange={(e) => {
                  setFilter(e.target.value);
                  setCurrentPage(1);
                }}
                value={filter}
                name="category"
                id="category"
                className="border p-4 rounded-lg"
              >
                <option value="">Filter By Status</option>
                <option value="ongoing">Ongoing</option>
                <option value="closed">Closed</option>
                {/* <option value={new Date(session.registration_end_date) > new Date()}>Closed</option> */}
                
              </select>
            </div>

            <form onSubmit={handleSearch}>
              <div className="flex p-1 overflow-hidden border rounded-lg    focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
                <input
                  onChange={(e) => setSearchText(e.target.value)}
                  value={searchText}
                  className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent"
                  type="text"
                  name="search"
                  placeholder="Enter Job Title"
                  aria-label="Enter Job Title"
                />

                <button className="px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none">
                  Search
                </button>
              </div>
            </form>
            <div>
              <select
                onChange={(e) => {
                  setSort(e.target.value);
                  setCurrentPage(1);
                }}
                value={sort}
                name="sort"
                id="sort"
                className="border p-4 rounded-md"
              >
                <option value="">Sort By Cost</option>
                <option value="dsc">High Price</option>
                <option value="asc">Low Price</option>
              </select>
            </div>
            <button onClick={handleReset} className="btn">
              Reset
            </button>
          </div>

          <div className="pt-16 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10">
            {allSessions.filter(job => job.status ==='Approved').map((session) => (
              <Card key={session._id} room={session} />
            ))}
          </div>
        </div>

        {/* pagination section */}
        <div className="flex justify-center mt-12">
          {/* previous button */}

          <button
            onClick={() => handlePaginationButton(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-blue-500  hover:text-white"
          >
            <div className="flex items-center -mx-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-1 rtl:-scale-x-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>

              <span className="mx-1">previous</span>
            </div>
          </button>

          {/* number  */}
          {pages.map((btnNum) => (
            <button
              onClick={() => handlePaginationButton(btnNum)}
              key={btnNum}
              className={`hidden ${
                currentPage === btnNum ? "bg-blue-500 text-white" : ""
              } px-4 py-2 mx-1 transition-colors duration-300 transform  rounded-md sm:inline hover:bg-blue-500  hover:text-white`}
            >
              {btnNum}
            </button>
          ))}

          {/* next button */}
          <button
            onClick={() => handlePaginationButton(currentPage + 1)}
            disabled={currentPage === numberOfPages}
            className="px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-blue-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500"
          >
            <div className="flex items-center -mx-1">
              <span className="mx-1">Next</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-1 rtl:-scale-x-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </Container>
  );
};

export default AllSession;
