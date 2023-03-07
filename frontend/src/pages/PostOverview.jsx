import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import {API_BASE_URL} from "../config";
import axios from  "axios";
import Swal from "sweetalert2";
const PostOverview = () => {

  const [allposts,setAllPosts]=useState([]);
  const CONFIG_OBJ = {
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
    }
}


  const getAllPosts= async()=>{
    const response=await axios.get(`${API_BASE_URL}/allposts`);

    if(response.status === 200){
      setAllPosts(response.data.post);
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Some error occured while getting all!'
      })
    }
  }
  const deletePost = async (postId) => {
    const response = await axios.delete(`${API_BASE_URL}/deletepost/${postId}`, CONFIG_OBJ);
    if (response.status === 200) {
        getAllPosts();
    }
}

  useEffect(()=>{
    getAllPosts()  
  },[])
  return (
    <div className='container mt-md-5 mt-2'>
    <div className="row">
    {allposts.map((post)=>{
      return(
        <div className='col-md-4  mb-2'>
        <Card postData={post}  deletePost={deletePost}/>    
        </div>
      )
    })}
    
    </div>
    </div>
  )
}

export default PostOverview