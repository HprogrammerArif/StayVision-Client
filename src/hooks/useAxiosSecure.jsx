import axios from 'axios'
import useAuth from './useAuth'
import { useNavigate } from 'react-router-dom'

export const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // withCredentials: true,
})

const useAxiosSecure = () => {
  const { logOut } = useAuth()
  const navigate = useNavigate()

 //request interceptor to add authorization header for every secure call to the api

 axiosSecure.interceptors.request.use(function (config) {
  const token = localStorage.getItem("access-token");
  //console.log("request stopeed by interceptors", token);
  config.headers.authorization = `Bearer ${token}`;
  return config;
}),
  function (error) {
    //do something with request error
    return Promise.reject(error);
  };

//intercepts 401 and 403 statur
axiosSecure.interceptors.response.use(
  function (response) {
    return response;
  },
  async (error) => {
    const status = error.response.status;
    console.log("status error in the interceptors", status);
    // for 401 or 403, logout the user and move to the login page
    if (status === 401 || status === 403) {
      await logOut();
      navigate("/login");
    }
    return Promise.reject(error);
  }
);
  return axiosSecure
}

export default useAxiosSecure
