import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { DeleteStudent, fetchStudents } from '../Redux/StudentSlice';
import { Vortex } from 'react-loader-spinner';
import { toast } from 'react-toastify';

const Home = () => {
  const dispatch = useDispatch();
  const { loading, student_data } = useSelector(state => state?.students)

  const fetchingStudents=async()=>{
    dispatch(fetchStudents())
  }

  useEffect(() => {
   fetchingStudents()
  }, [dispatch])

  if (loading === true) {
    <Vortex
      visible={true}
      height="80"
      width="80"
      ariaLabel="vortex-loading"
      wrapperStyle={{}}
      wrapperClass="vortex-wrapper"
      colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']} />
  }
  const handleDelete = async(id) => {
   const res=await DeleteStudent(id);
    toast.error(res?.msg)
    dispatch(fetchStudents())
  }

  return (
    <>
      <button><Link to='/addstudent'>Add Student</Link></button>
      <div class="card" style={{ width: "100%" }}>
        <div className="card-body">
          <h5 className="card-header">Student Details</h5>
          <form>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">City</th>
                  <th scope="col">Address</th>
                  <th scope="col">Class</th>
                  <th colSpan={2}>Action</th>

                </tr>
              </thead>
              <tbody>
               {
                (student_data?.length===0)?
                <>
                <h5>No records</h5>
                </>:
                <>
                {
                  student_data?.map((item,key)=>{
                    return(
                      <tr>
                        <td>{item?.name}</td>
                        <td>{item?.email}</td>
                        <td>{item?.phone}</td>
                        <td>{item?.city}</td>
                        <td>{item?.address}</td>
                        <td>{item?.class}</td>
                        <td><button><Link className='btn btn-success' to={`/edit/${item?._id}`}>Edit</Link></button></td>
                        <td><button><Link className='btn btn-danger' onClick={()=>handleDelete(item?._id)}>Delete</Link></button></td>
                      </tr>
                    )
                  })
                }
                </>
               }
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </>
  )
}

export default Home