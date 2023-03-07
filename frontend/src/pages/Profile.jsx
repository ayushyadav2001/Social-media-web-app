import React, { useEffect, useState } from 'react';
import "./Profile.css"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Carousel from 'react-bootstrap/Carousel';
import "../components/Card.css"
import horizontalMoreAction  from "../images/horizontalMoreAction.PNG"
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import {API_BASE_URL} from "../config";
import Swal from "sweetalert2"
import axios from  "axios";
import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';

const Profile = () => {
  const user = useSelector(state => state.userReducer);

  const navigate = useNavigate();
  const [image, setImage] = useState({ preview: '', data: '' })
  const [myallposts, setMyallposts] = useState([]);

  const [postDetail, setPostDetail] = useState({});

  const [show, setShow] = useState(false);
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showPost, setShowPost] = useState(false);

  const handlePostClose = () => setShowPost(false);
  const handlePostShow = () => setShowPost(true);

  const CONFIG_OBJ = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token")
    }
  }
  const deletePost = async (postId) => {
    const response = await axios.delete(`${API_BASE_URL}/deletepost/${postId}`, CONFIG_OBJ);

    if (response.status === 200) {
      getMyPosts();
      setShow(false);
    }
  }
  const handleFileSelect = (event) => {
    const img = {
      preview: URL.createObjectURL(event.target.files[0]),
      data: event.target.files[0]
    }
    setImage(img);
  }

  const handleImgUpload = async () => {
    let formData = new FormData();
    formData.append('file', image.data);

    const response = axios.post(`${API_BASE_URL}/uploadFile`, formData)
    return response;
  }

  const getMyPosts = async () => {
    const response = await axios.get(`${API_BASE_URL}/myallposts`, CONFIG_OBJ);

    if (response.status === 200) {
      setMyallposts(response.data.posts);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Some error occurred while getting all your posts'
      })
    }
  }
  const showDetail = (post) => {
    setPostDetail(post);
  }
  const addPost = async () => {

    if (image.preview === '') {
      Swal.fire({
        icon: 'error',
        title: 'Post image is mandatory!'
      })
    } else if (caption === '') {
      Swal.fire({
        icon: 'error',
        title: 'Post caption is mandatory!'
      })
    } else if (location === '') {
      Swal.fire({
        icon: 'error',
        title: 'Location is mandatory!'
      })
    } else {
      setLoading(true);
      const imgRes = await handleImgUpload();
      const request = { description: caption, location: location, image: `${API_BASE_URL}/files/${imgRes.data.fileName}` }
      // write api call to create post
      const postResponse = await axios.post(`${API_BASE_URL}/createpost`, request, CONFIG_OBJ)
      setLoading(false);
      if (postResponse.status == 201) {
        navigate("/posts")
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Some error occurred while creating post'
        })
      }
    }
  }
  useEffect(() => {
    getMyPosts();
  }, []);

  return (
    <div className='container shadow mt-3 p-4 d-flex flex-column'>
    <div className="row">
    <div className='col-md-6'>
    <img className='p-2 profile-pic' src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="profile-pic" />
    <p className='ms-3 fs-5 fw-bold '>John_Doe</p>
    <p className='ms-3 fs-5 '>John Doe</p>
    <p className='ms-3 fs-5 '>UI/UX Designer @John | Follow @John</p>
    <p className='ms-3 fs-5 '>My Portfolio on <a href='www.johndow.com/john'>www.johndow.com/john</a></p>
    </div>
    <div className='col-md-6 d-flex flex-column justify-content-between mt-3'>
    <div className="d-flex justify-content-equal mx-auto">
    <div className='count-section pe-md-5 pe-4 text-center fw-bold' >
    <h4>10</h4>
    <p >Posts</p>
    </div>
    <div className=' count-section px-4 px-md-5 text-center fw-bold' >
    <h4>20</h4>
    <p>Follower</p>
    </div>
    <div className='ps-md-5 ps-4 text-center fw-bold'>
    <h4>20</h4>
    <p>Following</p>
    </div>
    </div>
    <div className='mx-auto mt-4 mt-md-0'>
    <button  className="custom-btn custom-btn-white me-md-3  ">
    <span className='fs-6' >Edit Profile</span> 
    </button> 
    <button  className="custom-btn custom-btn-white " onClick={handlePostShow}>
    <span className='fs-6'>Uplodad Post</span> 
    </button> 
    </div>
    </div>
    </div>
    <div className="row my-3">
    <div className="col-12">
    <hr />
    </div>
    </div>
    {/* Post Gallery */}
    <div className="row ">
    <div className="col-md-4 col-sm-12 mb-md-4 mb-3 " onClick={handleShow}>
    <div className="card ">
    <img src="https://images.unsplash.com/photo-1586348943529-beaae6c28db9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80" className="card-img-top" alt="images"/>
    </div>
    </div>
    <div className="col-md-4 col-sm-12 mb-md-4 mb-3" onClick={handleShow}>
    <div className="card">
    <img src="https://images.unsplash.com/photo-1586348943529-beaae6c28db9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80" className="card-img-top" alt="images"/>
    </div>
    </div>
    <div className="col-md-4 col-sm-12 mb-md-4 mb-3" onClick={handleShow}>
    <div className="card">
    <img src="https://images.unsplash.com/photo-1586348943529-beaae6c28db9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80" className="card-img-top" alt="images"/>
    </div>
    </div>
    </div>
    <div className="row ">
    <div className="col-md-4 col-sm-12 mb-md-4 mb-3" onClick={handleShow}>
    <div className="card">
    <img src="https://images.unsplash.com/photo-1586348943529-beaae6c28db9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80" className="card-img-top" alt="images"/>
    </div>
    </div>
    <div className="col-md-4 col-sm-12 mb-md-4 mb-3" onClick={handleShow}>
    <div className="card">
    <img src="https://images.unsplash.com/photo-1586348943529-beaae6c28db9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80" className="card-img-top" alt="images"/>
    </div>
    </div>
    <div className="col-md-4 col-sm-12 mb-md-4 mb-3" onClick={handleShow}>
    <div className="card">
    <img src="https://images.unsplash.com/photo-1586348943529-beaae6c28db9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80" className="card-img-top" alt="images"/>
    </div>
    </div>
    </div>
        <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
      
        </Modal.Header>
        <Modal.Body>
        <div className="row">
        
        <div className="col-md-6">
        <div>
        <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1748&q=80"
          alt="First slide"
        />

      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1875&q=80"
          alt="Second slide"
        />

       
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80"
          alt="Third slide"
        />

       
      </Carousel.Item>
    </Carousel>
        </div>
        </div>
        <div className="col-md-6 ">
        <div className="row">
    <div className="col-md-6 d-flex">
    <img className='p-2 post-profile-pic' src="https://images.unsplash.com/photo-1516685304081-de7947d419d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="profile=pic" />
    <div className='d-flex flex-column justify-content-center mt-2 ms-2'>
    <p className='fs-6 fw-bold'>Title</p>
    <p className='location'>Description</p>
    </div>
    <div className="dropdown ms-5">
    <a className="btn" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" >
    <img src={horizontalMoreAction} className="float-end fs-3 p-2 mt-2 fa-solid fa-info" alt="more-img" />
    </a>
    <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
      <li><a className="dropdown-item" href="#"><i className="fa-solid fa-pen-to-square me-1"></i> Edit Post</a></li>
      <li><a className="dropdown-item" href="#"><i className="fa-solid fa-trash-can me-1"></i> Delete </a></li>
    </ul>
  </div>
    </div>
     
    </div>
    <div className="row">
    <div className="col-12 ">
        <span  className='text-muted p-2'>2 Hours Ago</span>
    </div>
    </div>
    <div className="row">
    <div className="col-12 ms-2 mt-2">

    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, accusamus omnis! Itaque delectus beatae architecto, voluptates quod dignissimos? Facere, harum.</p>
    </div>
    </div>
    <div className="row my-3">
    <div className="col-6 d-flex ">
    <i className="ps-2 fs-4 fa-sharp fa-regular fa-heart"></i>
    <i className="ps-3 fs-4 fa-regular fa-comment"></i>
    <i className="ps-3 fs-4 fa-solid fa-location-arrow"></i>

    </div>
    <div className="col-md-12 mt-3 ms-2">
    <span className='fw-bold fs-6  pe-2'>200 likes</span>
    </div>
    </div>   
        </div>
        </div>
        </Modal.Body>
      </Modal>

      {/*Popup for post upload  */}

      <Modal show={showPost} onHide={handlePostClose} size='lg' centered>
      <Modal.Header closeButton>
        <span className='fw-bold fs-5'> Upload Post</span>
      </Modal.Header>
      <Modal.Body>
      <div className="row">
      <div className="col-md-6 col-sm-12 mb-3 p-2">
      <div className="upload-box">
      <div className='dropZoneContainer'>
      <input name="file" type="file" id="drop_zone" className="FileUpload" accept=".jpg,.png,.gif" onChange={handleFileSelect} />
      <div className='dropZoneOverlay'>
      {image.preview && <img alt='uploded img' src={image.preview} width='200' height='200'/>}
      <i className="fa-solid fa-cloud-arrow-up fs-1"></i> <br />Upload Photo from Computer</div>
      
      </div>
      
      </div>
      </div>
      <div className="col-md-6 col-sm-12 d-flex flex-column justify-content-between mb-3">
      
      <div className="row">
      <div className="col-sm-12 mb-3">
      <div className="form-floating">
      <textarea onChange={(e)=>{setCaption(e.target.value)}} className="form-control" placeholder="Add Caption" id="floatingTextarea"></textarea>
      <label for="floatingTextarea">Add Caption</label>
    </div>
      </div>
      <div className="col-sm-12 mb-3">
      <div className="form-floating mb-3">
        <input onChange={(e)=>{setLocation(e.target.value)}}  type="text" className="form-control " id="floatingInput" placeholder="Location"/>
        <label for="floatingInput"><i className="fa-solid fa-location-dot"></i> Add Location</label>
      </div>
      </div>
      </div>
      <div className="row">
      <div className="col-sm-12 mb-3">
      {/*Loader */}
      {loading? <div className="col-md-12 text-center mt-4">
      <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
      </div>
        </div> :""}
      <button onClick={()=>{addPost()}}  className="custom-btn custom-btn-post float-end ">
      <span className='fs-6 fw-600'>Post</span> 
      </button>
      </div>
  
      </div>
      </div>
      </div>
      </Modal.Body>
    </Modal>

    </div>
  )
}

export default Profile