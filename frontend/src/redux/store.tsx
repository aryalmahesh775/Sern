import {configureStore} from "@reduxjs/toolkit"
import curretUser from "./features/user/userSlice"
// import categoryData from "./features/category/categorySlice"

export const store = configureStore({
    reducer:{
        user:curretUser,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch