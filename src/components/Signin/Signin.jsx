import React, { useContext, useState } from 'react'
import { BASE_URL } from '../utils/config';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import './signin.css'
import { AuthContext } from '../Context/AuthContext';


const Signin = () => {

  const [credentials, setCredentials] = useState({

    email: undefined,
    password: undefined,

  })

  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);

  const handleChange = (e) => {

    setCredentials((prev)=>({...prev, [e.target.id]: e.target.value }));
    
  }

  const handleSubmit = async (e) => {

      e.preventDefault();

      dispatch({ type: "LOGIN_START" });

      try{

        const res = await fetch(`${BASE_URL}/auth/userLogin`,{
        method:"POST",
        headers:{"content-type":"application/json"},
        credentials: 'include',
        body:JSON.stringify(credentials)
        });

        const result = await res.json();
        if(!result.ok){

          console.log(result.message);
        }

        dispatch({

          type: "LOGIN_SUCCESS",
          payload: result.data,
          token: result.token,
          role: result.role,

        });

          navigate('/shop');

      }catch(error){
        
         dispatch({ type: "LOGIN_FAILURE", payload: error.message });

          console.log(error.message)
      }


  }

  return (
    <div className='mt-5 signin'>
    <div className="container">
      <div className="row">
        <div className="col-md-4">

        </div>
        <div className="col-md-4 userinfo">
        <div className="row">
          <div className="col-md-6">
            <img src={"https://img.freepik.com/premium-photo/guardian-digital-realm-mans-vigilance-login-gate_1134661-21359.jpg?w=740"} className='h-100 w-75' alt="" />
          </div>
          <div className="col-md-6 mt-5">
          <FaUser color='#0F3460' size={30} />
          <h3 className='text-secondary text-bold mt-2'>Signin</h3>
            <form className='mt-3' onSubmit={handleSubmit}>
            <div className="form-group mb-3 ">
            <input type="text"
                 placeholder='Enter your Email'
                 id='email'
                 className='input'
                 onChange={handleChange} 
                />
                </div>
                <div className="form-group mb-3 ">
                <input type="password"
                 placeholder='Enter your Password'
                 id='password'
                 className='input'
                 onChange={handleChange} 
                />
                </div>
                <button className='btn text-center signinsubmit'>Sign in</button>
                <p className="text-center text-secondary">
              Don't have an account? <Link to="/register" className='text-decoration-none text-dark fw-medium'>Register</Link>
            </p>
            </form>
            </div>
          </div>
        </div>
        </div>
        <div className="col-md-4">
  
        </div>
      </div>
    </div>
  )
}

export default Signin