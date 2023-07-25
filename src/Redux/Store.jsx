import { configureStore } from "@reduxjs/toolkit";
import RegisterSlice from "./RegisterSlice";
import LoginSlice from "./LoginSlice";
import StudentSlice from "./StudentSlice";

export const Store=configureStore({
    reducer:{
        reg:RegisterSlice.reducer,
        login:LoginSlice.reducer,
        students:StudentSlice.reducer
    }
})

export default Store