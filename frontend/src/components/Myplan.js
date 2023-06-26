import axios from 'axios';
import React, { useEffect } from 'react'

const Myplan = () => {
    const sessionStorage = window.sessionStorage
    const user_id = sessionStorage.getItem("user_id");
    console.log(user_id);
    useEffect(()=>{
        axios.post('/spring/road/schedulelist',user_id,{headers: { "Content-Type": "text/plain" }})
        .then((res)=>{console.log(res.data);})
    },[]);
  return (
    <div>Myplan</div>
  )
}

export default Myplan