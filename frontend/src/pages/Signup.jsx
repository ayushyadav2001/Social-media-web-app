import React, { useState } from 'react'
import SocialDesktop from "../images/social-desktop.PNG";
import SocialMobile from "../images/social-mobile.PNG";
import "./Signup.css";
import { Link } from 'react-router-dom';
import {API_BASE_URL} from "../config"
import axios from  "axios";
import Swal from "sweetalert2"
const Signup = () => {

  const[fullName,setFullName]=useState();
  const[phone,setPhone]=useState();
  const[email,setEmail]=useState();
  const[password,setPassword]=useState();
  const[loading,setLoading]=useState(false);
  const signup=(event)=>{
    event.preventDefault();
    setLoading(true);
    const requestData={fullName:fullName,email,password,phone}
    axios.post(`${API_BASE_URL}/signup`,requestData)
    .then((result)=>{
      if(result.status == 201){
        setLoading(false);
        Swal.fire({
          icon:"success",
          title:"User Successfully Registered",
        })
      }
      setFullName("");
      setEmail("");
      setPassword("");
      setPhone("");

    })
    .catch((error)=>{
      setLoading(false);
      console.log(error)
      Swal.fire({
        icon:"error",
        title:"Some Error occured please try again later!"

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
    <h5 className="card-title text-center mt-3 fw-bold ">Sign Up</h5>

    {/*Form Section  */}
    <form onSubmit={(e)=>{signup(e)}}>
    <input type="text" value={phone} onChange={(e)=>{setPhone(e.target.value)}} className="form-control input-bg my-4 mb-2 p-2" placeholder='Phone' />
    <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} className="form-control input-bg mb-2 p-2" placeholder='Email' />
    <input type="text" value={fullName} onChange={(e)=>{setFullName(e.target.value)}} className="form-control input-bg  mb-2 p-2" placeholder='Full Name' />
    <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} className="form-control input-bg p-2 mb-2" placeholder='Password' />
    <div className='mt-3 d-grid'>
    <button  className="custom-btn custom-btn-blue" type='submit'>Sign Up</button>
    </div>
    <div className="my-4">
        <hr className='text-muted' />
        <h5 className='text-muted text-center'>OR</h5>
        <hr className='text-muted' />
    </div>
    <div className='mt-3 mb-5 d-grid' >
    <button  className="custom-btn custom-btn-white">
    <span className='text-muted fs-6' >Already have an account?</span> 
    <Link className='ms-1 text-info fw-bold text-primary' to={"/login"} >Log In</Link>
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

export default Signup