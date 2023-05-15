import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import { getRequest } from "../../../services/http.service";

export interface CurrentUserInterface {
    currentUser:{},
    isLoading:boolean
}

const initialState:CurrentUserInterface = {
    currentUser:{},
    isLoading: true
}

export const getCurrentUser = createAsyncThunk("user/getCurrentUser", async() => {
    try {
        let response:any = await getRequest('user/me', true);
        // localStorage.setItem("userData", JSON.stringify(response?.result))
        return response.result
    } catch (error) {
        console.log('error..while fetching role..', error)
    }
})

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        setLogoutData:(state, action:PayloadAction<[]>) => {
            state.currentUser = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCurrentUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getCurrentUser.fulfilled, (state:any, action) => {
            state.isLoading = false;
            state.currentUser = action.payload;
        });
        builder.addCase(getCurrentUser.rejected, (state, action) =>{
            console.log(action);
            state.isLoading = false;
        })
    }
})

export const {setLogoutData} = userSlice.actions;

export default userSlice.reducer;