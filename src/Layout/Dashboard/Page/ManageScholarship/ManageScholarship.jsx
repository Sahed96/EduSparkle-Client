import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { MdEditNote } from "react-icons/md";
import UseDelete from "../../../../Hooks/UseDelete";

const ManageScholarship = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: scholarship = [] } = useQuery({
    queryKey: ["scholarship"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allScholarship");
      return res.data;
    },
  });
  return (
    <div>
      <div className="overflow-x-auto ">
        <table className="min-w-full shadow-md  border mx-auto border-gray-100">
          <thead>
            <tr className="bg-[#333333] text-white">
              <th className="py-3 px-6 text-left border-b">No.</th>
              <th className="py-3 px-6 text-left border-b">Scholarship Name</th>
              <th className="py-3 px-6 text-left border-b">University Name</th>
              <th className="py-3 px-6 text-left border-b">Subject Category</th>
              <th className="py-3 px-6  border-b text-end">Applied Degree</th>
              <th className="py-3 px-6  border-b text-end">Application Fees</th>
              <th className="py-3 px-6  border-b text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {scholarship.map((item, idx) => (
              <tr
                key={idx}
                className="hover:bg-gray-50 transition duration-300"
              >
                <td className="py-4 px-6 border-b">{idx + 1}</td>
                <td className="py-4 px-6 border-b">{item.Scholarship_Name}</td>
                <td className="py-4 px-6 border-b">{item.University_Name}</td>
                <td className="py-4 px-6 border-b">{item.Subject_category}</td>
                <td className="py-4 px-6 border-b">{item.Degree}</td>
                <td className="py-4 px-6 border-b">${item.Application_Fees}</td>

                <td>
                  <ul className="space-y-3">
                    <li>
                      <li>
                        <Link to={`/details/${item._id}`}>
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
                    </li>
                    <li>
                      <button
                        onClick={() =>
                          UseDelete({
                            api: "scholarshipDelete",
                            id: item._id,
                            refetch,
                          })
                        }
                        className="flex items-center rounded-full bg-red-500 px-4 py-2 font-bold text-white shadow-md transition-all duration-300 hover:bg-red-700"
                      >
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

export default ManageScholarship;
