import axios, {type AxiosInstance} from "axios";

const http: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json; charset=utf-8",

    },
})

export default http