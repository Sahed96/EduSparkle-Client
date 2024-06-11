import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useReview = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: reviews = [] } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allReview");
      return res.data;
    },
  });
  return [refetch, reviews];
};

export default useReview;
