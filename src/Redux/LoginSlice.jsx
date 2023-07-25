import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosInstance } from '../Api/apiUrl'
import { toast } from 'react-toastify'
const initialState = {
    name: '',
    token: '',
    Logouttoggle: false,
    redirectTo: null,
    loading: false,
    error: ''
};

export const loginUser = createAsyncThunk('user/signIn',
    async userData => {
        try {
            const { data } = await axiosInstance.post('login', userData);
            return data;
        } catch (error) {
            toast.error(error?.response?.data?.message, {
                theme: 'colored'
            });
        }
    });

export const LoginSlice = createSlice({
    name: 'signIn/user',
    initialState,
    reducers: {
        check_token: (state) => {
            const token = JSON.parse(localStorage.getItem('token'));
            if (token !== null && token !== undefined && token !== '') {
                state.Logouttoggle = true;
            }
        },
        logout: (state) => {
            localStorage.removeItem('name');
            localStorage.removeItem('token');
            state.Logouttoggle = false;
        },
        redirectToo: (state, { payload }) => {
            state.redirectTo = payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(loginUser.pending, state => {
            state.loading = true;
            state.error = '';
        })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.error = '';
                if (payload?.status === 200) {
                    state.msg = payload?.message;
                    localStorage.setItem('name', JSON.stringify(payload?.user?.name));
                    localStorage.setItem('token', JSON.stringify(payload?.token));
                    state.Logouttoggle = true;
                    state.redirectTo = '/';
                    toast.success(state?.msg, {
                        theme: 'colored'
                    });
                }
            })
            .addCase(loginUser.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            })
    }
});

export const {check_token,redirectToo,logout}=LoginSlice.actions;
export default LoginSlice;
