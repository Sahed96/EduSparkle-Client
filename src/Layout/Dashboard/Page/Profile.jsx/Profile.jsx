import useAuth from "../../../../AuthProvider/useAuth";
import useAdmin from "../../../../Hooks/useAdmin";

import { PieChart, Pie, Cell } from "recharts";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Profile = () => {
  const axiosSecure = useAxiosSecure();
  const { data: count = [] } = useQuery({
    queryKey: ["count"],
    queryFn: async () => {
      const res = await axiosSecure.get("/count");
      return res.data;
    },
  });
  const data = [
    { name: "Group A", value: count.appliedCount },
    { name: "Group B", value: count.scholarshipCount },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const [isAdmin] = useAdmin();
  console.log(isAdmin);
  const { user } = useAuth();
  return (
    <div className="mx-auto ml-[100px] mt-[50px]">
      <div className="flex max-w-[650px] flex-col items-center justify-center space-y-4 rounded-xl p-8 font-sans shadow-lg bg-base-300">
        <h1 className="text-3xl font-bold mx-auto text-center">
          {isAdmin} Profile
        </h1>
        <div className="group relative">
          <img
            width={110}
            height={110}
            className="h-[110px] w-[110px] rounded-full bg-slate-500 object-cover"
            src={user?.photoURL || "https://i.ibb.co/hXqMFH8/noimg.png"}
            alt="card navigate ui"
          />
        </div>
        <div className="space-y-1 text-center">
          <h1 className="text-2xl text-black ">{user?.displayName || "N/A"}</h1>
          <p className="text-xl font-semibold text-gray-400">
            Email: {user?.email || "n/a"}
          </p>
        </div>
      </div>
      {isAdmin === "admin" && (
        <div>
          <PieChart width={200} height={200}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
          <div>
            <h3>total applied students: {count.appliedCount}</h3>
            <h3>total available Scholarship: {count.scholarshipCount}</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
