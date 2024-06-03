import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";


const useAuth = () => {
    const Authentication = useContext(AuthContext)
    return Authentication
};

export default useAuth;