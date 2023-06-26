import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Delete = (posts,post,setPosts) => {
    const navigate = useNavigate();
    const [idx,setIdx] = useState()
    // 게시물 삭제
    const handleDeletePost = (comm_idx) => {
      setPosts(posts.filter((post) => comm_idx !== post.community.comm_idx));
     alert("정말 삭제하시겠습니까?")
     console.log("deletePost",posts);
    };
    
    const requestData ={
      comm_idx: posts[0].community.comm_idx
    }
    console.log("request",requestData);
    const config = {
      headers: { 'Content-Type': 'application/json; charset=UTF-8'
      // /'application/json;charset=UTF-8' 
    }
    }
  
    useEffect(()=>{
      axios.post(`http://172.30.1.39:8089/road/mypost`,config)
    .then((res)=>{
      console.log('결과mypost',res.data);
       setPosts(res.data)})
    
    .catch(error=>console.log("error",error))
      //  console.log("1",post[0]);
      //  console.log("2",posts);
    },[])
  return (
    <div>
        
    </div>
  )
}

export default Delete