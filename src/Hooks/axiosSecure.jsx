import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Auth/Providers/AuthProvider";

export const axiosSecurity = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true
})

const axiosSecure = () => {
    const { UserSignOut } = useContext(AuthContext)
    const navigate = useNavigate();

    useEffect(() => {
        axiosSecurity.interceptors.response.use(response => {
            return response;
        }, error => {
            console.log('api response error status', error?.status);

            if (error?.status === 401 || error?.status === 403) {
                UserSignOut()
                navigate('/login')
            }
            return Promise.reject(error);
        })
    }, [])

    return axiosSecurity
};

export default axiosSecure;