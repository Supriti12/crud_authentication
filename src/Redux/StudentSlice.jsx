import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../Api/apiUrl"

const initialState = {
    student_data: [],
    loading: false,
    error: ''
}

export const fetchStudents = createAsyncThunk('student/fetch', async () => {
    try {
        const res = await axiosInstance.get('allstudent');
        return res?.data
    }
    catch (error) {
        console.log(error)
    }
})
//custom Api....
export const AddStudent = async (data) => {
    try {
        const ress = await axiosInstance.post('student', data)
        return ress?.data
    }
    catch (error) {
        console.log("Error while calling Add Student", error)
    }
}
export const EditStudent = async (id) => {
    try {
        const resss = await axiosInstance.get(`edit/${id}`)
        return resss?.data
    }
    catch (error) {
        console.log("Error while calling EditStudent", error)
    }
}
export const UpdateStudent=async(id,data)=>{
    try{
        const ressss=await axiosInstance.post(`update/${id}`,data)
    }
    catch(error){
        console.log('Error while calling UpdateStudent',error);
    }
}
export const DeleteStudent=async (id)=>{
    try{
        const result=await axiosInstance.delete(`delete/${id}`)
        return result?.data
    }
    catch(error){
        console.log('error while calling DeleteStudent',error);
    }
}

export const StudentSlice=createSlice({
    name:'students',
    initialState,
    reducers:{

    },
    extraReducers:builder=>{
        builder.addCase(fetchStudents.pending,(state)=>{
            state.loading=true;
            state.error=''
        })
        .addCase(fetchStudents.fulfilled,(state,{payload})=>{
            state.loading=false;
            state.error='';
            if(payload?.ststus==='success'){
                state.student_data=payload?.data
            }
        })
        .addCase(fetchStudents.rejected,(state,{payload})=>{
            state.loading=false;
            state.error=payload;
        })
    }
})
export default StudentSlice