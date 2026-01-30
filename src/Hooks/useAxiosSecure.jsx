import axios from "axios";


const AxiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
})

const useAxiosSecure = () => {
    return AxiosSecure;
};

export default useAxiosSecure;