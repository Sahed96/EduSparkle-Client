import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Cards from "../../AllScholarship/Cards";
import { Link } from "react-router-dom";
import { useState } from "react";

const TopScholarship = () => {
  const axiosSecure = useAxiosSecure();
  const [sort, setSort] = useState("");
  const { data: scholarship = [] } = useQuery({
    queryKey: ["scholarship", sort],
    queryFn: async () => {
      const res = await axiosSecure.get(`/topScholarship?sort=${sort}`);
      return res.data;
    },
  });

  const handleSort = (e) => {
    const value = e.target.value;
    setSort(value);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-center mb-5 text-4xl font-bold">Top Scholarships</h1>
      <div className="flex justify-end">
        <select
          onChange={handleSort}
          className="select select-bordered w-full max-w-[200px] mr-12"
        >
          <option disabled selected>
            sort by
          </option>
          <option value="fees">Application Fees</option>
          <option value="date">recently posted</option>
        </select>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 grid-cols-1">
        {scholarship.map((item, idx) => (
          <Cards key={idx} item={item}></Cards>
        ))}
      </div>
      <div className="flex mt-8 justify-center">
        <Link className="btn btn-secondary" to="/scholarships">
          All Scholarship
        </Link>
      </div>
    </div>
  );
};

export default TopScholarship;
