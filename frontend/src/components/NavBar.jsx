import React from 'react'
import { NavLink,useNavigate } from 'react-router-dom'
import Logo from '../images/logo.PNG'
import "./NavBar.css";
import {useDispatch, useSelector} from "react-redux"


const NavBar = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();

  const user=useSelector(state=>state.userReducer);
  const logout=()=>{

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({type:"LOGIN_ERROR"});
    navigate("/login");
  }
  return (
    <div>
    <nav className="navbar navbar-light bg-light shadow-sm">
    <div className="container-fluid">
      <NavLink className="navbar-brand ms-5" to="/"><img src={Logo} alt="logo" height={"45px"} /> </NavLink>
      <form className="d-flex me-md-5">
        <input className="form-control me-2 text-muted searchBox" type="search" placeholder="Search" aria-label="Search"/>
        <a href="#" className='nav-link text-dark fs-5 searchIcon'><i className="fa-solid fa-magnifying-glass"></i></a>
        <NavLink to="/posts" className='nav-link text-dark fs-5'><i className="fa-solid fa-house"></i></NavLink>
        {user ?<NavLink href="#" className='nav-link text-dark fs-5'><i className="fa-regular fa-heart"></i></NavLink>:""}
        
        <div className="dropdown">
        {user?  <> <a className="btn" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" >
        <img className=' navbar-profile-pic' src="https://images.unsplash.com/photo-1516685304081-de7947d419d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="profile=pic" />
        </a>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <li>
        <NavLink to="/myprofile" className='dropdown-item text-dark mt-0 '>Profile</NavLink>
          
        </li>
          <li>
          <a href='#' className='dropdown-item text-dark mt-0 ' onClick={()=>{logout()}}>Logout</a>
          </li>
        </ul> </>:" "}
      </div>

      </form>
    </div>
  </nav>
    </div>
  )
}

export default NavBar