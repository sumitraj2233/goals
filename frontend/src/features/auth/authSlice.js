import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./service";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = {
    user: user ? user : "",
    isError: false,
    isLoading: false,
    message: "",
    isSuccess: false,
};

export const register = createAsyncThunk(
    "auth/register",
    async (user, thunkAPI) => {
        try {
            return await authService.register(user);
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const login = createAsyncThunk(
    "auth/login",
    async (user, thunkAPI) => {
        try {
            return await authService.login(user);
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const logout = createAsyncThunk("auth/logout", async () =>
    //  await authService.logout()
    await authService.logout()
)

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset(state) {
            state = initialState
        },
    },
    extraReducers: {
        [register.pending]: (state) => {
            state.isLoading = true
        },
        [register.fulfilled]: (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        },
        [register.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload
            state.user = null
        },
        [logout.fulfilled]: (state) => {
            state.user = null
        },
        [login.pending]: (state) => {
            state.isLoading = true
        },
        [login.fulfilled]: (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        },
        [login.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload
            state.user = null
        },
    },
});
export const { reset } = authSlice.actions;
export default authSlice.reducer;
