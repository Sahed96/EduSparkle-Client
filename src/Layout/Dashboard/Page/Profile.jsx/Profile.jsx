import useAuth from "../../../../AuthProvider/useAuth";
import useAdmin from "../../../../Hooks/useAdmin";

const Profile = () => {
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
    </div>
  );
};

export default Profile;
