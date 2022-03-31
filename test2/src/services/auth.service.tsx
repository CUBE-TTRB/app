import axios from "axios";

const API_URL = "https://api-cube.remidurieu.dev/";

const register = (name, email, password) =>{
    return axios.post(API_URL + "users",{
        "user": {
            "name": name,
            "email" : email
        },
        "auth":{
            "password":password
        }
    })
}

const login = (email, password)=> {
    return axios.post(API_URL+"sessions",{
        "email":email,
        "password":password
    })
        .then ((response) => {
            if (response.data.accessToken){
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
};

const  logout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
};

export default AuthService;