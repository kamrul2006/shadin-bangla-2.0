import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://shadin-bangla-2-0-server.vercel.app'
})

const UseAxiosPublic = () => {
    return axiosPublic;

};

export default UseAxiosPublic;