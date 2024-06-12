import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://edu-sparkle-server.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
