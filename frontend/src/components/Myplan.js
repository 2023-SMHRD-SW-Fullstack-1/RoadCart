import React, { useEffect } from 'react'

const Myplan = () => {
    const user_id = sessionStorage.getItem("user_id");
    useEffect(()=>{
        axios.post('spring/schedulelist',user_id,{headers: { "Content-Type": "text/plain" }})
        .then((res)=>{console.log(res.data);})
    },[]);
  return (
    <div>Myplan</div>
  )
}

export default Myplan