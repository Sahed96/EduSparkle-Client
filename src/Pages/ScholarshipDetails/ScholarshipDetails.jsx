import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link, useParams } from "react-router-dom";

const ScholarshipDetails = () => {
  const { id } = useParams();
  console.log(id);
  const axiosSecure = useAxiosSecure();
  const { data: details = [] } = useQuery({
    queryKey: ["scholarship", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/scholarshipDetails/${id}`);
      return res.data;
    },
  });

  const {
    University_Name,
    University_Image,
    Scholarship_Category,
    University_City,
    University_Country,
    Application_Deadline,
    Subject_name,
    Scholarship_Description,
    Stipend,
    Post_Date,
    Service_Charge,
    Application_Fees,
    Tuition_fees,
    _id,
  } = details;

  return (
    <div>
      <section>
        <div className="bg-[url(https://i.ibb.co/MZVd3Lv/4122489-89338.jpg)] bg-no-repeat bg-center bg-cover bg-black/50">
          <div className="relative text-white bg-black/50 container flex flex-col items-center px-4 py-2 pb-24 mx-auto text-center lg:pb-56 md:py-32 md:px-10 lg:px-32 ">
            <h1 className="text-5xl font-bold leading-none sm:text-6xl xl:max-w-3xl">
              {University_Name}
            </h1>
            <p className="mt-6">
              {University_City}, {University_Country}
            </p>
            <p className="mt-6 mb-8 text-lg sm:mb-12 xl:max-w-3xl ">
              {Scholarship_Description}
            </p>
            <div className="grid grid-cols-2 gap-8 mb-7">
              <p>Subject Name: {Subject_name}</p>
              <p>Scholarship Category: {Scholarship_Category}</p>
              <p>Stipend: ${Stipend}</p>
              <p>Service Charge: ${Service_Charge}</p>
              <p>Application Fess: ${Application_Fees}</p>
              <p>Tuition Fees: ${Tuition_fees}</p>
              <p>Application Start: {Post_Date}</p>
              <p>Application End: {Application_Deadline}</p>
            </div>
            <div className="flex flex-wrap justify-center">
              <Link to={`/checkout/${_id}`}>
                <button
                  type="button"
                  className="relative h-14 font-semibold w-[200px] rounded-lg origin-top transform border-2 border-sky-500 text-xl text-sky-500 before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 hover:text-white hover:before:absolute hover:before:left-0 hover:before:-z-10 hover:before:h-full hover:before:bg-sky-500"
                >
                  Apply Scholarship
                </button>
              </Link>
            </div>
          </div>
        </div>
        <img
          src={University_Image}
          alt=""
          className="w-5/6 mx-auto mb-12 -mt-20 bg-gray-500 rounded-lg shadow-md lg:-mt-40"
        />
      </section>
    </div>
  );
};

export default ScholarshipDetails;
