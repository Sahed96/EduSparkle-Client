import useAuth from "../../AuthProvider/useAuth";

const ApplicantForm = () => {
  const { user } = useAuth();
  return (
    <div>
      <h1 className="text-4xl text-center mx-auto mb-3">Applicant form</h1>
      <div className="max-w-3xl bg-gray-100 p-6 rounded-2xl mt-4 mx-auto">
        <form action="" className="space-y-6">
          <div className="grid grid-cols-3 gap-8">
            <div className="space-y-2 text-sm">
              <label htmlFor="Applicant Name" className="block ">
                photo upload
              </label>
              <input
                type="file"
                className="file-input file-input-bordered file-input-success w-full max-w-xs"
              />
            </div>
            <div className="space-y-2 text-sm">
              <label htmlFor="Applicant Name" className="block ">
                Your name
              </label>
              <input
                type="text"
                name="username"
                id="username"
                value={user?.displayName}
                placeholder="name"
                className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring  "
              />
            </div>
            <div className="space-y-2 text-sm">
              <label htmlFor="password" className="block ">
                Applicant Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={user?.email}
                placeholder="email"
                className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring  "
              />
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <label htmlFor="password" className="block ">
              Address
            </label>
            <input
              type="text"
              name="address"
              id="address"
              placeholder="enter your full address"
              className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring  "
            />
          </div>
          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-2 text-sm">
              <label htmlFor="phone" className="block ">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                placeholder="your mobile number"
                className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring"
              />
            </div>
            <div className="space-y-2 text-sm">
              <label htmlFor="gender" className="block ">
                Gender
              </label>
              <select
                className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring"
                name="gender"
                id="gender"
              >
                <option value="">choose...</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="space-y-2 text-sm">
              <label htmlFor="password" className="block ">
                Applying Degree
              </label>
              <select
                className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring"
                name="degree"
                id="degree"
              >
                <option value="">select one..</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>
          {/* Sign in Button */}
          <button className="text-lg rounded-xl relative p-[10px] block w-full bg-indigo-600 text-white border-y-4 duration-500 overflow-hidden focus:border-indigo-500 z-50 group">
            Log In
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

export default ApplicantForm;
