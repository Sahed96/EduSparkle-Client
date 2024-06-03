import useAxiosSecure from "../../Hooks/useAxiosSecure";

import { useQuery } from "@tanstack/react-query";

const AllScholarship = () => {
  const axiosSecure = useAxiosSecure();
  const { data: scholarship = [] } = useQuery({
    queryKey: ["scholarship"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allScholarship");
      return res.data;
    },
  });
  console.log(scholarship);

  return (
    <div>
      here is all
      {scholarship.map((item, idx) => (
        <div key={idx}>
          <p>{item.University_Name}</p>;
        </div>
      ))}
    </div>
  );
};

export default AllScholarship;
