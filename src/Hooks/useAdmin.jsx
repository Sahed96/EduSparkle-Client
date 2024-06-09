import { useQuery } from "@tanstack/react-query";
import useAuth from "../AuthProvider/useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: isAdmin } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    // enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      // console.log(res.data);
      return res.data?.userRole;
    },
  });
  return [isAdmin];
};

export default useAdmin;
