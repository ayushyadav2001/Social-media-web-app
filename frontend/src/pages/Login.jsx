import React  from 'react'
import "./Login.css"
import SocialDesktop from "../images/social-desktop.PNG";
import SocialMobile from "../images/social-mobile.PNG";
import { Link,useNavigate } from 'react-router-dom';
import {API_BASE_URL} from "../config";
import axios from  "axios";
import Swal from "sweetalert2";
import { useState } from "react"
import {useDispatch} from "react-redux"
const Login = () => {


  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const login = (event) => {
        event.preventDefault();
        setLoading(true);
        const requestData = { email, password }
        axios.post(`${API_BASE_URL}/login`, requestData)
            .then((result) => {
                if (result.status == 200) {
                    setLoading(false);
                    localStorage.setItem("token", result.data.result.token);
                    localStorage.setItem('user', JSON.stringify(result.data.result.user));
                    dispatch({ type: 'LOGIN_SUCCESS', payload: result.data.result.user });
                    setLoading(false);
                    navigate('/myprofile');
                }
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
                Swal.fire({
                    icon: 'error',
                    title: error.response.data.error
                })
            })
    }
  
  return (
    <div className='container login-container'>
    <div className="row">
    <div className='col-md-7 col-sm-12 d-flex justify-content-center align-items-center'>
    <img className='SocialDesktop' style={{height:"85%"}} src={SocialDesktop} alt="logo" />
    <img className='SocialMobile' src={SocialMobile} alt="logo" />
    
    </div>
    <div className='col-md-5 col-sm-12 '>
   { /*Login Card Section*/}
   <div className="card shadow" >
   {/*Loader */}
  {loading? <div className="col-md-12 text-center mt-4">
  <div className="spinner-border text-primary" role="status">
  <span className="visually-hidden">Loading...</span>
  </div>
    </div> :""}
    <div className="card-body px-5">
    <h5 className="card-title text-center mt-3 fw-bold ">Log In</h5>

    {/*Form Section  */}
    <form onSubmit={(e)=>{login(e)}}>
    <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="email" className="form-control input-bg my-4 mb-2 p-2" placeholder='Phone Number ,Username or Email' />
    <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" className="form-control input-bg p-2 mb-2" placeholder='Password' />
    <div className='mt-3 d-grid'>
    <button type='submit'  className="custom-btn custom-btn-blue">Log In</button>
    </div>
    <div className="my-4">
        <hr className='text-muted' />
        <h5 className='text-muted text-center' >OR</h5>
        <hr className='text-muted' />
    </div>
    <div className='mt-3 mb-5 d-grid' >
    <button  className="custom-btn custom-btn-white">
    <span className='text-muted fs-6' >Don't have an account?</span> 
    <Link className='ms-1 text-info fw-bold text-primary' to={"/signup"}> Sign Up</Link>
    </button> 
    </div>
    </form>
  </div>
</div>

    </div>
    </div>

    
    </div>
  )
}

export default Login