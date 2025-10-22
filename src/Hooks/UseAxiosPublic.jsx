import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://k-info-nic-server.vercel.app'
})

const UseAxiosPublic = () => {
    return axiosPublic;

};

export default UseAxiosPublic;