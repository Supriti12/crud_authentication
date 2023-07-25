import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../Redux/LoginSlice';
import { Puff } from 'react-loader-spinner';
import { clearLog } from '../Redux/RegisterSlice';

const Login = () => {
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const { loading, redirectTo } = useSelector(state => state?.login);
    const [error, setError] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validation = () => {
        let error = {};

        if (user.email === '') {
            error.email = "@email is required"
        }
        if (!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(user.email)) {
            error.email = "@valid mail is required"
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


        if (name === "email") {
            if (value.length === 0) {
                setError({ ...error, email: "@email is required" })
                setUser({ ...user, email: "" })
            } else {
                setError({ ...error, email: "" })
                setUser({ ...user, email: value })
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

    const submitInfo = async e => {
        e.preventDefault();
        const errorList = validation();
        setError(errorList);
        if (Object.keys(errorList)?.length < 1) {
            dispatch(loginUser(user));
        }
    }
    const redirectUser = () => {
        const token = JSON.parse(localStorage.getItem('token'));
        if (token !== null && token !== undefined && token !== '') {
            navigate('/');
        }
    }
    useEffect(() => {
        redirectUser();
    }, [redirectTo]);

    const log = () => {
        dispatch(clearLog())
    }
    return (
        <>
            <div className="card" style={{ width: "18rem", marginLeft: "510px", marginTop: "70px" }}>
                <h5 className="card-header" style={{ paddingLeft: "80px" }}>Login Page</h5>
                <div className="card-body">
                    <form>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={user?.email} placeholder='Enter your email' onChange={e => PostUserData(e)} autoComplete='on' />
                            <span className='text-danger'>{error?.email}</span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" aria-describedby="emailHelp" name="password" value={user?.password} placeholder='Enter your password' onChange={e => PostUserData(e)} autoComplete='on' />
                            <span className='text-danger'>{error?.password}</span>
                        </div>
                        {
                            (loading === true) ? <>
                                <Puff
                                    height="40"
                                    width="40"
                                    radius={1}
                                    color="#4fa94d"
                                    ariaLabel="puff-loading"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                    visible={true} />
                            </> : <>
                                <button type='submit' style={{ marginLeft: "90px" }} onClick={submitInfo} className='btn btn-outline-success'>Login</button><br />
                            </>
                        }
                        <span style={{ marginLeft: "30px" }}>Don't have an account??</span> <Link to='/register' style={{ marginLeft: "90px" }} onClick={log} >Register</Link>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login