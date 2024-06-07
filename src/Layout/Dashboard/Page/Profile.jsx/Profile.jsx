import useAuth from "../../../../AuthProvider/useAuth";

const Profile = () => {
  const { user } = useAuth();
  return (
    <div className="">
      <div className=" mx-auto my-20 flex flex-col items-center justify-center md:flex-row">
        <div className="group relative  sm:w-[350px]">
          <img
            width={350}
            height={350}
            className="h-full w-full scale-105 transform rounded-lg bg-black/70"
            src={user?.photoURL || "https://i.ibb.co/hXqMFH8/noimg.png"}
            alt="card navigate ui"
          />
        </div>
        <div className="min-w-[250px] max-w-[350px] space-y-12 rounded-br-lg rounded-tr-lg bg-white p-10 text-center shadow-[0px_7px_30px_2px_rgba(100,100,111,0.2)] dark:bg-[#18181B] md:w-[350px] dark:shadow-[0px_2px_8px_0px_rgba(0,0,0,0.8)]">
          <div className="space-y-1">
            <h2 className="text-center font-sans text-2xl font-medium text-gray-700 dark:text-white/90 lg:text-3xl">
              {user?.displayName || "N/A"}
            </h2>
          </div>
          <div className="flex flex-wrap items-center justify-between">
            <div className="space-y-1">
              <p className="font-sans text-sm text-gray-500 dark:text-white/70">
                Shots
              </p>
              <p className="text-2xl tracking-wider text-gray-700 dark:text-white/80 lg:text-3xl">
                23
              </p>
            </div>
            <div className="space-y-1">
              <p className="font-sans text-sm text-gray-500 dark:text-white/70">
                Following
              </p>
              <p className="text-2xl tracking-wider text-gray-700 dark:text-white/80 lg:text-3xl">
                314
              </p>
            </div>
            <div className="space-y-1">
              <p className="font-sans text-sm text-gray-500 dark:text-white/70">
                Followers
              </p>
              <p className="text-2xl tracking-wider text-gray-700 dark:text-white/80 lg:text-3xl">
                487
              </p>
            </div>
          </div>
          <div>
            <button className="rounded-full border border-[#0d87f8] px-4 py-2 text-sm text-[#0d87f8] hover:bg-[#0d87f8] hover:text-white  duration-300 dark:hover:bg-transparent dark:hover:text-[#0d87f8] dark:hover:drop-shadow-[0px_0px_2px_#0d87f8]">
              SEND MESSAGE
            </button>
          </div>
        </div>
      </div>{" "}
    </div>
  );
};

export default Profile;
