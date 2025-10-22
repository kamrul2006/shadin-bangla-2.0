import { Navigate, useLocation } from "react-router-dom";
import KInfonicLoader from "../../Components/Fixed/KInfonicLoader";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";

const PrivetRout = ({ children }) => {
    const { user, loading } = useContext(AuthContext)

    const location = useLocation()
    // console.info(location)


    if (loading) {
        return (<div>
            <KInfonicLoader />
        </div>)
    }

    if (user) {
        return children
    }

    return (
        <Navigate state={location.pathname} to={'/login'}></Navigate>
    );
};

export default PrivetRout;