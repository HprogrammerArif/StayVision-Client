import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import TopIntro from "../Session/TopIntro";

const Tutor = () => {

  const axiosCommon = useAxiosCommon()
  // eslint-disable-next-line no-unused-vars
  //const [params, setParams] = useSearchParams()
  //const category = params.get('category')

  //console.log(category)
  const { data: user = [], isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/user?role=tutor`)

      return data
    },
  })

  console.log(user);
  if (isLoading) return <LoadingSpinner />

  return (
    <div>
      <TopIntro subHeading={"study session"} heading={"Our Best Teacher Will Teach You"} description={"Our Top Study Metarial is your gateway to extraordinary culinary experiences. We believe that you deserve nothing but the best, which is why we meticulously curate our selection to offer you exceptional flavors"}></TopIntro>

      
    </div>
    
  );
};

export default Tutor;