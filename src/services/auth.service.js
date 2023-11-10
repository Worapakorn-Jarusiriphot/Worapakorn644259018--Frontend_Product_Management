import axios from "axios";

// const URL = "http://localhost:5000";  // แทนที่ด้วย URL ของเซิร์ฟเวอร์ของคุณ
// const API_URL = URL + "/api/auth/";
// const USERNAME = "root";     // แทนที่ด้วย username ของคุณ
// const PASSWORD = null;     // แทนที่ด้วย password ของคุณ
const URL = import.meta.env.VITE_BASE_URL;
const API_URL = URL + "/api/auth/";
const USERNAME = import.meta.env.VITE_BASE_USERNAME;
const PASSWORD = import.meta.env.VITE_BASE_PASSWORD;
const config = {
  auth: {
    username: USERNAME,
    password: PASSWORD,
  },
};

const login = async (username , password) => {
    const response = await axios.post(
    API_URL + "signin" , 
    {username , password},
    config);
    if(response.data.accessToken) {
        //Sign In successfully
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("token", JSON.stringify(response.data.accessToken));
    }
    return response.data;
};

const register = async (username, email, password) => {
    return await axios.post(API_URL + "signup" , {username , email , password} , config);
}
const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
}

const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token")
}

const AuthService = {
    login,
    getCurrentUser,
    register,
    logout,
};

export default AuthService;