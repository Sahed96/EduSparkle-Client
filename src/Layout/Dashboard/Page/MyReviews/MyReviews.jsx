import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../AuthProvider/useAuth";
import Timestamp from "react-timestamp";
import { MdEditNote } from "react-icons/md";

const MyReviews = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: reviews = [] } = useQuery({
    queryKey: ["review"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/myReviews/${user?.email}`);
      return res.data;
    },
  });

  return (
    <div>
      <div className="overflow-x-auto ">
        <table className="min-w-full shadow-md  border mx-auto border-gray-100">
          <thead>
            <tr className="bg-[#333333] text-white">
              <th className="py-3 px-6 text-left border-b">Scholarship Name</th>
              <th className="py-3 px-6 text-left border-b">University Name</th>
              <th className="py-3 px-6 text-left border-b">Comments</th>
              <th className="py-3 px-6  border-b text-end">Review Date</th>
              <th className="py-3 px-6  border-b text-end">Action</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review, idx) => (
              <tr
                key={idx}
                className="hover:bg-gray-50 transition duration-300"
              >
                <td className="py-4 px-6 border-b">
                  {review.Scholarship_Name}
                </td>
                <td className="py-4 px-6 border-b">{review.University_Name}</td>
                <td className="py-4 px-6 border-b">{review.comment}</td>
                <td className="py-4 px-6 border-b text-end">
                  <Timestamp date={review.date} />
                </td>
                <td className="py-4 px-6 border-b text-end">
                  <ul className="space-y-3">
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
                        Delete
                      </button>
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
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyReviews;
