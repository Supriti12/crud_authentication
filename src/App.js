import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./Components/Common/Navbar";
import Register from "./Pages/Register";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./Pages/Login";
import { useEffect } from "react";
import { check_token } from "./Redux/LoginSlice";
import { useDispatch } from "react-redux";
import Add from "./Pages/Add";
import Edit from "./Pages/Edit";


function App() {
  const dispatch=useDispatch();
  const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return (token !== '' && token !== undefined && token !== null) ?
      <>
        {children}
      </> :
      <>
        <Navigate to='/login' />
      </>
  }

  const PrivateRouteNames = [
    {
      path: '/',
      component: <Home />
    },
    {
      path: '/addstudent',
      component: <Add/>
    },
    {
      path: '/edit/:id',
      component: <Edit/>
    }
  ]

  const PublicRouteNames = [
    {
      path: '/login',
      component: <Login />
    },
    {
      path: '/register',
      component: <Register />
    }
  ]

  useEffect(()=>{
    dispatch(check_token())
  },[dispatch])
  return (
    <>
      <ToastContainer />
      <Router>
        <Navbar />
        <Routes>
          {
            PublicRouteNames?.map((route, index) => {
              return (
                <>
                  <Route key={index?.id} exact path={route?.path} element={route?.component} />
                </>
              )
            })
          }
          {
            PrivateRouteNames?.map((route, index) => {
              return (
                <>
                  <Route key={index?.id} exact path={route?.path} element={(<PrivateRoute>{route?.component}</PrivateRoute>)} />
                </>
              )
            })
          }
        </Routes>
      </Router>
    </>
  );
}

export default App;
