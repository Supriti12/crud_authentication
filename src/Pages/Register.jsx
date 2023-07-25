import React, { useEffect, useState } from 'react'
import { clearLog, registerUser } from '../Redux/RegisterSlice'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const { redirectReg } = useSelector(state => state?.reg)
    const [user, setUser] = useState({
        name: "",
        email: "",
        mobile: "",
        password: ""
    })
    const [error, setError] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validation = () => {
        let error = {};

        if (!user.name) {
            error.name = "@Name is Required"
        }
        if (!user.email) {
            error.email = "@email is required"
        } 
        // else if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(user?.email)) {
        //     error.email = "@valid mail is required"
        // }
        // else {
        //     error.email = "@Email is required"
        // }
        if (!user.mobile) {
            error.mobile = "@mobile is required"
        }
        if (!user.password) {
            error.password = "@password is required"
        }
        return error;
    }

    const PostUserData = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setUser({ ...user, [name]: value })

        if (name === "name") {
            if (value.length === 0) {
                setError({ ...error, name: "@name is required" })
                setUser({ ...user, name: "" })
            } else {
                setError({ ...error, name: "" })
                setUser({ ...user, name: value })
            }
        }
        if (name === "email") {
            if (value.length === 0) {
                setError({ ...error, email: "@email is required" })
                setUser({ ...user, email: "" })
            } else {
                setError({ ...error, email: "" })
                setUser({ ...user, email: value })
            }
        }
        if (name === "mobile") {
            if (value.length === 0) {
                setError({ ...error, mobile: "@name is required" })
                setUser({ ...user, mobile: "" })
            } else {
                setError({ ...error, mobile: "" })
                setUser({ ...user, mobile: value })
            }
        }
        if (name === "password") {
            if (value.length === 0) {
                setError({ ...error, password: "@password is required" })
                setUser({ ...user, password: "" })
            } else {
                setError({ ...error, password: "" })
                setUser({ ...user, password: value })
            }
        }
    }

    const submitInfo = async (e) => {
        e.preventDefault();
        const errorList = validation();
        setError(errorList);
        if(Object.keys(errorList)?.length<1){
            dispatch(registerUser(user));
        }
        // let data = {
        //     "name": user.name,
        //     "email": user.email,
        //     "mobile": user.mobile,
        //     "password": user.password
        // }
        // dispatch(registerUser(data))
    }
    const registration = () => {
        const name = localStorage.getItem('name');
        if (name !== '' && name !== undefined && name !== null) {
            navigate('/login');
        }
    }
    useEffect(() => {
        registration()
    }, [redirectReg])
    const log = () => {
        dispatch(clearLog)
    }
    return (
        <>
            <div className="card" style={{ width: "25rem", marginLeft: "510px", marginTop: "40px" }}>
                <h5 className="card-header" style={{paddingLeft:"125px"}}>Register Form</h5>
                <div className="card-body">
                    <form>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Name</label>
                            <input type="text" className="form-control" id="exampleInputName1" aria-describedby="emailHelp" name="name" value={user?.name} placeholder='Enter your name' onChange={e => PostUserData(e)} autoFocus='on' />
                            <small style={{color:"red"}}>{error?.name}</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={user?.email} placeholder='Enter your email' onChange={e => PostUserData(e)} />
                            <small style={{color:"red"}}>{error?.email}</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Mobile</label>
                            <input type="mobile" className="form-control" id="exampleInputMobile1" aria-describedby="emailHelp" name="mobile" value={user?.mobile} placeholder='Enter your mobile' onChange={e => PostUserData(e)} />
                            <small style={{color:"red"}}>{error?.mobile}</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" aria-describedby="emailHelp" name="password" value={user?.password} placeholder='Enter your password' onChange={e => PostUserData(e)} />
                            <small style={{color:"red"}}>{error?.password}</small>
                        </div>
                        <button type='submit' onClick={submitInfo} >Register</button><br />
                        <span>Already have an account??</span><Link to='/login' onClick={log} style={{marginLeft:"95px"}}>Login</Link>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register