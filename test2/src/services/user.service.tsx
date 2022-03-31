import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://api-cube.remidurieu.dev/";

const getPublicContent = () => {
    return axios.get(API_URL+"users");
};

const UserService ={
    getPublicContent,
};

export default UserService;