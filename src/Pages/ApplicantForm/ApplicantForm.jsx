import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../AuthProvider/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const img_hosting = import.meta.env.VITE_IMG_HOSTING;
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting}`;

const ApplicantForm = () => {
  const { transId } = useParams();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { data: details = [], isLoading } = useQuery({
    queryKey: ["scholarship", transId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/applicant/${transId}`);
      return res.data;
    },
  });

  const {
    University_Name,
    Subject_category,
    University_City,
    University_Country,
    Scholarship_Category,
    scholarshipId,
    Application_Fees,
    Service_Charge,
  } = details;

  const { user } = useAuth();

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    const imgFile = { image: data.image[0] };
    const res = await axiosPublic.post(img_hosting_api, imgFile, {
      headers: { "content-type": "multipart/form-data" },
    });
    console.log(res.data);
    if (res.data.success) {
      const applicantData = {
        name: data.name,
        email: data.email,
        address: data.address,
        gap: data.gap,
        degree: data.degree,
        gender: data.gender,
        hsc: data.hsc,
        ssc: data.ssc,
        phone: data.phone,
        scholarshipCategory: data.scholarshipCategory,
        subject: data.subject,
        universityName: data.universityName,
        image: res.data.data.display_url,
        date: new Date(),
        scholarshipId,
        Application_Fees,
        University_City,
        University_Country,
        Service_Charge,
      };

      const newRes = await axiosSecure.post("/applicantData", applicantData);
      console.log(newRes.data);
      if (newRes.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/scholarships");
      }
    }
  };

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
      <h1 className="text-4xl text-center mx-auto mb-3">Applicant form</h1>
      <div className="max-w-3xl bg-gray-100 p-6 rounded-2xl mt-4 mx-auto">
        {/* <div>
          <img src={image} alt="" />
        </div> */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-5 gap-5">
            <div className="space-y-2 col-span-2 text-sm">
              <label htmlFor="Applicant Name" className="block ">
                photo upload
              </label>
              <input
                type="file"
                {...register("image")}
                className="file-input file-input-bordered file-input-info w-full max-w-xs"
              />
            </div>
            <div className="space-y-2 col-span-1 text-sm">
              <label htmlFor="Applicant Name" className="block ">
                Your name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={user?.displayName}
                placeholder="name"
                className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring"
                {...register("name")}
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
                {...register("email")}
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
              {...register("address", { required: true })}
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
                {...register("phone", { required: true })}
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
                {...register("gender", { required: true })}
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
                {...register("degree", { required: true })}
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
                {...register("ssc", { required: true })}
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
                {...register("hsc", { required: true })}
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
                {...register("gap")}
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
                defaultValue={University_Name}
                id="universityName"
                placeholder="university"
                className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring"
                {...register("universityName")}
              />
            </div>
            <div className="space-y-2 col-span-1 text-sm">
              <label htmlFor="phone" className="block ">
                Scholarship category
              </label>
              <input
                type="text"
                name="scholarshipCategory"
                defaultValue={Scholarship_Category}
                id="scholarshipCategory"
                placeholder="scholarship Category"
                className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring"
                {...register("scholarshipCategory")}
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
                {...register("subject")}
              />
            </div>
          </div>
          {/* Sign in Button */}
          <button className="text-lg rounded-xl relative p-[10px] block w-full bg-indigo-600 text-white border-y-4 duration-500 overflow-hidden focus:border-indigo-500 z-50 group">
            Apply Now
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
