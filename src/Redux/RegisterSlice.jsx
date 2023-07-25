import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { axiosInstance } from "../Api/apiUrl"
import { toast } from "react-toastify"

const initialState={
    loading:false,
    name:'',
    redirectReg:null,
    error:'',
    msg:''
}

export const registerUser=createAsyncThunk("user/signup",async(user)=>{
    try{
        const res=await axiosInstance.post("register",user);
        console.log(res?.data);
        return res?.data 
    }
    catch(error){
        toast.error(error?.response?.data?.msg);
    }
})
export const RegisterSlice=createSlice({
    name:'reg',
    initialState,
    reducers:{
        clearLog:(state,{payload})=>{
            localStorage.removeItem('name');
        },
        redirect_to_Reg:(state,{payload})=>{
            state.redirectReg=payload
        }
    },
    extraReducers:builder=>{
       builder.addCase(registerUser.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(registerUser.fulfilled,(state,{payload})=>{
            if(payload?.success===true){
                state.msg=payload?.message;
                state.name=payload?.data?.name;
                localStorage.setItem('name',state.name)
                state.redirectReg='/login'
                toast.success(state?.msg);
            }
        })
        .addCase(registerUser.rejected,(state,{payload})=>{
            state.loading=false;
            state.error=payload;
        })
    }
})
export const {clearLog,redirect_to_Reg} = RegisterSlice.actions;
export default RegisterSlice;