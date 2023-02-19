import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import goalService from "./goalService";

const initialState = {
    goals: [],
    isError: false,
    isSuccess: false,
    isloading: false,
    message: ""
}

export const createGoal = createAsyncThunk("goals/create", async (goalData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await goalService.createGoal(goalData, token)
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})
export const deleteGoal = createAsyncThunk("goals/delete", async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await goalService.deleteGoal(id, token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})
export const getGoals = createAsyncThunk("goals/getAll", async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await goalService.getGoals(token)
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})
const goalSlice = createSlice({
    name: "goal",
    initialState,
    reducers: {
        reset(state) {
            state.isError = false
            state.isSuccess = false
            state.isloading = false
            state.message = ""
        }
    },
    extraReducers: {
        [createGoal.pending]: (state) => {
            state.isloading = true;
        },
        [createGoal.fulfilled]: (state, action) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.goals.push(action.payload)
        },
        [createGoal.rejected]: (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.message = action.payload
        },
        [getGoals.pending]: (state) => {
            state.isloading = true;
        },
        [getGoals.fulfilled]: (state, action) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.goals = action.payload;
        },
        [getGoals.rejected]: (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.message = action.payload
        },
        [deleteGoal.pending]: (state) => {
            state.isloading = true;
        },
        [deleteGoal.fulfilled]: (state, action) => {
            const finalState = state.goals.filter((curr) => curr._id !== action.payload.message);
            state.goals = finalState;
            state.isSuccess = true;
            state.isLoading = false;
        },
        [deleteGoal.rejected]: (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.message = action.payload
        }
    }
})
export const { reset } = goalSlice.actions
export default goalSlice;