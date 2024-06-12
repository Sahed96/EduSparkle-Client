import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

// import useAuth from "../../../../AuthProvider/useAuth";
import { useForm } from "react-hook-form";

const img_hosting = import.meta.env.VITE_IMG_HOSTING;
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting}`;

const AddScholarship = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // const { user } = useAuth();

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    const imgFile = { image: data.image[0] };
    const res = await axiosPublic.post(img_hosting_api, imgFile, {
      headers: { "content-type": "multipart/form-data" },
    });

    if (res.data.success) {
      const scholarshipData = {
        University_Name: data.University_Name,
        University_Image: res.data.data.display_url,
        University_Country: data.University_Country,
        University_City: data.University_City,
        University_World_rank: data.University_World_rank,
        Scholarship_Name: data.Scholarship_Name,
        Scholarship_Category: data.Scholarship_Category,
        Subject_category: data.Subject_category,
        Degree: data.Degree,
        Service_Charge: data.Service_Charge,
        Application_Fees: data.Application_Fees,
        Tuition_fees: data.Tuition_fees,
        Post_Date: new Date(),
        Application_Deadline: data.Application_Deadline,
      };

      const newRes = await axiosSecure.post("/addScholarship", scholarshipData);
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

  return (
    <div>
      <h1 className="text-4xl text-center mx-auto mb-3">Add Scholarship</h1>
      <div className="max-w-7xl bg-gray-100 p-6 rounded-2xl mt-4 mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-5">
            <div className="space-y-2 col-span-2 text-sm">
              <label htmlFor="Applicant Name" className="block ">
                University image
              </label>
              <input
                type="file"
                {...register("image")}
                className="file-input file-input-bordered file-input-info w-1/2 "
              />
            </div>
            <div className="space-y-2  text-sm">
              <label htmlFor="Applicant Name" className="block ">
                University Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="name"
                className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring"
                {...register("University_Name")}
              />
            </div>
            <div className="space-y-2 text-sm">
              <label htmlFor="Applicant Name" className="block ">
                Scholarship Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="name"
                className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring"
                {...register("Scholarship_Name")}
              />
            </div>

            <div className="space-y-2 text-sm">
              <label htmlFor="password" className="block ">
                University Country
              </label>
              <input
                type="text"
                name="address"
                id="address"
                placeholder="enter your full address"
                className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring  "
                {...register("University_Country", { required: true })}
              />
            </div>

            <div className="space-y-2 text-sm">
              <label htmlFor="phone" className="block ">
                University city
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                placeholder="your mobile number"
                className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring"
                {...register("University_City", { required: true })}
              />
            </div>
            <div className="space-y-2 text-sm">
              <label htmlFor="gender" className="block ">
                University World rank
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                placeholder="your mobile number"
                className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring"
                {...register("University_World_rank", { required: true })}
              />
            </div>
            <div className="space-y-2 text-sm">
              <label htmlFor="password" className="block ">
                Applying Degree
              </label>
              <select
                className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring"
                id="degree"
                {...register("Degree", { required: true })}
              >
                <option value="">select one..</option>
                <option value="Diploma">Diploma</option>
                <option value="Bachelor">Bachelor</option>
                <option value="Masters">Masters</option>
              </select>
            </div>

            <div className="space-y-2 text-sm">
              <label htmlFor="phone" className="block ">
                Subject category
              </label>
              <select
                className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring"
                id="degree"
                {...register("Subject_category", { required: true })}
              >
                <option value="">select one..</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Engineering">Engineering</option>
                <option value="Doctor">Doctor</option>
              </select>
            </div>
            <div className="space-y-2 text-sm">
              <label htmlFor="phone" className="block ">
                Scholarship category
              </label>
              <select
                className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring"
                id="degree"
                {...register("Scholarship_Category", { required: true })}
              >
                <option value="">select one..</option>
                <option value="Full fund">Full fund</option>
                <option value="Partial">Partial</option>
                <option value="Self-fund">Self-fund</option>
              </select>
            </div>
            <div className="space-y-2 text-sm">
              <label htmlFor="gender" className="block ">
                Tuition Fees
              </label>
              <input
                type="text"
                id="universityName"
                placeholder="optional"
                className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring"
                {...register("Tuition_fees")}
              />
            </div>

            <div className="space-y-2  text-sm">
              <label htmlFor="phone" className="block ">
                Application Fees
              </label>
              <input
                type="text"
                id="universityName"
                placeholder="university"
                className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring"
                {...register("Application_Fees")}
              />
            </div>
            <div className="space-y-2 text-sm">
              <label htmlFor="phone" className="block ">
                Service charge
              </label>
              <input
                type="text"
                id="scholarshipCategory"
                placeholder="scholarship Category"
                className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring"
                {...register("Service_Charge")}
              />
            </div>

            <div className="space-y-2 text-sm">
              <label htmlFor="phone" className="block ">
                Application Deadline
              </label>
              <input
                type="date"
                id="date"
                className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring"
                {...register("Application_Deadline")}
              />
            </div>
          </div>
          {/* Sign in Button */}
          <button className="text-lg rounded-xl relative p-[10px] block w-full bg-indigo-600 text-white border-y-4 duration-500 overflow-hidden focus:border-indigo-500 z-50 group">
            Add Scholarship
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

export default AddScholarship;
