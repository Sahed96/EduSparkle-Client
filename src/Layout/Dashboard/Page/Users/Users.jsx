import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import UseDelete from "../../../../Hooks/UseDelete";

const Users = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleRole = (e, email) => {
    e.preventDefault();
    const value = e.target.value;
    axiosSecure.patch(`/users?email=${email}&value=${value}`).then((res) => {
      console.log(res.data);
    });
    console.log(e.target.value);
  };

  return (
    <div>
      <div className="overflow-x-auto ">
        <table className="min-w-full shadow-md  border mx-auto border-gray-100">
          <thead>
            <tr className="bg-[#333333] text-white">
              <th className="py-3 px-6 text-left border-b">User Name</th>
              <th className="py-3 px-6 text-left border-b">Email</th>
              <th className="py-3 px-6 text-left border-b">Manage Role</th>
              <th className="py-3 px-6  border-b text-end">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr
                key={idx}
                className="hover:bg-gray-50 transition duration-300"
              >
                <td className="py-4 px-6 border-b">{user.name}</td>
                <td className="py-4 px-6 border-b">{user.email}</td>
                <td className="py-4 px-6 border-b text-end">
                  <select
                    onChange={(e) => handleRole(e, user?.email)}
                    className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring"
                    name="degree"
                    defaultValue={user?.role}
                    id="degree"
                  >
                    <option value="">select one..</option>
                    <option value="user">User</option>
                    <option value="moderator">Moderator</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td>
                  <button
                    onClick={() =>
                      UseDelete({
                        api: "userDelete",
                        id: user._id,
                        refetch,
                        axiosSecure,
                      })
                    }
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
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
