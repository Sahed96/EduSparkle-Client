import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../AuthProvider/useAuth";
import { MdEditNote, MdOutlineCancel } from "react-icons/md";
import { LiaCommentDots } from "react-icons/lia";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import UseDelete from "../../../../Hooks/UseDelete";

const MyApplication = () => {
  const [singleApplicantData, setSingleApplicantData] = useState({});
  const [id, setId] = useState("");
  const [openModal, setOpenModal] = useState(true);
  const [formData, setFormData] = useState({});
  useEffect(() => {
    setOpenModal(false);
  }, []);

  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();
  const {
    refetch,
    data: applicantData = [],
    isLoading,
  } = useQuery({
    queryKey: ["applicantData", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/myApplication/${user?.email}`);
      return res.data;
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(id);

    const rating = e.target.rating.value;
    const comment = e.target.comment.value;
    const data = {
      rating,
      comment,
    };
    setFormData(data);
    console.log(id, rating, comment);

    axiosSecure.get(`/singleApplyData/${id}`).then((res) => {
      setSingleApplicantData(res.data);
      console.log(singleApplicantData);
    });

    e.target.reset();
  };

  const handleApplicationDelete = (id) => {
    UseDelete({ api: "applicationDelete", id, refetch, axiosSecure });
  };

  useEffect(() => {
    if (Object.keys(singleApplicantData).length > 0) {
      console.log(singleApplicantData);
      const reviewData = {
        name: user?.displayName,
        email: user?.email,
        rating: formData.rating,
        image: singleApplicantData.image,
        subject: singleApplicantData.subject,
        comment: formData.comment,
        scholarshipId: singleApplicantData.scholarshipId,
        Scholarship_Name: singleApplicantData.Scholarship_Name,
        University_Name: singleApplicantData.universityName,
        date: new Date(),
      };
      axiosSecure.post("/reviewData", reviewData).then((res) => {
        console.log(res.data);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "thanks for your comment",
          showConfirmButton: false,
          timer: 1500,
        });
      });
    }
  }, [singleApplicantData]);

  //   // console.log(reviewData);
  // }

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
        <table className="min-w-full shadow-md border mx-auto border-gray-100">
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
                <td className="py-4 px-6 border-b text-end">{item.feedback}</td>
                <td className="py-4 px-6 border-b text-end">
                  <span className="px-3 py-1 font-semibold rounded-md bg-sky-400 text-gray-50">
                    <span>{item.status}</span>
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
                      <button
                        onClick={() => handleApplicationDelete(item._id)}
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
                <td className="py-4 px-6 border-b text-end">
                  <Link>
                    <button
                      onClick={() => {
                        setOpenModal(true);
                        setId(item.scholarshipId);
                      }}
                      className="flex items-center rounded-full bg-orange-500 px-4 py-2 font-bold text-white shadow-md transition-all duration-300 hover:bg-orange-700"
                    >
                      <LiaCommentDots
                        viewBox="0 0 32 32"
                        className="mr-1 h-6 w-6"
                      />
                      Review
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* modal */}
        <div>
          <form onSubmit={handleSubmit}>
            <div
              className={`fixed z-[100] flex items-center justify-center ${
                openModal ? "opacity-1 visible" : "invisible opacity-0"
              } inset-0  backdrop-blur-sm duration-100`}
            >
              <div
                className={`absolute w-[350px] rounded-lg bg-white p-3 pb-5 text-center drop-shadow-2xl dark:text-black ${
                  openModal
                    ? "scale-1 opacity-1 duration-300"
                    : "scale-0 opacity-0 duration-150"
                } `}
              >
                <MdOutlineCancel
                  onClick={() => setOpenModal(false)}
                  className="mx-auto mr-0 w-8 h-6 cursor-pointer"
                />
                <h1 className="mb-2 text-2xl font-semibold">Write A Comment</h1>
                <div>
                  <label htmlFor="website" className="text-lg mr-3">
                    Rate Us
                  </label>
                  <select
                    className="w-[25%] border-2 mt-4 p-1 rounded-md"
                    name="rating"
                    id="subcategory"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
                <div className="mt-5 w-full">
                  <textarea
                    id="comment"
                    name="comment"
                    placeholder="Write your Comment"
                    className="w-full h-[100px] rounded-md  border-2  "
                  ></textarea>
                </div>
                <button
                  onClick={() => setOpenModal(false)}
                  className="rounded-md mt-8 bg-indigo-600 hover:bg-indigo-700 px-6 py-1.5 text-white"
                >
                  Ok
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyApplication;
