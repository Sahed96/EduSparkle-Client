import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { VscFeedback } from "react-icons/vsc";
import { useEffect, useState } from "react";

const ManageApplication = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openFeedback, setOpenFeedback] = useState(false);
  const [id, setId] = useState("");
  const [error, setError] = useState(false);
  const [feedbackId, setFeedbackId] = useState("");
  console.log(id);

  const axiosSecure = useAxiosSecure();
  const { refetch, data: allApply = [] } = useQuery({
    queryKey: ["allApply"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allAppliedApplication");
      return res.data;
    },
  });

  useEffect(() => {
    if (id !== "") {
      setError(true);
    }
  }, [id]);

  const { data: applicantDetails = [] } = useQuery({
    queryKey: ["applicantDetails", id],
    enabled: error,
    queryFn: async () => {
      const res = await axiosSecure.get(`/applicantDetails/${id}`);
      return res.data;
    },
  });

  const handleCancel = (_id) => {
    axiosSecure.patch(`/applicantStatus/${_id}`).then((res) => {
      console.log(res.data);
      refetch();
    });
  };

  const handleFeedback = (e) => {
    e.preventDefault();
    const feedback = e.target.feedback.value;
    console.log(feedback);
    const data = {
      feedback,
    };
    axiosSecure.patch(`/adminFeedback/${feedbackId}`, data).then((res) => {
      console.log(res.data);
      refetch();
    });
  };

  return (
    <div>
      <div className="overflow-x-auto ">
        <table className="min-w-full shadow-md  border mx-auto border-gray-100">
          <thead>
            <tr className="bg-[#333333] text-white">
              <th className="py-3 px-6 text-left border-b">University Name</th>
              <th className="py-3 px-6 text-left border-b">Scholarship Name</th>
              <th className="py-3 px-6 text-left border-b">
                Scholarship Category
              </th>
              <th className="py-3 px-6  border-b text-end">Subject Category</th>
              <th className="py-3 px-6  border-b text-end">Applied Degree</th>
              <th className="py-3 px-6  border-b text-end">Application Fees</th>
              <th className="py-3 px-6  border-b text-end">Service Charge</th>
              <th className="py-3 px-6  border-b text-end">Status</th>
              <th className="py-3 px-6  border-b text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allApply.map((apply, idx) => (
              <tr
                key={idx}
                className="hover:bg-gray-50 transition duration-300"
              >
                <td className="py-4 px-6 border-b">{apply.universityName}</td>
                <td className="py-4 px-6 border-b">{apply.Scholarship_Name}</td>
                <td className="py-4 px-6 border-b">
                  {apply.scholarshipCategory}
                </td>
                <td className="py-4 px-6 border-b text-end">{apply.subject}</td>
                <td className="py-4 px-6 border-b text-end">{apply.degree}</td>
                <td className="py-4 px-6 border-b text-end">
                  ${apply.Application_Fees}
                </td>
                <td className="py-4 px-6 border-b text-end">
                  ${apply.Service_Charge}
                </td>
                <td className="py-4 px-6 border-b text-end">{apply.status}</td>
                <td className="py-4 px-6 border-b text-end">
                  <ul className="space-y-3">
                    <li>
                      <button
                        onClick={() => {
                          setOpenModal(true);
                          setId(apply._id);
                        }}
                        className="flex items-center rounded-full bg-blue-500 px-4 py-2 font-bold text-white shadow-md transition-all duration-300 hover:bg-blue-700"
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
                            d="M9 5l7 7-7 7"
                          />{" "}
                        </svg>
                        Details
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setOpenFeedback(true);
                          setFeedbackId(apply._id);
                        }}
                        className="flex items-center rounded-full bg-amber-500 px-4 py-2 font-bold text-white shadow-md transition-all duration-300 hover:bg-amber-700"
                      >
                        <VscFeedback
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="h-6 w-6"
                        />
                        Feedback
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => handleCancel(apply._id)}
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
                        Cancel
                      </button>
                    </li>
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* modal 1 */}
        <div>
          <div
            className={`fixed z-[100] flex items-center justify-center ${
              openModal ? "opacity-1 visible" : "invisible opacity-0"
            } inset-0 bg-black/20 backdrop-blur-sm duration-100`}
          >
            <div
              className={`absolute max-w-md rounded-lg bg-white p-3 pb-5 text-center drop-shadow-2xl dark:bg-gray-800 dark:text-white ${
                openModal
                  ? "scale-1 opacity-1 duration-300"
                  : "scale-0 opacity-0 duration-150"
              } `}
            >
              <svg
                onClick={() => setOpenModal(false)}
                className="mx-auto mr-0 w-8 cursor-pointer fill-black dark:fill-white"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g strokeWidth="0"></g>
                <g strokeLinecap="round" strokeLinejoin="round"></g>
                <g>
                  <path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"></path>
                </g>
              </svg>
              <h1 className="mb-2 text-2xl font-semibold">
                {applicantDetails.universityName}
              </h1>
              <p className="px-1 mb-3 text-sm opacity-80">
                Elevate your React projects with beautifully crafted components
                designed for TailwindCSS.
              </p>
            </div>
          </div>
        </div>
        {/* modal 2 */}
        <div>
          <div
            className={`fixed z-[100] flex items-center justify-center ${
              openFeedback ? "opacity-1 visible" : "invisible opacity-0"
            } inset-0 bg-black/20 backdrop-blur-sm duration-100`}
          >
            <div
              className={`absolute max-w-md rounded-lg bg-white p-3 pb-5 text-center drop-shadow-2xl dark:bg-gray-800 dark:text-white ${
                openFeedback
                  ? "scale-1 opacity-1 duration-300"
                  : "scale-0 opacity-0 duration-150"
              } `}
            >
              <svg
                onClick={() => setOpenFeedback(false)}
                className="mx-auto mr-0 w-8 cursor-pointer fill-black dark:fill-white"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g strokeWidth="0"></g>
                <g strokeLinecap="round" strokeLinejoin="round"></g>
                <g>
                  <path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"></path>
                </g>
              </svg>
              <form onSubmit={handleFeedback}>
                <label className="form-control">
                  <div className="label">
                    <span className="label-text">Feedback</span>
                  </div>
                  <textarea
                    name="feedback"
                    className="textarea textarea-bordered h-24"
                    placeholder="Bio"
                  ></textarea>
                </label>

                <button
                  onClick={() => setOpenFeedback(false)}
                  className="rounded-md bg-indigo-600 hover:bg-indigo-700 px-6 py-1.5 text-white"
                >
                  Ok
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageApplication;
