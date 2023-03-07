import React from 'react'
import "./Card.css"
import MoreAction from "../images/more-action.PNG"
import {useSelector} from "react-redux"
const Card = (props) => {
  const user=useSelector(state=>state.userReducer);
  
  return (
    <div>
    <div className="card shadow-sm" >
    <div className="card-body px-2">
    <div className="row">
    <div className="col-md-6 d-flex">
    <img className='p-2 post-profile-pic' src="https://images.unsplash.com/photo-1516685304081-de7947d419d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="profile=pic" />
    <div className='d-flex flex-column justify-content-center mt-2'>
    <p className='fs-6 fw-bold'>{props.postData.location}</p>
    <p className='location'>{props.postData.description}</p>
    </div>
    </div>
    {props.postData.author._id == user.user._id ?<div className="col-md-6">
    <img onClick={()=>{props.deletePost(props.postData._id)}} style={{cursor:"pointer"}} src={MoreAction} className="float-end fs-3 p-2 mt-2 fa-solid fa-info" alt="more-img" />
    </div>:""}
    </div>
    <div className="row">
    <div className="col-12">
    <img style={{borderRadius:"15px"}} className='img-fluid p-2' src={props.postData.image} alt={props.postData.description} />
    </div>
    </div>
    <div className="row my-3">
    <div className="col-6 d-flex ">
    <i className="ps-2 fs-4 fa-sharp fa-regular fa-heart"></i>
    <i className="ps-3 fs-4 fa-regular fa-comment"></i>
    <i className="ps-3 fs-4 fa-solid fa-location-arrow"></i>

    </div>
    <div className="col-md-6">
    <span className='fw-bold fs-6 float-end pe-2'>200 likes</span>
    </div>
    </div>
    <div className="row">
    <div className="col-12">
        <span  className='text-muted p-2'>2 Hours Ago</span>
    </div>
    </div>
    
  </div>
</div>
    
    </div>
  )
}

export default Card