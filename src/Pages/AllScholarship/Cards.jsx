/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const Cards = ({ item }) => {
  return (
    <div>
      <div className="mx-auto my-10 max-w-[450px] space-y-6 rounded-xl bg-white px-4 pb-8 pt-4 font-sans shadow-lg ">
        <div className="relative flex h-48 w-full justify-center lg:h-[280px]">
          <div className="absolute bg-[#2F4F4F] px-3 py-1 rounded-full max-w-max text-white left-4 right-4 top-4 flex items-center justify-between">
            {/* love  */}
            {item.University_City}, {item.University_Country}
          </div>
          <img
            width={300}
            height={300}
            className="h-full w-full rounded-lg bg-black/40"
            src={item.University_Image}
            alt="card navigate ui"
          />
        </div>
        <div className="mx-auto w-[85%] space-y-2 text-center font-semibold">
          <h2 className="text-sm md:text-base lg:text-2xl">
            {item.University_Name}
          </h2>
          <div className="flex justify-between px-6">
            <p className="text-base font-semibold text-gray-400 md:text-sm">
              {item.Subject_category}
            </p>
            <p className="text-xs font-semibold text-gray-400 md:text-sm">
              {item.Scholarship_Category}
            </p>
          </div>
          <div className="space-y-3">
            <p className="text-lg ">
              Application Fees:{" "}
              <span className="text-xl font-semibold">
                ${item.Application_Fees}
              </span>
            </p>
            <p className="text-lg ">
              Application Deadline:{" "}
              <span className="text-xl font-semibold">
                {item.Application_Deadline}
              </span>
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm md:text-base">
          <Link to={`/details/${item._id}`}>
            <button className="rounded-lg bg-[#49B2FF] px-4 py-2 w font-sans font-semibold text-white duration-300 hover:scale-105 hover:bg-sky-600">
              Scholarship Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cards;
