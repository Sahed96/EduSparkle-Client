import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../AuthProvider/useAuth";

const MyApplication = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: applicantData = [], isLoading } = useQuery({
    queryKey: ["applicantData", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/myApplication/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className=" w-12 h-12 mb-4 mx-auto">
        <div className="grid grid-cols-2 h-full w-full overflow-hidden shadow-lg rounded-full animate-spin">
          <span className="h-6 w-6 rounded-tl-full bg-transparent"></span>
          <span className="h-6 w-6 rounded-tr-full bg-sky-500"></span>
          <span className="h-6 w-6 rounded-bl-full bg-sky-500"></span>
          <span className="h-6 w-6 rounded-br-full"></span>
        </div>
      </div>
    );
  }

  //   const { Application_Fees } = applicantData;
  return (
    <div>
      <div className="overflow-x-auto ">
        <table className="min-w-[90%] shadow-md border mx-auto border-gray-100  my-6">
          <thead>
            <tr className="bg-[#419ee0] text-white">
              <th className="py-3 px-6 text-left border-b">Name</th>
              <th className="py-3 px-6 text-left border-b">Age</th>
              <th className="py-3 px-6 text-left border-b">Gender</th>
              <th className="py-3 px-6  border-b text-end">Address</th>
            </tr>
          </thead>
          <tbody>
            {applicantData.map((item, idx) => (
              <tr
                key={idx}
                className="hover:bg-gray-50 transition duration-300"
              >
                <td className="py-4 px-6 border-b">{item.universityName}</td>
                <td className="py-4 px-6 border-b">19</td>
                <td className="py-4 px-6 border-b">Male</td>
                <td className="py-4 px-6 border-b text-end">
                  Mirpur 15, Dhaka
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyApplication;
