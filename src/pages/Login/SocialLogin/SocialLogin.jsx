import { FaGithub, FaGoogle, FaTwitter } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic()
  const navigate = useNavigate()

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        console.log(result.user);

        //sending new login user info in db
        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName
        }
        axiosPublic.post('/users', userInfo)
        .then(res => {
          console.log(res.data);
          navigate('/')
        })



      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <div>
      <button
        onClick={handleGoogleSignIn}
        aria-label="Log in with Google"
        className="p-3 rounded-sm"
      >
        <FaGoogle className="w-5 h-5 fill-current"></FaGoogle>
        
      </button>
      <button
        onClick={handleGoogleSignIn}
        aria-label="Log in with Google"
        className="p-3 rounded-sm"
      >
        <FaGithub className="w-5 h-5 fill-current"></FaGithub>
        
        
      </button>
      <button
        onClick={handleGoogleSignIn}
        aria-label="Log in with Google"
        className="p-3 rounded-sm"
      >
        <FaTwitter className="w-5 h-5 fill-current"></FaTwitter>
        
      </button>
    </div>
  );
};

export default SocialLogin;
