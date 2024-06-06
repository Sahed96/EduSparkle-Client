import { useParams } from "react-router-dom";
import useAuth from "../../AuthProvider/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const ApplicantForm = () => {
  const { transId } = useParams();
  console.log(transId);
  const axiosSecure = useAxiosSecure();
  const { data: details = [] } = useQuery({
    queryKey: ["scholarship", transId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/applicant/${transId}`);
      return res.data;
    },
  });

  const { University_Name, Subject_category, Scholarship_Category } = details;

  const { user } = useAuth();
  return (
    <div>
      <h1 className="text-4xl text-center mx-auto mb-3">Applicant form</h1>
      <div className="max-w-3xl bg-gray-100 p-6 rounded-2xl mt-4 mx-auto">
        <form action="" className="space-y-6">
          <div className="grid grid-cols-5 gap-5">
            <div className="space-y-2 col-span-2 text-sm">
              <label htmlFor="Applicant Name" className="block ">
                photo upload
              </label>
              <input
                type="file"
                className="file-input file-input-bordered file-input-info w-full max-w-xs"
              />
            </div>
            <div className="space-y-2 col-span-1 text-sm">
              <label htmlFor="Applicant Name" className="block ">
                Your name
              </label>
              <input
                type="text"
                name="username"
                id="username"
                value={user?.displayName}
                placeholder="name"
                className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring  "
              />
            </div>
            <div className="space-y-2 col-span-2 text-sm">
              <label htmlFor="password" className="block ">
                Applicant Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={user?.email}
                placeholder="email"
                className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring  "
              />
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <label htmlFor="password" className="block ">
              Address
            </label>
            <input
              type="text"
              name="address"
              id="address"
              placeholder="enter your full address"
              className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring  "
            />
          </div>
          <div className="grid grid-cols-3 gap-5">
            <div className="space-y-2 text-sm">
              <label htmlFor="phone" className="block ">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                placeholder="your mobile number"
                className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring"
              />
            </div>
            <div className="space-y-2 text-sm">
              <label htmlFor="gender" className="block ">
                Gender
              </label>
              <select
                className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring"
                name="gender"
                id="gender"
              >
                <option value="">choose...</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="space-y-2 text-sm">
              <label htmlFor="password" className="block ">
                Applying Degree
              </label>
              <select
                className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring"
                name="degree"
                id="degree"
              >
                <option value="">select one..</option>
                <option value="Diploma">Diploma</option>
                <option value="Bachelor">Bachelor</option>
                <option value="Masters">Masters</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-5">
            <div className="space-y-2 text-sm">
              <label htmlFor="phone" className="block ">
                SSC Result(GPA)
              </label>
              <input
                type="text"
                name="ssc"
                id="ssc"
                placeholder="SSC gpa"
                className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring"
              />
            </div>
            <div className="space-y-2 text-sm">
              <label htmlFor="phone" className="block ">
                HSC Result(GPA)
              </label>
              <input
                type="text"
                name="hsc"
                id="hsc"
                placeholder="Hsc gpa"
                className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring"
              />
            </div>
            <div className="space-y-2 text-sm">
              <label htmlFor="gender" className="block ">
                Study gap
              </label>
              <select
                className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring"
                name="gap"
                id="gap"
              >
                <option value="">if you have...</option>
                <option value="1">1 year</option>
                <option value="2">2 year</option>
                <option value="3">3 year</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-5">
            <div className="space-y-2 col-span-2 text-sm">
              <label htmlFor="phone" className="block ">
                University name
              </label>
              <input
                type="text"
                name="universityName"
                value={University_Name}
                id="universityName"
                placeholder="university"
                className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring"
              />
            </div>
            <div className="space-y-2 col-span-1 text-sm">
              <label htmlFor="phone" className="block ">
                Scholarship category
              </label>
              <input
                type="text"
                name="scholarshipCategory"
                value={Scholarship_Category}
                id="scholarshipCategory"
                placeholder="scholarship Category"
                className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring"
              />
            </div>
            <div className="space-y-2 col-span-1 text-sm">
              <label htmlFor="phone" className="block ">
                Subject Category
              </label>
              <input
                type="text"
                name="subject"
                value={Subject_category}
                id="subject"
                placeholder="subject"
                className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring"
              />
            </div>
          </div>
          {/* Sign in Button */}
          <button className="text-lg rounded-xl relative p-[10px] block w-full bg-indigo-600 text-white border-y-4 duration-500 overflow-hidden focus:border-indigo-500 z-50 group">
            Log In
            <span className="absolute opacity-0 group-hover:opacity-100 duration-100 group-hover:duration-1000 ease-out flex justify-center inset-0 items-center z-10 text-white">
              Let&apos;s go
            </span>
            <span className="bg-indigo-800 absolute inset-0 -translate-y-full group-hover:translate-y-0 group-hover:duration-1000"></span>
            <span className="bg-indigo-800 absolute inset-0 translate-y-full group-hover:translate-y-0 group-hover:duration-1000"></span>
            <span className="bg-indigo-800 absolute inset-0 translate-x-full group-hover:translate-x-0 group-hover:delay-300 delay-100 duration-1000"></span>
            <span className="bg-indigo-800 absolute inset-0 -translate-x-full group-hover:translate-x-0 group-hover:delay-300 delay-100 duration-1000"></span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplicantForm;
