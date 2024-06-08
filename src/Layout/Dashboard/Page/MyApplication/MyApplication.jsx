import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../AuthProvider/useAuth";
import { MdEditNote } from "react-icons/md";
import { LiaCommentDots } from "react-icons/lia";
import { Link } from "react-router-dom";

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

  return (
    <div>
      <div className="overflow-x-auto ">
        <table className="min-w-full shadow-md border mx-auto border-gray-100  my-6">
          <thead>
            <tr className="bg-[#419ee0] text-white">
              <th className="py-3 px-6 text-left border-b">University Name</th>
              <th className="py-3 px-6 text-left border-b">
                University Address
              </th>
              <th className="py-3 px-6 text-left border-b">Subject Category</th>
              <th className="py-3 px-6  border-b text-end">Degree</th>
              <th className="py-3 px-6  border-b text-end">Apply Fees</th>
              <th className="py-3 px-6  border-b text-end">Service Charge</th>
              <th className="py-3 px-6  border-b text-end">Feedback</th>
              <th className="py-3 px-6  border-b text-end">Status</th>
              <th className="py-3 px-6  border-b text-end">Actions</th>
              <th className="py-3 px-6  border-b text-end">Comment</th>
            </tr>
          </thead>
          <tbody>
            {applicantData.map((item, idx) => (
              <tr
                key={idx}
                className="hover:bg-gray-50 transition duration-300"
              >
                <td className="py-4 px-6 border-b">{item.universityName}</td>
                <td className="py-4 px-6 border-b">
                  {item.University_City},{item.University_Country}
                </td>
                <td className="py-4 px-6 border-b">{item.subject}</td>
                <td className="py-4 px-6 border-b text-end">{item.degree}</td>
                <td className="py-4 px-6 border-b text-end">
                  ${item.Application_Fees}
                </td>
                <td className="py-4 px-6 border-b text-end">
                  ${item.Service_Charge}
                </td>
                <td className="py-4 px-6 border-b text-end">n/a</td>
                <td className="py-4 px-6 border-b text-end">
                  <span className="px-3 py-1 font-semibold rounded-md bg-sky-400 text-gray-50">
                    <span>Pending</span>
                  </span>
                </td>
                <td className="py-4 px-6 border-b text-end">
                  <ul className="space-y-2">
                    <li>
                      <Link to={`/details/${item.scholarshipId}`}>
                        <button className="flex items-center rounded-full bg-blue-500 px-4 py-2 font-bold text-white shadow-md transition-all duration-300 hover:bg-blue-700">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="mr-2 h-6 w-6"
                          >
                            {" "}
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 5l7 7-7 7"
                            />{" "}
                          </svg>
                          Details
                        </button>
                      </Link>
                    </li>
                    <li>
                      <button className="flex items-center rounded-full bg-emerald-500 px-4 py-2 font-bold text-white shadow-md transition-all duration-300 hover:bg-emerald-700">
                        <MdEditNote
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="mr-7 h-6 w-6"
                        />
                        Edit
                      </button>
                    </li>
                    <li>
                      <button className="flex items-center rounded-full bg-red-500 px-4 py-2 font-bold text-white shadow-md transition-all duration-300 hover:bg-red-700">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="mr-2 h-6 w-6"
                        >
                          {" "}
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />{" "}
                        </svg>
                        Cancel
                      </button>
                    </li>
                  </ul>
                </td>
                <td className="py-4 px-6 border-b text-end">
                  <button className="flex items-center rounded-full bg-orange-500 px-4 py-2 font-bold text-white shadow-md transition-all duration-300 hover:bg-orange-700">
                    <LiaCommentDots
                      viewBox="0 0 32 32"
                      className="mr-1 h-6 w-6"
                    />
                    Review
                  </button>
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
