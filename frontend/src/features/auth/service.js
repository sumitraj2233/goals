import axios from "axios";

const API_URL = '/api/users/'
//Register user
const register = async (uesrData) => {
    const response = await axios.post(API_URL, uesrData);
    console.log(response)
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
}
const logout = async () => {
    localStorage.removeItem('user');
}

const login = async (uesrData) => {
    const response = await axios.post("/api/users/login", uesrData);
    console.log(response);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
}

const authService = {
    register, logout, login
}
export default authService;