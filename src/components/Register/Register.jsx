import React, { useState } from 'react'
import { FaUser } from "react-icons/fa";
import './register.css'
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/config';

const Register = () => {

  const [credentials, setCredentials] = useState({

    email: undefined,
    name: undefined,
    password: undefined,
    phone: undefined

  })

  const navigate = useNavigate();

  const handleChange = (e) => {

    setCredentials((prev)=>({...prev, [e.target.id]: e.target.value }));
    
  }

  const handleSubmit = async (e) => {

      e.preventDefault();

      try{

        const res = await fetch(`${BASE_URL}/auth/registerUser`,{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(credentials)
        });

        const result = await res.json();
        if(!result.ok){

          console.log(result.message);
        }

          navigate('/signin');

      }catch(error){

          console.log(error.message);
      }


  }

  return (
    <div className='mt-5 register'>
        <div className="container">
          <div className="row">
            <div className="col-md-4">

            </div>
            <div className="col-md-4 user">
            <div className="row">
              <div className="col-md-6">
                <img src={"https://img.freepik.com/premium-vector/illustration-sign-up-log-wireframe-idea-showcasing-various-ui-elements_1278800-10956.jpg?w=826"} className='h-75 w-75' alt="" />
              </div>
              <div className="col-md-6 mt-3">
              <FaUser color='#0F3460' size={30} />
              <h3 className='text-secondary text-bold mt-2'>Register</h3>
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
                    <input type="text"
                     placeholder='Enter your Name'
                     id='name'
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
                    <div className="form-group mb-3 ">
                    <input type="text"
                     placeholder='Enter your Mobile no'
                     id='phone'
                     className='input'
                     onChange={handleChange} 
                    />
                    </div>
                    <button className='btn text-center submit'>Register</button>
                    <p className="text-center text-secondary">
                  Already have an account? <Link to="/signin" className='text-decoration-none text-dark fw-medium'>Sigin in</Link>
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

export default Register



                
                    
                  
               