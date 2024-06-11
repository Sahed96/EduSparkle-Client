import useAxiosSecure from "../../Hooks/useAxiosSecure";

import { useQuery } from "@tanstack/react-query";
import Cards from "./Cards";

const AllScholarship = () => {
  const axiosSecure = useAxiosSecure();
  const { data: scholarship = [] } = useQuery({
    queryKey: ["scholarship"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allScholarship");
      return res.data;
    },
  });

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-center mb-5 text-4xl font-bold">All Scholarships</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 grid-cols-1">
        {scholarship.map((item, idx) => (
          <Cards key={idx} item={item}></Cards>
        ))}
      </div>
    </div>
  );
};

export default AllScholarship;
