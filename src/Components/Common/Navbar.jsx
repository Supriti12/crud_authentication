import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../../Redux/LoginSlice';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { Logouttoggle } = useSelector(state => state?.login)
    const name = localStorage.getItem('name');
    const handleclose = () => {
        dispatch(logout());
        navigate('/login');
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/">Navbar</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">Home <span className="sr-only"></span></Link>
                        </li>
                        {
                            Logouttoggle ?
                                (<>
                                    <li className="nav-item">
                                        <Link className="nav-link">Hi...{name}</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" onClick={handleclose}>Logout</Link>
                                    </li>
                                </>)
                                :
                                (<>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">Login</Link>
                                    </li>
                                </>)
                        }


                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar