import axios from "axios";

// const API_URL = '/api/goals'

const createGoal = async (goalData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    // console.log(goalData, token);
    const response = await axios.post("http://localhost:5000/api/goals", goalData, config);
    return response.data;

}

const deleteGoal = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(`http://localhost:5000/api/goals/${id}`, config);
    // console.log(response);
    return response.data;
}
const getGoals = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get("http://localhost:5000/api/goals", config);
    return response.data;
}
const goalService = {
    createGoal, getGoals, deleteGoal
}
export default goalService;